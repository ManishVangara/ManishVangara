import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

export const useLastFM = () => {
    const [musicData, setMusicData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!API_KEY || !USERNAME) {
            console.warn("Last.FM credentials missing in .env");
            setLoading(false);
            return;
        }

        const fetchMusic = async () => {
            try {
                const response = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
                );
                const data = await response.json();
                const track = data.recenttracks.track[0];

                setMusicData({
                    name: track.name,
                    artist: track.artist['#text'],
                    album: track.album['#text'],
                    art: track.image[3]['#text'],
                    url: track.url,
                    isPlaying: track['@attr']?.nowplaying === 'true'
                });
            } catch (error) {
                console.error("Error fetching Last.FM data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMusic();
        const interval = setInterval(fetchMusic, 30000); // Poll every 30s

        return () => clearInterval(interval);
    }, []);

    return { musicData, loading };
};
