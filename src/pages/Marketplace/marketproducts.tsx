import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'

import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";

import ProductItem from "components/ProductItem";
import { useDispatch, useSelector } from "core/store/store";
import axios from "axios";

const GameProducts = () => {
    const { user } = useAuth()
  const dispatch = useDispatch()
  const mobile = useMediaQuery({ query: '(min-width:640px)' });

  const [productList, setProductList] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    axios.get('https://grandora.games/api/ecommerce-services/get-products')
        .then(res =>{
          if(res.data.success){
            setLoading(false);
            setProductList(res.data.data.products);
            console.log(res.data.data)
          }
          if(!res.data.success){
            setLoading(false);
            alert(JSON.stringify(res.data.message));
          }
          // setOpenInform(true)
          //setLogPopup(true)
          //alert(JSON.stringify(res));
        })
        .catch(error => {
          alert(JSON.stringify(error.response.data));
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

          <div className="search-item">
          <div className="box-list">
            <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-[.25rem] lg:gap-[1.5rem] md:gap-[1.5rem] sm:gap-[.25rem]">
              {
                productList.map((item, index) => {
                  return <ProductItem info={item} num={index} key={index} class=" rounded-np m-11" size="w-270" />;
                })
              }
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}

export default GameProducts;
