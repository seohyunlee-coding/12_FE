import React, { useState, useEffect, useCallback, useRef } from 'react'
import './styles/App.css'
import Map from './components/Map.jsx'
import Tips from './components/Tips.jsx'
import TipsLayout from './components/TipsLayout.jsx'

import school_logo from "./assets/logo.png"
import award from "./assets/award.png"
import map from "./assets/map.png"
import talk from "./assets/talk.png"
import searchIcon from "./assets/search_icon.svg" // 검색 아이콘 불러오기
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar'; // 사이드바 라이브러리 react-pro-sidebar

import { Link } from 'react-router-dom'; // router 라이브러리 react-router-dom

import { buildingCordinates } from './constants/constants.js'
import Building from './components/Building.jsx';
import placeholder_small from './assets/placeholder_small.jpg';
import Community from './components/Community.jsx';

import { fetchBuildingList, fetchTips, fetchRoadList } from './hooks/Map/fetchFunctions.js'
import TipCarousel from './components/TipCarousel.jsx'

function App() {
  const [inputValue, setInputValue] = useState(' ');  // 검색창 - usestate 설정
  const [activePanel, setActivePanel] = useState(null);   // 길찾기 패널 - usestate 설정
  const [start, setStart] = useState(''); //출발지 입력값
  const [end, setEnd] = useState('') //도착지 입력값  const [buildingArr, setBuildingArr] = useState([{ "x": 0, "y": 0, "name": "공학관", "src": placeholder_small }]);
  const [roadArr, setRoadArr] = useState([{ "x": 0, "y": 0, "status": "0", "src": placeholder_small }]);
  const [tipArr, setTipArr] = useState([{ content: "A" }, { content: "B" }, { content: "C" }]);
  const [iscommunityopen, setIsCommunityOpen] = useState(false); // 커뮤니티 패널 열기
  const getData = useCallback(async () => {
    setBuildingArr(
      await fetchBuildingList().catch((error) => {
        console.error("Error fetching building list:", error);
      }));
    setTipArr(
      await fetchTips().catch((error) => {
        console.error("Error fetching tips:", error);
      }));
    setRoadArr(
      await fetchRoadList().catch((error) => {
        console.error("Error fetching road list:", error);
      }));
  }, [])

  useEffect(() => {
    getData();
  })

  // 검색창 - 사용자가 입력한 값 받기
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  // 검색창 - form 태그 입력시 자동 새로고침 방지
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${inputValue}`);
  }

  //패널 닫기 - 이벤트 리스너
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!document.getElementById('direction-panel')?.contains(event.target)) {
        setActivePanel(null)
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  //패널 내용 렌더링
  const renderPanel = () => {
    switch (activePanel) {

      //direction 패널
      case 'direction':
        return (
          <>
            <div style={{ padding: '20px' }}>
              <h2 style={{
                textAlign: 'left',
                marginTop: "-10px",
                marginBottom: "8px",
                fontSize: "18px",
                color: "#333",
                fontWeight: '700',
                lineHeight: '27px'
              }}>길찾기</h2>

              <div style={{ width: "100%", marginBottom: "2px" }}>

                <input
                  type="text"
                  style={{
                    width: "215px",
                    height: "18px",
                    padding: "8px",
                    borderRadius: "15px",
                    border: "none",
                    outline: "none",
                    marginTop: "4px",
                    backgroundColor: '#EAEAEA'
                  }}
                  onChange={(e) => setStart(e.target.value)}
                  placeholder="출발지 입력"
                />
              </div>

              <div style={{ width: "100%", marginBottom: "10px" }}>
                <input
                  type="text"
                  style={{
                    width: "215px",
                    height: "18px",
                    padding: "8px",
                    borderRadius: "15px",
                    border: "none",
                    outline: "none",
                    marginTop: "4px",
                    backgroundColor: '#EAEAEA'
                  }}
                  onChange={(e) => setEnd(e.target.value)}
                  placeholder="도착지 입력"
                />
              </div>
              {/* 나중에 길찾기 로직 구현후 수정 */}
              <button
                style={{
                  width: "75px",
                  height: "28px",
                  border: "none",
                  borderRadius: "13.5px",
                  outline: "none",
                  color: "white",
                  fontSize: '12px',
                  backgroundColor: '#9E1815'
                }}

              >길찾기 &gt;</button>

              <hr style={{
                width: "225px",
                marginTop: "10px",
                backgroundColor: "#8f7c7c",
                opacity: '0.2'
              }}></hr>

              <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '5px' }}>예상 소요 시간</p>
              <p style={{ fontSize: '10px', fontWeight: '400', color: '9D8C8C', marginTop: '0px' }}>*도보 측정 기준</p>

              <hr style={{
                position: 'absolute',
                width: "100%",
                marginTop: "10px",
                backgroundColor: "#8f7c7c",
                opacity: '0.2'
              }}></hr>
            </div>
          </>
        );

      // 주변시설 패널  
      case 'around':
        return (
          <>
            <p>근처 카페, 식당, ATM 등을 표시합니다.</p>
          </>
        );
      case 'partner':
        return (
          <>
            <p>제휴된 장소 정보입니다.</p>
          </>
        );
      case 'tour':
        return (
          <>
            <p>추천 루트와 포인트 안내</p>
          </>
        );
      case 'event':
        return (
          <>
            <p>캠퍼스 내 행사 정보</p>
          </>
        );
      // case 'community':
      //   return (
         
      //   );
      case 'challenge':
        return (
          <>
            <p>미션 수행 관련 내용</p>
          </>
        );
      case 'badge':
        return (
          <>
            <p>방문한 장소 기록입니다.</p>
          </>
        );
      default:
        return null;
    }
  };


  const markers = [
    { id: 1, name: "자대", x: 1000, y: 400 },
    { id: 2, name: "예대", x: 2000, y: 400 },
  ];

  return (
    <div style={{ position: "absolute", backgroundColor: "transparent", width: "100vw", pointerEvents: "all" }}>
      {iscommunityopen && (<Community/>)}
      <Map>
        {markers.map((marker) => (
          <Building
            src={placeholder_small}
            x={marker.x}
            y={marker.y}
            name={marker.name}
            isBuilding={true}
          >
          </Building>
        ))}
      </Map>

      <TipsLayout>
        <TipCarousel tipObjects={tipArr}></TipCarousel>
        <Tips />
      </TipsLayout>
      <div style={{ display: 'flex', position: 'absolute', top: '0', left: '0', userSelect: 'none' }}>
        {/* 사이드바 */}
        <Sidebar
          backgroundColor='#ffffff'
          width='149px'
          collapsedWidth='50'
          rootStyles={{
            position: 'absolute',
            color: '#3d3d3d',
            height: '100vh',
            borderRadius: '0 15px 15px 0',
            overflow: 'hidden',
            boxShadow: '1px 0px 10px 1px rgb(174, 174, 174)',
            zIndex: 4
          }}
        >
          <Menu
            menuItemStyles={{
              button: {
                [`&.active`]: {
                  backgroundColor: '#13395e',
                  color: '#b6c8d9',
                },
              },
            }}
          >
            <div>
              <img src={school_logo} alt="경희대로고" style={{ width: "56px", height: "42px", marginTop: "20px", marginLeft: "17px" }} />
            </div>
            <div>
              <img src={map} style={{ width: "24px", height: "24px", marginTop: "28px", marginLeft: "21px", marginBottom: "5px" }} />
            </div>

            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('direction'); setIsCommunityOpen(false) }}> 길찾기 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('around'); setIsCommunityOpen(false)}}> 주변시설 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('partner'); setIsCommunityOpen(false)}}> 제휴시설 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('tour') ;setIsCommunityOpen(false)}}>캠퍼스투어</MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('event') ;setIsCommunityOpen(false)}}> 행사 </MenuItem>
            <hr style={{ width: "92px", backgroundColor: "#8f7c7c", marginRight: "35px", opacity: '0.4' }}></hr>
            <img src={talk} style={{ width: "22px", height: "22px", marginTop: "17px", marginLeft: "21px", marginBottom: "5px" }} />
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsCommunityOpen(true) }}> 커뮤니티 </MenuItem>
            <hr style={{ width: "92px", backgroundColor: "#8f7c7c", marginRight: "35px", opacity: '0.4' }}></hr>
            <img src={award} style={{ width: "26px", height: "26px", marginTop: "17px", marginLeft: "17px", marginBottom: "5px" }} />
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('challenge');setIsCommunityOpen(false) }}> 도전과제 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('badge');setIsCommunityOpen(false) }}> 장소 배지 </MenuItem>
          </Menu>

        </Sidebar>

        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", width: "100vw", left: "150px", zIndex: '2' }}>
          {/*공통 패널 */}
          <div id='direction-panel'
            style={{
              position: 'absolute',
              top: 0,
              left: activePanel ? '-20px' : '-300px', // 패널이 보일 때 0px, 숨길 때 -300px
              width: '250px',
              height: '100vh',
              backgroundColor: 'white',
              transition: 'left 0.3s ease-in-out',
              padding: '20px',
              zIndex: 3,
              boxShadow: '1px 0px 10px 1px rgb(174, 174, 174)',
              // 컨텐츠 정렬
              display: 'flex',
              flexDirection: 'column',

            }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderPanel()}
          </div>


          {/*검색창*/}
          <div className='search-form' style={{ zIndex: 1, width: activePanel ? '300px' : '500px' }} >
            <form onSubmit={handleSubmit} className='search-container'>
              <input
                className="search-input"
                type="text"
                onChange={handleChange}
                placeholder={"건물 / 강의실 검색"} />

              <button type="submit" className="search-button">
                <img src={searchIcon} alt="검색이미지" className="search-icon" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div >
  )
}

export default App