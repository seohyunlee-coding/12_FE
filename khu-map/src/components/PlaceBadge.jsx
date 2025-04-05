import React from "react";
import "../styles/ChallengeBoard.css";
import Character from "../assets/3Dcharacter.png";
import A_Challenge_1 from "../assets/PlaceBadge/Group 88.png";
import A_Challenge_2 from "../assets/PlaceBadge/Group 89.png";
import A_Challenge_3 from "../assets/PlaceBadge/Group 90.png";
import A_Challenge_4 from "../assets/PlaceBadge/Group 91.png";
import B_Challenge_5 from "../assets/PlaceBadge/Group 92.png";
import B_Challenge_6 from "../assets/PlaceBadge/Group 93.png";
import B_Challenge_7 from "../assets/PlaceBadge/Group 94.png";
import B_Challenge_8 from "../assets/PlaceBadge/Group 95.png";
import B_Challenge_11 from "../assets/PlaceBadge/Group 96.png";
import B_Challenge_12 from "../assets/PlaceBadge/Group 97.png";
import B_Challenge_13 from "../assets/PlaceBadge/Group 98.png";
import B_Challenge_14 from "../assets/PlaceBadge/Group 99.png";               

export default function PlaceBadge() {
  return (
    <div className="challengeBoard_container">
        <div className="challengeBoard_firstrow">
            <img src={Character} alt="character" className="challengeBoard_character" />
             <div className="profile_container" style={{width: "386px", height: "177px",boxShadow: "0px 0px 30px #00000033",borderRadius: "20px",display:"flex", flexDirection:"column", justifyContent:"center",}}>        
                <div className="name" style={{display:"flex"}}><p style={{fontSize:"15", color:"#9E1815",width:"60px", margin:"10px 40px"}}>name</p><p style={{fontSize:"20px",display:"flex",alignItems:"center", margin:"0"}}>임유경</p></div>
                <div className="name" style={{display:"flex"}}><p style={{fontSize:"15", color:"#9E1815",width:"60px", margin:"10px 40px" }}>major</p><p style={{fontSize:"20px",display:"flex",alignItems:"center", margin:"0"}}>산업디자인학과</p></div>
                <div className="name" style={{display:"flex"}}><p style={{fontSize:"15", color:"#9E1815",width:"60px", margin:"10px 40px" }}>number</p><p style={{fontSize:"20px",display:"flex",alignItems:"center", margin:"0"}}>2022104592</p></div>
             </div>
        </div>
        <div
        className="challengeBoard_divider"
        style={{ width: "1px", height: "95%", backgroundColor: "#8F7C7C66" }}
      ></div>
        <div className="challengeBoard_secondrow" style={{overflowY: "scroll", scrollbarWidth:"none"}}>
        <p style={{fontSize:"30px",fontWeight:"700", marginLeft:"88px",marginTop:"37px"}}>획득한 장소 배지 </p>
        <div className="challengeBoard_achieved" style={{display:"flex", marginTop:"20px",width:"90%", marginLeft:"88px",flexWrap:"wrap", gap:"20px",}}>
           <img src={A_Challenge_1} alt="achieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
            <img src={A_Challenge_2} alt="achieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
            <img src={A_Challenge_3} alt="achieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
            <img src={A_Challenge_4} alt="achieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
        </div>
        <p style={{fontSize:"30px",fontWeight:"700", marginLeft:"88px",marginTop:"100px",}}>도전중인 장소 배지</p>
        <div className="challengeBoard_unachieved" style={{display:"flex", marginTop:"20px",width:"90%", marginLeft:"88px",flexWrap:"wrap", gap:"20px"}}>
          <img src={B_Challenge_5} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_6} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_7} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_8} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_11} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_12} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_13} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
          <img src={B_Challenge_14} alt="unachieved_challenge" className="challenge_image" style={{width:"223px", height:"272px",marginBottom:"20px"}}/>
        </div>
        </div>
    </div>
  );
}
