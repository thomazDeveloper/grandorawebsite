
import { useState } from 'react';
import { useParams } from "react-router";

import axios from 'axios';
import { SERVER_URL } from 'config/config';

import { useSelector } from 'core/store/store';

import useBuyNFT from "hooks/useBuyNFT";
import useMint from 'hooks/useMint';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import { create, } from 'ipfs-http-client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCaretRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { nftproducts } from "core/data/nftproducts";
import Nbutton from "components/Nbutton";
import DropTab from "components/DropTab";

import Spinner from "components/Spinner";
import { useNavigate } from 'react-router-dom';


const client = create({ url: 'https://infura-ipfs.io:5001/api/v0' })


const InventorDetail = () => {

    const navigate = useNavigate();
    const { account } = useWallet()
    const { onMint } = useMint()

    const { nftItem } = useSelector(store => store.nft);

    const [nftPrice, setNftPrice] = useState("");
    const [tokenType, setTokenType] = useState("1");
    const [loading, setLoading] = useState(false)

    const reduceName = (name: string | undefined) => {
        if (name === undefined) {
            return "";
        } else {
            return name.substr(0, 6) + "....." + name.substr(-6, 6);
        }
    }

    const onConfirm = () => {
        console.log("hello");

        if (!account) return;
        if (!nftPrice) return alert('Please fill out all forms');

        console.log(nftItem, "nftItem")

        let nftInfo = {
            url: nftItem.url,
            preview: nftItem.preview,
            type: nftItem.type,
            artist: account,
            name: nftItem.name,
            price: nftPrice,
            maxSupply: nftItem.maxSupply,
            creater: account,
            description: nftItem.description,
            externalLink: nftItem.externalLink,
            collection: nftItem.collection,
            createdAt: new Date().getTime()
        }

        setLoading(true);

        client.add(JSON.stringify(nftInfo))
            .then(data => {
                const uri = `https://infura-ipfs.io/ipfs/${data.path}`;
                let _tokenType = false;

                if (tokenType === "1") {
                    _tokenType = true;
                }

                onMint(Number(nftPrice), uri, Number(nftItem.maxSupply), nftInfo.artist, _tokenType, Number(nftInfo.collection))
                    .then(tx => {
                        console.log(tx, "aaaaa")
                        setLoading(false);
                        if (tx.status === true) {

                            let save_dt = {
                                transaction_id: tx.transactionHash,
                                nft_id: tx.token_id,
                                types: "List",
                                url: nftInfo.url,
                                name: nftInfo.name,
                                price: nftInfo.price,
                                quantity: nftInfo.maxSupply,
                                feetoken_type: _tokenType,
                                from: "0x0000000000000000000000000000000000000000",
                                to: account,
                            }

                            console.log(save_dt, "save_dt");

                            axios.post(`${SERVER_URL}api/create`, save_dt).then(resp => {
                                if (resp.status) {
                                    alert('Minted successfully');
                                } else {
                                    alert('Transaction log is failed');
                                }
                            }).catch(err => {
                                console.log(err);
                            })

                            alert('Minted successfully');
                        } else {
                            alert('Transaction was failed');
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                        console.log(error);
                        alert('Transaction was failed');
                    })
            })
            .catch(error => {
                setLoading(false);
                console.log(error)
                alert('Transaction was failed');
            })

    }

    const backToPage = () => {
        navigate("/mint/inventor")
    }

    // if (loading) return <Spinner />;

    return (
        <div className="pt-60 w-full font-Rajdhani">
            <div className="container">
                <div className="detail-page">

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
                        <p className="ml-10 text-34 font-semibold text-default tracking-widest uppercase leading-[43px]">
                            Create  <span className="text-davygrey font-normal">New NFT</span>
                        </p>
                    </div>

                    <div className="mb-1r">
                        <p className="text-25 font-semibold tracking-5p text-davygrey leading-[32px]">Item Detail</p>
                    </div>

                    <div className="detail-main gap-5">

                        <div className="d-logo">
                            <div className="logo-img">
                                <img src={nftItem.url} alt="logo-img" />
                            </div>
                            <div className="logo-btn gap-3">
                                <button type="button" className="content-btn">2D view</button>
                                <button type="button" className="outline-btn">3D view</button>
                            </div>
                        </div>

                        <div className="d-content">
                            <div className="d-row-1">

                                <div className="row-text-1">
                                    <p>GRANDORA</p>
                                    <span>{nftItem.name}</span>
                                </div>

                                <div className="row-text-2">
                                    <span>TKEN: 937374........39827498</span>
                                </div>

                                <div className="row-text-3">
                                    <div className="r-title">
                                        <p>Creat By:</p>
                                        <span>{reduceName(nftItem.creater)}</span>
                                    </div>
                                </div>

                                <div className="mt-1r w-full">
                                    <label className="text-20 font-medium tracking-5p text-davygrey">
                                        Price<span className="text-red">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full rounded-4 border-borderdefault text-davygrey text-18 tracking-5p"
                                        placeholder="1.25 BSC"
                                        value={nftPrice}
                                        onChange={(e) => setNftPrice(e.target.value)}
                                    />
                                </div>

                                <div className="mt-1 w-full">
                                    <label className="text-20 font-medium tracking-5p text-davygrey">
                                        Chains
                                    </label>
                                    <select
                                        value={tokenType}
                                        onChange={e => setTokenType(e.target.value)}
                                        className="w-full rounded-4 border-borderdefault text-davygrey text-18 tracking-5p"
                                    >
                                        <option value={"1"}>
                                            <p className="text-18 font-medium tracking-5p text-davygrey">BEP20</p>
                                        </option>
                                        <option value={"2"}>
                                            <p className="text-18 font-medium tracking-5p text-davygrey">ERC20</p>
                                        </option>
                                    </select>
                                </div>

                                <div className="row-text-6 grid grid-cols-2 gap-3">
                                    <div className="row-box">
                                        <div>
                                            <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-7 my-5p" />
                                            <div className="b-text">
                                                <p>Type</p>
                                                <span>Enity</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-box">
                                        <div>
                                            <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-7 my-5p" />
                                            <div className="b-text">
                                                <p>Type</p>
                                                <span>Enity</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-box">
                                        <div>
                                            <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-7 my-5p" />
                                            <div className="b-text">
                                                <p>Type</p>
                                                <span>Enity</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-box">
                                        <div>
                                            <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-7 my-5p" />
                                            <div className="b-text">
                                                <p>Type</p>
                                                <span>Enity</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-row-2">
                                <DropTab title="description" index="0" active>
                                    <p className="text-davygrey whitespace-normal">
                                        {nftItem.description}
                                    </p>
                                </DropTab>
                                <DropTab title="description" index="1" active>
                                    <p className="text-davygrey font-semibold mt-10">Contract Address</p>
                                    <p className="text-davygrey">{"0x8806"}</p>

                                    <p className="text-davygrey font-semibold"> Token ID</p>
                                    <p className="text-davygrey">2428</p>

                                    <p className="text-davygrey font-semibold"> Token Standard</p>
                                    <p className="text-davygrey">ERC-721</p>

                                    <p className="text-davygrey font-semibold"> Blockchain</p>
                                    <p className="text-davygrey mb-10">Ethereum</p>
                                </DropTab>
                                <DropTab title="properties" index="2" hide>
                                    <p className="text-davygrey whitespace-normal">
                                        Jenkins The Valet’s Writer’s Room is a Collection of 6942 NFTs That Unlock a Memberrs-Only Web3 Authenticated
                                    </p>
                                </DropTab>
                                <DropTab title="creating an asset" index="3" hide>
                                    <p className="text-davygrey whitespace-normal">
                                        Jenkins The Valet’s Writer’s Room is a Collection of 6942 NFTs That Unlock a Memberrs-Only Web3 Authenticated
                                    </p>
                                </DropTab>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3r flex justify-center items-center">
                        <button
                            className="h-40 px-8r bg-default text-white border-10 border-default rounded-5 text-18 font-medium tracking-6 uppercase"
                            onClick={onConfirm}
                        >
                            Confirm
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InventorDetail;