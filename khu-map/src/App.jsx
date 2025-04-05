import React, { useState } from 'react'
import { useEffect } from 'react'; 
import './styles/App.css'
import Map from './components/Map.jsx'

import school_logo from "./assets/logo.png"
import award from "./assets/award.png"
import map from "./assets/map.png"
import talk from "./assets/talk.png"
import searchIcon from "./assets/search_icon.svg" // 검색 아이콘 불러오기
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar'; // 사이드바 라이브러리 react-pro-sidebar

import { Link } from 'react-router-dom'; // router 라이브러리 react-router-dom
import Building from './components/building.jsx';
import placeholder_small from './assets/placeholder_small.jpg';

function App() {
  const [inputValue, setInputValue] = useState(' ');  // 검색창 - usestate 설정
  const [showDirections, setShowDirections] = useState(false);   // 길찾기 패널 - usestate 설정
  const [start, setStart] = useState(''); //출발지 입력값
  const [end, setEnd] = useState('') //도착지 입력값

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

  //길찾기 패널 닫기 - 이벤트 리스너
  useEffect(()=> {
    const handleOutsideClick = (event) => {
      if(!document.getElementById('direction-panel')?.contains(event.target)){
        setShowDirections(false)
      }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);
   


  return (
    <div style={{ position: "absolute", backgroundColor: "transparent", pointerEvents: "all" }}>
     <Map>
        <Building src={placeholder_small} x={1000} y={400}></Building>
      </Map>

      <div style={{ display: 'flex', position: 'absolute', top: '0', left: '0'}}>
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
            zIndex:4
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
            <img src={school_logo} alt="경희대로고" style={{width: "56px", height:"42px", marginTop:"20px", marginLeft:"17px"}}/>
            </div>
            <div>
            <img src={map} style={{width: "24px", height:"24px", marginTop:"28px", marginLeft:"21px", marginBottom: "5px"}}/>
            </div>

            <MenuItem onClick={(e)=> {e.stopPropagation(); setShowDirections(true)}}> 길찾기 </MenuItem>
            <MenuItem> 주변시설 </MenuItem>
            <MenuItem> 제휴시설 </MenuItem>
            <MenuItem> 캠퍼스투어 </MenuItem>
            <MenuItem> 행사 </MenuItem>
            <hr style = {{width: "92px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>
            <img src={talk} style={{width: "22px", height:"22px", marginTop:"17px", marginLeft:"21px", marginBottom: "5px"}}/>
            <MenuItem> 커뮤니티 </MenuItem>
            <hr style = {{width: "92px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>
            <img src={award} style={{width: "26px", height:"26px", marginTop:"17px", marginLeft:"17px", marginBottom: "5px"}}/>
            <MenuItem> 도전과제 </MenuItem>
            <MenuItem> 장소 배지 </MenuItem>
          </Menu>

        </Sidebar>



        

        <div style={{ display: 'flex', flexDirection: 'row', position: "absolute", width: "100vw", left: "150px", zIndex: '2'}}>
                             
        
        {/* 길찾기 패널 */} 
          <div id='direction-panel'
            style={{ 
              position: 'absolute',
              top: 0,
              left: showDirections ? '-20px' : '-300px', // 패널이 보일 때 0px, 숨길 때 -300px
              width: '250px',
              height: '100vh',
              backgroundColor: 'white',
              transition: 'left 0.3s ease-in-out',
              padding: '20px',
              zIndex:3,
              boxShadow: '1px 0px 10px 1px rgb(174, 174, 174)',
              // 컨텐츠 정렬
              display: 'flex',
              flexDirection: 'column',

              }}
              onClick={(e) => e.stopPropagation()}
              >
              
              <div style={{padding:'20px'}}>
              <h2 style={{ 
                textAlign: 'left',
                marginTop: "-10px",
                marginBottom: "8px", 
                fontSize: "18px", 
                color: "#333", 
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '27px'  }}>길찾기</h2>

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
                  onChange={(e)=> setStart(e.target.value)}
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
              fontSize:'12px',
              backgroundColor: '#9E1815'
            }}

            >길찾기></button>

          <hr style = {{
            width: "225px", 
            marginTop: "10px",
            backgroundColor:"#8f7c7c",
            opacity: '0.2'
             }}></hr>

          <p style={{fontSize: '15px', fontWeight:'500', marginBottom:'5px'}}>예상 소요 시간</p>
          <p style={{fontSize:'10px', fontWeight:'400', color: '9D8C8C', marginTop:'0px'}}>*도보 측정 기준</p>

          <hr style = {{
            position:'absolute',
            width: "100%", 
            marginTop: "10px",
            backgroundColor:"#8f7c7c",
            opacity: '0.2'
             }}></hr>


             

          </div>
          </div>




          {/*검색창*/}
          <div className='search-form' style={{zIndex: 1, width: showDirections ? '300px' : '500px'}} > 
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
