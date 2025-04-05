import { useEffect, useState } from "react"
import "../styles/building.css";
import BuildingDetail from "./BuildingDetail";

export default function Building({ x, y, scale = 0.35, src, buildingID, buildingName, zindex, setIndex, resetIndex, isSelected }) {

    const [size, setSize] = useState({ width: 0, height: 0 });
    // const [isPopupShown, setisPopupShown] = useState(false);

    // props: { x: number, y: number, src: string, buildingID: number, buildingName: string, postScale: number, onClick: function }

    useEffect(
        () => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setSize({
                    width: img.width,
                    height: img.height
                });
            }
        }
    )

    // TODO: 백엔드의 건물 데이터베이스 확인하고 API응답 조율하기
    // const fetchBuildingInfo = async (buildingID) => {
    //     const response = await fetch(`http://localhost:8080/building/?id=${buildingID}`);
    //     const data = await response.json();
    //     return data;
    // }

    const style = {
        position: "absolute",
        display: "flex",
        gap: "4px",
        flexDirection: "column",
        alignItems: "center",
        width: size.width + "px",
        height: size.height + "px",
        left: x + "px",
        top: y + "px",
    }

    return (
        <div style={style}>
            <div style={
                {
                    position: "absolute",
                    bottom: size.height * (scale + 0.1) + "px",
                    pointerEvents: "none",
                    transform: isSelected ? "translateY(-10%)" : "translateY(0px)",
                    transition: "transform 0.1s",
                    zIndex: 1000 + zindex,
                }
            }>
                <BuildingDetail buildingName={buildingName} isSelected={isSelected} onHover={setIndex} onHoverEnd={resetIndex} />
            </div>
            <img
                style={{
                    width: "100%",
                    height: "100%",
                    transform: isSelected ? `scale(${scale + 0.05})` : `scale(${scale})`,
                    zIndex: zindex,
                    pointerEvents: "none"
                }}
                src={src}
                className="building"
                draggable={false}
            // onClick={() => { movetoPos(x + size.width / 2, y + size.height / 2, true) }}
            />
        </div>
    )
}