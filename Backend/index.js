const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")
dotenv.config()
const connection=require("./configs/db")
const { userRoute } = require("./route/user.route")
const { noteRoute } = require("./route/note.route")
const { authenticate } = require("./middleware/authentication.middlware")
const app=express()

app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/user",userRoute)
app.use(authenticate)
app.use("/note",noteRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
        console.log("something went wrong while connecting to database")
    }
    console.log(`server is running at http://localhost:${process.env.port}`)
    
})