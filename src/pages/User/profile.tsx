import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faProjectDiagram, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import  {useCookies} from "react-cookie"
import { currentUser } from "../../core/data/usersetting";
import StatusIcon from "../../components/statusIcon";
import ShowEtherValue from "../../components/showEther";
import InventoryItem from "./inventoryproduct";
import GameItem from "../Gameplay/GameItem";
import { nftproducts } from "../../core/data/nftproducts";
import { GameInfos } from "../../core/data/gameinfo";

import defaultAvatar from "../../assets/images/user/default-sm.png";
const UserProfile = () =>{
  const [cookies,setCookie]=useCookies(['user']);
  const { connect, account, status,reset } = useWallet();
  console.log(cookies.user)
  return (
  <div className="mt-60p md:mx-110p">
    <div className="flex py-20p border-b-2 border-dashed my-20p flex justify-center gap-40">
      <img src={defaultAvatar} className="w-120 h-120 border-2 border-texasRose rounded-full"/>
      <div className="w-620">
        <p className="text-25 tracking-5p uppercase font-medium font-Rajdhani">{cookies.user.name}</p>
        <p className="text-cloud text-17 font-Rajdhani">{cookies.user.email}</p>
        <p className="text-davygrey text-17 font-semibold font-Rajdhani">About</p>
        <p className="text-davygrey text-17 font-Rajdhani">{cookies.user.description}</p>
        <p className="text-davygrey text-17 font-semibold font-Rajdhani">Social Media</p>
        <div className="flex">
          {
            currentUser.socials.map((item, index) => {
              return <StatusIcon icon={item.icon} size="20" class="text-texasRose mr-10p" key={index}/>;
            })
          }
        </div>
      </div>
      <div className="mt-40p text-davygrey md:w-560 mx-20p">
        <p className="text-davygrey text-20 font-semibold font-Rajdhani">My Wallet</p>
        <div className="grid grid-cols-2 text-15 bg-texasRose bg-opacity-10 p-10p gap-20">
          <div>
            <p className="font-Rajdhani">Ethereum</p>
            <ShowEtherValue ethers={currentUser.wallet_ether} class="ml-40p font-Rajdhani"/>
          </div>
          <div>
            <p  className="font-Rajdhani">Grando</p>
            <ShowEtherValue ethers={currentUser.wallet_grando} type="grando" class="ml-40p font-Rajdhani"/>
          </div>
        </div>
        <div className="flex justify-between px-15p py-3p mt-15p border-1 border-cloud rounded-5 font-Rajdhani">
          <p>{account}</p>
          <div>
            <FontAwesomeIcon icon={faLink} className="w-15p h-15p mr-10p"/>
            <FontAwesomeIcon icon={faProjectDiagram} className="w-15p h-15p"/>
          </div>
        </div>
      </div>
    </div>
    <div className="uppercase text-25 font-semibold text-davygrey">
      <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-5p"/>
      MY INVENTORY
    </div>
    <p className="uppercase text-25 text-davygrey font-Rajdhni">Game x 10</p>
    <div className="flex flex-wrap h-285 overflow-hidden justify-center gap-20">
      {
        nftproducts.map((item, index) => {
          return <InventoryItem item={item} num={index} key={index}/>
        })
      }
    </div>
    <div className="flex text-17 font-medium tracking-10p text-davygrey mb-30p">
      <p className="w-190 font-Rajdhani">Avatar x 1</p>
      <p className="w-190 font-Rajdhani">Land x 1</p>
      <p className="w-190 font-Rajdhani">EQUIPMENT x 0</p>
    </div>
    <p className="uppercase text-25 text-davygrey my-15p font-Rajdhani">Product x 0</p>
    <div className="rounded-20 bg-friarGrey bg-opacity-5 p-30p flex justify-center flex-col items-center">
      <p className="text-25 text-davygrey tracking-5p uppercase mb-10p font-Rajdhani">You don’t have any Product</p>
      <button className="text-default rounded-default bg-texasRose w-200 h-30 font-Rajdhani text-white">BUY NOW</button>
    </div>
    
    <div className="uppercase text-25 font-semibold text-davygrey mt-50p font-Rajdhani">
      <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-5p"/>
      YOUR CREDITION
    </div>
    <p className="uppercase text-25 text-davygrey font-Rajdhani">Game x 10</p>
    <div className="flex">
      {
        GameInfos.map((item, index) => {
          if ( index < 3 )
          return <GameItem item={item} key={index} index={index}/>
        })
      }
    </div>
    <p className="uppercase text-25 text-davygrey font-Rajdhani">NFT x 0</p>
    <div className="rounded-20 bg-friarGrey bg-opacity-5 p-30p flex justify-center flex-col items-center">
      <p className="text-25 text-davygrey tracking-5p uppercase mb-10p font-Rajdhani">CREATE YOUR NFT ON GRANDORA</p>
      <button className="text-default rounded-default bg-texasRose w-200 h-30 font-Rajdahni text-white">CREATE</button>
    </div>
  </div>
  );
};

export default UserProfile;