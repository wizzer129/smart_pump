import { useEffect } from 'react';

export const useScript = (urls) => {
    useEffect(() => {
        for (const url in urls) {
            let script = document.createElement('script');

            script.src = url;
            script.async = true;

            document.body.appendChild(script);
        }
    }, [urls]);
};
