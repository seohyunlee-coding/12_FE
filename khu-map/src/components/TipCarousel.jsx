import React, { useEffect, useState } from 'react';

import Tips from './Tips.jsx';
import '../styles/tips.css';

export default function TipCarousel({ tipObjects }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [transitioning, setTransitioning] = useState(false);

    // tipobjects : {"content" : string, "hasMoreInfo":boolean?, "moreInfoSrc": string?}

    useEffect(() => {
        if (tipObjects.length <= 1) return;
        const interval = setInterval(() => {
            const newIndex = (currentIndex + 1) % tipObjects.length;
            handleTransition(newIndex);
        }, 5000); // 5초마다 자동으로 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    })

    // 페이드 효과를 위한 트랜지션 처리
    const handleTransition = (newIndex) => {
        if (transitioning) return;

        setTransitioning(true);
        setPrevIndex(currentIndex);
        setCurrentIndex(newIndex);

        // 트랜지션 완료 후 상태 초기화
        setTimeout(() => {
            setPrevIndex(null);
            setTransitioning(false);
        }, 500); // 트랜지션 시간과 일치시킴
    };

    return (
        <div
            className={"tips-container"}
            style={
                {
                    width: "100%",
                    height: "120px",
                    alignItems: "end"
                }
            }
        >

            <div style={{ position: "relative", width: "100%", flexGrow: 1 }}>
                {/* content */}
                {tipObjects.map((tip, index) => (
                    <div
                        key={index}
                        className={`tip ${index === currentIndex ? 'active' : ''} ${index === prevIndex ? 'prev' : ''}`}
                        style={{
                            transition: 'opacity 0.5s ease-in-out',
                            opacity: index === currentIndex ? 1 : 0,
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <div className="tips-title">경희 TIP!</div>
                        <div className="tips-content">
                            {tip.content}
                        </div>
                        {tip.hasMoreInfo ? () => (<button>더 알아보기</button>) : () => (<></>)}
                    </div>
                ))}
            </div>
            <div style={{ display: tipObjects.length > 1 ? "flex" : "none", justifyContent: "center", gap: "4px", margin: "4px" }}>
                {/* ellipsis */}
                {tipObjects.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleTransition(index)}
                    >
                    </div>
                ))}
            </div>
        </div >
    );
}