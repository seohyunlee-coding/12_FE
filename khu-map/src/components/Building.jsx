import { useEffect, useState } from "react"
import "../styles/building.css";
import BuildingDetail from "./BuildingDetail";

export default function Building(props) {

    const [size, setSize] = useState({ width: 0, height: 0 });
    const [isPopupShown, setisPopupShown] = useState(false);

    // props: { x: number, y: number, src: string, postScale: number, buildingID: number }

    useEffect(
        () => {
            const img = new Image();
            img.src = props.src;
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
    //     const response = await fetch(`http://localhost:8080/building/${buildingID}`);
    //     const data = await response.json();
    //     return data;
    // }

    const style = {
        position: "absolute",
        width: size.width * props.postScale + "px",
        height: size.height * props.postScale + "px",
        left: props.x * props.postScale + "px",
        top: props.y * props.postScale + "px",
    }

    return (
        <div style={style}>
            <img
                style={{ width: "100%", height: "100%" }}
                src={props.src}
                className="building"
                onClick={() => { console.log("clicked") }}
            />
            <BuildingDetail />
        </div>
    )
}