import React, { useState } from "react";
import "../styles/Community.css";
import search_icon from "../assets/community_search.png";

const images = [
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/300" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/250" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/100/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/300" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/250" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/100/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/300" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/250" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/300/450" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/200" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/400" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/100/150" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/200/350" },
  { id: 1, building: "노천극장", url: "https://picsum.photos/ style={marginLeft: '5%'}200/400" },
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
        <div className="community-search-bar">
          <input
            type="text"
            placeholder="건물/사진 검색"
            className="community-search-input"
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
              X
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
      <div className="community_secondrow">
        {IsImageSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div className="selected-image-comment">
            <div className="selected-image-comment-header">
              <p>사진 댓글</p>
              <button>하트</button>
              <button>다운</button>
            </div>
            <div className="selected-image-comment-body">
              <p>댓글 내용</p>
            </div>
            <div className="selected-image-comment-input">
              <input type="text" placeholder="댓글 추가" />
              <button>등록</button>
            </div>
          </div>
        )}
        {!IsImageSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div>
            <h2 style={{ marginLeft: '5%', marginTop: '2%' }}>나의 활동</h2>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "2em", borderRadius: "1em", }}>내가 올린 사진</p>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "2em", borderRadius: "1em", }}>댓글 단 사진</p>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "2em", borderRadius: "1em", }}>좋아요 한 사진</p>

          </div>
        )}
      </div>
    </div>
  );
}
