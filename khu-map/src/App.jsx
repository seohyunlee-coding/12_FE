import React, { useState } from 'react'

import './styles/App.css'
import Map from './components/Map.jsx'
// 검색 아이콘 불러오기
import searchIcon from "./assets/search_icon.svg"

// 사이드바 라이브러리 react-pro-sidebar
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';

// router 라이브러리 react-router-dom
import { Link } from 'react-router-dom';
import Building from './components/building.jsx';
import placeholder_small from './assets/placeholder_small.jpg';

function App() {
  // 검색창 - usestate 설정
  const [inputValue, setInputValue] = useState(' ');
  // 길찾기 패널 - usestate 설정
  const [showDirections, setShowDirections] = useState(false);


  // 검색창 - 사용자가 입력한 값 받기
  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  // 검색창 - form 태그 입력시 자동 새로고침 방지
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${inputValue}`);
  }

  // 길찾기 패널 - 표시 여부
  const handleDirectionClick = () => {
    setShowDirections(!showDirections);
  }

  const markers = [
    { id: 1, name: "자대", x: 1000, y: 400 },
    { id: 2, name: "예대", x: 2000, y: 400 },
  ];

  return (
    <div style={{ position: "absolute", backgroundColor: "transparent", pointerEvents: "all" }}>
      <Map>
        {markers.map((marker) => (
        <Building
          src = {placeholder_small}
          x={marker.x}
          y={marker.y}
          name={marker.name}
        >
        </Building>
        ))}
      </Map>

      <div style={{ display: 'flex', position: 'absolute', top: '0', left: '0' }}>
        {/* 사이드바 */}
        <Sidebar
          backgroundColor='#ffffff'
          width='150px'
          collapsedWidth='50'
          rootStyles={{
            position: 'absolute',
            color: '#3d3d3d',
            height: '100vh',
            opacity: '0.9'
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

            <MenuItem> 길찾기 </MenuItem>
            <SubMenu label="주변시설">
              <MenuItem> 편의시설 </MenuItem>
              <MenuItem> 제휴시설 </MenuItem>
            </SubMenu>

            {/* 추후 라우터 설정 해주기 */}
            <MenuItem> 식당 </MenuItem>
            <MenuItem> 편의점 </MenuItem>
            <MenuItem> 버스정류장 </MenuItem>
            <MenuItem> 행사/이벤트 </MenuItem>
            <MenuItem> 커뮤니티 </MenuItem>
          </Menu>
        </Sidebar>

        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", width: "100vw", left: "150px", }}>
          <div style={{ height: "min-content" }}><h1>지도 검색창</h1></div>

          {/*검색창*/}
          <div className='search-form'>
            <form onSubmit={handleSubmit} className='search-container'>
              <input
                className="search-input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder={"검색하고 싶은 건물을 입력하세요"} />

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
