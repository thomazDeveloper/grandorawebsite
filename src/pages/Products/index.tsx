import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-multi-carousel";

import $ from 'jquery';
import { ProductSlides } from "../../core/data/product";
import "react-multi-carousel/lib/styles.css";

import "assets/css/marketplace.css";

// import { useMediaQuery } from 'react-responsive'
import { init_swiper } from "components/slider";

import StayTuned from "../Upcoming/StayTuned";
import ComingYellow from "../Upcoming/ComingYellow";
import image1 from "assets/images/sliders/1.jpg";
import image2 from "assets/images/sliders/2.jpg";
import image3 from "assets/images/sliders/3.jpg";


const slideImages: any = [
  image1,
  image2,
  image3,

];
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const Products = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const location = useLocation();
  useEffect(() => {
    init_swiper();
  }, [])

  useEffect(() => {
    let numberRand = Math.ceil(Math.random() * 100);
    setRandomNumber(numberRand);
  }, [location])

  // if (randomNumber > 0 && randomNumber < 30) {
  //   return <StayTuned />
  // } else if (randomNumber > 30 && randomNumber < 60) {
  //   return <ComingYellow />

  // } else {
  //   return <StayTuned />
  // }

  return (
    
    <div className="main-content">

    <div className="page-title">
      <div className="title-1">
      <p className="text-45 uppercase leading-50 tracking-3p font-Rajdhani pt-34p text-center text-texasRose">product</p>
      </div>
      <div className="title-2">
      <p className="text-16  font-Rajdhani leading-20 tracking-10 text-center">our product <span className="font-semibold">FROM GRANDORA</span></p>
      </div>
    </div> 
    <div className="market-slider">
      <div className="panorama-slider">
        <div className="swiper">
          <div className="swiper-wrapper">
            {
              slideImages.map((item: any, index: number) => {
                return (
                  <div className="swiper-slide"  key={index}>
                  <Link to="#">
                      <img className="slide-image"  src={item} alt="sliders" />
                    </Link>
                  </div>
                );
              })
            }
          </div>
          
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>

  </div>
  
  );
};
export default Products;

$(document).ready(function () {
  // $(".react-multi-carousel-item--active img").eq(2).css( "transform", "rotateY(-45deg)");
  // $(".react-multi-carousel-item--active img").eq(2).css( "transform", "rotateY(-45deg)");
});