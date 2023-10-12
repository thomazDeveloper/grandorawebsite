import { useEffect } from "react";
import { Link } from "react-router-dom";

import "assets/css/marketplace.css";

// import { useMediaQuery } from 'react-responsive'
import { init_swiper } from "components/slider";

// import image1 from "../../assets/images/marketplace/slide1.png";
// import image2 from "../../assets/images/marketplace/slide2.png";
// import image3 from "../../assets/images/marketplace/slide3.png";

import image1 from "assets/images/sliders/1.jpg";
import image2 from "assets/images/sliders/2.jpg";
import image3 from "assets/images/sliders/3.jpg";


const slideImages: any = [
  image1,
  image2,
  image3,

];
const Marketplace = () => {

  // const mobile = useMediaQuery({ query: '(min-width:800px)' });

  useEffect(() => {
    init_swiper();
  }, [])

  return (
    <div className="main-content">

      <div className="page-title">
        <div className="title-1">
          <p>Market</p>
          <span>Place</span>
        </div>
        <div className="title-2">
          <span>DRAG TO SEE ALL CATEGORY</span>
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
                      <Link to="mproduct">
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
export default Marketplace;
