import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from 'react';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import useAllNFT from "hooks/useAllNFT";

import InventorItems from './productitem';
import { storeNftItem } from 'core/store/reducers/nft';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Inventor = () => {

    const { account } = useWallet()
    const { getNFTsByUser } = useAllNFT();

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [nftList, setNftList] = useState<Array<Object>>([]);

    useEffect(() => {
        if (account) {
            getNFTsByUser()
                .then(datas => {
                    setNftList(datas);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [account])

    const goToItemDetail = (item: any) => {
        dispatch(storeNftItem(item));
        navigate(`/mint/inventor/detail`);
    }

    const backToPage = () => {
        navigate("/mint")
    }

    return (
        <div className="pt-5r font-Rajdhani">
            <div className="container">
                <div className='page-content'>
                    <div className="back flex justify-start items-center cursor-pointer" onClick={backToPage}>
                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.67449 10.8129C6.76172 10.7291 6.81055 10.6168 6.81055 10.4997C6.81055 10.3827 6.76172 10.2703 6.67449 10.1866L1.80149 5.50005L6.67449 0.814428C6.76172 0.730711 6.81055 0.618329 6.81055 0.501304C6.81055 0.384278 6.76172 0.271894 6.67449 0.188178C6.6321 0.147356 6.58141 0.11491 6.52542 0.0927553C6.46943 0.0706015 6.40927 0.0591879 6.34849 0.0591879C6.28772 0.0591879 6.22756 0.0706015 6.17157 0.0927553C6.11558 0.11491 6.06489 0.147356 6.02249 0.188178L0.840494 5.17287C0.74948 5.2604 0.698542 5.37781 0.698542 5.50005C0.698542 5.6223 0.74948 5.7397 0.840494 5.82724L6.02249 10.8119C6.06489 10.8527 6.11558 10.8852 6.17157 10.9073C6.22756 10.9295 6.28772 10.9409 6.34849 10.9409C6.40927 10.9409 6.46943 10.9295 6.52542 10.9073C6.58141 10.8852 6.6321 10.8527 6.67449 10.8119V10.8129Z" fill="#585858" />
                        </svg>
                        <div className="ml-10 text-17 uppercase font-normal text-davygrey tracking-wider">
                            Back
                        </div>
                    </div>

                    <div className="mt-25 flex justify-start items-center">
                        <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9142 10.5344L1.27396 19.2782C1.16973 19.384 1.03685 19.4561 0.892123 19.4853C0.7474 19.5146 0.597346 19.4998 0.460951 19.4428C0.324556 19.3857 0.207954 19.289 0.1259 19.1648C0.0438466 19.0407 3.13491e-05 18.8947 0 18.7453V1.25466C3.13491e-05 1.1053 0.0438466 0.959312 0.1259 0.835166C0.207954 0.71102 0.324556 0.614299 0.460951 0.557244C0.597346 0.50019 0.7474 0.485367 0.892123 0.514652C1.03685 0.543937 1.16973 0.616012 1.27396 0.721757L9.9142 9.46559C9.98367 9.5357 10.0388 9.619 10.0764 9.7107C10.114 9.80241 10.1333 9.90071 10.1333 10C10.1333 10.0993 10.114 10.1976 10.0764 10.2893C10.0388 10.381 9.98367 10.4643 9.9142 10.5344Z" fill="#EEBC4E" />
                        </svg>
                        <p className="ml-10 text-34 font-semibold text-default tracking-widest uppercase">
                            Create <span className="text-davygrey font-normal">New NFT</span>
                        </p>
                    </div>

                    <div className="mt-[2px]">
                        <p className="text-25 font-semibold tracking-5p text-davygrey">Import Item from your inventory</p>
                    </div>

                    <div className="mt-[2px] flex justify-start items-center">
                        <p className="text-25 font-medium tracking-5p text-davygrey uppercase">Game:</p>
                        <div className="ml-[1rem] flex justify-start items-center gap-2">
                            <span className="text-25 font-medium tracking-5p text-default uppercase">Grandora</span>
                            <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5209 0.385767C12.426 0.293094 12.2986 0.241211 12.166 0.241211C12.0334 0.241211 11.906 0.293094 11.8111 0.385767L6.4997 5.56333L1.18933 0.385767C1.09445 0.293093 0.967082 0.24121 0.834453 0.24121C0.701824 0.24121 0.574456 0.293093 0.479577 0.385767C0.433312 0.430813 0.396541 0.48467 0.371432 0.544161C0.346324 0.603652 0.333388 0.667569 0.333388 0.732142C0.333388 0.796714 0.346324 0.860632 0.371432 0.920123C0.396541 0.979613 0.433312 1.03347 0.479577 1.07852L6.12889 6.58439C6.2281 6.6811 6.36116 6.73522 6.4997 6.73522C6.63824 6.73522 6.7713 6.6811 6.87051 6.58439L12.5198 1.07852C12.5661 1.03347 12.6029 0.979614 12.628 0.920123C12.6531 0.860633 12.666 0.796714 12.666 0.732142C12.666 0.66757 12.6531 0.603652 12.628 0.544162C12.6029 0.484671 12.5661 0.430813 12.5198 0.385767L12.5209 0.385767Z" fill="#4E4D4D" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-50 mx-50">
                        <Carousel responsive={responsive} infinite>
                            {
                                nftList.map((item, index) => {
                                    return <InventorItems item={item} num={index} key={index} onClick={() => goToItemDetail(item)} />
                                })
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inventor;