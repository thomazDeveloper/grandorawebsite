import usePlacesAutocomplete from "use-places-autocomplete";
import React,{useState,useEffect} from "react";
import io from 'socket.io-client'
import axios from 'axios';
const API_URL = 'https://grandora.games/'
const socket = io(API_URL)
//npm i use-places-autocomplete
export default function App(){
  const [user,setUser]=useState([]);
  var newWindow=null;
 const twitterLog=(popup)=>{
     socket.on('user',user=>{
        if(newWindow){
         newWindow.close();
        }
         setUser([user]);
         
     })

  } 
  useEffect(()=>{
    twitterLog(newWindow)
  },[user]);
   
  const fetchUser=async()=>{
    let response=await axios.get(`${ API_URL}auth/user`);
    if(response && response.data){
         alert(response.data);
      }
  }
  const authHandler=async ()=>{
     let timer=null;
     const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    
    const url = `${API_URL}auth/twitter?socketId=${socket.id}`
      
    newWindow= window.open(url, '',       
      `width=${width},height=${height}, top=${top}, left=${left}`
    );
    
  }
  const login=()=>{
      return new Promise((resolve, reject) => {
        axios.get(`${API_URL}auth/twitter`, {
            proxy: {
                host: 'http://localhost/',
                port: 4000
            }
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            console.error({ twitterAuthErr: err })
            if (err) reject(err);
            else reject({ title: 'Error', message: 'Service Unavailable - Please try again later.' });
        });
    });
  }
const logout=()=>{
     setUser();
 }
  return (
    <>
    {user && user?.length > 0 ? (<div>
     <h1>"Users Now LoggedIn..."</h1>
       <p>{user[0].displayName}</p>
      <img src={user[0].photos[0].value} width="100"/><br/>
      <button onClick={logout}>{"Logout"}</button>
   
    </div>):(
       <div>
     <h1>{"Login"}</h1>
      <button onClick={authHandler}>Login with Twitter</button>
    </div>
    )}
   </>
  );
};
