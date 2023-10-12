import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../config/connectors";
import { useCookies } from "react-cookie";
import * as FaIcons from "react-icons/fa";

import WalletConnect from "../../assets/wallet/wallet-connect.png";
import BinanceWallet from "../../assets/wallet/binance-wallet.png";
import MathWallet from "../../assets/wallet/math-wallet.png";
import MetaMask from "../../assets/wallet/meta-mask.png";
import TokenPocket from "../../assets/wallet/token-pocket.png";
import TrustWallet from "../../assets/wallet/trust-wallet.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faGlobe,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

import SignModal from "../signin/SignModal";
import Nbutton from "../Nbutton";
import { MenuItemProps } from "../../core/interfaces/pages";
import { menuItems } from "../../core/data/menu";
import { signInClass } from "../../core/style/homepage";
import defaultAvatar from "../../assets/images/user/default-sm.png";
import useAuth from "../../hooks/useAuth";
import ProfileDropDown from "./ProfileDropDown";
import { useSelector } from "core/store/store";

const Header = () => {

  const { connect, account, status,reset } = useWallet();

  const { nfts } = useSelector(store => store.nft);
  const [wShowModal, setWShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [triger, setTriger] = useState(false);
  const [cookies,setCookie,removeCookie]=useCookies(['user']);
  
  const { activate, library } = useWeb3React();
  const connectWallet = (what: string) => {
    setWShowModal(false);
    if (what === "walletconnect") {
      connect(what);
    } else if (what === "bsc") {
      connect(what);
    } else connect("injected");
    activate(injected);
  };

  useEffect(() => {
    if (account) setWShowModal(false);
 
  }, [account]);



  const wallet = [
    {
      name: "Metamask",
      icon: MetaMask,
      link: "injected",
    },
    {
      name: "TrustWallet",
      icon: TrustWallet,
      link: "injected",
    },
    {
      name: "MathWallet",
      icon: MathWallet,
      link: "injected",
    },
    {
      name: "TokenPocket",
      icon: TokenPocket,
      link: "injected",
    },
    {
      name: "WalletConnect",
      icon: WalletConnect,
      link: "walletconnect",
    },
    {
      name: "Binance Chain",
      icon: BinanceWallet,
      link: "bsc",
    },
  ];

  const displayAddress = (address: any) => {
    return `${address.substr(0, 4)}...${address.substr(39, 42)}`;
  };

  const logout = () => {
    reset();
    setShowInfo(false);
  };

  const tablet = useMediaQuery({ query: '(min-width:1200px)' });
  const mobile = useMediaQuery({ query: '(min-width:800px)' });

  const [userLogined, setUserLogined] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const { user ,setUser} = useAuth();
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    setUser(cookies.user||{})
   },[])
  useEffect(() => {
    if (user?.player_id) {
      setModalShow(false)
    }
    if (!triger && user?.player_id) {
      setTriger(true);
      connect("injected");
      activate(injected);
    }
  }, [user])


  useEffect(() => {
    const hide = (e: any) => {
      if (menuRef && menuRef.current?.contains(e.currentTarget)) {
        return
      }
      setShowUserMenu(false)
    }

    if (showUserMenu) {
      document.body.addEventListener("click", hide)
    }
    return () => {
      document.body.removeEventListener("click", hide)
    }
  }, [showUserMenu])


  const showModal = () => {
    setModalShow(true);
  };
  const openSidebar = () => {
    // dispatch(toggleSidebar())
  };

  const setMenuToggle = () => {
    if (menuShow) setMenuShow(false);
    else setMenuShow(true);
  };

  const handleSignOut = () => {
    signOutUser();
    reset();
    navigate('/');
    let date=new Date();
    removeCookie('user',{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
  }


  const menuItemClass: string =
    "font-Rajdhani  lg:my-20 primary:mx-17 lg:mx-12 sm:mx-8  cursor-pointer text-davygrey text-16 border border-white hover:border-davygrey flex";

  return (
    <div className="w-full" style={{ opacity: "0.8" }}>
      {/* Navbar */}
      {/* <div className="fixed font-Rajdhani top-0 msm:ml-16p md:ml-66p md:w-[calc(100%-132px)] msm:w-[calc(100%-32px)]  bg-white flex h-45 justify-between bg-desertStorm bg-opacity-70 rounded-b-20 shadow-menu z-50">
        <button
          className="block medium:hidden ml-20p"
          onClick={() => setMenuToggle()}
        >
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </button>
        <div className="ml-40 lg:ml-80 font-Rajdhani flex items-center hidden medium:flex">
          {menuItems.map((item: MenuItemProps, index: any) => {
            return (
              // item.content === 'HOME' ? item.url : '/stay'
              <Link to={item.url} key={index} className={menuItemClass}>
                {<img src={item.icon} className="mx-7p" />} {item.content}
              </Link>
            );
          })}
        </div>
        <div className="md:mr-40 lg:mr-80 flex items-center font-Rajdhani text-16">
          {!user?.player_id && (
            <button className={signInClass} onClick={() => showModal()}>
              SIGN IN
            </button>
          )}
          {user?.player_id && (
            <div className="flex items-center mr-10p" onClick={() => setShowUserMenu(!showUserMenu)}>
              <p>Welcome, {user?.name}</p>
              <img
                src={user?.photoURL ? user?.photoURL : defaultAvatar}
                alt=''
                className="w-26p h-26p rounded-full mx-10p border-1 border-texasRose cursor-pointer"
              />
              {
                showUserMenu && <div className="fixed top-0 right-[19%] pt-[47px] z-[-10]" ref={menuRef}>
                  <ProfileDropDown />
                </div>
              }

            </div>
          )}
          {
            user?.player_id &&
            <div>
              <button className={signInClass} onClick={() => handleSignOut()}>
                Logout
              </button>
            </div>
          }
          <Link to="shopcart">
            <div className="relative pr-2r">
              {nfts.length > 0 && <div className="cart-notify">{nfts.length}</div>}
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="text-davygrey hover:text-primary"
              />
            </div>
          </Link>

          <div className="right-cta items-center flex flex-row md:flex-1 md:justify-end">
            
            {!account  ?  user?.player_id &&(
              <button
                type="button"
                className="hidden md:block text-16 border-1 pl-[2rem] pr-[2rem] py-1 rounded-xl border-cloudygrey"
                onClick={() => setWShowModal(true)}
              >
               Connect
              </button>
            ) : (
              <button
                type="button"
                className="hidden md:block text-davygrey text-16 font-Rajdhani border-1 px-[2rem] py-[0.25rem] rounded-xl border-cloudygrey"
                onClick={() => setShowInfo(true)}
              >
                {displayAddress(account)}
              </button>
            )}
          </div>
        </div>
      </div> */}

      {menuShow == true && (
        <div className="bg-desertStorm w-full pt-40 block medium:hidden">
          <div className="ml-40p flex justify-between">
            <div className="">
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => setMenuShow(false)}
                className="cursor-pointer"
              ></FontAwesomeIcon>
              <label className="ml-10p text-texasRose font-semibold font-Rajdhani text-18">
                GRANDORA
              </label>
            </div>
            <div>

            </div>
          </div>
          <div className="border-b-2 border-dashed mx-40p border-davygrey">
            {menuItems.map((item: MenuItemProps, index: any) => {
              return (
                <Link
                  to={item.url}
                  key={index}
                  className="cursor-pointer text-davygrey text-16 p-10p flex hover:text-texasRose"
                >
                  {<img src={item.icon} className="mx-5p" />} {item.content}
                </Link>
              );
            })}
          </div>
          <div className="p-20p flex justify-center">
            <Nbutton class="bg-texasRose text-white hover:bg-white hover:text-texasRose border-texasRose w-160 mr-22p">
              sign in
            </Nbutton>
            <Nbutton
              bgcolor="friarGrey"
              class="mr-10 hover:bg-default hover:text-friarGrey bg-friarGrey text-default border-friarGrey w-160"
            >
              log in
            </Nbutton>
          </div>
        </div>
      )}
      <SignModal show={modalShow} onHide={() => setModalShow(false)} />

      {wShowModal ? (
        <>
          <div className="text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-1/3 my-6 mx-auto max-w-3xl">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-walletgrey pb-[2rem] outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-[1.25rem] border-b-[1px] border-solid border-gray-100 rounded-t ">
                  <h3 className="text-3xl font-semibold">
                    Connect to a Wallet
                  </h3>
                  <button
                    type="button"
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setWShowModal(false)}
                  >
                    <span className="bg-transparent text-white h-[1.5rem] w-[1.5rem] text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-[1.5rem] flex">
                  <div className="grid grid-cols-2 md:grid-cols-3 mx-auto gap-4">
                    {wallet.map((item, index) => {
                      return (
                        <span
                          className="wallet-wrap flex flex-col space-y-[0.75rem] bg-inBlackgray px-[0.5rem] py-[1rem] rounded-xl items-center cursor-pointer"
                          onClick={(e) => connectWallet(item.link)}
                          key={index}
                        >
                          <span>
                            <img src={item.icon} alt="icon" />
                          </span>
                          <span>{item.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}

      {showInfo && (
        <>
          <div className="text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-1/3 my-[1.5rem] mx-auto max-w-[48rem]">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-walletgrey pb-[0.75rem] outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-[1.25rem] border-b-[1px] border-solid border-gray-100 rounded-t ">
                  <h3 className="text-3xl font-semibold">Your Wallet</h3>
                  <button
                    type="button"
                    className="p-[0.25rem] ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowInfo(false)}
                  >
                    <span className="bg-transparent text-white h-[1.5rem] w-[1.5rem] text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* body */}
                <div className="relative p-[1.5rem] flex justify-center font-Rajdhani font-bold text-xl">
                  {account}
                </div>
                <div className="relative flex px-4 text-red">
                  <a
                    className="flex items-center flex-row hover:underline font-bold text-md text-[red]"
                    href={`https://bscscan.com/address/${account}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on BscScan&nbsp;
                    <FaIcons.FaShareSquare className="text-red" />
                  </a>
                </div>
                <div className="relative p-3 flex justify-center font-bold">
                  <button
                    type="button"
                    className="px-[2rem] py-[0.5rem] rounded-xl border-red border-2  font-bold text-red"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      )}

    </div>
  );
};

export default Header;
