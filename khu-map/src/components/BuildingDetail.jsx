import "../styles/Building.css";
import marker from "../assets/marker.png";

export default function BuildingDetail({ buildingName = "공학관", isSelected, onHover, onHoverEnd }) {
    return (
        <div className="building-detail">
            <div className="building-name" style={{ opacity: isSelected ? 1 : 0, transition: "opacity 0.1s" }}>
                {buildingName}
            </div>
            <img src={marker} alt="마커" />
            <div style={
                {
                    width: "110px",
                    height: "70px",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    zIndex: isSelected ? 1000 : 0,
                    transform: isSelected ? "scale(1.2) translateY(20%)" : "none",
                }
            }
                onMouseEnter={() => onHover()}
                onMouseLeave={() => onHoverEnd()}
            >

            </div>
        </div >
    )
}