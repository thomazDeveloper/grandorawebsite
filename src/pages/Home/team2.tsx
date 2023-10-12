import { useState } from "react";
import Carousel from "react-multi-carousel";


import a1 from "../../assets/images/avatars/a1.png";
import a2 from "../../assets/images/avatars/a2.png";
import a3 from "../../assets/images/avatars/a3.png";
import a4 from "../../assets/images/avatars/a4.png";
import a5 from "../../assets/images/avatars/a5.png";
import a6 from "../../assets/images/avatars/a6.png";





import u1 from "../../assets/images/users/u1.jpg";
import u2 from "../../assets/images/users/u2.jpg";
import u3 from "../../assets/images/users/u3.jpg";
import u4 from "../../assets/images/users/u4.jpg";
import u5 from "../../assets/images/users/u5.jpg";
import u6 from "../../assets/images/users/u6.jpg";

import teamInfoImage from "../../assets/images/teams/teamInfo.png";
import teamInfoImagem from "../../assets/images/teams/teammobile.png";



import "react-multi-carousel/lib/styles.css";

const TeamDiv = () => {

  const imgList = [

  
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
    <div className=" md:mx-auto msm:mx-auto msm:mt-80p w-[100%] md:h-150">
     
      <div className="flex justify-center mobile-flex-wrap">
        <div className="mobile-hidden grid grid-cols-6 mr-10  msm:h-60 ">
          {
             
            imgList.map((item, index) => (
              
              <div key={index}>
              <img
                src={selectedImg.includes(index) ? item.user : item.avatar}
                key={index}
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
              <div key={index}>
              <img
                src={selectedImg.includes(index) ? item.user : item.avatar}
                key={index}
                alt=""
                className="w-full border border-4 border-white rounded-12 hover:border-seletiveyellow"
                onClick={() => {setSelectedImg(selectedImg.includes(index) ? selectedImg.filter((cell) => cell !== index) : [...selectedImg, index]);setTeamInfo({...teamInfo,img:item.user,name:item.name,position:item.position})}}
              />
              <p className="w-100 text-center font-Rajdhani sm:text-14 text-14">{item.name}</p>
              <p className="w-100 text-center font-Rajdhani sm:text-12 text-12">{item.position}</p>
              </div>
            ))}
          </Carousel>
        </div>
       
      </div>
    </div>
  );
};

export default TeamDiv;
