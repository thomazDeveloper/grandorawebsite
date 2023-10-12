import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useMetaMask } from "metamask-react";
import io from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBullseye, faUser } from '@fortawesome/free-solid-svg-icons';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props' 
import GoogleLogin  from 'react-google-login';
import SignInModal from './SignInModal';
import RegisterModal from './RegisterModal';
import InformModal from './InformModal'
import useAuth from '../../hooks/useAuth';
import facebookregis from "../../assets/images/social/fbregis.svg";
import twitterregis from "../../assets/images/social/twitterregis.svg";
import googleregis from "../../assets/images/social/googleregis.svg";
import metamask from "../../assets/images/social/matamask.svg";
import iconregis from "../../assets/images/social/iconregis.svg";
import {gapi} from "gapi-script"
import {useCookies} from "react-cookie";
const API_URL = 'https://grandora.games/'
const socket = io(API_URL)


const SignModal = (props: any) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [siginShow, setSigninShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  const [socialEmail,setSocialEmail]=useState({email:'',read:false});
  const [openInform, setOpenInform] = useState(false)
  const [logPopup,setLogPopup]= useState(false)

  const [googleId, setGoogleId] = useState('')
  const [facebookId, setFaceBookId] = useState('')
  const [twitterId, setTwitterId] = useState('')
  const [walletId, setWalletId] = useState('')
  const [resetFB,setResetFB]=useState(false);
  const redirectURL = '/';
  const navigate = useNavigate();
  const { googleSingIn, facebookSignin, signInWithTwitter, setUser } = useAuth();
  const [cookies,setCookie]=useCookies(['user']);
  const showRegisterModal = () => {
    setRegisterShow(true);
  }
  const openSignin=()=>{
    setSigninShow(true);
  }
  const restSocialID=()=>{
    setGoogleId('');
    setFaceBookId('');
    setTwitterId('');
    setWalletId('');
    setSocialEmail({email:'',read:false})
  }

//twitterr Login Api code 
const [twitter,setTwitter]=useState(false);
const [newWindow,setNewWindow]=useState<any>();
 useEffect(()=>{
  if(newWindow && twitter){
   newWindow.close()
   setNewWindow("")
  }
},[newWindow,twitter]);
 const twitterLog=()=>{
    
     socket.on('user',user=>{
      console.log('user',user)
      confirmTwitterLogin(user,newWindow)
          newWindow.close();
     })

  } 

  //twitter popup open
  const twitterLogin=async ()=>{
    setTwitter(false)
    let timer=null;
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}auth/twitter?socketId=${socket.id}`
    setNewWindow(window.open(url, '',       
     `width=${width},height=${height}, top=${top}, left=${left}`
    ));
  
    twitterLog()

   
 }
//twitter api code end
  const responseFacebook = (user:any) => {
    if (user.accessToken) {
      if(user.id){
        axios.post('https://grandora.games/api/player-services/auth', {
          facebook_id: user.id,
          login_type:"facebook"
          
        }).then((res) => {
          if(res.data.success){
            
            let date=new Date()
            setCookie('user',res.data.data.player_info,{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
            setUser(res.data.data.player_info);
            console.log("sucess",res.data.data.player_info)
            setOpenInform(true)
            props.onHide();
          }else{
            alert(res.data.message)
            console.log("er",res.data)
          }
         
        }).catch((err) => {
          console.log("no",err)
        })
       }
      console.log(user);
    } else {
      alert("Something error ,try again!")
    }
  }
  //Google signin function
let clientId="339961677958-1f9ljsq1r40vupgan3u3hgktr82tob6u.apps.googleusercontent.com"
   function start(){
    gapi.client.init({
      clientId:clientId,
      scope:""
    })
   }
  //gapi.load('client:auth2',start)
  const handleGoogleSignIn = (response:any) => {
    console.log("response", response.profileObj)
      let user=response.profileObj
      if(user.email){
        axios.post('https://grandora.games/api/player-services/auth', {
          google_id: user.email,
          login_type:"google"
          
        }).then((res) => {
          if(res.data.success){
            
            let date=new Date()
            setCookie('user',res.data.data.player_info,{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
            setUser(res.data.data.player_info);
           // console.log("sucess",res.data.data.player_info)
           setOpenInform(true)
            props.onHide();
          }else{
            //alert(res.data.message)
            console.log("er",res.data)
          }
         
        }).catch((err) => {
          console.log("no",err)
        })
      }
      
  }

  //Facebook Signin function
  const handleFacebookLogin = () => {
    facebookSignin()
      .then((user: any) => {
        axios.post('https://grandora.games/api/player-services/auth', {
          facebook_id: user.uid,
          login_type:"facebook"
          
        }).then((res) => {
          if(res.data.success){
            
            let date=new Date()
            setCookie('user',res.data.data.player_info,{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
            setUser(res.data.data.player_info);
            console.log("sucess",res.data.data.player_info)
            props.onHide();
          }else{
            alert(res.data.message)
            console.log("er",res.data)
          }
         
        }).catch((err) => {
          console.log("no",err)
        })
      })
  }
  //twitter  Signin conform function
  const confirmTwitterLogin = (user:any,newWindow:any) => {
   
     console.log("check user",user)
      if(user.id){
        axios.get(`https://grandora.games/api/player-services/twitter-check/${user.id}`).then((res) => {
          if (res.data.result) {
            setTwitter(true)
            props.onHide()
            setOpenInform(true)
            setLogPopup(true)
            setTwitterId(user.id)
            newWindow.close();
          } else {
            props.onHide();
            setTwitterId(user.id)
            console.error(twitterId)
            setRegisterShow(true);
            setTwitter(true)
          }
        })
      }
      setTwitter(true)
  }

  const handleConnect = async () => {
    if(ethereum){
    connect().then(res => {
      console.info("data",res)
      //alert(JSON.stringify(res))
      if (res) {
        axios.get(`https://grandora.games/api/player-services/wallet-check/${res[0]}`).then((response) => {
          //alert("in"+JSON.stringify(res)+"")
          if (response.data.result) {
            props.onHide()
            setOpenInform(true)
            setLogPopup(true)
            //navigate(redirectURL);
          } else {
            setWalletId(res[0])
            props.onHide();
            setRegisterShow(true);
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }else{
      window.open("https://metamask.io/download/","_blank")
  }
    // props.onHide();
  }
  const responseGoogle = (response:any) => {
    console.error(response)
  }
  return (
    <div>
      <Modal
        {...props}
        size="w640"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='py-20p font-Rajdhani text-center tracking-10'>
          <p className="uppercase text-35 leading-45">sign in or create account</p>
          <p className=" text-16 leading-20">User May Login With Metamask</p>
          <p className=" text-16 leading-20">General Registration Or Other Social Media</p>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-10">

            <div className="ml-0p sm:ml-22p">
              <p className="text-14 leading-18 font-semibold text-left mt-5p">SOCIAL</p>
               <FacebookLogin
              appId="239281188344238"
              autoLoad={false}
              scope="public_profile,user_friends"
              callback={responseFacebook}
              render={renderProps => (
                <div className="bg-clearBlue bg-opacity-10 rounded-10 h-75p my-11p flex items-center cursor-pointer hover:border" onClick={renderProps.onClick}>
                <div className=" flex items-center justify-center ml-5p ">
                <img src={facebookregis} width={70} height={70} style={{marginTop:4}}  />
                </div>
                <div className="uppercase ml-5p me-2 flex flex-col">
                  <label className="text-10 leading-12 opacity-75 text-left">continue with</label>
                  <label className="text-20 leading-26 text-brightBlue">facebook</label>
                </div>
              </div>
              )}
              icon="fa-facebook" />

              <div className="bg-clearBlue bg-opacity-10 rounded-10 h-75p my-11p flex items-center cursor-pointer hover:border">
                <div className=" rounded-full  flex items-center justify-center ml-5p ">
                <img src={twitterregis} width={70} height={70} style={{marginTop:4}} />
                </div>
                <div className="uppercase ml-5p me-2 flex flex-col"
                  onClick={() => {
                    twitterLogin()
                  }}
                >
                  <label className="text-10 leading-12 opacity-75 text-left">continue with</label>
                  <label className="text-20 leading-26 text-brightBlue">twitter</label>
                </div>
              </div>
              <GoogleLogin
                clientId={clientId}
                render={renderProps => (
                 <div className="bg-[#d1cfcf] bg-opacity-10 rounded-10 h-75p my-11p flex items-center cursor-pointer hover:border">
                  <div className=" flex items-center justify-center ml-5p ">
                  <img src={googleregis} width={70} height={70} style={{marginTop:4}} />
                  </div>
                  <div className="uppercase ml-5p me-2 flex flex-col"
                    onClick={renderProps.onClick} 
                  >
                    <label className="text-10 leading-12 opacity-75 text-left">continue with</label>
                    <label className="text-20 leading-26 text-[#text-#ED8000]">google</label>
                  </div>
              </div>
              )}
              onSuccess={handleGoogleSignIn}
              onFailure={handleGoogleSignIn}
              cookiePolicy={'single_host_origin'}
              
              />
              
            </div>
           <div className="ml-0p sm:ml-22p">
            <div className="mr-0p sm:mr-22p">
                <p className="text-14 leading-30 text-left mt-12p sm:leading-18 font-semibold uppercase">WEB3</p>
                <div
                  className="bg-[#FFF3E9] rounded-10 h-75p flex items-center sm:flex-col sm:my-6p sm:h-135p sm:justify-center cursor-pointer hover:border"
                  key="2"
                  onClick={handleConnect}
                >
                  <div className=" flex items-center justify-center ml-5p mx-auto-sm">
                  <img src={metamask} width={70} height={70} className=" sm:mt-0" />
                  </div>
                  <div className="uppercase ml-5p sm:ml-11p  mx-auto-sm sm:mt-2p flex flex-col ">
                    <label className="text-10 leading-12 opacity-75 text-left">continue with</label>
                    <label className="text-20 leading-26 text-[#ED8000]">metamasks</label>
                  </div>
                </div>
              </div>
              {/* <div className="mr-22p hidden sm:block">
                <p className="text-14 leading-18 text-left mt-5p">WEB3</p>
                <div className="bg-[#FFF3E9] rounded-10 h-135p my-6p flex flex-col justify-center cursor-pointer hover:border">
                  <div className="  flex items-center justify-center ml-5p  mx-auto">
                  <img  src={metamask} width={100} height={100}/>
                  </div>
                  <div className="uppercase ml-11p flex flex-col mx-auto mt-2p" onClick={handleConnect}>
                    <label className="text-10 leading-12 opacity-75">continue with</label>
                    <label className="text-20 leading-26 text-[#ED8000]">metamasks</label>
                  </div>
                </div>
              </div> */}


              <div className="mr-0p sm:mr-22p">
                <p className="text-14 leading-30 text-left font-Rajdhani font-semibold uppercase">General register</p>
                <div
                  className="bg-[#653E9D] bg-opacity-10 rounded-10 h-75p flex items-center cursor-pointer hover:border"
                  key="2"
                  onClick={() => {
                    showRegisterModal();
                    restSocialID();
                    props.onHide();
                  }}
                >
                  <div className=" flex items-center justify-center ml-5p">
                  <img src={iconregis} width={70} height={70} style={{marginTop:4}} />
                  </div>
                  <div className="uppercase ml-5p pe-2 flex flex-col">
                    <label className="text-10 leading-12 opacity-75 text-left">continue with</label>
                    <label className="text-20 leading-26 text-[#8235F1]">Register</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:ml-22p sm:mr-22p mt-12p">
          <div className='h-1p border-dashed border-1 w-full border-davygrey'></div>
          </div>

          <div className="sm:ml-22p sm:mr-22p ">
            <button
             
              className='bg-[#fbbc0429] text-20  rounded-10 cursor-pointer hover:border w-100 mt-4 font-Rajdhani ml-auto mr-22p p-2'
              onClick={() => {
                setSigninShow(true);
                props.onHide();
              }}
            >
              HAVE AN ACCOUNT   <FontAwesomeIcon className='ml-5p ' icon={faAngleRight}></FontAwesomeIcon>
            </button>
          </div>

        </Modal.Body>
      </Modal>
      <SignInModal show={siginShow}
        onHide={() => setSigninShow(false)}></SignInModal>
      <RegisterModal 
        show={registerShow}
        onHide={() => setRegisterShow(false)} 
        backOption={props.backOption}
        socialEmail={socialEmail}
        resetSocialID={restSocialID}
        googleId={googleId}
        facebookId={facebookId}
        walletId={walletId}
        twitterId={twitterId}
      />
       <InformModal
        show={openInform}
        logPopup={logPopup}
        onHide={() => setOpenInform(false)}
        openSignin={()=>setSigninShow(true)}
      />
    </div>
  );
}

export default SignModal;
