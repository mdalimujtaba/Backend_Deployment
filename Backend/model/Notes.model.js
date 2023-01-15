const mongoose=require("mongoose")

const NoteSchema=mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    userID:{type:String,required:true}
    
},{
    versionKey:false
})
const NoteModel=mongoose.model("note",NoteSchema)
module.exports={
    NoteModel
}