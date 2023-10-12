import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'

import { faTshirt, faPaintBrush, faCog, faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import StatusIcon from "components/statusIcon";
import GrandoItemIcon from "assets/images/svgs/grando_item.svg";
import ethereumSvg from "assets/images/svgs/ethereum.svg";
import eyeSvg from "assets/images/svgs/eye.svg";
import heartSvg from "assets/images/svgs/heart.svg";

import { useDispatch, useSelector } from 'core/store/store';

import { NFTItemProps } from 'core/interfaces/pages';
import { stoerAllNfts, storeNftItem } from "core/store/reducers/nft";


const SlideItem = (props: any) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const mobile = useMediaQuery({ query: '(min-width:640px)' });

    const { nfts } = useSelector((store) => store.nft);

    const item = props.info;
    const num = props.num;
    const showClass={
      contain: "w-230 rounded-6 shadow-primary my-6",
      img : "w-230 h-230 rounded-t-6",
      title : "text-18 font-semibold font-Rajdhani leading-25 text-cloudygrey flex",
      detail: "text-10 font-Rajdhani leading-13 text-cloudygrey my-3p",
      link : ""
    }
    const clickProduct = async (item: NFTItemProps, num: number) => {
        dispatch(storeNftItem(item));
        navigate(`/marketplace/productdetail/:${num}`);

    };

    const addToCart = (e: any) => {
        e.stopPropagation();
        console.log("add")

        const index = nfts.findIndex(e => e.item.url === item.url);
        if (index > -1) {
            const allNFTs = [...nfts];
            allNFTs[index] = { ...allNFTs[index], count: allNFTs[index].count + 1 };
            dispatch(stoerAllNfts(allNFTs));
        } else {
            const data = {
                count: 1,
                item: item
            }
            const allNFTs = [...nfts, data];
            dispatch(stoerAllNfts(allNFTs));
        }

        alert("Added the NFT in your Shop Cart.")
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
                        <div className="mob-nft-card mx-1" onClick={() => clickProduct(item, num)}>
                            <div className="n-img h-95 mt-2">
                                <img src={item.url} alt="nft-logo" />
                            </div>
                            <div className="w-full px-[.5rem] py-[.25rem]">
                                <div className="w-full flex justify-start items-center">
                                    <img src={GrandoItemIcon} className="w-9" alt="grando_icon" />
                                    <p className="font-lato not-italic font-semibold text-5 leading-7 uppercase text-cloudygrey">GRANDO {item.name}</p>
                                </div>
                                <div className="w-full flex justify-start items-center">
                                    <StatusIcon icon={faTshirt} size="7" type="default" />
                                    <StatusIcon icon={faPaintBrush} size="7" type="default" />
                                    <StatusIcon icon={faCog} size="7" type="default" />
                                </div>
                                <div className="w-full flex justify-start items-center mt-[2px]">
                                    <span className="font-lato not-italic font-normal text-[3px] leading-4 uppercase text-cloudygrey">CREATE BY:</span>
                                    <span className="mr-[1px] font-lato not-italic font-normal text-[3px] leading-4 uppercase text-cloudygrey">{item.creator}</span>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <div className="flex my-[3px] justify-start items-center">
                                        <img src={ethereumSvg} className="w-7 h-9" alt="logo-img" />
                                        <div className="flex flex-col ml-[1.4px]">
                                            <p className="text-[5px] font-semibold text-cloudygrey font-lato">{item.price}</p>
                                            <p className="text-[3px] font-normal text-cloudygrey font-lato">($2,388.74)</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <StatusIcon className="" icon={faHeart} size="17" type="disable" />
                                        <div className="h-auto w-auto" onClick={addToCart}>
                                            <StatusIcon icon={faShoppingBag} size="17" type="enable" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex items-center text-[4px] leading-8 text-cloudygrey">
                                    <div className="font-lato mr-[5.4px] flex items-center text-[4px]"><img src={eyeSvg} className="w-[5px] h-[3.25px] mr-[3px]" alt="logo-img" />120k</div>
                                    <div className="font-lato flex items-center text-[4px]"><img src={heartSvg} className="w-[2.96px] h-[2.64px] mr-[3px]" alt="logo-img" />80.1k</div>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (

                        <div
                            className="nft-card"
                            style={{width:"225px",height:"300px"}}
                            onClick={() => clickProduct(item, num)}
                        >

                            <div className="n-img mb-0" style={{width:"100%",height:"150px"}}>
                                <img src={item.url} alt="nft-logo" />
                            </div>

                            <div className="n-text  pt-0">
                                <div className="text-1 pt-0">
                                    <img src={GrandoItemIcon} alt="grando_icon" />
                                    <p>{item.name.length < 8 ? item.name:`${item.name.slice(0,7)}...`}</p>
                                </div>
                                <div className="text-2 p-0">
                                    <StatusIcon icon={faTshirt} size="15" type="default" />
                                    <StatusIcon icon={faPaintBrush} size="15" type="default" />
                                    <StatusIcon icon={faCog} size="15" type="default" />
                                    <button type="button" className="button-1">SUPER RARE</button>
                                    <button type="button" className="button-2">RARE</button>
                                </div>
                                <div className="text-3 gap-1 py-2">
                                    <p>Create By: </p>
                                    <span>{reduceName(item.creater)}</span>
                                </div>
                                <div className="text-4 py-1">
                                    <div className="t-price gap-1">
                                        <img src={ethereumSvg} alt="icon_img" />
                                        <div>
                                            <p>{item.price}</p>
                                            <span>($2,388.74)</span>
                                        </div>
                                    </div>
                                    <div className="t-btn">
                                        <StatusIcon icon={faHeart} size="30"  type="disable" />
                                        <div className="h-auto w-auto" onClick={addToCart}>
                                            <StatusIcon icon={faShoppingBag} size="30" type="enable" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-5 gap-3 py-1">
                                    <div className="gap-1">
                                        <img src={eyeSvg} alt="icon_img" />
                                        <span>120k</span>
                                    </div>
                                    <div className="gap-1">
                                        <img src={heartSvg} alt="icon_img" />
                                        <span>80.1k</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                }
            })()}
        </>
    );
}

export default SlideItem;