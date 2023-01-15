const express=require("express")
require("dotenv").config
const userRoute=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/user.model")

userRoute.post("/signup",(req,res)=>{
    console.log(req.body)
    let {name,email,password,city}=req.body
    try {
        bcrypt.hash(password, 6, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }
            else{
                let signupdata=new UserModel({name,email,password:secure_password,city})
                await signupdata.save()
                console.log(signupdata)
                res.send("Signup Successful")
            }
        });
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})
userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try {
        let user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    var token = jwt.sign({ userID:user[0]._id }, 'masai');
                    res.send({"msg":"Login Successful","token":token})
                }
                else{
                    res.send("Wrong Credential")
                }
            });
        }
        else{
            res.send("Wrong Credential")
        }
    } catch (error) {
        console.log("wrong Credential")
        res.send("Wrong Credential")
    }
})

module.exports={
    userRoute
}