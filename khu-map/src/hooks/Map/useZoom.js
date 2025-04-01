import { useState, useEffect, useRef } from 'react';

export default function useZoom(elementRef, initialScale = 100, minScale = 100, maxScale = 400) {
    const [scale, setScale] = useState(initialScale);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const lastScale = useRef(initialScale);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 현재 요소의 위치와 크기 정보
            const rect = element.getBoundingClientRect();

            // 마우스 위치 (요소 내 상대적 위치)
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // 새 스케일 계산
            const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9; // 확대 또는 축소 비율
            const newScale = Math.max(minScale, Math.min(maxScale, scale * zoomFactor));

            if (newScale === scale) return; // 스케일 변화 없으면 종료

            const scaleDiff = newScale / lastScale.current;

            const containerScrollLeft = element.scrollLeft;
            const containerScrollTop = element.scrollTop;

            const newScrollLeft = containerScrollLeft * scaleDiff + (mouseX * (scaleDiff - 1));
            const newScrollTop = containerScrollTop * scaleDiff + (mouseY * (scaleDiff - 1));

            setScale(newScale);
            setPosition({
                x: -newScrollLeft,
                y: -newScrollTop
            });

            requestAnimationFrame(() => {
                if (element) {
                    element.scrollLeft = newScrollLeft;
                    element.scrollTop = newScrollTop;
                }
            });

            lastScale.current = newScale;
        };

        element.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            element.removeEventListener('wheel', handleWheel);
        };
    }, [scale, elementRef, minScale, maxScale]);

    const transform = `scale(${scale / 100}) translate(${position.x}px, ${position.y}px)`;

    return { scale, position, transform };
}