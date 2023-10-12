import { useEffect, useState } from "react";
import Nbutton from "../../components/Nbutton";
import axios from "axios";
import BlogItem from "./BlogItem";
import { BlogInfos } from "core/data/bloginfo";
import useFetch from "core/data/useFetch";
import BlogPopUpModal from "./Blogpopup";
import { BlogProps } from "../../core/interfaces/pages";
import { useLocation } from "react-router";
import StayTuned from "../Upcoming/StayTuned";
import ComingYellow from "../Upcoming/ComingYellow";
import useAuth from "hooks/useAuth";
import { useCookies } from "react-cookie";
const News = () => {
  const activeBtnStyle = 'mr-10 bg-texasRose text-white hover:bg-white hover:text-texasRose border-texasRose';
  const deactiveBtnStyle = 'mr-10 bg-desertStorm text-cloudygrey hover:bg-white hover:text-texasRose border-desertStorm';

  const [artbtn, setArtbtn] = useState(true);
  const [techbtn, setTechbtn] = useState(false);
  const [crypbtn, setCrypbtn] = useState(true);
  const [landbtn, setLandbtn] = useState(false);
  const filterClick = (type: string, current: boolean) => {
    switch (type) {
      case 'art':
        if (current)
          setArtbtn(false);
        else
          setArtbtn(true);
        break;
      case 'tech':
        if (current)
          setTechbtn(false);
        else
          setTechbtn(true);
        break;
      case 'crypto':
        if (current)
          setCrypbtn(false);
        else
          setCrypbtn(true);
        break;
      case 'land':
        if (current)
          setLandbtn(false);
        else
          setLandbtn(true);
        break;
    }
  }
  const [modalShow, setModalShow] = useState(false);
  const [blogInfos,setBlogInfo]=useState<BlogProps[]>([]);
  const [modalData, setModalData] = useState(blogInfos[0]);
  const showModal = (item: BlogProps) => {
    setModalShow(true);
    setModalData(item);
  }

  const [randomNumber, setRandomNumber] = useState(0);
  const location = useLocation();
  const { setUser } = useAuth()
  const [cookies,setCookie]=useCookies(['user']);
  const {data,loading,error}=useFetch("https://grandora.games/api/content-services/blog/read-all/10/1")
 useEffect(()=>{
  if(data){
   setBlogInfo(data)
  }

 },[blogInfos,data])
  useEffect(() => {

    let numberRand = Math.ceil(Math.random() * 100);
    setRandomNumber(numberRand);
    setBlogInfo(blogInfos)
    console.log(numberRand);
  }, [location])
 
  // if (randomNumber > 0 && randomNumber < 30) {
  //   return <StayTuned />
  // } else if (randomNumber > 30 && randomNumber < 60) {
  //   return <ComingYellow />

  // } else {
  //   return <StayTuned />
  // }
  return (
    <div className="mt-82 font-Rajdhani text-texasRose ">
      <div className="flex justify-center text-45 leading-50 tracking-3p"><span>NEWS</span></div>
      {/* <div className="px-15 md:px-0 my-18 primary:mx-121 lg:mx-81 sm:ms-61 flex flex-column md:rows overflow-auto">
        <span className="font-semibold mr-10p">CATEGORIES : </span>
        <div className="flex">
        <Nbutton class={artbtn ? activeBtnStyle : deactiveBtnStyle} onClick={() => filterClick("art", artbtn)}> #ART </Nbutton>
        <Nbutton class={techbtn ? activeBtnStyle : deactiveBtnStyle} onClick={() => filterClick("tech", techbtn)}> #technology </Nbutton>
        <Nbutton class={crypbtn ? activeBtnStyle : deactiveBtnStyle} onClick={() => filterClick("crypto", crypbtn)}> #crypto </Nbutton>
        <Nbutton class={landbtn ? activeBtnStyle : deactiveBtnStyle} onClick={() => filterClick("land", landbtn)}> #land </Nbutton>
        </div>
      </div> */}
      <div className="primary:mx-110 px-60 sm:ms-50  justify-center md:justify-start flex flex-wrap">
        {
          blogInfos.length > 0  && blogInfos.map((blog, index) => {
            return <div key={index} onClick={() => showModal(blog)}><BlogItem item={blog} key={index} index={index}></BlogItem></div>;
          })
        }
      </div>

      <BlogPopUpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={modalData}
      />
    </div>
  );
}

export default News;