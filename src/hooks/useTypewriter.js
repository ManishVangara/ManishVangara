import { useState, useEffect } from 'react';

export const useTypewriter = (textArray, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        let timer;
        const i = loopNum % textArray.length;
        const fullText = textArray[i];

        if (typing) {
            if (isDeleting) {
                timer = setTimeout(() => {
                    setDisplayedText((prev) => prev.substring(0, prev.length - 1));
                }, deletingSpeed);
            } else {
                timer = setTimeout(() => {
                    setDisplayedText((prev) => fullText.substring(0, prev.length + 1));
                }, typingSpeed);
            }
        }

        if (!isDeleting && displayedText === fullText) {
            setTyping(false);
            timer = setTimeout(() => {
                setIsDeleting(true);
                setTyping(true);
            }, pauseDuration);
        } else if (isDeleting && displayedText === '') {
            setIsDeleting(false);
            setLoopNum((prev) => prev + 1);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, loopNum, textArray, typingSpeed, deletingSpeed, pauseDuration, typing]);

    return displayedText;
};
