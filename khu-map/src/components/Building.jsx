import { useEffect, useState } from "react"
import "../styles/building.css";
import BuildingDetail from "./BuildingDetail";
import RoadDetail from "./RoadDetail";

export default function Building({ x, y, src, buildingID, buildingName, movetoPos, setIndex, resetIndex, isSelected, isBuilding = true, status = 0 }) {

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
                    bottom: size.height + 20 + "px",
                    display: isSelected ? "block" : "none",
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 0.3s",
                }
            }>
                {isBuilding ? <BuildingDetail buildingName={buildingName} /> : <RoadDetail status={status} />}
            </div>
            <img
                style={{ width: "100%", height: "100%" }}
                src={src}
                className="building"
                onMouseDown={(e) => { e.stopPropagation() }}
                draggable={false}
                onMouseEnter={() => { setIndex() }}
                onMouseLeave={() => { resetIndex() }}
                onClick={() => { movetoPos(x + size.width, y + size.height, true) }}
            />
        </div>
    )
}