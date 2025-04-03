import "../styles/Tips.css";

export default function Tips({ tipsID }) {
    return (
        <div>
            <div className="tips-container">
                <div className="tips-title">경희 TIP!</div>
                <div className="tips-content">
                    이곳은 KHU의 {tipsID}입니다.
                </div>
            </div>
        </div>
    )
}