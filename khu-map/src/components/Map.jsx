import { useRef, useEffect, useState } from 'react';
import placeHolder from '../assets/placeholder.jpg';
import { useZoom, useDragScroll } from '../hooks/Map';

export default function Map() {
    const containerRef = useRef(null);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [baseScale, setBaseScale] = useState(400);

    // 이미지 로드 시 실제 크기 가져오기
    useEffect(() => {
        const img = new Image();
        img.src = placeHolder;
        img.onload = () => {
            setImageSize({
                width: img.width,
                height: img.height
            });
        };
    }, []);

    window.onload = () => {
        window.innerWidth / window.innerHeight > imageSize.width / imageSize.height ?
            setBaseScale(100 * imageSize.width / window.innerWidth) :
            setBaseScale(100 * imageSize.height / window.innerHeight);
    };

    window.onresize = () => {
        window.innerWidth / window.innerHeight > imageSize.width / imageSize.height ?
            setBaseScale(100 * imageSize.width / window.innerWidth) :
            setBaseScale(100 * imageSize.height / window.innerHeight);
    };

    const [scale] = useZoom(containerRef, 100, 100);
    const { isDragging, startDrag } = useDragScroll(containerRef);

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
                cursor: isDragging.current ? "grabbing" : "grab",
                position: "relative"
            }}
            onMouseDown={startDrag}
        >
            <img
                src={placeHolder}
                alt="Map"
                style={{
                    width: imageSize.width * scale / baseScale + "px",
                    height: imageSize.height * scale / baseScale + "px",
                    objectFit: "cover",
                    userSelect: "none"
                }}
                draggable={false}
            />
        </div>
    )
}