import React, { useEffect, useState } from "react";
import "../styles/Community.css";
import search_icon from "../assets/community_search.png";
import heart_icon from "../assets/heart.png";
import down_icon from "../assets/download.png";
import arrown_icon from "../assets/arrow-left.png";
import map_icon from "../assets/map-icon.png";

import { fetchCommunityPosts } from "../hooks/Map/fetchFunctions";

const distributePosts = (posts, numGroups) => {
  console.log(posts);
  const result = Array.from({ length: numGroups }, () => []); // numGroups 개의 빈 배열 생성
  console.log(result);
  posts.forEach((image, index) => {
    result[index % numGroups].push(image); // 순차적으로 분배
  });
  return result;
};

export default function Community() {
  const [posts, setPosts] = useState([]); // 이미지 배열
  const [comments, setComments] = useState([]); // 댓글 배열

  const [isPostSelected, setIsPostSelected] = useState(false); // 이미지 선택 여부
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 이미지


  useEffect(() => {
    fetchCommunityPosts()
      .then((data) => {
        console.log("Fetched community posts:", data);
        setPosts(distributePosts(data, 4)); // 서버에서 가져온 이미지로 상태 업데이트
      })
      .catch((error) => {
        console.error("Error fetching community posts:", error);
      });
  }, []);

  useEffect(() => {
    fetchCommunityPosts(selectedPost?.id)
      .then((data) => {
        console.log("Fetched image comments:", data);
        setComments(data); // 서버에서 가져온 댓글로 상태 업데이트
      })
      .catch((error) => {
        console.error("Error fetching image comments:", error);
      });
  }, [selectedPost?.id]); // selectedPost가 변경될 때마다 댓글을 가져옴


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
        {!isPostSelected && (
          <div className="image-container">
            {posts.map((chunk, index) => (
              <div className="image-container-sub" key={index}>
                {chunk.map((src) => (
                  <div
                    className="grid-item"
                    key={src.id}
                    onClick={() => {
                      setSelectedPost(src);
                      setIsPostSelected(true);
                    }}
                  >
                    <img src={src.images.length > 0 ? "http://localhost:5000" + src.images[0] : ""} alt={`img-${src.id}`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {isPostSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div className="selected-image-container">
            <button
              className="close-button"
              onClick={() => {
                setIsPostSelected(false);
                setSelectedPost(null);
              }}
            >
              <img src={arrown_icon} alt="close" style={{ width: "50px", height: "50px" }} />
            </button>
            <img src={"http://localhost:5000" + selectedPost.images[0]} alt="img" className="selected-image" />
          </div>
        )}
      </div>
      {/*분할 칸*/}
      <div
        className="community_divider"
        style={{ width: "1px", height: "95%", backgroundColor: "#8F7C7C66" }}
      ></div>
      {/* 댓글 칸 */}
      <div className="community_secondrow">
        {isPostSelected && ( // IsImageSelected가 true일 때만 렌더링
          <div className="selected-image-comment">
            <div className="selected-image-comment-header">
              <p style={{ marginLeft: '5%', marginTop: '4%', fontSize: "30px" }} >사진 댓글</p>
              <button style={{ marginLeft: '60%', border: "none", background: "none" }}><img src={heart_icon} alt="heart" style={{ width: "36px", height: "36px", cursor: "pointer" }} /></button>
              <button style={{ border: "none", background: "none" }}><img src={down_icon} alt="down" style={{ width: "36px", height: "36px", cursor: "pointer" }} /></button>
            </div>
            <div className="selected-image-comment-body" style={{ overflowY: "scroll", justifyContent: "flex-start", scrollbarWidth: "none", }}>
              {comments.map((comment, index) => (
                <div className="selected-image-comment-item" key={index} style={{ boxShadow: "0px 4px 20px #0000001A", marginLeft: "5%", marginRight: "5%", marginTop: "2%", height: "auto", width: "90%", borderRadius: "20px" }}>
                  <p className="comment-content" style={{ margin: "2% 5%", fontSize: "20px" }}>{comment.content}</p>
                  <p className="comment-info" style={{ color: "#C0C0C0", marginLeft: "5%", marginBottom: "4%", marginTop: "0", fontSize: "15px" }}>{comment.created_at + " | " + comment.author}</p>
                </div>
              ))}
            </div>
            <div className="selected-image-comment-input">

              <input type="text" placeholder="댓글 추가" />
              {/* <button>등록</button> */}

            </div>
          </div>
        )}
        {!isPostSelected && ( // IsImageSelected가 false일 때만 렌더링
          <div>

            <div style={{ display: "flex" }}>
              <p style={{ marginLeft: '5%', marginTop: '4%', fontSize: "30px" }}>
                나의 활동
              </p>
              <button style={{ border: "none", background: "none", marginLeft: "70%", cursor: "pointer" }}>
                <img src={map_icon} alt="map_icon" style={{ width: "36px", height: "36px" }} />
              </button>
            </div>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "60px", borderRadius: "30px", marginBottom: "2%", fontSize: "20px", alignItems: "center", display: "flex", }}>
              내가 올린 사진
            </p>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "60px", borderRadius: "30px", marginBottom: "2%", fontSize: "20px", alignItems: "center", display: "flex" }}>
              댓글 단 사진
            </p>
            <p style={{ paddingLeft: '5%', marginLeft: '5%', marginRight: '5%', marginTop: '2%', backgroundColor: "#E9E5E5", height: "60px", borderRadius: "30px", marginBottom: "2%", fontSize: "20px", alignItems: "center", display: "flex" }}>
              좋아요 한 사진
            </p>


          </div>
        )}
      </div>
    </div>
  );
}
