
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToAnchor = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Retry for dynamically loaded content
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            // Scroll to top on route change if no hash
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
};
