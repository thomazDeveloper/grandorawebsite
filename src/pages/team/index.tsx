import { useState } from "react";
import Carousel from "react-multi-carousel";
import afee from "../../assets/images/avatars/afee.png";
import agie from "../../assets/images/avatars/agie.png";
import aa from "../../assets/images/avatars/aa.png";
import athom from "../../assets/images/avatars/athom.png";
import amo from "../../assets/images/avatars/amo.png";
import aohm from "../../assets/images/avatars/aohm.png";
import azag from "../../assets/images/avatars/azag.png";
import ayim from "../../assets/images/avatars/ayim.png";

import a1 from "../../assets/images/avatars/a1.png";
import a2 from "../../assets/images/avatars/a2.png";
import a3 from "../../assets/images/avatars/a3.png";
import a4 from "../../assets/images/avatars/a4.png";
import a5 from "../../assets/images/avatars/a5.png";
import a6 from "../../assets/images/avatars/a6.png";
import a7 from "../../assets/images/avatars/a7.png";
import a8 from "../../assets/images/avatars/a8.png";
import a9 from "../../assets/images/avatars/a9.png";
import a10 from "../../assets/images/avatars/a10.png";
import a11 from "../../assets/images/avatars/a11.png";
import a12 from "../../assets/images/avatars/a12.png";
import a13 from "../../assets/images/avatars/a13.png";
import a14 from "../../assets/images/avatars/a14.png";
import a15 from "../../assets/images/avatars/a15.png";


import fee from "../../assets/images/users/fee.jpg";
import gie from "../../assets/images/users/gie.jpg";
import a from "../../assets/images/users/a.jpg";
import thom from "../../assets/images/users/thom.jpg";
import mo from "../../assets/images/users/mo.jpg";
import ohm from "../../assets/images/users/ohm.jpg";
import zag from "../../assets/images/users/zax.jpg";
import yim from "../../assets/images/users/yim.jpg";

import u1 from "../../assets/images/users/u1.jpg";
import u2 from "../../assets/images/users/u2.jpg";
import u3 from "../../assets/images/users/u3.jpg";
import u4 from "../../assets/images/users/u4.jpg";
import u5 from "../../assets/images/users/u5.jpg";
import u6 from "../../assets/images/users/u6.jpg";
import u7 from "../../assets/images/users/u7.jpg";
import u8 from "../../assets/images/users/u8.jpg";
import u9 from "../../assets/images/users/u9.jpg";
import u10 from "../../assets/images/users/u10.jpg";
import u11 from "../../assets/images/users/u11.jpg";
import u12 from "../../assets/images/users/u12.jpg";
import u13 from "../../assets/images/users/u13.jpg";
import u14 from "../../assets/images/users/u14.jpg";
import u15 from "../../assets/images/users/u15.jpg";

import teamInfoImage from "../../assets/images/teams/teamInfo.png";
import teamInfoImagem from "../../assets/images/teams/teammobile.png";



import "react-multi-carousel/lib/styles.css";

const TeamDiv = () => {

  const imgList = [
    {
      avatar: ayim,
      user: yim,
      name:"Tanat Juwiwat",
      position:"(CEO)"
    },
    {
      avatar: azag,
      user: zag,
      name:"Saroot Tubloy",
      position:"(COO)"
    },

    {
      avatar: aohm,
      user: ohm,
      name:"Kasarn Wichitrnithed",
      position:"(Business Development)"
    },

    {
      avatar: athom,
      user: thom,
      name:"Anusorn Tansun",
      position:'(Software Development Supervisor)'
    },

    {
      avatar: aa,
      user: a,
      name:"Nattapong Prachan",
      position:"(Lead Unity Developer)"
    },

    {
      avatar: amo,
      user: mo,
      name:"Patchara Tarakit",
      position:"(Game Designer)"
    },

    {
      avatar: agie,
      user:   gie,
      name:"Ronnakorn Yodjit",
      position:'(Technical artist)'
    },
    
    {
      avatar: afee,
      user: fee,
      name:"Nattapol Yodjit",
      position:'(Techart / Level Design)'

    },
  
    {
        avatar: a1,
        user: u1,
        name:"Nuttapon Kitthavorn",
        position:'(Lead Concept Artist)'
  
      },

      {
        avatar: a2,
        user: u2,
        name:"Varakorn Kamthita",
        position:'(Senior Concept Artist)'
  
      },

      {
        avatar: a3,
        user: u3,
        name:"Makkapashsapong Pattarapiyakun",
        position:'(Asset Artist)'
  
      },

      {
        avatar: a4,
        user: u4,
        name:"Koontida Luantanased",
        position:'(Asset Artist)'
  
      },

      {
        avatar: a5,
        user: u5,
        name:"Navaphat Senanarong",
        position:'(Research and Developer)'
  
      },

      {
        avatar: a6,
        user: u6,
        name:"Dutsadee Sukjaroen",
        position:'(Project Manager)'
  
      },

      {
        avatar: a7,
        user: u7,
        name:"Ajjima klumbmas",
        position:'(Co-project Manager)'
  
      },

      {
        avatar: a8,
        user: u8,
        name:"Yanisa Navaklao ",
        position:'(Co-project Manager)'
  
      },

      {
        avatar: a9,
        user: u9,
        name:"Supasin Rungsittikul",
        position:'(Software Engineer)'
  
      },

      {
        avatar: a10,
        user: u10,
        name:"Napasith Tangchitnob",
        position:'(Software Engineer)'
  
      },

      {
        avatar: a11,
        user: u11,
        name:"Rattanapol Joubjang",
        position:'(Unity Developer)'
  
      },

      {
        avatar: a12,
        user: u12,
        name:"Nathaphogn Thongkhamrod",
        position:'(Front-end Developer)'
  
      },

      {
        avatar: a13,
        user: u13,
        name:"NattapoAng Wangkhajornkij",
        position:'(Unity Developer)'
  
      },

      {
        avatar: a14,
        user: u14,
        name:"Wichayuth Luaengtawekul",
        position:'(Unity Developer)'
  
      },

      {
        avatar: a15,
        user: u15,
        name:"Somboon Tipbubpha",
        position:'(Technical Artist)'
  
      }

     

   
    
    
    
  ]

  const [selectedImg, setSelectedImg] = useState<Array<number>>([])
  const [teamInfo,setTeamInfo]=useState({img:teamInfoImage,name:"",position:"",description:""})

  const teamClass: string =
    "sm:w-174 w-59 ml-auto mr-auto border border-4 border-white rounded-12 hover:border-seletiveyellow";

  const responsive = {
    xtablet: {
      breakpoint: { max: 724, min: 0 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  return (
    <div className=" md:mx-auto msm:mx-auto msm:mt-80p w-[100%] md:h-550">
      <p className="sm:text-64 text-22 text-texasRose text-seletiveyellow font-bold font-Hanno text-center sm:text-left pb-10">
        TEAM
      </p>
      <div className="flex justify-center mobile-flex-wrap">
        <div className="mobile-hidden grid grid-cols-6 mr-10 md:h-372 msm:h-60 ">
          {
             
            imgList.map((item, index) => (
              
              <div key={index}>
              <img
                src={selectedImg.includes(index) ? item.user : item.avatar}
                key={item.avatar}
                alt=""
                className={`${teamClass} cursor-pointer`}
                onMouseOver={() => {setSelectedImg(selectedImg.includes(index) ? selectedImg : [...selectedImg, index]);setTeamInfo({...teamInfo,img:item.user,name:item.name,position:item.position});}}
                onMouseOut={() =>{setSelectedImg(selectedImg.includes(index) ? selectedImg.filter((cell) => cell !== index) : selectedImg);setTeamInfo({...teamInfo,img:teamInfoImage,name:"",position:""})}}
              />
              <p className="w-100 text-center font-Rajdhani sm:text-14 text-14">{item.name}</p>
              <p className="w-100 text-center font-Rajdhani sm:text-12 text-12">{item.position}</p>
             </div>
            ))
          }
        </div>
        <div className="w-100 mb-5 mobile-d-block team-carousel">
          <Carousel responsive={responsive} infinite autoPlay>
            {imgList.map((item, index) => (
              <>
              <img
                src={selectedImg.includes(index) ? item.user : item.avatar}
                key={item.avatar}
                alt=""
                className="w-full border border-4 border-white rounded-12 hover:border-seletiveyellow"
                onClick={() => {setSelectedImg(selectedImg.includes(index) ? selectedImg.filter((cell) => cell !== index) : [...selectedImg, index]);setTeamInfo({...teamInfo,img:item.user,name:item.name,position:item.position})}}
              />
              <p className="w-100 text-center font-Rajdhani sm:text-14 text-14">{item.name}</p>
              <p className="w-100 text-center font-Rajdhani sm:text-12 text-12">{item.position}</p>
              </>
            ))}
          </Carousel>
        </div>
       
      </div>
    </div>
  );
};

export default TeamDiv;
