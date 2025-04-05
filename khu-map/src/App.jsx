import React, { useState, useEffect, useCallback, useRef } from 'react'
import './styles/ui.css'
import Map from './components/Map.jsx'
import Tips from './components/Tips.jsx'
import TipsLayout from './components/TipsLayout.jsx'

import school_logo from "./assets/logo.png"
import award from "./assets/award.png"
import map from "./assets/map.png"
import talk from "./assets/talk.png"
import searchIcon from "./assets/search_icon.svg" // 검색 아이콘 불러오기

//제휴시설
import sunfrancisco from "./assets/sunfrancisco.jpg"
import pcroom from "./assets/isense_pc.jpg"
import gukbab from "./assets/gukbab.jpg"
import amasbin from "./assets/amasbin.jpg"
import cafe_Ara from "./assets/cafe_Ara.jpg"
import coin_karaoke from "./assets/coin_karaoke.jpg"   


//캠퍼스 투어
import clock from "./assets/clock.svg"
import walk from "./assets/walk.svg" 
import library from "./assets/library.jpg"
import flower from "./assets/flower.jpg"
import flower2 from "./assets/flower2.jpg"
import night from "./assets/night.jpg"
import semothon from "./assets/semothon.jpg"
import square from "./assets/square.jpg"

//모달
import x from "./assets/x.svg"
import woojungwon from "./assets/woojungwon.png"
import student from "./assets/student.png"
import twosome from "./assets/twosome.png"
import compose from "./assets/compose.jpg"
import emart24 from "./assets/emart24.png"
import gs25 from "./assets/gs25.jpg"




import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar'; // 사이드바 라이브러리 react-pro-sidebar

import { Link } from 'react-router-dom'; // router 라이브러리 react-router-dom

import Building from './components/Building.jsx';

import { fetchBuildingList, fetchTips, getAutocomplete } from './hooks/Map/fetchFunctions.js'
import TipCarousel from './components/TipCarousel.jsx'
import ChallengeBoard from './components/ChallengBoard.jsx'
import PlaceBadge from './components/PlaceBadge.jsx'

import { assetPos, assetBasePath } from "./constants/assets.js"

function App() {
  const [inputValue, setInputValue] = useState(' ');  // 검색창 - usestate 설정
  const [activePanel, setActivePanel] = useState(null);   // 길찾기 패널 - usestate 설정

  const [start, setStart] = useState(''); //출발지 입력값

  const [end, setEnd] = useState('') //도착지 입력값 

  const [buildingArr, setBuildingArr] = useState([]);
  const [tipArr, setTipArr] = useState([]);

  const [selectedBuildingIdx, setSelectedBuildingIdx] = useState(null); // 선택된 건물 인덱스

  const getInitData = useCallback(async () => {
    fetchBuildingList().then(data => setBuildingArr(data)).catch((error) => {
      console.error("Error fetching building list:", error);
    });
    console.log(buildingArr)

    fetchTips().then(data => setTipArr(data)).catch((error) => {
      console.error("Error fetching tips:", error);
    })
  }, [])

  useEffect(() => {
    getInitData();
    console.log(assetPos)
    console.log(buildingArr[0])
  }, [])

  const getBuildingTip = (buildingID) => {
    if (!buildingID) throw new Error("Building ID Expected.");

    fetchTips(buildingID)
      .then(data => setTipArr(data))
      .catch((error) => {
        console.error("Error fetching building tips:", error);
      });
  }

  // 검색창 - 사용자가 입력한 값 받기
  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value);
    getAutocomplete(event.target.value).then(data => {
      console.log("Autocomplete data:", data);
    }).catch((error) => {
      console.error("Error fetching autocomplete data:", error);
    });
  }

  // 검색창 - form 태그 입력시 자동 새로고침 방지
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${inputValue}`);
  }

  //모달1 정보
  const facilityInfo = {
    식당: {
      items: [
        { title: '학생회관 식당',
          image: student
        },
        { title: '제2기숙사 식당',
          image: woojungwon
        }
      ]
    },
    카페: {
      items: [
        { title: '투썸플레이스 경희국제점',
          image: twosome
        },
        { title: '컴포즈 경희국제기숙사점',
          image: compose
        }
      ]
    },
    편의점: {
      items: [
        { title: 'GS25 경희대우정원점',
          image: gs25
        },
        { title: '이마트24 경희국제점',
          image: emart24
        }
      ]
    },
  };


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
            <div style={{padding:'20px'}}>
              <h2 style={{ 
                textAlign: 'left',
                marginTop: "-10px",
                marginBottom: "8px", 
                fontSize: "18px", 
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '27px'  }}>주변시설</h2>

              <p onClick={()=>setActiveModal('식당')} style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'24px', cursor: 'pointer'}}>식당</p>
              <p onClick={()=>setActiveModal('카페')} style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>카페</p>
              <p onClick={()=>setActiveModal('편의점')} style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>편의점</p>
              <p style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>흡연장</p>
              <p style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>장애인시설</p>
              <p style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>긴급제동장치</p>
              <p  style={{fontSize:'17px', fontWeight:'400', color: '000000', marginTop:'5px', cursor: 'pointer'}}>버스정류장</p>

          </div>
          </>
        );


      //제휴시설
      //나중에 컴포넌트 처리할 것...!
      case 'partner':
        return (
            <>
            <div style={{padding:'20px', paddingRight: '0px'}}>
              <h2 style={{ 
                textAlign: 'left',
                marginTop: "-10px",
                fontSize: "18px", 
                color: "#333", 
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '27px'  }}>제휴시설</h2>
              <p style={{color:'#8f7c7c', fontWeight: '400', fontSize: '13px', marginTop:'-10px'}}>할인 및 서비스를 제공하는 시설들</p>

              {/* 썬프란시스코마켓 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>썬프란시스코마켓</p>            
              </div>
              <img src={sunfrancisco} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 매영로425번길 18 1층</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 결제금의 10% 할인
              </p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

              {/* 카페 아라 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>카페 아라</p>            
              </div>
              <img src={cafe_Ara} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 청명로 21번길 19 1층</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 결제 금액 10% 적립</p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

              {/* 아이센스리그pc방 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>아이센스리그pc방</p>            
              </div>
              <img src={pcroom} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 덕영대로 1707 3층</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 인당 1회 4시간 서비스</p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>


              {/* 방울엄마국밥*/}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>방울엄마국밥</p>            
              </div>
              <img src={gukbab} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover', objectPosition:'0% 17%'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 영일로 6번길 54 1층</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 공기밥 및 음료수 제공</p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

              {/* 아마스빈 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>아마스빈</p>              </div>
              <img src={amasbin} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover', objectPosition:'15% 32%'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 덕영대로 1699 영통빌딩 1층</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 펄 추가 무료</p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>
              
              {/* 복면가황코인노래방 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>복면가황코인노래방</p>            
              </div>
              <img src={coin_karaoke} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>위치: 영통구 영통동 1022-5</p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>제휴 내용: 계좌 이체 결제 시 할인 혜택</p>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>


              </div>      
          </>
        );


      //캠퍼스 투어
      case 'tour':
        return (
          <>
            <div style={{padding:'20px', paddingRight: '0px'}}>
              <h2 style={{ 
                textAlign: 'left',
                marginTop: "-10px",
                marginBottom: "8px", 
                fontSize: "18px", 
                color: "#333", 
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '27px'  }}>캠퍼스 투어</h2>

              {/* 후마니타스 코스 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>후마니타스 산책</p>
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>도서관-멀관</p>              
              </div>
              <img src={library} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <div style={{display: 'flex', gap:'7px', alignItems: 'center'}}>
                <img src={clock} />
                <p style={{fontSize:'14px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>16m</p>
                <img src={walk} />
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>807m</p>
                <button
                  style={{
                    width: "75px",
                    height: "28px",
                    border: "none",
                    borderRadius: "13.5px",
                    outline: "none",
                    color: "white",
                    fontSize:'12px',
                    backgroundColor: '#9E1815',
                    marginLeft:'auto'
                  }}
                  >투어 시작</button>
              </div>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

              {/*벚꽃 코스*/}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>벚꽃 산책</p>
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>전정대-선승관</p>              
              </div>
              <img src={flower2} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', marginBottom:'7px', objectFit: 'cover', objectPosition: '40% 25%'}} />
              <img src={flower} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover', objectPosition: '40% 45%'}} />
              <div style={{display: 'flex', gap:'7px', alignItems: 'center'}}>
                <img src={clock} />
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>9m</p>
                <img src={walk} />
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>550m</p>
                <button
                  style={{
                    width: "75px",
                    height: "28px",
                    border: "none",
                    borderRadius: "13.5px",
                    outline: "none",
                    color: "white",
                    fontSize:'12px',
                    backgroundColor: '#9E1815',
                    marginLeft:'auto'
                  }}
                  >투어 시작</button>
              </div>
              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>


              {/* 야간 산책 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>야간 산책</p>
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>정문-노천극장</p>              
              </div>

              <img src={night} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover', objectPosition: '40% 0%'}} />

              <div style={{display: 'flex', gap:'7px', alignItems: 'center'}}>
                <img src={clock} />
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>24m</p>
                <img src={walk} />
                <p style={{fontSize:'15px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>1.5km</p>
                <button
                  style={{
                    width: "75px",
                    height: "28px",
                    border: "none",
                    borderRadius: "13.5px",
                    outline: "none",
                    color: "white",
                    fontSize:'12px',
                    backgroundColor: '#9E1815',
                    marginLeft:'auto'
                  }}
                  >투어 시작</button>
              </div>
            </div>
          </>
        );


      // 행사/공지
      case 'event':
        return (
          <>
            <div style={{padding:'20px', paddingRight: '0px'}}>
              <h2 style={{ 
                textAlign: 'left',
                marginTop: "-10px",
                fontSize: "18px", 
                color: "#333", 
                fontWeight: '700',
                fontSize: '18px',
                lineHeight: '27px'  }}>행사/공지</h2>
              <p style={{color:'#8f7c7c', fontWeight: '400', fontSize: '13px', marginTop:'-10px'}}>예정된 행사와 공지</p>

              {/* 세모톤 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>세모톤</p>
                <p style={{fontSize:'14px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>세가지 단과대가 모인 해커톤</p>              
              </div>
              <img src={semothon} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>날짜: 2025.04.05 ~ 2025.04.05 </p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>장소: 중앙도서관 피스홀</p>

              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

              {/* 사색의 광장 공사 */}
              <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>사색의 광장 공사</p>
                <p style={{fontSize:'14px', fontWeight:'400', color: '8F7C7C',opacity: '0.5'}}>진행중</p>              
              </div>
              <img src={square} style={{width: '232px' , height: '140px', borderRadius: '20px', marginTop: '0px', objectFit: 'cover'}} />
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', margin:'0px', marginTop:'2px'}}>공사기간: 2025.04. ~ 2025.05 </p>
              <p style={{fontSize:'12px', fontWeight:'400', color: '8F7C7C',opacity: '0.5', marginTop:'0px'}}>장소: 국제캠퍼스 사색의 광장</p>

              <hr style = {{width: "232px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>
              </div>      
          </>
        );
      // case 'community':
      //   return (
         
      //   );
      // case 'challenge':
      //   return (
      //     <>
      //       <p>미션 수행 관련 내용</p>
      //     </>
      //   );
      // case 'badge':
      //   return (
      //     <>
      //       <p>방문한 장소 기록입니다.</p>
      //     </>
      //   );
      default:
        return null;
    }
  };


  return (
    <div style={{ position: "absolute", backgroundColor: "transparent", width: "100vw", pointerEvents: "all" }}>
      {isbadgeopen && (<PlaceBadge/>)}
      {ischallengeopen && (<ChallengeBoard/>)}
      {iscommunityopen && (<Community/>)}
      <Map>
        {buildingArr.map((building, idx) => (
          <Building
            key={idx}
            src={new URL(`${assetBasePath}${building.name}.png`, import.meta.url).href}
            x={assetPos[Number(building.id) - 1].x}
            y={assetPos[Number(building.id) - 1].y}
            zindex={assetPos[Number(building.id) - 1].z}
            buildingName={building.name.replaceAll("-", " ")}
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

            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('direction'); setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(false) }}> 길찾기 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('around'); setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(false)}}> 주변시설 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('partner'); setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(false)}}> 제휴시설 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('tour') ;setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(false)}}>캠퍼스투어</MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setActivePanel('event') ;setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(false)}}> 행사 </MenuItem>
            <hr style={{ width: "92px", backgroundColor: "#8f7c7c", marginRight: "35px", opacity: '0.4' }}></hr>
            <img src={talk} style={{ width: "22px", height: "22px", marginTop: "17px", marginLeft: "21px", marginBottom: "5px" }} />
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsChallengeOpen(false) ;setIsCommunityOpen(true); setIsBadgeOpen(false) }}> 커뮤니티 </MenuItem>
            <hr style={{ width: "92px", backgroundColor: "#8f7c7c", marginRight: "35px", opacity: '0.4' }}></hr>
            <img src={award} style={{ width: "26px", height: "26px", marginTop: "17px", marginLeft: "17px", marginBottom: "5px" }} />
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsChallengeOpen(true) ;setIsCommunityOpen(false); setIsBadgeOpen(false) }}> 도전과제 </MenuItem>
            <MenuItem onClick={(e) => { e.stopPropagation(); setIsChallengeOpen(false) ;setIsCommunityOpen(false); setIsBadgeOpen(true) }}> 장소 배지 </MenuItem>
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
              overflow: 'auto' //스크롤바

            }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderPanel()}
          </div>


          {/* 모달 창 */}
          {activeModal && (
            <div className="modal-overlay" style={{
              position: 'absolute',
              width: '250px',
              height: '600px',
              zIndex: 10,
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '1px 0px 10px 1px rgb(174, 174, 174)',
              top:'50%',
              display: 'flex',
              marginLeft: '300px',
              overflow: 'hidden',

            }}>
              <div className="modal-content" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',  textAlign: 'left', padding: '13px'}}>
                <img src={x} onClick={() => setActiveModal(null)} style={{position: 'absolute', top: '0', right: '0', padding: '10px', width: '15px', height: '15px'}}/>
                <p style={{color:'#8f7c7c', fontWeight: '400', fontSize: '15px', marginTop: '3px'}}>시설</p>
                {/* 창1 */}
                <div>
                <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-18px',marginBottom:'-7px'}}>
                  <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>{facilityInfo[activeModal].items[0].title}</p>            
                </div>
                <img src={facilityInfo[activeModal].items[0].image} style={{width: '220px' , height: '130px', borderRadius: '20px', marginTop: '-3px', objectFit: 'cover'}} />
                <hr style = {{width: "220px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>

                {/* 창2 */}
                <div style={{display: 'flex', gap:'7px', alignItems: 'baseline', marginTop:'-2px',marginBottom:'-7px'}}>
                  <p style={{fontSize:'17px', fontWeight:'400', color: '000000'}}>{facilityInfo[activeModal].items[1].title}</p>            
                </div>
                <img src={facilityInfo[activeModal].items[1].image} style={{width: '220px' , height: '130px', borderRadius: '20px', marginTop: '-3px', objectFit: 'cover'}} />
                <hr style = {{width: "220px", backgroundColor:"#8f7c7c", marginRight:"35px", opacity: '0.4'}}></hr>
                </div>   
            </div>
            
          </div>
)}


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