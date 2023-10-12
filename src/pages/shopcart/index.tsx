//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { nftproducts } from "../../core/data/nftproducts";
import CartItem from "./cartitem";
import Nbutton from "../../components/Nbutton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import StayTuned from "../Upcoming/StayTuned";
import ComingYellow from "../Upcoming/ComingYellow";


import image12 from "assets/images/marketplace/products/image1.png";
import { MdMaximize, MdRemove } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from 'core/store/store';
import { stoerAllNfts } from "core/store/reducers/nft";
import { CartList, BatchBuyProps, BatchBuyLogProps } from 'core/interfaces/pages';
import useBuyNFT from "hooks/useBuyNFT";
import { useMediaQuery } from "react-responsive";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import axios from "axios";
import { SERVER_URL } from "config/config";


const Shoppingcart = () => {

  const { account } = useWallet()
  const mobile = useMediaQuery({ query: '(min-width:640px)' });

  const dispatch = useDispatch()
  const { singleBuy, batchBuy } = useBuyNFT();

  const { nfts } = useSelector(store => store.nft);
  const [cartList, setCartList] = useState<CartList[]>([]);

  const [totalBalace, setTotalBalace] = useState(0);

  const [randomNumber, setRandomNumber] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let numberRand = Math.ceil(Math.random() * 100);
    setRandomNumber(numberRand);
  }, [location])

  useEffect(() => {
    setCartList(nfts);
  }, [nfts,cartList])

  // if (randomNumber > 0 && randomNumber < 30) {
  //   return <StayTuned />
  // } else if (randomNumber > 30 && randomNumber < 60) {
  //   return <ComingYellow />

  // } else {
  //   return <StayTuned />
  // }


  const getTotalBalanace = () => {
    let balance = 0;
    let totalCount = 0;
    cartList.map((cItem) => {
      balance += Number(cItem.item.price) * Number(cItem.count);
      totalCount += Number(cItem.count);
    })

    return { balance, count: totalCount }
  }

  const addCartItem = (cItem: any) => {
    const index = cartList.findIndex(e => e.item.url === cItem.item.url);

    if (index > -1) {
      let allNFTs = [...cartList];
      allNFTs[index] = { ...allNFTs[index], count: allNFTs[index].count + 1 };
      console.log(allNFTs)
      setCartList(allNFTs);
      dispatch(stoerAllNfts(allNFTs));
      
    }
  }
  useEffect(()=>{
    setCartList(nfts);
  },[cartList])
  const removeCartItem = (cItem: any) => {
    const index = cartList.findIndex(e => e.item.url === cItem.item.url);

    if (index > -1) {
      const allNFTs = [...cartList];
      if (allNFTs[index].count - 1 < 0) {
        return;
      }
      allNFTs[index] = { ...allNFTs[index], count: allNFTs[index].count - 1 };
      setCartList(allNFTs);
      dispatch(stoerAllNfts(allNFTs));
    }
  }

  const deleteCartItem = (cItem: any) => {

    let selectedItems = cartList.filter(e => e.item.url !== cItem.item.url);
    setCartList(selectedItems);
    dispatch(stoerAllNfts(selectedItems));
  }

  const onCartBuy = () => {



    // if (nftItem.id !== undefined && nftItem.price !== undefined && nftItem.tokenType !== undefined) {

    //   console.log("hello")
    // singleBuy(nftItem.id, nftItem.price, 1, nftItem.tokenType)
    //     .then(tx => {
    //       console.log(tx)
    //       if (tx.status === true) {
    //         alert('Transaction successed')
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       alert('Transaction failed')
    //     })
    // }

    if (account) {

      let products: BatchBuyProps[] = [];

      cartList.map(cItem => {
        if (cItem.item.id !== undefined &&
          cItem.item.tokenType !== undefined &&
          cItem.item.name !== undefined &&
          cItem.item.creater !== undefined &&
          cItem.item.url !== undefined 
        ) {

          let prod = {
            tokenId: cItem.item.id,
            url: cItem.item.url,
            name: cItem.item.name,
            quantity: cItem.count,
            price: Number(cItem.item.price),
            tokenType: cItem.item.tokenType,
            creater: cItem.item.creater
          };

          products.push(prod);
        }
      })


      batchBuy(products)
        .then(tx => {
          console.log(tx)
          if (tx.status === true) {

            let save_dt: BatchBuyLogProps[] = [];

            products.map(item => {

              let obj = {
                transaction_id: tx.transactionHash,
                nft_id: item.tokenId,
                types: "Sales",
                url: item.url,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                feetoken_type: item.tokenType,
                from: item.creater,
                to: account,
              }

              save_dt.push(obj);
            })

            axios.post(`${SERVER_URL}api/multicreate`, { txs: save_dt }).then(resp => {
              if (resp.status) {
                alert('Transaction successed')
              } else {
                alert('Transaction failed');
              }
            }).catch(err => {
              console.log(err);
            })


          }
          setCartList([]);
          dispatch(stoerAllNfts([]));
        })
        .catch(err => {
          console.log(err);
          alert('Transaction failed')
        })
    }



  }

  return (
    <div className="pt-60 font-Rajdhani">
      <div className="container">

        <div className="page-content">

          <div className="pt-2r flex justify-center items-center">
            <h3 className="text-32 sm:text-45 font-medium tacking-3p text-default uppercase">Shopping Cart</h3>
          </div>

          <div className="mt-2r">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1rem] sm:gap-[5rem]">
              <div className="col-span-2">

                {cartList.map((cItem, index) => {
                  const currency = cItem.item.tokenType ? "BSC" : "ETH";
                  // const currency = cItem.item.tokenType ? "ETH" : "ETH";
                  return (
                    <div className="w-full flex justify-start items-center mb-1r" key={index}>
                      <div className="flex">
                        <img src={cItem.item.url} className="w-70p sm:w-100p h-70p sm:h-100p bg-cover bg-center border-10 border-cloud rounded-6 sm:rounded-10" alt="kkk" />
                      </div>
                      <div className="flex flex-col justify-center items-start ml-20" style={{ width: "calc(100% - 120px)" }}>
                        <p className="text-16 sm:text-21 font-semibold tracking-6p text-default leading-[20px]">
                          GRANDORA <span className="text-davygrey">{cItem.item.name}</span>
                        </p>
                        <span className="text-10 sm:text-14 font-normal tracking-10p text-friarGrey leading-[13px] sm:leading-[18px]">TKEN: 937374........39827498</span>
                        <div className="mt-[0.5rem] grid grid-cols-1 sm:grid-cols-2 gap-[10rem] w-full">
                          <div className="col-span-1">
                            <div className="w-full flex justify-between items-center">
                              <div className="flex flex-col justify-center items-start">
                                <p className="text-14 sm:text-21 font-semibold tracking-6p text-davygrey leading-[18px] sm:leading-[20px]">{cItem.item.price} {currency}</p>
                                <span className="text-10 font-normal tracking-6p text-davygrey leading-[13px]">($2,388.74)</span>
                              </div>
                              <div className="flex justify-center">
                                <button
                                  className="bg-default w-20 sm:w-25 h-auto text-white flex justify-center items-center rounded-l"
                                  onClick={() => removeCartItem(cItem)}
                                >
                                  <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="1" y1="1" x2="9" y2="1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                  </svg>
                                </button>
                                <input
                                  type="number"
                                  className="w-30 sm:w-60 h-25 px-0 py-1p border-11 border-default text-center text-14 sm:text-21 font-semibold tracking-6 text-davygrey"
                                  placeholder="1"
                                  value={cItem.count}
                                />
                                <button
                                  className="bg-default w-20 sm:w-25 h-auto text-white flex justify-center items-center rounded-r"
                                  onClick={() => addCartItem(cItem)}
                                >

                                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.00045 8.84593V5.38439M5.00045 5.38439V1.92285M5.00045 5.38439H8.8466M5.00045 5.38439H1.1543" stroke="white" strokeWidth="2.16667" strokeLinecap="round" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                          {mobile &&
                            <div className="col-span-1">
                              <div className="w-full flex justify-between items-center">
                                <div className="flex justify-center items-start gap-2">
                                  <p className="text-14 font-medium tracking-6p uppercase text-davygrey">Total: </p>
                                  <div className="flex flex-col justify-center items-start">
                                    <p className="text-21 font-semibold tracking-6p text-davygrey leading-[20px]">{(Number(cItem.item.price) * Number(cItem.count)).toFixed(2)} {currency}</p>
                                    <span className="text-10 font-normal tracking-6p text-davygrey">($2,388.74)</span>
                                  </div>
                                </div>
                                <button type="button" onClick={() => deleteCartItem(cItem)}>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.41732 2.66683C5.41732 2.1806 5.61047 1.71428 5.95429 1.37047C6.29811 1.02665 6.76442 0.833496 7.25065 0.833496H12.7507C13.2369 0.833496 13.7032 1.02665 14.047 1.37047C14.3908 1.71428 14.584 2.1806 14.584 2.66683V4.50016H18.2507C18.4938 4.50016 18.7269 4.59674 18.8988 4.76865C19.0707 4.94056 19.1673 5.17372 19.1673 5.41683C19.1673 5.65995 19.0707 5.8931 18.8988 6.06501C18.7269 6.23692 18.4938 6.3335 18.2507 6.3335H17.2707L16.476 17.4637C16.4431 17.9262 16.2361 18.3591 15.8968 18.6751C15.5574 18.9911 15.1109 19.1668 14.6472 19.1668H5.35315C4.88945 19.1668 4.44296 18.9911 4.10363 18.6751C3.7643 18.3591 3.55732 17.9262 3.5244 17.4637L2.73148 6.3335H1.75065C1.50754 6.3335 1.27438 6.23692 1.10247 6.06501C0.930561 5.8931 0.833984 5.65995 0.833984 5.41683C0.833984 5.17372 0.930561 4.94056 1.10247 4.76865C1.27438 4.59674 1.50754 4.50016 1.75065 4.50016H5.41732V2.66683ZM7.25065 4.50016H12.7507V2.66683H7.25065V4.50016ZM4.56848 6.3335L5.35407 17.3335H14.6482L15.4337 6.3335H4.56848ZM8.16732 8.16683C8.41043 8.16683 8.64359 8.26341 8.8155 8.43532C8.98741 8.60722 9.08399 8.84038 9.08399 9.0835V14.5835C9.08399 14.8266 8.98741 15.0598 8.8155 15.2317C8.64359 15.4036 8.41043 15.5002 8.16732 15.5002C7.9242 15.5002 7.69105 15.4036 7.51914 15.2317C7.34723 15.0598 7.25065 14.8266 7.25065 14.5835V9.0835C7.25065 8.84038 7.34723 8.60722 7.51914 8.43532C7.69105 8.26341 7.9242 8.16683 8.16732 8.16683ZM11.834 8.16683C12.0771 8.16683 12.3103 8.26341 12.4822 8.43532C12.6541 8.60722 12.7507 8.84038 12.7507 9.0835V14.5835C12.7507 14.8266 12.6541 15.0598 12.4822 15.2317C12.3103 15.4036 12.0771 15.5002 11.834 15.5002C11.5909 15.5002 11.3577 15.4036 11.1858 15.2317C11.0139 15.0598 10.9173 14.8266 10.9173 14.5835V9.0835C10.9173 8.84038 11.0139 8.60722 11.1858 8.43532C11.3577 8.26341 11.5909 8.16683 11.834 8.16683Z" fill="#585858" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          }

                        </div>
                      </div>
                    </div>
                  )
                })}

                {!mobile &&
                  <div className="w-full mt-1r flex justify-center items-center">
                    <button type="button" className="h-35 bg-friarGrey border-[1px] border-solid border-friarGrey rounded-6 px-1r font-semibold text-16 leading-20 tracking-10 uppercase text-white flex-justify-center items-center">Back to shop</button>
                  </div>
                }

              </div>
              <div className="col-span-1">
                <div className="w-full py-3r">

                  <div className="w-full flex justify-between items-start">
                    <div className="flex flex-col justify-center items-start">
                      <p className="text-21 font-semibold tracking-6p uppercase text-davygrey leading-[20px]">Total Cart</p>
                      <span className="text-17 font-normal tracking-6p uppercase text-davygrey leading-[18px]">({getTotalBalanace().count} item)</span>
                    </div>
                    <div className="flex flex-col justify-center items-end">
                      <p className="text-21 font-semibold tracking-6p uppercase text-default leading-[20px]">{(getTotalBalanace().balance).toFixed(2)} eth</p>
                      <span className="text-10 font-normal tracking-6p text-davygrey leading-[18px]">($2,388.74)</span>
                    </div>
                  </div>

                  <div className="mt-2r">
                    <button
                      type="button"
                      className="flex justify-center items-center gap-2 w-full h-30 bg-default text-white rounded-4"
                      onClick={onCartBuy}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 0.8125C7.03872 0.8125 7.55538 1.02651 7.93631 1.40744C8.31724 1.78837 8.53125 2.30503 8.53125 2.84375V3.25H4.46875V2.84375C4.46875 2.30503 4.68276 1.78837 5.06369 1.40744C5.44462 1.02651 5.96128 0.8125 6.5 0.8125ZM9.34375 3.25V2.84375C9.34375 2.08954 9.04414 1.36622 8.51083 0.832915C7.97753 0.299608 7.25421 0 6.5 0C5.74579 0 5.02247 0.299608 4.48917 0.832915C3.95586 1.36622 3.65625 2.08954 3.65625 2.84375V3.25H0.8125V11.375C0.8125 11.806 0.983705 12.2193 1.28845 12.524C1.5932 12.8288 2.00652 13 2.4375 13H10.5625C10.9935 13 11.4068 12.8288 11.7115 12.524C12.0163 12.2193 12.1875 11.806 12.1875 11.375V3.25H9.34375Z" fill="white" />
                      </svg>
                      <span className="text-14 font-semibold tracking-10p uppercase">
                        Buy Now
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Shoppingcart;