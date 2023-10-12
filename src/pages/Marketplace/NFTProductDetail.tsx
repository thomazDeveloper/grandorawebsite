
import { useEffect,useState } from 'react';
import { useParams } from "react-router";
import { useNavigate} from 'react-router';
import contracts from 'config/constants/constants'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faCaretRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { nftproducts } from "../../core/data/nftproducts";
import Nbutton from "../../components/Nbutton";
import DropTab from "../../components/DropTab";
import ProductNFTItem from "../../components/ProductNFTItem";
import StatusIcon from "../../components/statusIcon";
import ethereumSvg from "../../assets/images/svgs/ethereum.svg";

import { useDispatch, useSelector } from 'core/store/store';
import useBuyNFT from "hooks/useBuyNFT";
import nft, { stoerAllNfts } from "core/store/reducers/nft";


import Spinner from "components/Spinner";
import Popup from 'components/signin/Popup';
import image1 from "assets/images/marketplace/products/image1.png";
import useAllNFT from "hooks/useAllNFT";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from 'react-responsive';

import { useWallet } from "@binance-chain/bsc-use-wallet";
import axios from 'axios';
import { SERVER_URL } from 'config/config';

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
    items: 3
  }
};


const NFTProductDetail = () => {
  const navigate=useNavigate();

  const mobile = useMediaQuery({ query: '(min-width:640px)' });
  const { account } = useWallet()
  const [show,setShow]=useState(false)
  const [content,setContent]=useState("");
  const [goPage,setPage]=useState("");
  const { getAllNFTs } = useAllNFT();
  const { nfts } = useSelector((store) => store.nft);
  const { nftItem } = useSelector(store => store.nft);
  const { singleBuy } = useBuyNFT();
  const dispatch = useDispatch()

  console.log(nftItem, "nftItem")

  let attrList: any[] = [];
  if (nftItem.properties) {
    attrList = JSON.parse(nftItem.properties);
  }


  const [loading, setLoading] = useState(false);
  const [nftList, setNftList] = useState<Array<Object>>([]);

  useEffect(() => {
    getData();
    console.log(nftItem)
  }, []);

  const getData = () => {
    setLoading(true);
    getAllNFTs()
      .then((data) => {
        setLoading(false);
        setNftList(data);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  const singleBuyNft = () => {

    console.log(nftItem, "nftItem")

    if (nftItem.id !== undefined && nftItem.price !== undefined && nftItem.tokenType !== undefined) {

      setLoading(true);
   
      singleBuy(nftItem.id, nftItem.price, 1, nftItem.tokenType)
        .then(tx => {
          console.log(tx)
          setLoading(false);
          if (tx.status === true) {

            let save_dt = {
              transaction_id: tx.transactionHash,
              nft_id: nftItem.id,
              types: "Sales",
              url: nftItem.url,
              name: nftItem.name,
              price: nftItem.price,
              quantity: 1,
              feetoken_type: nftItem.tokenType,
              from: nftItem.creater,
              to: account,
            }

            console.log(save_dt, "save_dt");

            axios.post(`${SERVER_URL}api/create`, save_dt).then(resp => {
              if (resp.status) {
                setShow(true);
                setContent('Transaction successed');
                setPage("/dashboard")
              } else {
                alert('Transaction failed');
              }
            }).catch(err => {
              console.log(err);
            })

          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          alert('Transaction failed')
        })
    }
  }

  const reduceName = (name: string | undefined) => {
    if (name === undefined) {
      return "";
    } else {
      return name.substr(0, 6) + "....." + name.substr(-6, 6);
    }
  }
  
  const addToCart = () => {
    const index = nfts.findIndex(e => e.item.url === nftItem.url);
    if (index > -1) {
      const allNFTs = [...nfts];
      allNFTs[index] = { ...allNFTs[index], count: allNFTs[index].count + 1 };
      dispatch(stoerAllNfts(allNFTs));
    } else {
      const data = {
        count: 1,
        item: nftItem
      }
      const allNFTs = [...nfts, data];
      dispatch(stoerAllNfts(allNFTs));
    }
    setPage("")
    setShow(true);
    console.log(window.location.pathname)
    setContent("Added the NFT in your Shop Cart.")
   
  }

  // if (loading) return <Spinner />;

  return (
   
    <div className="main-content">
      <div className="container">
        <div className="detail-page">

          <div className="detail-main gap-[0.5rem] sm:gap-[2.5rem]">

            <div className="d-logo">
              <div className="logo-img">
                <img src={nftItem.url} alt="logo-img" />
              </div>
              {mobile &&
                <div className="logo-btn gap-3">
                  <button type="button" className="content-btn">2D view</button>
                  <button type="button" className="outline-btn">3D view</button>
                </div>
              }

            </div>

            <div className="d-content gap-[0.5rem] sm:gap-[2.5rem]">
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
                  <div className="btn-list gap-7">
                    <StatusIcon icon={faHeart} size="25" type="full" />
                    <StatusIcon icon={faFacebookF} size="25" type="full" />
                    <StatusIcon icon={faTwitter} size="25" type="full" />
                  </div>
                </div>

                <div className="row-text-4">
                  {(() => {
                    if (!mobile) {
                      return (
                        <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M25.156 14.8683L13.8122 0.430832C13.7158 0.307575 13.5925 0.207892 13.4518 0.139338C13.3111 0.0707833 13.1566 0.0351563 13.0001 0.0351562C12.8436 0.0351562 12.6891 0.0707833 12.5484 0.139338C12.4077 0.207892 12.2845 0.307575 12.188 0.430832L0.84426 14.8683C0.699856 15.0472 0.621094 15.2701 0.621094 15.5C0.621094 15.7298 0.699856 15.9528 0.84426 16.1316L12.188 30.5691C12.2845 30.6924 12.4077 30.7921 12.5484 30.8606C12.6891 30.9292 12.8436 30.9648 13.0001 30.9648C13.1566 30.9648 13.3111 30.9292 13.4518 30.8606C13.5925 30.7921 13.7158 30.6924 13.8122 30.5691L25.156 16.1316C25.3004 15.9528 25.3791 15.7298 25.3791 15.5C25.3791 15.2701 25.3004 15.0472 25.156 14.8683ZM14.0314 4.04021L22.7196 15.1004L14.0314 19.0578V4.04021ZM11.9689 19.0578L3.28059 15.1004L11.9689 4.04021V19.0578ZM11.9689 21.3265V26.9597L5.08528 18.1941L11.9689 21.3265ZM14.0314 21.3265L20.915 18.1941L14.0314 26.9597V21.3265Z" fill="#585858" />
                        </svg>
                      )
                    } else {
                      return (
                        <svg width="30" height="37" viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.589 17.6003L16.2923 0.677176C16.1792 0.532698 16.0347 0.415854 15.8698 0.335497C15.7049 0.25514 15.5238 0.213379 15.3404 0.213379C15.1569 0.213379 14.9758 0.25514 14.8109 0.335497C14.646 0.415854 14.5015 0.532698 14.3884 0.677176L1.09167 17.6003C0.922401 17.81 0.830078 18.0713 0.830078 18.3407C0.830078 18.6102 0.922401 18.8715 1.09167 19.0811L14.3884 36.0042C14.5015 36.1487 14.646 36.2656 14.8109 36.3459C14.9758 36.4263 15.1569 36.468 15.3404 36.468C15.5238 36.468 15.7049 36.4263 15.8698 36.3459C16.0347 36.2656 16.1792 36.1487 16.2923 36.0042L29.589 19.0811C29.7583 18.8715 29.8506 18.6102 29.8506 18.3407C29.8506 18.0713 29.7583 17.81 29.589 17.6003ZM16.5491 4.90796L26.7333 17.8723L16.5491 22.5111V4.90796ZM14.1316 22.5111L3.94745 17.8723L14.1316 4.90796V22.5111ZM14.1316 25.1704V31.7735L6.06284 21.4987L14.1316 25.1704ZM16.5491 25.1704L24.6179 21.4987L16.5491 31.7735V25.1704Z" fill="#585858" />
                        </svg>
                      )
                    }
                  })()}
                  <div>
                    <p>{nftItem.price}</p>
                    <span>($2,388.74)</span>
                  </div>
                </div>

                <div className="row-text-5 grid grid-cols-2 gap-2">
                  <button type="button" className="content-btn" style={{ background: "#807C76" }} onClick={addToCart}>Add to Cart</button>
                  <button type="button" className="content-btn" onClick={singleBuyNft}>buy now</button>
                </div>

                <div className="row-text-6 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-3">
                  {attrList.map((item, index) => {
                    return (
                      <div className="row-box" key={index}>
                        <div>
                          <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-7 my-5p" />
                          <div className="b-text">
                            <p>{item.type}</p>
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
                  <p className="text-davygrey">{nftItem.creater}</p>

                  <p className="text-davygrey font-semibold"> Token ID</p>
                  <p className="text-davygrey">{nftItem.id}</p>

                  <p className="text-davygrey font-semibold"> Token Standard</p>
                  <p className="text-davygrey">ERC-1155</p>

                  <p className="text-davygrey font-semibold"> Blockchain</p>
                  <p className="text-davygrey mb-10">Binance Chain</p>
                </DropTab>
                <DropTab title="properties" index="2" hide>
                {attrList.map((item, index) => {
                 return ( <p className="text-davygrey whitespace-normal">
                  {item.name} {item.type} Writer’s Room is a Collection of 6942 NFTs That Unlock a Memberrs-Only Web3 Authenticated
                  </p>)
                  })
                }
                </DropTab>
                <DropTab title="creating an asset" index="3" hide>
                {attrList.map((item, index) => {
                 return ( <p className="text-davygrey whitespace-normal">
                  {item.name} {item.type} Writer’s Room is a Collection of 6942 NFTs That Unlock a Memberrs-Only Web3 Authenticated
                  </p>)
                  })
                }
                </DropTab>
              </div>
            </div>

          </div>

          <div className="detail-creator">
            
            <p className="bg-texasRose bg-opacity-10 flex justify-between items-center px-15 rounded-6 cursor-pointer">NFT By CREATOR</p>
           
            <div>
              <Carousel responsive={responsive} infinite>
                {
                  nftList.map((item: any, index: number) => {
                    return <ProductNFTItem info={item} num={index} key={index} />;;
                  })
                }
              </Carousel>
            </div>
          </div>

        </div>
      </div>
      <Popup show={show} onHide={() => setShow(false)}>
        <div className="text-center">
            <p className='text-center text-Rose text-36 text-texasRose font-Rajdhani'>{content}</p>
           <button className="uppercase px-25p mb-3 mx-13p h-30 rounded-4 bg-davygrey text-white text-14 font-semibold" onClick={()=>goPage!=""?navigate(goPage):navigate(0)}>OK</button>
        </div>
     </Popup>

    </div>
  );
}

export default NFTProductDetail;