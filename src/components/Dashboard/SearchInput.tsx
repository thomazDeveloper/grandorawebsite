import React,{useState,useEffect} from 'react'
import { FiSearch } from "react-icons/fi"

const SearchInput = (props:any) => {
    const [searchNft,setSearchNft]=useState<Array<Object>>(props.item);
    const {handleSearchList,item}=props
    const searchItem=(e:any)=>{
        let query=e.target.value;
        var result=item.filter((item:any)=>{
          return item['name'].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
         })
         handleSearchList(result)
        console.log("data",result,props.item)
     
        
    }
    return (
        <div className='flex items-center p-15 border-[0.5px] rounded-[5px] border-borderdefault'>
            <span className='pr-4 text-default'><FiSearch /></span>
            <input type="text" name="search" onChange={searchItem} id="search" placeholder='Search by name' className='w-full border-none outline-none uppercase text-[15px] font-Rajdhani text-cloudygrey font-semibold p-0' />
        </div>
    )
}

export default SearchInput