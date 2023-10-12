import { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import { Formik, Field, Form} from "formik";
import * as Yup from 'yup';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import  {useCookies} from "react-cookie"
import useAuth from '../../hooks/useAuth'
const API_URL = 'https://grandora.games/'
const socket = io(API_URL)
const SignInModal = (props: any) => {
 
  const { setUser } = useAuth()
  const [cookies,setCookie]=useCookies(['user']);
  const [email, setEmail] = useState('');
  const [error,setError]=useState('');
  const [password, setPassword] = useState('');
  const userCheck=async (email:any)=>{
     let res=await axios.get(`https://grandora.games/api/player-services/email-check/${email}`)
     return res.data.result;
   
  }
  const handleLogin = async () => {
    let check=await userCheck(email);
    if(check){
    setError('');
    console.log("login")
    axios.post('https://grandora.games/api/player-services/auth', {
      email: email,
      password: password,
      login_type:"email"
      
    }).then((res) => {
      if(res.data.success){
        
        let date=new Date()
        setCookie('user',res.data.data.player_info,{path:'/',expires:date,maxAge:10000,secure:false,sameSite:true})
        setUser(res.data.data.player_info);
        console.log("sucess",res.data.data.player_info)
        props.onHide();
      }else{
        setError(res.data.message)
        console.log("er",res.data)
      }
     
    }).catch((err) => {
      console.log("no",err)
    })
  }else{
    setError('Email Not Available')
  }
  }
  const closeModel=()=>{
    props.onHide();
    setError('');
  }
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Password Required'),
  });
  return (
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
        initialValues={{ email: "",password:"" }}
        validationSchema={SignupSchema}
        onSubmit={values => {
         // same shape as initial values
         handleLogin();
         console.log(values);
        }}
      >
      {({ errors, touched,values,handleChange,handleBlur}) => (
        <Form>
      <div className='pt-20 flex justify-end'>
        <FontAwesomeIcon icon={faClose} className="w-20 h-20 cursor-pointer mr-20" onClick={closeModel}></FontAwesomeIcon>
      </div>
      <div className='text-center font-Rajdhani text-42 text-iridium leading-63 tracking-5p'>SIGN IN</div>
      <div className='text-center text-16 leading-24 font-Rajdhani'>You'll need to be logged in to upload to the Marketplace.</div>
      <Modal.Body className='py-20p font-Rajdhani text-center tracking-10'>
        <div className="w-300 mx-auto">
       {error && <p className="text-danger">{error}</p>}
        {errors.email && touched.email ? (
             <div className="text-danger mt-0 pt-0">{errors.email}</div>
           ) : null}
          <input 
            className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border-1 mb-20p active:border-lovelyPurple" 
            placeholder="Username or Email" 
            name="email"
            onChange={(e) =>{ handleChange(e); userCheck(e);setEmail(e.target.value)}}  
            onBlur={handleBlur}
            value={values.email}
          />
           {errors.password && touched.password ? (
             <div className="text-danger mt-0 pt-0">{errors.password}</div>
           ) : null}
          <input 
            className="h-30 w-full rounded-default text-iridium indent-15 bg-white bg-opacity-50 mr-5 border" 
            placeholder="Password" 
            name="password"
            onChange={(e) => { handleChange(e);setPassword(e.target.value)}}
            onBlur={handleBlur}
            type='password'
            value={values.password}
          />
          {/* <div className="flex flex-row-reverse">
            <button className="text-lovelyPurple">Forgot password</button>
          </div> */}
          <div className="flex flex-col items-center">
            <button 
              className='w-230 h-40 text-default border-1 border-davygrey bg-davygrey rounded-8 px-32p py-8p my-15p'
              type="submit"
            >
                login
            </button>
            {/* <div className='h-1p border-dashed border-1 w-full border-davygrey'></div>
            <button className='w-230 h-40 text-davygrey border-1 border-davygrey bg-default rounded-8 px-32p py-8p my-15p'>sign in with wallet</button> */}
          </div>
        </div>
      </Modal.Body>
      </Form>
      )}
      </Formik>
    </Modal>
    
  );
}

export default SignInModal;
