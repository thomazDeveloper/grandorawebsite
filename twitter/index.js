const express=require('express');
const app=express();
const http = require('http')
const server = http.createServer(app)//server create
const socketio = require('socket.io')//socket 
const io = socketio(server,{cors:{origins:'https://grand-update.web.app'}})//socket server config
const port=4000;
const passport=require('passport');
const TwitterStrategy=require('passport-twitter');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const cors=require('cors');
app.use(cors()) 
//passport initalize app and cookies session set
app.use(passport.initialize());
app.use(session({
    secret:"twitter-auth",
    resave: true, 
    saveUninitialized: true 
}));
app.use(express.json())
app.use(cookieParser());
app.use(passport.session());
//passport twitter config function
passport.use(new TwitterStrategy({
    consumerKey: "zzVc97TWzazlX76073OYT3ICp",
    consumerSecret: "HVUyKlasHd9JSTebScq64XSu0GDJyRSrjMUVSDemvwg0ybOAc6",
    callbackURL: "https://grandora.games/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
   done(null,profile);
  }
));
//twitter auth receive user data callback function
passport.serializeUser(function(user, callback){
  callback(null, user);
});
passport.deserializeUser(function(object, callback){
  callback(null, object);
});
//Socket ID Middleware to set and send user data correct request browser
const addSocketIdToSession = (req, res, next) => {
   var datID= req.query.socketId
   res.cookie("session_id",  datID,{
     sameSite:false,
     path:'/',
     expires:new Date(new Date().getTime()*5*1000),
     httpOnly:true
  })
  next()
}
app.get('/auth/twitter',addSocketIdToSession,passport.authenticate('twitter'));
//Home Result this route not need
app.get('/auth/user',function(req, res){
 console.log("id", req.cookies['session_id']);
 res.json({ user: req.user, isAuth: true });
 
});
app.get('/auth/twitter/callback', passport.authenticate('twitter'),(req,res)=>{
   io.in(req.cookies['session_id']).emit('user',req.user);
   res.end();
});
server.listen((port),()=>{console.log("Server Start"+port)});
