import React, { useRef, useEffect, useState, useCallback } from 'react';
import placeHolder from '../assets/placeholder.jpg';

export default function Map({ children }) {
    const containerRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [baseScale, setBaseScale] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const [scale, setScale] = useState(0.5);
    const [translate, setTranslate] = useState({ x: (-window.innerWidth - imageSize.width) * scale, y: -window.innerHeight * scale });

    const handleWheel = useCallback(
        (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY) / 20;

            const currentScale = scale;

            const newScale = Math.max(baseScale, Math.min(currentScale - delta, 2));
            if (newScale === currentScale) return;

            setScale(newScale);
        },
        [scale, baseScale]
    );

    useEffect(() => {
        const img = new Image();
        img.src = placeHolder;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });
            window.innerWidth / window.innerHeight > img.width / img.height
                ? setBaseScale(window.innerWidth / img.width)
                : setBaseScale(window.innerHeight / img.height);
        };

        const currentContainer = containerRef.current;
        if (!currentContainer) return;

        currentContainer.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener("wheel", handleWheel)
            };
        }

    }, [handleWheel]);

    useEffect(() => {
        const handleResize = () => {
            if (imageSize.width && imageSize.height) {
                window.innerWidth / window.innerHeight > imageSize.width / imageSize.height
                    ? setBaseScale(window.innerWidth / imageSize.width)
                    : setBaseScale(window.innerHeight / imageSize.height);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [imageSize]);

    // 맵 클릭 시 해당 지점을 중앙에 맞춤
    // const centerOnClick = (e) => {
    //     if (!containerRef.current) return;
    //     const container = containerRef.current;
    //     const rect = container.getBoundingClientRect();

    //     // 클릭 지점(스크롤 고려)
    //     const offsetX = e.clientX - rect.left + container.scrollLeft;
    //     const offsetY = e.clientY - rect.top + container.scrollTop;

    //     const containerWidth = container.clientWidth;
    //     const containerHeight = container.clientHeight;

    //     // 중앙 배치 계산 (클램핑)
    //     let newScrollLeft = offsetX - containerWidth / 2;
    //     let newScrollTop = offsetY - containerHeight / 2;
    //     newScrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - containerWidth));
    //     newScrollTop = Math.max(0, Math.min(newScrollTop, container.scrollHeight - containerHeight));

    //     container.scrollLeft = newScrollLeft;
    //     container.scrollTop = newScrollTop;
    // };

    function movetoPos(x, y, isAbs = false) {
        setIsAnimated(true);
        window.removeEventListener('mousemove', handleDrag);

        const absX = x - translate.x / scale, absY = y - translate.y / scale;

        if (isAbs) {
            setTranslate({
                x: - x * scale,
                y: - y * scale,
            });
        }
        else {
            setTranslate({
                x: -absX * scale + window.innerWidth / 2,
                y: -absY * scale + window.innerHeight / 2,
            });
        }

        setTimeout(() => {
            setIsAnimated(false);
        }, 100);
    }

    const startDrag = (e) => {
        e.preventDefault();
        setIsDragging(true);
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', endDrag);
    }

    const handleDrag = (e) => {
        const dx = e.movementX / scale, dy = e.movementY / scale;

        setTranslate(prev => (
            // prev.x + dx > -window.innerWidth * scale
            //     || prev.y + dy > -window.innerHeight * scale
            //     || prev.x + dx < -imageSize.width + window.innerWidth * 2 * scale
            //     || prev.y + dy < -imageSize.height + window.innerHeight * 2 * scale
            //     ? {
            //         x: Math.max(-imageSize.width + window.innerWidth * 2 * scale, Math.min(prev.x + dx, -window.innerWidth * scale)),
            //         y: Math.max(-imageSize.height + window.innerHeight * 2 * scale, Math.min(prev.y + dy, -window.innerHeight * scale))
            //     } :
            {
                x: prev.x + dx,
                y: prev.y + dy
            }
        ));
    }

    const endDrag = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', endDrag);
    }

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
            }}
            onMouseDown={isAnimated ? () => { } : startDrag}
        >
            <div
                ref={containerRef}
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    transformOrigin: "center",
                    transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                    transition: isAnimated ? "transform 0.1s" : "none",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                }}
            >
                <img
                    src={placeHolder}
                    alt="Map"
                    style={{
                        objectFit: "contain",
                        userSelect: "none",
                    }}
                    draggable={false}
                    onClick={() => {
                        setHoveredIndex(null);
                        // centerOnClick(e);
                    }}
                />
                {React.Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        setIndex: () => setHoveredIndex(index),
                        resetIndex: () => setHoveredIndex(null),
                        movetoPos: movetoPos,
                        isSelected: hoveredIndex === index,
                    })
                )}
            </div>
        </div>
    );
}