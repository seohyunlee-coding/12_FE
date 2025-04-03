import React, { useRef, useEffect, useState } from 'react';
import placeHolder from '../assets/placeholder.jpg';
import { useZoom, useDragScroll } from '../hooks/Map';

export default function Map({ children }) {
    const containerRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [baseScale, setBaseScale] = useState(400);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const img = new Image();
        img.src = placeHolder;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (imageSize.width && imageSize.height) {
                window.innerWidth / window.innerHeight > imageSize.width / imageSize.height
                    ? setBaseScale((100 * imageSize.width) / window.innerWidth)
                    : setBaseScale((100 * imageSize.height) / window.innerHeight);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageSize]);

    const { scale } = useZoom(containerRef, 100, 100);
    const { isDragging, startDrag } = useDragScroll(containerRef);

    // 맵 클릭 시 해당 지점을 중앙에 맞춤
    const centerOnClick = (e) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        // 클릭 지점(스크롤 고려)
        const offsetX = e.clientX - rect.left + container.scrollLeft;
        const offsetY = e.clientY - rect.top + container.scrollTop;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // 중앙 배치 계산 (클램핑)
        let newScrollLeft = offsetX - containerWidth / 2;
        let newScrollTop = offsetY - containerHeight / 2;
        newScrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - containerWidth));
        newScrollTop = Math.max(0, Math.min(newScrollTop, container.scrollHeight - containerHeight));

        container.scrollLeft = newScrollLeft;
        container.scrollTop = newScrollTop;
    };

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
                cursor: isDragging ? "grabbing" : "grab",
                position: "relative",
            }}
            onMouseDown={startDrag}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformOrigin: "0 0",
                }}
            >
                <img
                    src={placeHolder}
                    alt="Map"
                    style={{
                        width: imageSize.width * scale / baseScale + "px",
                        height: imageSize.height * scale / baseScale + "px",
                        transformOrigin: "0 0",
                        objectFit: "contain",
                        userSelect: "none",
                    }}
                    draggable={false}
                    onClick={() => {
                        setSelectedIndex(null);
                        // centerOnClick(e);
                    }}
                />
                {React.Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        postScale: scale / baseScale,
                        onClick: () => {
                            setSelectedIndex(index);
                            // centerOnClick(e);
                        },
                        isSelected: selectedIndex === index,
                    })
                )}
            </div>
        </div>
    );
}