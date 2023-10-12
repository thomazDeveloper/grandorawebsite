
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie";
import SignInModal from "components/signin/SignInModal";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { useLocation } from "react-router-dom";
const Protected=({children})=>{
    const [cookies]=useCookies(['user']);
    const [signShow,setSigninShow]=useState(true)
    const {account}=useWallet()
    const location=useLocation()
    const navigate=useNavigate();
    if(location.pathname!=="swap" && cookies.user){
        return children;
    }
    if(location.pathname==="swap" && cookies.user && account){
        return children;
    }
    return (  
    <SignInModal show={signShow} onHide={() => {setSigninShow(false);navigate('/')}}/>
    )
}
export default Protected;