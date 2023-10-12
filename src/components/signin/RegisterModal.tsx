import { useState, FC, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas,faClose} from '@fortawesome/free-solid-svg-icons';
import SignInModal from './SignInModal';
import InformModal from './InformModal'

import  {useCookies} from "react-cookie"
import useAuth from '../../hooks/useAuth'

const RegisterModal = (props: any) => {

  const { setUser } = useAuth();
  const [cookies,setCookie]=useCookies(['user']);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]= useState('');
  const [openInform, setOpenInform] = useState(false)
  const [siginShow, setSigninShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [logPopup,setLogPopup]=useState(false)
  const { user } = useAuth();
  const {socialEmail}= props
  useEffect(() => {
    if (user?.email) {
      setModalShow(false)
    } 
  }, [user])
  const handleRegister = async () => {
    let postBody: any = {
      name: `${firstName} ${lastName}`,
      email: socialEmail.email ? socialEmail.email:email,
      password: password
    }
    axios.get(`https://grandora.games/api/player-services/email-check/${user.email}`).then((res) => {
          if (res.data.result) {
            setError(res.data.message)
           // alert(JSON.stringify(res.data));
            return
          }
        })
    if (props.walletId !== "") {
      postBody.wallet_id = props.walletId
    }
    if (props.twitterId !== "") {
      postBody.twitter_Id = props.twitterId
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'} ,
  };
    axios.post('https://grandora.games/api/player-services/signup',postBody, requestOptions)
        .then(res =>{
           //setUser(res.data.player_info)
           
          if(res.data.success){
            let date=new Date()
        setCookie('user',res.data.data.player_info,{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
        setUser(res.data.data.player_info);
        console.log("sucess",res.data.data.player_info)
        props.onHide();
            setOpenInform(true)
            console.log(res.data.success)
          }
          if(!res.data.success){
            setError(res.data.message)
            alert(JSON.stringify(res.data));
          }
          // setOpenInform(true)
           //setLogPopup(true)
           //alert(JSON.stringify(res));
        })
        .catch(error => {
            alert(JSON.stringify(error.response.data));
        });
   
  }
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Firtname Required')
      .matches(/^([aA-zZ\s])+$/,"Only alphabet are allowed field"),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Lastname Required')
      .matches(/^([aA-zZ\s])+$/,"Only alphabet are allowed field"),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
    .required('Password Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirm_password:Yup.string()
    .required('Confirm password Required')
    .oneOf([Yup.ref('password'),null],"Password don't match")
   
  });
  const closeModel=()=>{
   props.onHide();setEmail('');setError('');
   props.resetSocialID();
  }
  const backSign=()=>{
    props.resetSocialID();
    setEmail('');
    setError('');
    props.onHide();
    props.backOption();
    
  }
  return (
    <>
   

      <Modal
        {...props}
        size="w640"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
        <FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={props.onHide}></FontAwesomeIcon>
      </Modal.Header> */}
       <Formik
        initialValues={{ firstName: "", lastName:"",email:`${socialEmail.email}`,password:"",confirm_password:''}}
        validationSchema={SignupSchema}
        onSubmit={values => {
         // same shape as initial values
         handleRegister();
         console.log(values);
        }}
      >
      {({ errors, touched,values,handleChange,handleBlur}) => (
        <Form>
        <div className='pt-20 flex justify-end'>
          <FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={closeModel}></FontAwesomeIcon>
        </div>
        <div className='text-center font-Rajdhani text-42 text-iridium leading-63 tracking-5p'>REGISTER</div>
        <div className='text-center text-16 leading-24 font-Rajdhani'>Welcom new Joiner. Just a few steps to apply</div>
        <Modal.Body className='py-20p font-Rajdhani text-center tracking-10'>
          <div className="w-300 mx-auto">
            {/* <input className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" placeholder="Enter your first name" /> */}
            {/* <input className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" placeholder="Enter your name" onChange={(e) => {
            setName(e.target.value)
          }}/> */}
          <div>
          {error && <p className="text-danger">{error}</p>}
          {errors.firstName && touched.firstName ? (
             <span className="text-danger mt-0 pt-0">{errors.firstName}</span>
           ) : null}
            <input
              className={`h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple ${touched.firstName && errors.firstName ? "invalid":""}`}
              placeholder="First Name"
              name="firstName"
              onChange={(e) => {
                handleChange(e)
                setFirstName(e.target.value)
              }}
              onBlur={handleBlur}
              value={values.firstName}
            />
             
           </div>
           {errors.lastName && touched.lastName ? (
             <div className="text-danger mt-0 pt-0">{errors.lastName}</div>
           ) : null}
            <input
              className={`h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple ${touched.lastName && errors.lastName ? "invalid":""}`}
              placeholder="Last Name"
              name="lastName"
              onChange={(e) => {
                handleChange(e)
                setLastName(e.target.value)
              }}
              onBlur={handleBlur}
              value={values.lastName}
            />
              {errors.email && touched.email ? (
             <div className="text-danger mt-0 pt-0">{errors.email}</div>
           ) : null}
            <input className={`h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border mb-20p  ${touched.email && errors.email ? "invalid":""}`} readOnly={socialEmail.read} placeholder="Email"  value={socialEmail.email ? socialEmail.email:values.email} 
           name="email"
           onChange={(e) => {
              handleChange(e)
              setEmail(e.target.value)
            }}
            onBlur={handleBlur}
            />
             {errors.password && touched.password ? (
             <div className="text-danger mt-0 pt-0">{errors.password}</div>
           ) : null}
            <input type="password" className={`h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple  ${touched.password && errors.password ? "invalid":""}`} placeholder="Password" 
            name="password"
            onChange={(e) => {
              handleChange(e)
              setPassword(e.target.value)
            }}
            onBlur={handleBlur} 
            />
             {errors.confirm_password && touched.confirm_password ? (
             <div className="text-danger">{errors.confirm_password}</div>
           ) : null} 
            <input type="password" className={`h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border  ${touched.confirm_password && errors.confirm_password ? "invalid":""}`} placeholder="Confirm password" 
            name="confirm_password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm_password}
            />
            <div className="flex flex-col items-center">
              <button className='w-230 h-40 text-default border-1 border-davygrey bg-davygrey rounded-8 px-32p py-8p my-15p' type="submit">
                Register
              </button>
              <div className='h-1p border-dashed border-1 w-full border-davygrey'></div>
              <button className='w-230 h-40 text-davygrey border-1 border-davygrey bg-default rounded-8 px-32p py-8p my-15p'  onClick={backSign}>Back to sign in option</button>
            </div>
          </div>
        </Modal.Body>
        </Form>
        )}
        </Formik>
      </Modal>
      <InformModal
        show={openInform}
        resetSocialID={props.resetSocialID}
        logPopup={logPopup}
        onHide={() => setOpenInform(false)}
      />
      
    </>
  );
}

export default RegisterModal;
