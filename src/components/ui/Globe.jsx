
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

export const Globe = ({ className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                // San Francisco: 37.7749° N, 122.4194° W
                { location: [37.7595, -122.4367], size: 0.1 }
            ],
            onRender: (state) => {
                // Static: phi stays constant at the initial value (or whatever logic we want)
                // Based on testing, phi 0 might be close to what we need, or we need to offset.
                // To center SF (-122 deg), we might need to rotate the globe significantly.
                // Let's hold it at 0 initially.
                state.phi = phi;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={`relative flex items-center justify-center w-full h-full overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
            />
        </div>
    );
};
