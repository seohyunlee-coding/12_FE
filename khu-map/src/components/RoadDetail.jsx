import "../styles/Building.css";

export default function RoadDetail({ status = 0 }) {
    return (
        <div className="building-detail" style={{ color: status === 0 ? "red" : "green" }}>
            <div className="building-name" style={{ color: status === 0 ? "red" : "green" }}>
                {status === 0 ? "통행 제한" : "통행가능"}
            </div>
        </div>
    )
}