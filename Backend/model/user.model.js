const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    city:{type:String,required:true}
},{
    versionKey:false
})
const UserModel=mongoose.model("signup",userSchema)
module.exports={
    UserModel
}