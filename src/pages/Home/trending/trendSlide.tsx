
import {useState,useEffect} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import showIcon from "../../../assets/images/svgs/categories.png";
import SlideItem from "./slideitem";
import { trendSlideItems } from "../../../core/data/trendslide";
import useAllNFT from "hooks/useAllNFT";
import reactSelect from "react-select";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    
    items: 4,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024 },

    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const TrendSlide = () => {
  const { getAllNFTs } = useAllNFT();
  
  const [nftList, setNftList] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    getAllNFTs()
      .then((data) => {
        setLoading(false);
        setNftList(data);
        // dispatch(stoerAllNfts(data));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, [])
  const slideClass = {
    contain:
      "md:mx-auto max-w-1000 sm:py-100 pb-70 pt-15  px-20",
    title:
      "uppercase my-5p sm:text-34 text-16 font-Rajdhani text-davygrey  font-Rajdhni tracking-20p",
  };
  // console.log(teams.map((team, key) => {
  //     return <TeamShow info={team} key={key} num={key}/>;
  // }));
  return (
    <div className={slideClass.contain} id="newsSlide">
      <div className="bg-seletiveyellow rounded-full w-55 h-55 bg-opacity-10 flex items-center">
        <img src={showIcon} className="sm:w-36 h-15 w-15 sm:h-36 mx-auto" />
      </div>
      <p className={slideClass.title}>
        
        Trending in <span className="text-texasRose font-bold">all categories</span>
      </p>
      
      <div className="hidden md:block">
       <Carousel responsive={responsive} infinite autoPlay> 
          {nftList.map((item, index) => {
            return <SlideItem info={item} num={index} key={index} class=" rounded-np m-11" size="w-225"  />;
          })}
       </Carousel> 
      </div>
      <div className="block md:hidden flex justify-between">
        {nftList.map((item, index) => {
          if (index < 3)
            return <SlideItem info={item} num={index} key={index} class=" rounded-np m-11" size="w-270"  />;
        })}
      </div>
    </div>
  );
};
export default TrendSlide;
