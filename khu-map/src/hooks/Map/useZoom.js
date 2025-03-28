import { useState, useEffect } from 'react';

export default function useZoom(elementRef, initialScale = 100, minScale = 100) {
    const [scale, setScale] = useState(initialScale);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newScale = scale - e.deltaY / 10;
            if (newScale <= minScale) {
                setScale(minScale);
                return;
            }
            setScale(newScale);
        };

        element.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            element.removeEventListener('wheel', handleWheel);
        };
    }, [scale, elementRef, minScale]);

    return [scale, setScale];
}