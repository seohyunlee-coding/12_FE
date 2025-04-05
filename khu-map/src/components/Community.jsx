import React, { useState } from "react";
import "../styles/Community.css";
import search_icon from "../assets/community_search.png";
import heart_icon from "../assets/heart.png";
import down_icon from "../assets/download.png";
import arrown_icon from "../assets/arrow-left.png";
import map_icon from "../assets/map-icon.png";

const images = [
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/300" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
];

const ImageComents = [
  { id: 1, created_at: "2025-04-04" ,author:"익명", content: "여긴 캠퍼스가 아니라 유럽 여행지야... 걷기만 해도 힐링되는 마법 같은 곳"},
  { id: 2, created_at: "2025-04-02" ,author:"익명", content: "계절마다 색이 바뀌는 캠퍼스 풍경... 봄이면 벚꽃, 가을이면 낙엽... 눈물나게 예뻐요ㅠㅠ"},
  { id: 3, created_at: "2025-04-01" ,author:"익명", content: "여기서 공부하면 진짜 집중 잘 돼요! 자연과 함께하는 캠퍼스 생활 최고!"},
  { id: 4, created_at: "2025-03-30" ,author:"익명", content: "이곳은 캠퍼스의 숨은 보석! 조용하고 아늑한 분위기에서 공부하기 딱 좋아요."},
  { id: 5, created_at: "2025-03-28" ,author:"익명", content: "여기서 사진 찍으면 인생샷 보장! 캠퍼스의 아름다움을 담아보세요."},
  
];

const distributeImages = (images, numGroups) => {
  const result = Array.from({ length: numGroups }, () => []);
  images.forEach((image, index) => {
    result[index % numGroups].push(image); // 순차적으로 분배
  });
  return result;
};

export default function Community() {
  const numGroups = 4; // 4개의 이미지 컨테이너
  const imageChunks = distributeImages(images, numGroups);
  const [IsImageSelected, setIsImageSelected] = useState(false); // 이미지 선택 여부
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지

  return (
    <div className="community_container">
      {/* 이미지 검색 칸 */}
      <div className="community_firstrow">
        {/* 검색창 */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="건물/사진 검색"
            className="search-input"
          />
          <button className="community-search-button">
            <img src={search_icon} alt="search_icon" />
          </button>
        </div>
        {/* 이미지 뜨는 곳 */}
        {!IsImageSelected && (
          <div className="image-container">
            {imageChunks.map((chunk, index) => (
              <div className="image-container-sub" key={index}>
                {chunk.map((src) => (
                  <div
                    className="grid-item"
                    key={src.id}
                    onClick={() => {
                      setSelectedImage(src);
                      setIsImageSelected(true);
                    }}
                  >
                    <img src={src.url} alt={`img-${src.id}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {IsImageSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div className="selected-image-container">
            <button
              className="close-button"
              onClick={() => {
                setIsImageSelected(false);
                setSelectedImage(null);
              }}
            >
                <img src={arrown_icon} alt="close" style={{width: "24px", height:"24px"}}/>
            </button>
            <img src={selectedImage.url} alt="img" className="selected-image" />
          </div>
        )}
      </div>
      {/*분할 칸*/}
      <div
        className="community_divider"
        style={{ width: "0.03%", height: "95%", backgroundColor: "#8F7C7C66" }}
      ></div>
        {/* 댓글 칸 */}
      <div className="community_secondrow">
        {IsImageSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div className="selected-image-comment">
            <div className="selected-image-comment-header">
              <p style={{marginLeft: '5%',marginTop: '4%', fontSize: "20px"}} >사진 댓글</p>
              <button style={{marginLeft: '50%', border: "none", background: "none"}}><img src={heart_icon} alt="heart" style={{width: "24px", height:"24px",cursor: "pointer"}}/></button>
              <button style={{border: "none", background: "none"}}><img src={down_icon} alt="down" style={{width: "24px", height:"24px",cursor: "pointer"}}/></button>
            </div>
            <div className="selected-image-comment-body" style={{overflowY: "scroll", justifyContent: "flex-start", scrollbarWidth: "none",}}>
                {ImageComents.map((comment, index) => (
                    <div className="selected-image-comment-item" key={index} style={{boxShadow: "0px 2px 6px #0000001A", marginLeft: "5%", marginRight: "5%", marginTop: "2%", height:"auto",width:"90%",borderRadius:"0.7em"}}>
                    <p className="comment-content" style={{margin:"2% 5%", fontSize:"12px"}}>{comment.content}</p>
                    <p className="comment-info" style={{color: "#C0C0C0", marginLeft:"5%",marginBottom:"4%",marginTop:"0", fontSize:"8px"}}>{comment.created_at + " | " + comment.author}</p>
                    </div>
                ))}
            </div>
            <div className="selected-image-comment-input">
                <input type="text" placeholder="댓글 추가" />
                {/* <button>등록</button> */}
            </div>
          </div>
        )}
        {!IsImageSelected && ( // IsImageSelected가 false일 때만 렌더링
          <div>
            <div style={{display:"flex"}}><p style={{marginLeft: '5%',marginTop: '4%', fontSize: "20px"}}>나의 활동</p><button style={{border:"none", background:"none", marginLeft:"63%", cursor:"pointer"}}><img src={map_icon} alt="map_icon" style={{ width:"22px", height:"22px"}}/></button></div>
            <p style={{paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor :"#E9E5E5", height:"2em",borderRadius:"1em",marginBottom:"2%",fontSize:"14px"}}>내가 올린 사진</p>
            <p  style={{paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor :"#E9E5E5", height:"2em",borderRadius:"1em",marginBottom:"2%",fontSize:"14px"}}>댓글 단 사진</p>
            <p style={{paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor :"#E9E5E5", height:"2em",borderRadius:"1em",marginBottom:"2%",fontSize:"14px"}}>좋아요 한 사진</p>

          </div>
        )}
      </div>
    </div>
  );
}
