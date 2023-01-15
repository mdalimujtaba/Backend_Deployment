const express=require("express")
const { NoteModel } = require("../model/Notes.model")
const noteRoute=express.Router()

noteRoute.get("/",async(req,res)=>{
    try {
        let allNotes=await NoteModel.find()
        res.send(allNotes)
        console.log(allNotes)
    } catch (error) {
        console.log(error)
        console.log("Something went wrong")
    }
})
noteRoute.post("/addnote",async(req,res)=>{
    let payload=req.body
    try{
        const note=new NoteModel(payload)
        await note.save()
        console.log(note)
        res.send("Notes added")
    }
    catch(err){
        console.log(err)
        console.log("Something went wrong")
    }
})
noteRoute.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note=await NoteModel.find({"_id":id})
    // console.log(note)
    const userid_in_note=note[0].userID
    const userid_in_req=req.body.userID
    try {
        if(userid_in_note!==userid_in_req){
            res.send("You are not authorized")
        }
        else{
            const updated_item=await NoteModel.findByIdAndUpdate({_id:id},payload)
            console.log(updated_item)
            res.send(`id number ${id} is updated`)
        }
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    
    const id=req.params.id
    const note=await NoteModel.find({"_id":id})
    const userid_in_note=note[0].userID
    const userid_in_req=req.body.userID
    try {
        if(userid_in_note!==userid_in_req){
            res.send("You are not authorized")
        }
        else{
            const updated_item=await NoteModel.findByIdAndDelete({_id:id})
            res.send(`id number ${id} is deleted`)
        }
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})


module.exports={
    noteRoute
}