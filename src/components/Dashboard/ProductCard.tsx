import React from 'react'
import { BsEye } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import item1 from "../../assets/images/items/nft1.png"
import item2 from "../../assets/images/items/nft2.png"
import item3 from "../../assets/images/items/nft3.png"
import item4 from "../../assets/images/items/nft4.png"

import ethereum from "../../assets/images/svgs/ethereum.svg"
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
const ProductCard = (props:any) => {
    const {link,item,filter}=props;
    const reduceName = (name: string | undefined) => {
        if (name === undefined) {
            return "";
        } else {
            return name.substr(0, 6) + "....." + name.substr(-6, 6);
        }
    }

    return (
       
        <div onClick={props.onClick} className='max-w-270 mb-5 card-box-shadow border-[0.5px] border-borderdefault overflow-hidden flex flex-col rounded-tl-[10px] rounded-tr-[10px]  md:rounded-bl-[40px] rounded-bl-[30px] md:rounded-br-[40px] rounded-br-[30px] font-lato'>
            <div>
                <img className="w-270 md:max-w-270 h-250 rounded-t-10" src={props.item.url} alt="" />
            </div>
            <div className='md:px-3 px-1 md:pb-5 pb-4 '>
                <div className='pt-3 pb-2 text-left pl-12 pr-5'>
                    <h1 className='uppercase md:text-14 text-10 text-cloudygrey fonnt-semibold font-lato font-semibold'>{props.item.name}<span className='text-14 text-cloudygrey fonnt-semibold font-lato'>#01</span></h1>
                    <div className='flex justify-between items-center py-1'>
                        <h4 className='md:text-10 text-7 uppercase text-cloudygrey font-lato'>created by: <span className='uppercase text-cloudygrey font-lato'>{ reduceName(props.item.artist)}</span> </h4>
                        <h4 className='md:text-10 text-7 uppercase text-cloudygrey font-lato'><ReactTimeAgo date={props.item.createdAt} locale="en-US"/></h4>
                    </div>
                </div>
                <div className='flex justify-between items-center py-2 border-t-[0.5px] border-b-[0.5px] border-borderdefault pl-10 pr-5'>
                    <div className='flex items-center '>
                        <div>
                            <img  src={ethereum} alt={"ethereum icon"} />
                        </div>
                        <div>
                            <h1 className='uppercase md:text-14 text-12 font-lato font-semibold text-cloudygrey'>${item.price}</h1>
                            <h5 className='md:text-10 text-7 text-cloudygrey'>(${item.price})</h5>
                        </div>
                    </div>
                    <div className="flex">
                        <h2 className='md:text-10 text-8 font-semibold font-lato text-cloudygrey'>Last:</h2>
                        <img src={ethereum} alt="ethereum" className='md:w-[15px] w-[10px]' />
                        <h2 className='md:text-10 text-8 font-semibold font-lato text-cloudygrey'>121.9</h2>
                    </div>
                </div>
                <div className='flex pt-2 pl-12 pr-5'>
                    <div className='pr-10 flex items-center md:text-9 text-7'>
                        <span className='pr-3 '><BsEye /></span>
                        120k
                    </div>
                    <div className='flex items-center md:text-9 text-7'>
                        <span className='pr-3 '><FaRegHeart /></span>
                        80.1k
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductCard