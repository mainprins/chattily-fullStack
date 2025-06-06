import express from "express"
import dotenv from "dotenv"
import authRouters from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import cors from "cors"
import messageRoutes from "./routes/message.route.js"
import { app,server,io } from "./lib/socket.js"
import path from "path"

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))


app.use("/api/auth",authRouters)
app.use("/api/messages",messageRoutes)


server.listen(PORT,()=>{
    console.log("Server has started at port "+PORT)
    connectDB()
})