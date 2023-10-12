import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  firstPostClass,
  secondPostClass,
  whiteBtnClass,
  secondPostSocialClass,
} from "../../core/style/homepage";
import { SocialLinkItemProps } from "../../core/interfaces/pages";
import SignModal from "../../components/signin/SignModal";
import { socialIcons } from "../../core/data/soliallink2";

import MainCanvasSlide from "./mainslide";

import landingImage from "../../assets/images/landing.png";
import postImage from "../../assets/images/poster.png";

const Landing = () => {
  const mWidth = 640;
  const Screen = getWindowDimensions();
  const [windowDimensions, setWindowDimensions] = useState(Screen);
  const [modalShow, setModalShow] = useState(false);
  // set height of poster and image
  const [windowHeight, setWindowHeight] = useState(Screen.height);
  const [imgHeightStyle, setImgHeightStyle] = useState({
    height: Screen.height + "px",
  });

  const mleft = Screen.width - 1313 < 0 ? (Screen.width - 1313) / 2 : 0;
  const [imgGrandoStyle, setGrandoStyle] = useState({
    height: Screen.height + "px",
    "margin-left": Screen.width > mWidth ? mleft + "px" : "",
  });
  const [containerStyle, setContainerStyle] = useState({
    height:
      Screen.width > mWidth
        ? windowHeight * 2 + 190 + "px"
        : windowHeight * 2 + "px",
  });
  // set scroll y
  const [scrollY, setScrollY] = useState(0);
  // const [pngRotate, setPngRotate] = useState({display: "rotate(0)"});
  const [firstPosterStyle, setFirstPosterStyle] = useState({
    display: "block",
  });
  const [secondPosterStyle, setSecondPosterStyle] = useState({
    display: "block",
  });
  const [btnShowStyle, setBtnShowStyle] = useState({ display: "none" });
  const [socialShowStyle, setSocialShowStyle] = useState({ display: "none" });
  const [textgrandShowStyle, setTextGrandShowStyle] = useState({
    display: "none",
  });
  const [arriveStyle, setArriveStyle] = useState(" posterHide");
  const [updateHeight, setUpdateHeight] = useState(window.innerHeight);
  // timer
  const [spinAngle, setSpinAngle] = useState(360);

  const firstImg = useRef<HTMLDivElement>(null);

  const posterStyle = "w-full min-vh-100 overflow-hidden";

  const canvasRef = useRef(null);
  if (canvasRef.current) {
    // this will get the canvas HTML element where everyhting that's painted is drawn
    // and call the toDataURL() function on it
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // console.log(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    const wSize = getWindowDimensions();
    const width = Math.floor(((40 + scrollY / 20) * wSize.width) / 1000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (spinAngle <= 360) {
        setSpinAngle(spinAngle - 1);
      }
      if (spinAngle < 0) setSpinAngle(360);
    }, 100);
    return () => {
      clearInterval(myInterval);
    };
  });
  useEffect(() => {
    function handleResize() {
      const wSize = getWindowDimensions();
      setUpdateHeight(window.innerHeight);
      setWindowDimensions(wSize);
      setWindowHeight(wSize.height);
      setImgHeightStyle({ height: wSize.height + "px" });
      const mleft = wSize.width - 1320 < 0 ? (wSize.width - 1320) / 2 : 0;
      const style = {
        height: wSize.height + "px",
        // "margin-left": mleft + "px",
        "margin-left": Screen.width > mWidth ? mleft + "px" : "",
      };
      if (window.innerWidth < 768) {
        var style2 = { height: "746px", display: "auto" };
        setSecondPosterStyle(style2);
      }

      setGrandoStyle(style);
      setContainerStyle({ height: wSize.height * 2 + 200 + "px" });
      const width = Math.floor(((40 + scrollY / 20) * wSize.width) / 1000);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const firtImgTop = firstImg.current?.getBoundingClientRect().top || 0;
    const roadMapHeight =
      firstImg.current?.getBoundingClientRect().height == undefined
        ? 0
        : firstImg.current?.getBoundingClientRect().height;
    if (Screen.width > 768) {
      if (window.innerWidth > 768 && scrollY < windowHeight) {
        // scroll down the ref div
        let offset = scrollY;
        let angle = Math.floor((offset / windowHeight) * 360) % 360;
        // setPngRotate({transform: 'rotate('+angle+'deg)'});
        let style1 = { display: "block", position: "fixed" };
        setFirstPosterStyle(style1);
        let style2 = { display: "block", position: "fixed" };
        setSecondPosterStyle(style2);
        setArriveStyle(" posterHide");
        setBtnShowStyle({ display: "none" });
        setSocialShowStyle({ display: "block" });
        setTextGrandShowStyle({ display: "block" });
        const wSize = windowDimensions;
        const width = Math.floor(((80 + scrollY / 30) * wSize.width) / 1000);
      } else if (scrollY < windowHeight + 220) {
        if (window.innerWidth > 768) {
          const mtop = scrollY - windowHeight;
          let style1 = { display: "block", position: "relative" };
          setFirstPosterStyle(style1);
          let style2 = { display: "block", top: "0px", position: "fixed" };
          setSecondPosterStyle(style2);
          setBtnShowStyle({ display: "block" });
          setSocialShowStyle({ display: "block" });
          setTextGrandShowStyle({ display: "block" });
        }
      } else if (scrollY < windowHeight * 2 + 220) {
        // setPngRotate({transform: 'rotate(0deg)'});
        if (window.innerWidth > 768) {
          setFirstPosterStyle({ display: "block" });
          let style1 = { display: "block", position: "relative" };
          setFirstPosterStyle(style1);
          let style2 = { display: "block", top: "225px", position: "relative" };
          setSecondPosterStyle(style2);
          setArriveStyle(" postershow");
          setBtnShowStyle({ display: "none" });
          setSocialShowStyle({ display: "none" });
          setTextGrandShowStyle({ display: "none" });
        }
      }

      // else if (scrollY < windowHeight*3) {

      //   // setPngRotate({transform: 'rotate(0deg)'});
      //   setFirstPosterStyle({display: 'block'});
      //   let style1 = {display: 'none', position: 'relative'};
      //     setFirstPosterStyle(style1);
      //   let style2 = {display: 'block', top:'0px', position: 'fixed'};
      //   //setSecondPosterStyle(style2);
      //   setArriveStyle(' posterHide');
      // }
      else {
        // setPngRotate({transform: 'rotate(0deg)'});
        let style1 = { display: "none", position: "relative" };
        setFirstPosterStyle(style1);
        let style2 = { display: "block", position: "relative" };
        setSecondPosterStyle(style2);
      }
    }
  }, [scrollY]);

  return (
    <div
      id="landing"
      data-src={updateHeight}
      style={Screen.width <= 768 ? { height: "auto" } : containerStyle}
      className="mobile__top-con"
    >
      <div
        className={" z-100"}
        ref={firstImg}
        style={Screen.width <= 768 ? { display: "none" } : firstPosterStyle}
      >
        <div
          className="w-full justify-center mobile__top-canvas"
          style={
            Screen.width > mWidth
              ? imgHeightStyle
              : { height: Screen.height + "px" }
          }
        >
          {/* <div className="mobile__top-overflow">
            <MainCanvasSlide
              className="z-10 w-full mobile__top-bg"
              // width={windowDimensions.width}
              // height={windowDimensions.height}
              data-height={updateHeight}
              width={Screen.width > mWidth ? windowDimensions.width : 1}
              height={Screen.width > mWidth ? updateHeight : 2}
              radius={scrollY}
              style={imgHeightStyle}
              spinrotate={spinAngle}
            />

            <div className={`${firstPostClass}  mobile__top-text`}>
              <p>
                Where Your World.{" "}
                <span className="text-texasRose font-medium">Recreated.</span>
              </p>
              <p>
                Your Life.{" "}
                <span className="text-texasRose font-medium">Reinvented.</span>
              </p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="font-fixed mobile-side_grandora">
        <div className="font-Rajdhani uppercase font-semibold text-white text-21 leading-30 tracking-90p text-center w-full mb-15">
          Welcome to
        </div>
        <div className="font-Hanno text-white text-100 leading-100 tracking-20p  text-center w-full">
          GRANDORA
        </div>
        {/* <button
          onClick={() => setModalShow(true)}
          className="relative uppercase h-30 z-100 bg-white text-14 font-lato msm:top-10p  leading-32 text-center rounded-6 hover:text-texasRose w-200 tracking-30p  font-semibold"
        >
          GET READY
        </button> */}
        {/*<div className="social-fixed">
          {socialIcons.map((item, index) => {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                className={secondPostSocialClass}
              >
                <img
                  src={item.icon}
                  className="  h-30 w-30 mr-10 sm:mr-0"
                />
              </a>
            );
          })}
        </div>*/}
      </div>

      <div
        className={` ${
          Screen.width > mWidth
            ? posterStyle
            : "mobile__second-poster mobile__top-canvas z-99"
        }`}
        data-check="test"
        style={
          Screen.width > mWidth
            ? secondPosterStyle
            : { height: Screen.height + "px" }
        }
      >
        {Screen.width > mWidth ? (
          <img
            className="min-w-full max-w-2xl img_mobile_767px"
            src={postImage}
            style={imgGrandoStyle}
          />
        ) : (
          ""
        )}
        <div className="hidden sm:block">
          <div className="font-Rajdhani relative sm:-mt-265">
            <div className="font-Rajdhani uppercase font-semibold text-white text-21 leading-30 tracking-90p text-center w-full mb-15">
              Welcome to
            </div>
            <div className="font-Hanno text-white text-100 leading-100 tracking-20p  text-center w-full">
              GRANDORA
            </div>
          </div>
          <div
            className={`sm:mx-60 ${
              Screen.width > mWidth ? secondPostClass : ""
            }`}
          >
            <div
              className="text-12 leading-18  text-white uppercase font-Rajdhani msm:absolute md:sticky msm:top-100p "
              style={textgrandShowStyle}
            >
              <p>new epic social platform projects.</p>
              <p>
                <span className="font-semibold">Grandora</span> will bring
                everyone
              </p>
              <p>into the world where each player's</p>
              <p>imagination and creativity is limitless</p>
            </div>
            {/* <button
              onClick={() => setModalShow(true)}
              className="relative uppercase h-30 z-100 bg-white text-14 font-lato msm:top-30p  leading-32 text-center rounded-6 hover:text-texasRose w-200 tracking-30p  font-semibold"
              style={textgrandShowStyle}
            >
              GET READY
            </button> */}

            {/* Social Icons Section1 */}
            <div className="md:my-50p msm:my-10p d-flex">
              {socialIcons.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    className={secondPostSocialClass}
                    style={socialShowStyle}
                  >
                    <img
                      src={item.icon}
                      className="  h-30 w-30 mr-10 sm:mr-0"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between sm:hidden w-full mobile__top-second">
          <div className="text-12 leading-18 text-white uppercase font-Rajdhani text-center">
            <p>new epic social platform project.</p>
            <p>
              <span className="font-semibold">Grandora</span> will bring
              everyone
            </p>
            <p>into the world where each player's</p>
            <p>imagination and creativity is limitless</p>
          </div>
          <div>
            <div className="font-Rajdhani relative flex flex-col justify-center items-center text-center">
              <div className="text-center">
                <div className="font-Rajdhani uppercase font-semibold text-white text-[14px] leading-[16px] tracking-[0.6em] text-center w-full mb-15">
                  Welcome to
                </div>
                <p className="font-Hanno text-white text-[38px] tracking-[10px] font-bold leading-[38px]  text-center">
                  GRANDORA
                </p>
              </div>

              {/* <button
                onClick={() => setModalShow(true)}
                className="relative uppercase text-14 z-100 font-lato tracking-30p h-30 bg-white  leading-17 text-center rounded-6 hover:text-texasRose w-[200px] tracking-2p mt-16 mb-8 font-semibold"
              >
                GET READY
              </button> */}
              <div className="md:my-50p msm:my-10p d-flex">
                {socialIcons.map((item, index) => {
                  return (
                    <a
                      key={index}
                      href={item.url}
                      className={secondPostSocialClass}
                    >
                      <img
                        src={item.icon}
                        className="  h-30 w-30 mr-10 sm:mr-0"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default Landing;
