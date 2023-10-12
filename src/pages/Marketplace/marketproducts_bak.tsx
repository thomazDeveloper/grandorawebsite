import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";

import useAllNFT from "hooks/useAllNFT";

import ProductNFTItem from "components/ProductNFTItem";
import { productCategories } from "core/data/nftproducts";
import { NftProductsProps, ProductCategoryProps, ProductTypeProps, AllPCategoryProps } from "../../core/interfaces/pages";
import { useDispatch, useSelector } from "core/store/store";

const MarketProducts = () => {

  const dispatch = useDispatch()
  const mobile = useMediaQuery({ query: '(min-width:640px)' });

  const { getAllNFTs } = useAllNFT();

  const [nftList, setNftList] = useState<Array<Object>>([]);
  const [searchNft,setSearchNft]=useState<Array<Object>>([]); 
  const [filtermodalshow, setFiltermodalshow] = useState(false);
  const [allpmodalshow, setAllpmodalshow] = useState(false); // All product modal flag
  const [categoryshow, setCategoryshow] = useState(false); // the flag for dropdown categories
  const [currentcategory, setCurrentcategory] = useState(productCategories[0]);
  const [loading, setLoading] = useState(false);

  const hideCategoryShow = () => {
    if (categoryshow)
      setCategoryshow(false);
  }

  const changeCategory = (item: ProductCategoryProps) => {
    setCurrentcategory(item);
    setFiltermodalshow(true);
  }

const searchItem=(e:any)=>{
    let query=e.target.value;
    var result=searchNft.filter((item:any)=>{
      return item['name'].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
     })
    setNftList(result)
    console.log("list",nftList)
    console.log("data",result)
    
}
useEffect(()=>{

},[nftList])
  const getData = () => {
    setLoading(true);
    getAllNFTs()
      .then((data) => {
        console.log(data);
        setLoading(false);
        setNftList(data);
        setSearchNft(data);
        // dispatch(stoerAllNfts(data));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, [])

  // if(loading) return <Spinner />;

  const style_calss = {
    arrow_icon: "h-24 w-17 cursor-pointer ml-10 border border-white hover:border-davygrey",
    search_icon: "relative left-30 h-20 cursor-pointer text-texasRose"
  }

  return (
    <div className="main-content">
      <div className="container">

        <div className="page-content">

          <div className="page-title">
            {(() => {
              if (!mobile) {
                return (
                  <div className="flex flex-col justify-center items-center">
                    <p className="not-italic font-medium text-16 leading-18 uppercase text-friarGrey">SELECT CATEGORY</p>
                    <div className="flex justify-center items-center">
                      <span className="not-italic font-semibold text-32 leading-38 uppercase text-darkMintGreen">GRANDORA</span>
                      <FontAwesomeIcon icon={faAngleDown} className="h-13 w-24 cursor-pointer" onClick={() => setCategoryshow(true)} />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="title-3">
                    <p>SELECT CATEGORY</p>
                    <span>GRANDORA</span>
                    <FontAwesomeIcon icon={faAngleDown} className={style_calss.arrow_icon} onClick={() => setCategoryshow(true)} />
                  </div>
                )
              }
            })()}
          </div>

          <div className="search-item">
            <FontAwesomeIcon icon={faSearch} className={style_calss.search_icon} />
            <input type="text" className="sm:text-14" onChange={(e)=>searchItem(e)}placeholder="SEARCH ITEM..." />
          </div>

          <div className="box-list">
            <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-[.25rem] lg:gap-[1.5rem] md:gap-[1.5rem] sm:gap-[.25rem]">
              {
                nftList.map((item, index) => {
                  return <ProductNFTItem info={item} num={index} key={index} class=" rounded-np m-11" size="w-270" />;
                })
              }
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MarketProducts;