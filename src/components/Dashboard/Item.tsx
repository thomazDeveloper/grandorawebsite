import React,{useState,useEffect} from 'react'
import DashboardDropDown from './DashboardDropDown'
import ProductCard from './ProductCard'
import SearchInput from './SearchInput'
import useAllNFT from "hooks/useAllNFT";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { NftProductsProps, NFTItemProps } from "../../core/interfaces/pages";
import { nftproducts } from "../../core/data/nftproducts";
import ProductInfoModal from 'pages/User/productInfoModal';
const Item = () => {
    const { account } = useWallet()
    const { getNFTsByUser } = useAllNFT();
    const [showDetail, setShowDetail] = useState(false);
    const [currentItem, setCurrentItem] = useState<NFTItemProps>({});
    const [nftList, setNftList] = useState<Array<Object>>([]);
    const [searchNft,setSearchNft]=useState<Array<Object>>([]);
    const [filter,setFilter]=useState("");
    const [loading, setLoading] = useState(false);
    const [count,setCount]=useState(0)
    const onClickProduct = (item: NFTItemProps) => {
      setCurrentItem(item);
      setShowDetail(true);
      console.log("asdf");
    }
    
    useEffect(() => {
        if (account) {
          setLoading(true);
          getNFTsByUser()
            .then(datas => {
              setLoading(false);
              setSearchNft(datas);
              setNftList(datas);
            })
            .catch(error => {
              setLoading(false);
              console.log(error)
            })
        }
      }, [account])
      const handleNftList=(data:any)=>{
        setCount(count=>count+1)
        setFilter(()=>data)
      }
    useEffect(()=>{

    },[filter])
    const FilterNftList=(selectOption:any)=>{
        switch(selectOption){
            case "recently-create":
                return nftList.sort((a:any,b:any)=>parseFloat(b.createdAt) - parseFloat(a.createdAt))
                console.log(()=>searchNft.sort((a:any,b:any)=>parseFloat(b.createdAt) - parseFloat(a.createdAt)))
                break;
            case "price-low-to-high":
                return nftList.sort((a:any,b:any)=>parseFloat(a.price) - parseFloat(b.price))
                break;
            case "price-high-to-low":
                return nftList.sort((a:any,b:any)=>parseFloat(b.price) - parseFloat(a.price))
                break;
            default:
                return nftList
        }
    }
    const handleSearchList=(data:any)=>{
        setNftList(data)
       console.log("search",data)
    }
    const options1 = [
        { value: 'allitem', label: 'All item' },
        { value: 'singleitem', label: 'Single item' },
        { value: 'bundle', label: 'Bundle' }
    ]

    const options2 = [
        { value: 'recently-create', label: 'Recently Create' },
        { value: 'recently-sold', label: 'Recently Sold' },
        { value: 'recently-received', label: 'Recently Received' },
        { value: 'ending-soon', label: 'Ending Soon' },
        { value: 'price-low-to-high', label: 'Price [Low - High]' },
        { value: 'price-high-to-low', label: 'Price [High - Low]' },
        { value: 'hight-last-sale', label: 'Highest Last Sale' },
        { value: 'most-favorite', label: 'Most Favorite' },
        { value: 'most-view', label: 'Most View' },
        { value: 'oldest', label: 'Oldest' }
    ]

    // const images = [
    //     { img: "../../assets/images/items/nft1.png" },
    //     { img: "../../assets/images/items/nft2.png" },
    //     { img: "../../assets/images/items/nft3.png" },
    //     { img: "../../assets/images/items/nft4.png" },
    // ]
   
    return (
        <div>
            <div className='pl-6 flex  pt-40 w-[100%] lg:w-[90%] mx-auto'>
                <div className='w-[80%] mr-12'>
                    <SearchInput item={searchNft} handleSearchList={handleSearchList} />
                </div>
                <div className=' md:w-[20%] mr-12 flex align-items-center'>
                    <DashboardDropDown item={searchNft} handleNftList={handleNftList} options={options1} />
                </div>
                <div className='md:w-[25%] flex align-items-center'>
                    <DashboardDropDown item={searchNft} handleNftList={handleNftList} options={options2} />
                </div>

            </div>
            <div className='w-full'>
            <div className='lg:w-[100%]  grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 pt-30 place-items-center'>
               { FilterNftList(filter).map((item, index) => {
                return <ProductCard link={'/dashboard/collection/1'} filter={filter} item={item} num={index} key={index} onClick={() => onClickProduct(item)} />
                })}
            </div>
            </div>

            <ProductInfoModal item={currentItem} show={showDetail} onHide={ ()=> setShowDetail(false)}/>
        </div>
    )
}

export default Item