import "../styles/BuildingDetail.css";

export default function BuildingDetail() {
    return (
        <div className="building-detail">
            {/* <img src="" alt="" /> */}
            <div className="info-wrap">
                <p>건물 이름: </p>
                <div className="button-wrap">
                    <button>출발</button>
                    <button>도착</button>
                </div>
                <p>건물 설명: </p>
            </div>
        </div>
    )
}