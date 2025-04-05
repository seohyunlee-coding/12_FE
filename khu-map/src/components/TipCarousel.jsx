import React, { useEffect, useState, useRef } from 'react';

import Tips from './Tips.jsx';
import '../styles/tips.css';

export default function TipCarousel({ tipObjects }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(null); // 'left' 또는 'right'
    const [transitioning, setTransitioning] = useState(false);
    const transitionTimerRef = useRef(null);

    // tipobjects : {"content" : string, "hasMoreInfo":boolean?, "moreInfoSrc": string?}

    useEffect(() => {
        if (tipObjects.length <= 1) return;
        const interval = setInterval(() => {
            if (!transitioning) {
                const newIndex = (currentIndex + 1) % tipObjects.length;
                handleTransition(newIndex, 'left');
            }
        }, 5000); // 5초마다 자동으로 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    }, [currentIndex, tipObjects.length, transitioning]); // transitioning 의존성 추가

    // 트랜지션 타이머 관리를 위한 useEffect
    useEffect(() => {
        return () => {
            // 컴포넌트 언마운트 시 타이머 정리
            if (transitionTimerRef.current) {
                clearTimeout(transitionTimerRef.current);
            }
        };
    }, []);

    // 슬라이드 전환을 위한 트랜지션 처리
    const handleTransition = (newIndex) => {
        if (transitioning) return;

        // 이전 타이머가 있다면 정리
        if (transitionTimerRef.current) {
            clearTimeout(transitionTimerRef.current);
        }


        setTransitioning(true);
        setCurrentIndex(newIndex);

        // 트랜지션 완료 후 상태 초기화
        transitionTimerRef.current = setTimeout(() => {
            setTransitioning(false);
            transitionTimerRef.current = null;
        }, 600); // 트랜지션 시간보다 약간 더 길게 설정
    };

    // 현재 슬라이드에 따라 컨테이너의 transform 값 계산
    const getContainerTransform = () => {
        return `translateX(-${currentIndex * 100}%)`;
    };


    return (
        <div
            className="tips-container"
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                overflow: "hidden"
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        transform: getContainerTransform(),
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {/* content */}
                    {tipObjects.map((tip, index) => (
                        <div
                            key={index}
                            className={`tip ${index === currentIndex ? 'active' : ''}`}
                            style={{
                                flex: "0 0 100%",
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <div className="tips-title">경희 TIP!</div>
                            <div className="tips-content">
                                {tip.content}
                            </div>
                            {tip.hasMoreInfo ? (
                                <button onClick={() => { location.href = tip.moreInfoSrc }}>더 알아보기</button>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {tipObjects.length > 1 && (
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "4px",
                    margin: "4px",
                    paddingTop: "8px"
                }}>
                    {/* 인디케이터 점 */}
                    {tipObjects.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => { handleTransition(index, index < currentIndex ? 'right' : 'left'); console.log("click, index:", index) }}
                        >
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}