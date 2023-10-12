import { useEffect,useState } from "react";
import axios from "axios";

const useFetch=(url)=>{
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [token,setToken]=useState("")
    const [error,setError]=useState();
    let result=[];
    useEffect(()=>{
       
    const fetchData=()=>{
        axios.get(url).then((response)=>{
            if( response.data.blog){
             response.data.blog.map((news)=>{
                let res= {
                    img:news.featured_image,
                    title:news.post_name ,
                    category:news.subcategory ,
                    date:news.created_at ,
                    creator: news.meta_description,
                    detail:news.post_summary
                }
               result.push(res)
               console.log(result)
            })
            setData(result)
           }
        }).catch((error)=>{
            setData([])
            setError(error)
        }).finally(()=>{
            setLoading(true)
        })
    }
    fetchData();
    },[url])
    return {data,loading,error};
}
export default useFetch;