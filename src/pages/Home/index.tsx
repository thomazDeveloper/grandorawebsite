import Landing from "./landing";
import Platform from "./platform";
import CentralHub from "./centralhub";
import Roadmaps from "./roadmaps/roadmaps";
import NewsSlide from "./news/newsslide";
import TrendSlide from "./trending/trendSlide";
import TeamDiv from "./team";
import TeamDiv2 from "./team2";
import useAuth from "hooks/useAuth";
import { useCookies } from "react-cookie";
import tokenSalesImage from "../../assets/images/tokensales.png";
import { useEffect } from "react";
import Marketplace from "pages/Marketplace";
const Home = () => {
  const {setUser}=useAuth();
  const [cookies,setCookie,removeCookie]=useCookies(['user']);
  useEffect(()=>{
    setUser(cookies.user||{})
   },[])
  return (
    <div id="">
      <Landing />
      <Platform />
      {/* <CentralHub /> */}
      {/* <Roadmaps/>
      <NewsSlide />
      <TrendSlide/> */}
       
       {/* <div className="row w-[80%] mx-auto hidden md:flex">
              <div className="col-4 flex flex-col justify-content-center">
               <h2 className="sm:text-64 text-uppercase text-22 text-texasRose  font-bold font-Hanno  sm:text-left ">Grandro</h2>
               <p className="text-uppercase text-20 font-Rajdhani font-bold pl-2 tracking-widest text-davygrey">token sales 2022,Q2</p>
              </div>
              <div className="col-4 flex justify-content-center">
                <img src={tokenSalesImage}/>
              </div>
              <div className="col-4 flex flex-col justify-content-center">
              <h2 className="sm:text-[90px] text-[90px]  font-Rajdhani  uppercase  sm:text-left pb-1 tracking-widest text-davygrey">Token</h2>
              <div className="ml-[15px]">
              <p className="text-18 font-semibold border-l-4 border-texasRose pl-6 text-davygrey">Exchange it<br></br><span className="font-rajdhani text-davygrey font-normal text-[17px]">Exchanage The Token with<br></br> fork pancake swap</span></p>
              <div className="mt-3">
              <button className="uppercase font-Rajdhani font-semibold text-14 bg-texasRose  rounded text-white px-5 py-2 ">go  to swap!</button>
              </div>
              </div>
              </div>
            </div> */}
            {/*Mobile Responsive*/}
            {/* <div className="row w-[80%] flex flex-col md:flex-row justify-content-center align-items-center mx-auto md:hidden">
              <div className="mt-4 col-12 md:col-4 flex flex-col order-2 align-items-center justify-content-center text-center">
               <h2 className="sm:text-64 text-uppercase text-22 text-texasRose  font-bold font-Hanno  sm:text-left ">Grandro <span className="sm:text-64 text-uppercase text-25 text-dark  font-normal font-Rajdhani  sm:text-left ">Token</span></h2>
               <p className="mt-2 text-uppercase text-10 font-Rajdhani font-bold pl-2 tracking-widest text-davygrey">token sales 2022,Q2</p>
              </div>
              <div className="col-6 md:col-4 flex order-1  justify-content-center">
                <img src={tokenSalesImage}/>
              </div>
              <div className="mt-3 col-9 md:col-4 flex flex-col order-3 justify-content-center mr-20">
              <h2 className="hidden sm:text-[90px] text-[90px]  font-Rajdhani  uppercase  sm:text-left pb-1 tracking-widest text-davygrey">Token</h2>
              <div className="ml-[15px] flex flex-col w-full align-items-center">
              <p className="text-10 font-semibold border-l-4 border-texasRose pl-6 text-davygrey ">Exchange it<br></br><span className="font-rajdhani text-davygrey font-normal text-[10px]">Exchanage The Token with<br></br> fork pancake swap</span></p>
              <div className="mt-3 w-full">
              <button className="w-full uppercase font-Rajdhani font-semibold text-14 bg-texasRose  rounded text-white px-5 py-2 ">go  to swap!</button>
              </div>
              </div>
              </div>
            </div> */}
      
    
      {/* <TeamDiv /> */}
      
    </div>
    
  );
};

export default Home;
