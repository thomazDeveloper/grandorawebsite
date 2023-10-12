import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import {useState} from 'react'
import { faTshirt, faPaintBrush, faCog, faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import StatusIcon from "./statusIcon";
import GrandoItemIcon from "../assets/images/svgs/grando_item.svg";
import ethereumSvg from "../assets/images/svgs/ethereum.svg";
import eyeSvg from "../assets/images/svgs/eye.svg";
import heartSvg from "../assets/images/svgs/heart.svg";
import Popup from "./signin/Popup";
import { useDispatch, useSelector } from 'core/store/store';

import { NFTItemProps } from 'core/interfaces/pages';
import { stoerAllNfts, storeNftItem } from "core/store/reducers/nft";
import axios from "axios";


const ProductItem = (props: any) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const mobile = useMediaQuery({ query: '(min-width:640px)' });
    const [show,setShow]=useState(false);
    const [content,setContent]=useState("");
    const { nfts } = useSelector((store) => store.nft);

    const item = props.info;
    const num = props.num;

    const clickProduct = async (item: NFTItemProps, num: number) => {
        dispatch(storeNftItem(item));
        navigate(`/marketplace/productdetail/:${num}`);

    };

    const addToCart = (e: any) => {
        e.stopPropagation();
        axios.post('https://grandora.games/api/economic-services/create-transaction', {
            product_id: item.id

        }).then((res) => {
            if(res.data.success){
                console.log("sucess",res.data.web_payment_url)
                window.location.href = res.data.web_payment_url;
                props.onHide();
            }else{
                //setError(res.data.message)
                console.log("er",res.data)
            }

        }).catch((err) => {
            console.log("no",err)
        })
    }

    const reduceName = (name: string | undefined) => {
        if (name === undefined) {
            return "";
        } else {
            return name.substr(0, 6) + "....." + name.substr(-6, 6);
        }
    }

    return (
        <>
            {(() => {
                if (!mobile) {
                    return (
                        <div className="mob-nft-card" onClick={() => clickProduct(item, num)}>
                            <div className="n-img h-95">
                                <img src={item.image} alt="nft-logo" />
                            </div>
                            <div className="w-full px-[.5rem] py-[.25rem]">
                                <div className="w-full flex justify-start items-center">
                                    <img src={GrandoItemIcon} className="w-9" alt="grando_icon" />
                                    <p className="font-lato not-italic font-semibold text-5 leading-7 uppercase text-cloudygrey">{item.name}</p>
                                </div>
                
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex my-[3px] justify-start items-center">
                                        <img src={ethereumSvg} className="w-7 h-9" alt="logo-img" />
                                        <div className="flex flex-col ml-[1.4px]">
                                            <p className="text-[5px] font-semibold text-cloudygrey font-lato">{item.price_amount}</p>
                                            <p className="text-[3px] font-normal text-cloudygrey font-lato">{item.price_currentcy}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                      {/*  <StatusIcon className="" icon={faHeart} size="17" type="disable" />*/}
                                        <div className="h-auto w-auto" onClick={addToCart}>
                                            <StatusIcon icon={faShoppingBag} size="17" type="enable" />
                                        </div>
                                    </div>
                                </div>
                            {/*    <div className="w-full flex items-center text-[4px] leading-8 text-cloudygrey">
                                    <div className="font-lato mr-[5.4px] flex items-center text-[4px]"><img src={eyeSvg} className="w-[5px] h-[3.25px] mr-[3px]" alt="logo-img" />120k</div>
                                    <div className="font-lato flex items-center text-[4px]"><img src={heartSvg} className="w-[2.96px] h-[2.64px] mr-[3px]" alt="logo-img" />80.1k</div>
                                </div>*/}
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <>
                            <div
                                className="nft-card"
                                onClick={() => clickProduct(item, num)}
                            >

                                <div className="n-img h-250">
                                    <img src={item.image} alt="nft-logo" />
                                </div>

                                <div className="n-text">
                                    <div className="text-1">
                                        <img src={GrandoItemIcon} alt="grando_icon" />
                                        <p>{item.name}</p>
                                    </div>
                                   {/*  <div className="text-2">
                                        <StatusIcon icon={faTshirt} size="15" type="default" />
                                        <StatusIcon icon={faPaintBrush} size="15" type="default" />
                                        <StatusIcon icon={faCog} size="15" type="default" />
                                        <button type="button" className="button-1">SUPER RARE</button>
                                        <button type="button" className="button-2">RARE</button>
                                    </div>
                                    <div className="text-3 gap-1">
                                        <p>Create By: </p>
                                        <span>{reduceName(item.creater)}</span>
                                    </div> */}
                                    <div className="text-4">
                                        <div className="t-price gap-1">
                                            <img src={ethereumSvg} alt="icon_img" />
                                            <div>
                                                <p>{item.price_amount} {item.price_currency}</p>
                                                {/* <span>({item.price_currency})</span> */}
                                            </div>
                                        </div>
                                        <div className="t-btn">
                                          {/*   <StatusIcon icon={faHeart} size="30"  type="disable" /> */}
                                            <div className="h-auto w-auto" onClick={addToCart}>
                                                <StatusIcon icon={faShoppingBag} size="30" type="enable" />
                                            </div>
                                        </div>
                                    </div>
                                  {/*   <div className="text-5 gap-3">
                                        <div className="gap-1">
                                            <img src={eyeSvg} alt="icon_img" />
                                            <span>120k</span>
                                        </div>
                                        <div className="gap-1">
                                            <img src={heartSvg} alt="icon_img" />
                                            <span>80.1k</span>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                            <Popup show={show} onHide={() => setShow(false)}>
                                <div className="text-center">
                                    <p className='text-center text-Rose text-36 text-texasRose font-Rajdhani'>{content}</p>
                                    <button className="uppercase px-25p mb-3 mx-13p h-30 rounded-4 bg-davygrey text-white text-14 font-semibold" onClick={()=>setShow(false)}>OK</button>
                                </div>
                            </Popup>
                        </>
                    )
                }
            })()}
        </>
    );
}

export default ProductItem;
