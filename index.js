import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app  = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/',(req,res)=>{
    // res.cookie('name',"lita");
    // res.send('Hi');
    // bcrypt.genSalt(10,function(err,salt){
    //     // bcrypt.hash("lotie lotie chocko",salt, function(err, hash){
    //     //     console.log(hash); ///encryption done
    //     // })
    //     // bcrypt.compare("lotie lotie chocko","$2b$10$sjb93o3HT3ZqsqijqXtA3evsaPQ3toM6HylXbJBtWkpkAVGiqct/G", function(err,result){
    //     //     console.log(result);
    //     // });
    //     //bcrypt compare comparing string with hashing string(password) it true then it returns true else false
        
    // });

    //use jsonweb token 
    //generate token by secret key using jwt
   let token = jwt.sign({email: "sham@gmail.com"},"secret");
   res.cookie("token",token); //send token in cookie
   res.send("decryption is done read page"); 
})
//cookie attach to every route
// Cookies and similar technologies used for security help to authenticate users, prevent fraud, and protect you as you interact with a service.
app.get('/read',(req,res)=>{
    //decrypt data
    let data = jwt.verify(req.cookies.token,"secret") //verify decrypt token value pass secret key (decryption is done)
    console.log(data); //op-{email: "sham@gmail.com"}
})

app.listen(3000);