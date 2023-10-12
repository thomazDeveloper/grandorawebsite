import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faEye, faLock, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { useFormik,Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props' 
import  {useCookies} from "react-cookie"
import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { userSocials } from "../../core/data/usersetting";
import useAuth from "hooks/useAuth";
import defaultAvatar from "../../assets/images/user/default-sm.png";
import eyeSvg from "../../assets/images/svgs/eye.svg";
import axios from "axios";
import { io } from "socket.io-client";
import { render } from "@testing-library/react";
const API_URL = 'https://grandora.games/'
const socket = io(API_URL)
const UserSetting = () => {
  let inputStyle = 'h-30 w-full rounded-default text-davygrey indent-15 bg-white bg-opacity-50 mr-5 border-2 border-davygrey mb-20p';
  let token="12232"
  const [cookies,setCookie]=useCookies(['user']);
  const [confirmPwd,setConfirmPwd]=useState("");
  const [lock,setLock]=useState(true)
  const [secure,setSecure]=useState(false)
  const [formSecure,setFormSecure]=useState(false)
  const [new_password,setNewPwd]=useState("")
  const [old_password,setOldPwd]=useState("")
  const [show,setShow]=useState(false)
  const {user}=useAuth();
  useEffect(()=>{
    console.log("Update",user)
  },[])
  const handleConfirm=async ()=>{
    let {token}=cookies.user
    let config={
      headers:{Authorization:`Bearer ${token}`}
    }
    let requestData={
      "old_password":confirmPwd,
      "new_password":confirmPwd
    }
    const res=await axios.patch("https://grandora.games/api/player-services/player/update-password",requestData,config)
    const data=await res.data
    setSecure(data.success)
    setLock(data.success)

  }
  const formStep=()=>{
     setFormSecure(secure)
  }
  const onHide=()=>{
    setShow(false)
  }
  const updatePassword=async (e:any)=>{
    e.preventDefault()
    let {token}=cookies.user
    let config={
      headers:{Authorization:`Bearer ${token}`}
    }
    let requestData={
      "old_password":old_password,
      "new_password":new_password
    }
    const res=await axios.patch("https://grandora.games/api/player-services/player/update-password",requestData,config)
    const data=await res.data
    console.error(data)
    if(data.success){
     setShow(true)
     setNewPwd("")
     setOldPwd("")
    }else{
      alert("Password Update Failed")
    }
  }


  //Update Funcion
  const UpdateSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username Required')
      .matches(/^([aA-zZ\s])+$/,"Only alphabet are allowed field"),
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('name Required')
      .matches(/^([aA-zZ\s])+$/,"Only alphabet are allowed field"),
   
  });
  const [twitterId,setTwitter]=useState('');
 const [newWindow,setNewWindow]=useState<any>();
 const [updateField,setUpdateField]=useState<any>();
 const [facebookId,setFaceBookId]=useState("");
 const [exist,setUserExist]=useState({
  twitter:'',
  facebook:'',
  youtube:''
 })
  useEffect(()=>{
    if(twitterId){
     newWindow.close()
    }
  },[newWindow,socket,twitterId]);
  const  socialIDExist=(url:any,user_id:any,type:any)=>{
    if(user_id){
      axios.get(`${url}${user_id}`).then((res) => {
        if (res.data.result) {
          console.warn("Already User Exist")
          setUserExist({...exist,[type]:''+type+'_id already exists'})
        } else {
          console.warn("No  Exist")
          setUserExist({...exist,[type]:''})
        }
      })
    }
  }
   const twitterLog=(setFieldValue:any)=>{
       socket.on('user',(user:any)=>{
          if(newWindow){
            newWindow.close()
           }
           console.warn("twit",user)
           setTwitter(user.id)
           socialIDExist("https://grandora.games/api/player-services/twitter-check/",user.id,'twitter')
           
       })
       
  
    } 
  
    //twitter popup open
    const  twitterID=async (setFieldValue:any)=>{
      setTwitter('')
      let timer=null;
      const width = 600, height = 600
      const left = (window.innerWidth / 2) - (width / 2)
      const top = (window.innerHeight / 2) - (height / 2)
      const url = `${API_URL}auth/twitter?socketId=${socket.id}`
      setNewWindow(window.open(url, '',       
       `width=${width},height=${height}, top=${top}, left=${left}`
      ));
      twitterLog(setFieldValue)
  
     
   }

   useEffect(()=>{
   },[facebookId])
   const fbID=(user:any)=>{
     console.log("fb work",user)
     setFaceBookId(user.id)
     socialIDExist("https://grandora.games/api/player-services/facebook-check/",user.id,'facebook')

   }
   const youtubeID=()=>{
    let yuser = "http://www.youtube.com/user/xxxx";
    let yt_headers =new Request(yuser)
    console.warn( yt_headers.headers)
    
  }
   
  const handleUpdate=async (values:any)=>{
    const field={
    "discord_id": values.discord,
    "email": "ccc@ccc.ccc",
    "facebook_id":  null,
    "google_id": null,
    "instagram_id": values.instagram,
    "name": values.name,
    "interest":null,
    "picture": {
        "height": 0,
        "is_silhouette": false,
        "url": null,
        "width": 0
    },
    "telegram_id":  null,
    "twitter_id": null,
    "wallet_id": null,
    "youtube_id": null
    }
    console.log("values",values.description)
    let {token}=cookies.user
    let config={
      headers:{Authorization:`Bearer ${token}`}
    }
    const res=await axios.put("https://www.grandora.games/api/player-services/player/update",field,config)
    const data=await res.data
    if(data.success==true){
      alert("Update SuccesFully")
    }else{
      alert("Update Failed")
    }
    
    console.error(data)
  }
  const checkSocialID=(socialType:any,setFieldValue:any)=>{
         switch(socialType){
          case 'twitter':
              twitterID(setFieldValue)
              break;
          case 'facebook':
              
              break;
          default:
             console.log("other check")
         }
  }
  const TextInput=({...props})=>{

      return (<input className={props.className}  {...props} />)
     
    
  }
  const ErrorComponent=(props:any)=>{
    
    return (<div className="text-danger mt-0 pt-0">{props.children}</div>)
  }
  return (
    
    <div className="mt-60p md:mx-110p font-Rajdhani text-davygrey">
      <div className="uppercase mb-3 flex msm:justify-center md:justify-start text-34 font-semibold">
        <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-5p"/>
        General <span className="text-texasRose">setting</span>
      </div>
      <p className="text-25 tracking-5p msm:text-center md:text-left uppercase font-medium">personal information</p>
      <p className="text-cloud text-17 msm:text-center md:text-left">Edit You Information To Get People To Know You</p>

    <Formik
    initialValues={{ name:user.name,username:user.name,website:'',description:'',twitter:twitterId,facebook:facebookId}}

    validationSchema={UpdateSchema}
    onSubmit={values => {
     // same shape as initial values
     handleUpdate(values);
     console.log(values);
    }}
    enableReinitialize={true}
  >
  
  {({ errors, touched,values,setFieldValue,handleChange,getFieldProps,handleBlur}) => (

       <Form>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 msm:gap-0 md:gap-40 px-20p border-b-2 border-dashed mb-20p">
        <div className="flex justify-center my-3 md:my-0"><img src={defaultAvatar} className="border-4 border-texasRose rounded-full"/></div>
        <div>
          <div className="">
           <p className="font-semibold text-17 tracking-10p">Username</p>
           <Field name="username" className={inputStyle} type="text" as={TextInput} placeholder="@grandoa" />
           <ErrorMessage name="username" component={ErrorComponent}/>
          </div>
          <div className="">
            <p className="font-semibold text-17 tracking-10p msm:mt-0p md:mt-21p">Name</p>
            <Field name="name" className={inputStyle} type="text" as={TextInput} placeholder="@grandoa" />
            <ErrorMessage name="name" component={ErrorComponent}/>
          </div>
          <div className="">
            <p className="font-semibold text-17 tracking-10p  msm:mt-0p md:mt-21p">Personal Website</p>
            <Field name="website" className={inputStyle} type="text" as={TextInput} placeholder="@grandoa" />
            <ErrorMessage name="website" component={ErrorComponent}/>
          </div>
        </div>
        <div className="h-100">
          <p className="font-semibold text-17 tracking-10p">Description</p>
          <textarea className="pb-5 mb-5 md:pb-0 md:mb-0 h-[calc(100%-47px)] w-full rounded-default text-davygrey indent-15 bg-white bg-opacity-50 mr-5 border-2 border-davygrey pt-15p" 
           {...getFieldProps('description')}
           placeholder="Tell me about yourself" 
           />
        </div>
      </div>
      <p className="text-25 tracking-5p uppercase font-medium msm:text-center md:text-left font-Rajdhani">complete your social media</p>
      <p className="text-cloud text-17 msm:text-center md:text-left">Connect Your Social Media Accounts</p>
      <div className="grid msm:grid-cols-1 md:grid-cols-3 gap-10 px-20p">
        {
          userSocials.map((item, index) => {
      
            return <div key={index} className="">
              <p><FontAwesomeIcon icon={item.icon} className="text-texasRose"/> <span>{item.name}</span></p>
              <div>
                {item.name.toLowerCase()=="twitter" || item.name.toLowerCase()=="facebook" ? <Field name={item.name.toLowerCase()} readOnly  className="h-30 w-[calc(100%-100px)] rounded-default text-davygrey indent-15 bg-white bg-opacity-50 mr-5 border-2 border-davygrey" type="text" as={TextInput} placeholder="@grandoa" /> :<Field name={item.name.toLowerCase()} className="h-30 w-[calc(100%-100px)] rounded-default text-davygrey indent-15 bg-white bg-opacity-50 mr-5 border-2 border-davygrey" type="text" as={TextInput} placeholder="@grandoa" /> }
                
                 <ErrorMessage name={item.name.toLowerCase()} component={ErrorComponent}/>
                 {item.name.toLowerCase()=="facebook" ?
                 <FacebookLogin
                  appId="239281188344238"
                  autoLoad={false}
                  scope="public_profile,user_friends"
                  callback={fbID}
                  render={renderProps => (<button type="button" onClick={()=>renderProps.onClick()} className="text-15 msm:ml-5 md:ml-0 text-default bg-friarGrey w-80 h-30 rounded-default">CHECK</button>)}
                  />:
                  <button type="button" onClick={()=>{checkSocialID(item.name.toLowerCase(),setFieldValue);setUpdateField(()=>setFieldValue)}} className="text-15 msm:ml-5 md:ml-0 text-default bg-friarGrey w-80 h-30 rounded-default">CHECK</button>
                }
                {item.name.toLowerCase()=="twitter" && exist.twitter && <div className="text-danger mt-0 pt-0">twitter_id already exists</div>}
                {item.name.toLowerCase()=="facebook" && exist.facebook && <div className="text-danger mt-0 pt-0">facebook_id already exists</div>}
                {item.name.toLowerCase()=="youtube" && exist.youtube && <div className="text-danger mt-0 pt-0">youtube_id already exists</div>}
              </div>
            </div>
          })
        }
      </div>
      <div className="my-30p mr-10p flex msm:justify-center md:justify-end">
        <button className="msm:text-17 fontsemibold md:text-15 text-default bg-texasRose msm:w-220 md:w-170 msm:h-35 md:h-30 rounded-default text-white">SAVE SETTING</button>
      </div>
        </Form>
   )}
  

  </Formik>
      
      

      <div className="hidden md:flex uppercase text-34 font-semibold">
        <FontAwesomeIcon icon={faCaretRight} className="text-texasRose mr-5p"/>
         General<span className="text-texasRose">Email & password</span>
        {secure}
      </div>
      <div className="flex md:hidden uppercase text-34 font-Rajdhani">
        <span className="w-100 text-center">Email & password</span>
        {secure}
      </div>
      
      <div className="flex msm:flex-col mt-20 md:mt-0 md:flex-row">
        <div className="flex items-center justify-center flex-col ">
          <div className="flex items-center justify-center w-95p h-95p rounded-full  bg-texasRose   bg-opacity-10 mr-10p  mb-2">
          
           {lock==false ?  <FontAwesomeIcon icon={faLock} className="w-60p h-60p text-[#D50C0C]"/>: <FontAwesomeIcon icon={faLock} className="w-60p h-60p text-texasRose"/>}
          </div>
          {lock==false ? <p className="text-18 text-center font-semibold text-[#D50C0C]">WRONG<br/>PASSWORD</p>:""}
        </div>
        {secure==true?
        (
        <div >
        <p className="uppercase text-davygrey text-25 leading-25 tracking-3p font-medium">security check</p>
        <button onClick={formStep} className="w-170 text-default bg-texasRose rounded-default text-17 mt-25p leading-30 text-white font-semibold">CONTINUE</button>
        </div>):(
          <div  className="px-20p">
          <p className="uppercase text-davygrey msm:text-center md:text-left text-25 leading-25 tracking-3p font-medium">account security</p>
          <p className="text-17 text-cloud msm:text-center md:text-left">Please enter your password to continue</p>
          <div className="relative msm:my-15 md:my-0">
            <input onChange={(e)=>setConfirmPwd(e.target.value)}className="h-30 w-full  rounded-default text-davygrey indent-15 bg-white bg-opacity-50 mr-5 border-2 border-davygrey" type="password" name="confirm_pwd" placeholder="@grandoa"/>
            {/* <img src={eyeSvg} className="absolute right-10p top-2 w-26 h-26"> */}
            <p className="w-100 text-10 absolute flex sm:justify-start md:justify-end">Forgot Your Password?</p>
          </div>
          <div className="w-100 flex msm:justify-center md:justify-start">
          <button onClick={handleConfirm} className="msm:w-220 md:w-170 msm:h-35 md:h-30 text-default bg-texasRose rounded-default text-17 mt-25p leading-30 text-white font-semibold">CONFIRM</button>
          </div>
        </div>
          
        )
}

      </div>
      {formSecure?
      (<form>
      <div className="mt-2 mb-2">
        <p className="text-25 font-semibold">EDIT YOUR EMAIL</p>
       </div>
      <div className="w-300">
          <label>New Email</label>
          <input 
            className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" 
            placeholder="New Email" 
            name="email"
          />
       </div>
       <div className="mt-2 mb-2">
        <p className="text-25 font-semibold">EDIT YOUR PASSWORD</p>
       </div>
       <div className="w-300 ">
         <label>Old Password</label>
          <input
            onChange={(e)=>setOldPwd(e.target.value)} 
            className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" 
            placeholder="Old Password" 
            name="old_password"
          />
       </div>
       <div className="w-300">
         <label>New Password</label>
          <input 
            onChange={(e)=>setNewPwd(e.target.value)}
            className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" 
            placeholder="New Password" 
            name="new_password"
          />
       </div>
       <div className="my-30p mr-10p flex justify-end">
       <button type="submit" onClick={updatePassword} className="w-170 text-default bg-texasRose rounded-default text-17 mt-25p leading-30 text-white font-semibold">SAVE</button>
       </div>
       </form>):""}

     <Modal
     show={show}
     dialogClassName="modal-90w"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <>
   <div className='pt-20 flex justify-end'>
<FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={onHide}></FontAwesomeIcon>
    </div>
    <div className="">
      <h1 className="text-center text-42 font-Rajdhani mb-4 text-success">
       Update Password SuccessFully
      </h1>
      {/* <p className="text-center text-16 leading-24 font-poppins">
        please go to Login
      </p> */}
    </div>
    </>
  </Modal>
    </div>
   
  );
};

export default UserSetting;
