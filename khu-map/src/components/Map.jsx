import { useRef } from 'react';
import placeHolder from '../assets/placeholder.jpg';
import { useZoom, useDragScroll } from '../hooks/Map';

export default function Map() {
    const divRef = useRef(null);
    const containerRef = useRef(null);

    const [scale] = useZoom(divRef, 100, 100);
    const { isDragging, startDrag } = useDragScroll(containerRef);

    return (
        <div
            ref={containerRef}
            style={{
                overflow: "scroll",
                width: "100vw",
                height: "100vh",
                cursor: isDragging.current ? "grabbing" : "grab"
            }}
        >
            <div
                ref={divRef}
                style={
                    {
                        backgroundImage: `url(${placeHolder})`,
                        width: scale + '%',
                        height: scale + '%',
                        overflow: "hidden",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% auto",
                    }
                }
                onMouseDown={startDrag}
            >
            </div>
        </div>
    )
}