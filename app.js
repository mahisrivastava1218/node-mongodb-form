import express, { json } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import userModel from './model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use(express.static(path.join(__dirname ,'public')));
app.use(cookieParser());

app.get('/',function(req,res){
    res.render('index');
})
app.post('/create',(req,res)=>{
    let {name,email,password,batch} = req.body;
   
    bcrypt.genSalt(10,(err,salt)=>{
     bcrypt.hash(password, salt, async(err, hash)=>{
        let createdUser = await userModel.create({
            name,
            email,
            password: hash,
            batch
        })
        let token = jwt.sign({email},"fjjjkkkkkkkk")
        res.cookie("token",token);
        res.send(createdUser);
        })
    })
})
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',async function(req,res){
    let user = await userModel.findOne({email: req.body.email});
    if(!user) return res.send("something went wrong");
   
    bcrypt.compare(req.body.password, user.password, function(err,result){
       if(result){
        let token = jwt.sign({email: user.email}, "afhsgfhhk");
        res.cookie("token",token);
        res.send("yes you can login")
       }
    })
})
app.get('/logout',function(req,res){
    res.cookie("token","");
    res.redirect("/")
})
app.listen(3000);