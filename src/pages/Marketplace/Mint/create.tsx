import React, { useState, useRef, useEffect } from "react";
import { FiImage } from "react-icons/fi"
import axios from "axios";
import { SERVER_URL } from "config/config";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import PulseLoader from "react-spinners/PulseLoader";
import { create, urlSource } from 'ipfs-http-client';

import Spinner from "components/Spinner";

import useMint from "hooks/useMint";
import BigNumber from 'bignumber.js'
import { useNavigate } from 'react-router-dom';
import Popup from "components/signin/Popup";
import { NFTAttrProps, NFTLevelProps } from 'core/interfaces/pages';

const allowType = ['jpeg', 'png', 'gif', 'svg', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'glb', 'gltf', 'mpeg'];
const projectId="2EQwdrRghlfXiEAVdfR6QyC6Izi"
const projectSecret="c3b2d3226f573c1c533e214ba04c08ef";
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create(
{  
host: 'ipfs.infura.io',
port: 5001,
protocol: 'https',
headers: {
    authorization: auth,
},
})
const Create = () => {

    const navigate = useNavigate();

    const { account } = useWallet()
    const mainDropzone: any = useRef();
    const previewDropzone: any = useRef()
    const [type, setType] = useState();
    const [requirePreview, setRequirePreview] = useState(false);

    const [wShowModal, setWShowModal] = useState(false);
    const [lShowModal, setLShowModal] = useState(false);
    const [show,setShow]=useState(false);
    const [content,setContent]=useState("");
    const [loading, setLoading] = useState(false)


    const [nftName, setNftName] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const [nftDescription, setNftDescription] = useState("");
    const [nftCollection, setNftCollection] = useState("");
    const [nftPrice, setNftPrice] = useState("");
    const [artist, setArtist] = useState("");
    const [supply, setSupply] = useState("");
    const [tokenType, setTokenType] = useState("true");
    const [stats, setStats] = useState(false);
    const [unlock, setUnlock] = useState(false);
    const [sensitive, setSensitive] = useState(false);

    const [nftAttr, setNftAttr] = useState<NFTAttrProps[]>([]);
    const [attrType, setAttrType] = useState("");
    const [attrName, setAttrName] = useState("");

    const [nftLevel, setNftLevel] = useState<NFTLevelProps[]>([]);
    const [levelName, setLevelName] = useState("");
    const [levelVal, setLevelVal] = useState("");


    const { onMint } = useMint()

    const _handleMain = (file: any, status: any, allFiles: any): void => {
        if (status === "done") {

            const fileType = file.file.type.split('/');
            if (allowType.indexOf(fileType[1]) === -1) {
                // NotificationManager.warning('File not allowed', '', 3000);
                alert('File not allowed');
                return file.remove();
            }

            setType(fileType[0]);

            if (fileType[0] === "image") {
                setRequirePreview(false)
            } else {
                setRequirePreview(true)
            }
        }

        if (status === "removed") {
            setRequirePreview(false)
        }
    }

    const _handlePrev = (file: any, status: any, allFiles: any): void => {
        if (status === "done") {
            const fileType = file.file.type.split('/');
            if (allowType.indexOf(fileType[1]) === -1) {
                // NotificationManager.warning('File not allowed', '', 3000);
                alert("File not allowed")
                return file.remove();
            }
            if (fileType[0] !== "image") return file.remove();
        }
    }

    const onCreate = async () => {

        if (!account) return;
        if (!mainDropzone.current.files.length) return alert('Please upload NFT file');
        if (!nftName || !externalLink || !nftDescription || !nftCollection || !nftPrice || !supply) return alert('Please fill out all forms');

        if (nftAttr.length < 1) return alert('Please enter the Properties');
        if (nftLevel.length < 1) return alert('Please enter the Levels');

        let nftInfo = {
            url: '',
            preview: '',
            type,
            artist: account,
            name: nftName,
            price: nftPrice,
            maxSupply: supply,
            creater: account,
            description: nftDescription,
            externalLink,
            collection: nftCollection,
            stats,
            unlock,
            sensitive,
            properties: JSON.stringify(nftAttr),
            level: JSON.stringify(nftLevel),
            createdAt: new Date().getTime()
        }
        setLoading(true);

        const mainReader = new window.FileReader();
        mainReader.readAsArrayBuffer(mainDropzone.current.files[0].file);
        mainReader.onloadend = async () => {
            try {
                let result: any = mainReader.result;

                const added = await client.add(result);
                nftInfo.url = `https://infura-ipfs.io/ipfs/${added.path}`;

                if (previewDropzone.current && previewDropzone.current.files.length) {
                    const PreReader = new window.FileReader();
                    PreReader.readAsArrayBuffer(previewDropzone.current.files[0].file);
                    PreReader.onloadend = async () => {
                        try {
                            let result: any = PreReader.result;
                            const added = await client.add(result);

                            nftInfo.preview = `https://infura-ipfs.io/ipfs/${added.path}`;
                            _mint(nftInfo)
                        } catch (error) {
                            console.log(error)
                            setLoading(false);
                            alert('Mint failed');
                        }
                    }
                } else {
                    _mint(nftInfo)
                }

            } catch (error) {
                console.log(error)
                setLoading(false);
                alert('Mint failed');
            }
        }
    }

    const _mint = async (nftInfo: any) => {
        try {
            const added = await client.add(JSON.stringify(nftInfo))
            const uri = `https://infura-ipfs.io/ipfs/${added.path}`;

            let _tokenType = false;

            if (tokenType === "true") {
                _tokenType = true;
            }

            const tx = await onMint(Number(nftPrice), uri, Number(supply), nftInfo.artist, _tokenType, Number(nftInfo.collection));

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
                        setShow(true);
                        setContent('Minted successfully');
                    } else {
                        alert('Transaction log is failed');
                    }
                    mainDropzone.current.files[0].remove();
                }).catch(err => {
                    console.log(err);
                })

            } else {
                alert('Transaction was failed');
            }


            setNftName("")
            setExternalLink("")
            setNftDescription("")
            setNftCollection("")
            setNftPrice("")
            setArtist("")
            setSupply("")
            setTokenType("true")
            setStats(false)
            setUnlock(false)
            setSensitive(false)
            setNftAttr([])
            setNftLevel([])

            setLoading(false);

        } catch (error) {
            setLoading(false);

            console.log(error)
        }
    };

    const backToPage = () => {
        navigate("/mint")
    }

    const addAttrMore = () => {

        if (attrName === "" && attrType === "") {
            alert("Please fill the forms.")
            return;
        }

        let new_val = [...nftAttr, { type: attrType, name: attrName }];
        setNftAttr(new_val);
        setAttrName("");
        setAttrType("");
    }

    const removeAttr = (index: number) => {
        let new_val = [...nftAttr];
        new_val.splice(index, 1);

        setNftAttr(new_val);
    }

    const saveNftAttr = () => {
        setWShowModal(false)
        setAttrName("");
        setAttrType("");
    }

    const addLevelMore = () => {

        if (levelName === "" && levelVal === "") {
            alert("Please fill the forms.")
            return;
        }

        let new_val = [...nftLevel, { name: levelName, value: Number(levelVal) }];
        setNftLevel(new_val);

        setLevelName("");
        setLevelVal("");
    }

    const removeLevel = (index: number) => {
        let new_val = [...nftLevel];
        new_val.splice(index, 1);

        setNftLevel(new_val);
    }

    const saveNftLevel = () => {
        setLShowModal(false)
        setLevelName("");
        setLevelVal("");
    }

    // if (loading) return <Spinner />;

    return (
        <div className="pt-5r pb-100 font-Rajdhani">
            <div className="container">
                <div className="page-content">
                    <div className="flex justify-start items-center text-17 cursor-pointer" onClick={backToPage}>
                        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.67449 10.8129C6.76172 10.7291 6.81055 10.6168 6.81055 10.4997C6.81055 10.3827 6.76172 10.2703 6.67449 10.1866L1.80149 5.50005L6.67449 0.814428C6.76172 0.730711 6.81055 0.618329 6.81055 0.501304C6.81055 0.384278 6.76172 0.271894 6.67449 0.188178C6.6321 0.147356 6.58141 0.11491 6.52542 0.0927553C6.46943 0.0706015 6.40927 0.0591879 6.34849 0.0591879C6.28772 0.0591879 6.22756 0.0706015 6.17157 0.0927553C6.11558 0.11491 6.06489 0.147356 6.02249 0.188178L0.840494 5.17287C0.74948 5.2604 0.698542 5.37781 0.698542 5.50005C0.698542 5.6223 0.74948 5.7397 0.840494 5.82724L6.02249 10.8119C6.06489 10.8527 6.11558 10.8852 6.17157 10.9073C6.22756 10.9295 6.28772 10.9409 6.34849 10.9409C6.40927 10.9409 6.46943 10.9295 6.52542 10.9073C6.58141 10.8852 6.6321 10.8527 6.67449 10.8119V10.8129Z" fill="#585858" />
                        </svg>
                        <div className="ml-10 uppercase font-normal text-davygrey tracking-wider">
                            Back
                        </div>
                    </div>
                    <div className="mt-25 flex justify-start items-center">
                        <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9142 10.5344L1.27396 19.2782C1.16973 19.384 1.03685 19.4561 0.892123 19.4853C0.7474 19.5146 0.597346 19.4998 0.460951 19.4428C0.324556 19.3857 0.207954 19.289 0.1259 19.1648C0.0438466 19.0407 3.13491e-05 18.8947 0 18.7453V1.25466C3.13491e-05 1.1053 0.0438466 0.959312 0.1259 0.835166C0.207954 0.71102 0.324556 0.614299 0.460951 0.557244C0.597346 0.50019 0.7474 0.485367 0.892123 0.514652C1.03685 0.543937 1.16973 0.616012 1.27396 0.721757L9.9142 9.46559C9.98367 9.5357 10.0388 9.619 10.0764 9.7107C10.114 9.80241 10.1333 9.90071 10.1333 10C10.1333 10.0993 10.114 10.1976 10.0764 10.2893C10.0388 10.381 9.98367 10.4643 9.9142 10.5344Z" fill="#EEBC4E" />
                        </svg>
                        <div className="ml-10 text-34 font-semibold text-default tracking-widest uppercase">
                            Create <span className="text-davygrey font-normal">New NFT</span>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-5">
                        <div className="flex flex-col justify-start items-center">
                            <div className="text-25 font-semibold text-davygrey mb-10">
                                Upload Item
                            </div>
                            <div className="h-367 w-full border-dashed border-2 border-indigo-600 border-darkMintGreen rounded-2xl cursor-pointer">

                                {/* <div className="flex justify-center items-center">
                                <FiImage className="w-111 h-112 stroke-1 text-darkMintGreen" />
                            </div> */}

                                <Dropzone
                                    // className="flex justify-center items-center"
                                    ref={mainDropzone}
                                    onChangeStatus={_handleMain}
                                    maxFiles={1}
                                    multiple={false}
                                    canCancel={false}
                                    inputContent={(files, extra) => (extra.reject ? <FiImage className="w-111 h-112 stroke-1 text-darkMintGreen" /> : <FiImage className="w-111 h-112 stroke-1 text-darkMintGreen" />)}
                                    styles={{
                                        dropzoneActive: { borderColor: 'green' },
                                    }}
                                />
                                {
                                    requirePreview && (
                                        <Dropzone
                                            ref={previewDropzone}
                                            onChangeStatus={_handlePrev}
                                            maxFiles={1}
                                            accept="image/jpeg,image/png,image/svg,image/gif"
                                            multiple={false}
                                            canCancel={false}
                                            inputContent={(files, extra) => (extra.reject ? 'Preview Image (Optional)' : 'Preview Image (Optional)')}
                                            styles={{
                                                dropzoneActive: { borderColor: 'green' },
                                            }}
                                        />
                                    )
                                }
                            </div>
                            <div className="w-full flex flex-col justify-center items-start mt-15">
                                <div className="text-20 font-medium text-davygrey tracking-wider">
                                    Image, Video, Audio or 3D Model*
                                </div>
                                <div className="flex flex-col justify-center items-start mt-1 text-14 font-normal text-davygrey tracking-widest">
                                    <div>Support: JPG, PNG, GIF, SVG, MP4, WEBM. MP3, WAV, OGG, GLB, GLTF</div>
                                    <div>Max Size: 100 MB</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-center pt-45">
                            <div className="flex flex-col justify-center items-start w-full">
                                <label className="font-Rajdhani font-medium tracking-wider text-20">Name <span className="text-red">*</span></label>
                                <input
                                    type="text"
                                    className="w-full rounded border-borderdefault text-davygrey text-20 focus:border-borderdefault"
                                    placeholder="Item Name"
                                    value={nftName}
                                    onChange={(e) => setNftName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-start w-full mt-20">
                                <label className="font-Rajdhani font-medium tracking-wider text-20">External Link</label>
                                <div className="w-full font-normal text-12 text-davygrey tracking-widest">We will include link to this URL on this Item’s Detail page, You welcome to link to your own webpage with more detail.</div>
                                <input
                                    type="text"
                                    className="w-full rounded border-borderdefault text-davygrey text-20 focus:border-borderdefault"
                                    placeholder="https://yourwebsite.com/"
                                    value={externalLink}
                                    onChange={(e) => setExternalLink(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-start w-full mt-20">
                                <label className="font-Rajdhani font-medium tracking-wider text-20">Description</label>
                                <textarea
                                    className="w-full rounded border-borderdefault text-davygrey text-20 focus:border-borderdefault"
                                    placeholder="Provide a Detailed Description of your item."
                                    rows={5}
                                    value={nftDescription}
                                    onChange={e => setNftDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col justify-center items-start w-full mt-20">
                                <label className="text-davygrey font-medium text-20 tracking-wider">Collection</label>
                                <span className="font-normal text-12 text-davygrey tracking-widest">This is Collection where your item will appear.</span>
                                <select
                                    value={nftCollection}
                                    onChange={e => setNftCollection(e.target.value)}
                                    className="w-full rounded border-borderdefault text-davygrey text-20"
                                >
                                    <option value={""}>Provide a Detailed Description of your item.</option>
                                    <option value={"1"}>1</option>
                                    <option value={"2"}>2</option>
                                    <option value={"3"}>3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-50">
                        <div className="font-semibold text-25 tracking-wider text-davygrey">Item Detail</div>
                        <div className="py-20 px-30 grid grid-cols-2 gap-4">
                            <div className="flex flex-col justify-start items-start">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Properties</div>
                                            <div className="font-normal text-12 tracking-widest">Textual Traits that show up as rectangles</div>
                                        </div>
                                    </div>
                                    <button className="bg-darkMintGreen uppercase h-40 font-normal text-15 text-center text-white rounded-5 py-2p px-40p border" onClick={() => setWShowModal(true)}>Add</button>
                                </div>
                                <div className="flex justify-between items-start w-full mt-10">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Stats</div>
                                            <div className="font-normal text-12 tracking-widest">Numerical Traits that show as a progess bar</div>
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center items-center">
                                        <div className="h-switch">
                                            <input
                                                type="checkbox"
                                                id="s-switch"
                                                defaultChecked={stats}
                                                onChange={e => {
                                                    setStats(e.target.checked)
                                                }}
                                            />
                                            <label htmlFor="s-switch">Toggle</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start w-full mt-10">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Unlockable Content</div>
                                            <div className="font-normal text-12 tracking-widest">Include unlockable content that can only be revealed by the owner of the item.</div>
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center items-center">
                                        <div className="h-switch">
                                            <input
                                                type="checkbox"
                                                id="u-switch"
                                                defaultChecked={unlock}
                                                onChange={e => {
                                                    setUnlock(e.target.checked)
                                                }}
                                            />
                                            <label htmlFor="u-switch">Toggle</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <div className="flex justify-between items-start w-full">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Levels</div>
                                            <div className="font-normal text-12 tracking-widest">Numerical traits that show as a progress bar</div>
                                        </div>
                                    </div>
                                    <button className="bg-darkMintGreen uppercase h-40 font-normal text-15 text-center text-white rounded-5 py-2p px-40p border" onClick={() => setLShowModal(true)}>Add</button>
                                </div>
                                <div className="flex justify-between items-start w-full mt-10">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Supply</div>
                                            <div className="font-normal text-12 tracking-widest">The Number of Copies that can be minted.</div>
                                        </div>
                                    </div>
                                    <div className="w-105 h-40">
                                        <input
                                            type="number"
                                            className="w-full rounded border-borderdefault text-davygrey text-20 focus:border-borderdefault"
                                            placeholder="1"
                                            value={supply}
                                            onChange={e => setSupply(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-start w-full mt-10">
                                    <div className="flex justify-center items-start">
                                        <svg className="mt-8" width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.827 7.92679L1.00576 14.8298C0.923472 14.9133 0.818562 14.9702 0.704308 14.9933C0.590053 15.0164 0.471589 15.0047 0.363909 14.9597C0.256229 14.9146 0.164174 14.8383 0.0993948 14.7403C0.0346157 14.6423 2.47492e-05 14.527 0 14.4091V0.600666C2.47492e-05 0.482753 0.0346157 0.367498 0.0993948 0.269488C0.164174 0.171477 0.256229 0.0951186 0.363909 0.0500755C0.471589 0.00503251 0.590053 -0.00666939 0.704308 0.0164501C0.818562 0.0395696 0.923472 0.0964715 1.00576 0.179954L7.827 7.08298C7.88184 7.13833 7.92535 7.20409 7.95503 7.27649C7.98472 7.34889 8 7.4265 8 7.50488C8 7.58327 7.98472 7.66088 7.95503 7.73327C7.92535 7.80567 7.88184 7.87143 7.827 7.92679Z" fill="#2AB8F4" />
                                        </svg>
                                        <div className="flex flex-col justify-center items-start text-davygrey ml-12">
                                            <div className="font-medium text-20 tracking-wider">Explicit & Sensitive Content</div>
                                            <div className="font-normal text-12 tracking-widest">Set this item as explicit and sensitive content</div>
                                        </div>
                                    </div>
                                    <div className="h-full flex justify-center items-center">
                                        <div className="h-switch">
                                            <input
                                                type="checkbox"
                                                id="e-switch"
                                                defaultChecked={sensitive}
                                                onChange={e => {
                                                    setSensitive(e.target.checked)
                                                }}
                                            />
                                            <label htmlFor="e-switch">Toggle</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-40">
                        <div className="font-semibold text-25 tracking-wider text-davygrey">
                            Price & Chains
                        </div>
                        <div className="py-10 grid grid-cols-2 gap-5">
                            <div className="flex flex-col justify-center items-start text-davygrey">
                                <label className="font-medium text-20 tracking-wider">Price <span className="text-red">*</span></label>
                                <input
                                    type="number"
                                    className="w-full rounded border-borderdefault text-davygrey text-20 focus:border-borderdefault"
                                    placeholder="0 BSC"
                                    value={nftPrice}
                                    onChange={e => setNftPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="font-medium text-20 tracking-wider">Chains</label>
                                <select className="w-full rounded border-borderdefault text-davygrey text-20" value={tokenType} onChange={e => setTokenType(e.target.value)}>
                                    <option value={"true"}>BEP20</option>
                                    <option value={"false"}>ERC20</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-[5rem]">
                            <button
                                onClick={onCreate}
                                className="w-370 h-40 bg-default text-white text-18 text-medium tracking-wider rounded-5"
                            >
                                {
                                    loading ?
                                        <PulseLoader size={10} color="white" />
                                        :
                                        <span>CREATE</span>
                                }
                                {/* Create */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {wShowModal ? (
                <>
                    <div className="text-davygrey font-Rajdhani justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-3000 outline-none focus:outline-none">
                        <div className="relative w-full md:w-1/2 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white pb-[2rem] outline-none focus:outline-none">
                                {/* header */}
                                <div className="flex justify-center items-center w-full p-[1.25rem] rounded-t ">
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="font-semibold text-32 tracking-wider text-davygrey">
                                            Add Properies
                                        </h3>
                                        <span className="font-normal text-16 tracking-widest text-davygrey">
                                            Properties show up on your item
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-30 right-20 p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setWShowModal(false)}
                                    >
                                        <span className="bg-transparent h-[1.5rem] w-[1.5rem] text-5xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/* body */}
                                <div className="relative px-[1.5rem] flex flex-col justify-center items-start">
                                    <div className="w-full p-30 border-t-[1px] border-b-[1px] border-solid border-cloud">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col justify-center items-start">
                                                <label className="font-medium text-20 tracking-wider text-davygrey mb-1">Type</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded border-borderdefault text-davygrey text-14"
                                                    placeholder="Character"
                                                    value={attrType}
                                                    onChange={e => setAttrType(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-start">
                                                <label className="font-medium text-20 tracking-wider text-davygrey mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded border-borderdefault text-davygrey text-14"
                                                    placeholder="Male"
                                                    value={attrName}
                                                    onChange={e => setAttrName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="bg-white text-darkMintGreen h-40 px-3 border-10 border-darkMintGreen text-15 text-center uppercase font-medium tracking-wider rounded-5 leading-10 "
                                                onClick={addAttrMore}
                                            >
                                                Add More
                                            </button>
                                        </div>
                                        <div className="mt-1r grid grid-cols-4 gap-1">
                                            {nftAttr.map((item, index) => {
                                                return (
                                                    <div key={index} className="bg-chip w-full flex justify-between items-center rounded-3 py-[.25rem] px-[.5rem]">
                                                        <div className="flex justify-start items-center">
                                                            <p className="font-semibold text-12 text-davygrey">{item.type}:</p>
                                                            <span className="ml-[.25rem] font-normal text-12 text-davygrey">{item.name}</span>
                                                        </div>
                                                        <span className="font-semibold text-15 cursor-pointer" onClick={() => removeAttr(index)}>&times;</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center items-center mt-3">
                                        <button
                                            type="button"
                                            className="bg-darkMintGreen text-white h-40 px-[5rem] border-10 border-darkMintGreen text-18 text-center uppercase font-medium tracking-wider rounded-5 leading-10"
                                            onClick={saveNftAttr}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-2500 bg-black" />
                </>
            ) : null}

            {lShowModal ? (
                <>
                    <div className="text-davygrey font-Rajdhani justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-3000 outline-none focus:outline-none">
                        <div className="relative w-full md:w-1/2 my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white pb-[2rem] outline-none focus:outline-none">
                                {/* header */}
                                <div className="flex justify-center items-center w-full p-[1.25rem] rounded-t ">
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="font-semibold text-32 tracking-wider text-davygrey">
                                            Add Levels
                                        </h3>
                                        <span className="font-normal text-16 tracking-widest text-davygrey">
                                            Levels of on your item
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-30 right-20 p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setLShowModal(false)}
                                    >
                                        <span className="bg-transparent h-[1.5rem] w-[1.5rem] text-5xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/* body */}
                                <div className="relative px-[1.5rem] flex flex-col justify-center items-start">
                                    <div className="w-full p-30 border-t-[1px] border-b-[1px] border-solid border-cloud">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col justify-center items-start">
                                                <label className="font-medium text-20 tracking-wider text-davygrey mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded border-borderdefault text-davygrey text-14"
                                                    placeholder="Speed"
                                                    value={levelName}
                                                    onChange={e => setLevelName(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center items-start">
                                                <label className="font-medium text-20 tracking-wider text-davygrey mb-1">Value</label>
                                                <input
                                                    type="number"
                                                    className="w-full rounded border-borderdefault text-davygrey text-14"
                                                    placeholder="0"
                                                    value={levelVal}
                                                    onChange={e => setLevelVal(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="bg-white text-darkMintGreen h-40 px-3 border-10 border-darkMintGreen text-15 text-center uppercase font-medium tracking-wider rounded-5 leading-10 "
                                                onClick={addLevelMore}
                                            >
                                                Add More
                                            </button>
                                        </div>
                                        <div className="mt-1r grid grid-cols-4 gap-1">
                                            {nftLevel.map((item, index) => {
                                                return (
                                                    <div key={index} className="bg-chip w-full flex justify-between items-center rounded-3 py-[.25rem] px-[.5rem]">
                                                        <div className="flex justify-start items-center">
                                                            <p className="font-semibold text-12 text-davygrey">{item.name}:</p>
                                                            <span className="ml-[.25rem] font-normal text-12 text-davygrey">{item.value}</span>
                                                        </div>
                                                        <span className="font-semibold text-15 cursor-pointer" onClick={() => removeLevel(index)}>&times;</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center items-center mt-3">
                                        <button
                                            type="button"
                                            className="bg-darkMintGreen text-white h-40 px-[5rem] border-10 border-darkMintGreen text-18 text-center uppercase font-medium tracking-wider rounded-5 leading-10 "
                                            onClick={saveNftLevel}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-2500 bg-black" />
                </>
            ) : null}
          <Popup show={show} onHide={() => setShow(false)}>
            <div className="text-center">
            <p className='text-center text-Rose text-36 text-texasRose font-Rajdhani'>{content}</p>
            <button className="uppercase px-25p mb-3 mx-13p h-30 rounded-4 bg-davygrey text-white text-14 font-semibold" onClick={()=>navigate("/dashboard")}>OK</button>
            </div>
          </Popup>
        </div>
    )
}

export default Create;