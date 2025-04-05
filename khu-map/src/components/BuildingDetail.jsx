import "../styles/Building.css";

export default function BuildingDetail({ buildingName = "공학관" }) {
    return (
        <div className="building-detail">
            <div className="building-name">{buildingName}</div>
        </div>
    )
}