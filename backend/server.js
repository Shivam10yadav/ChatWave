// Updated CORS for production

import express from 'express' 
import dotenv from'dotenv'
import authRoutes from'./routes/authRoutes.js'
import { connect } from 'mongoose'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import cors from 'cors'
const app=express()
dotenv.config()

const PORT=process.env.PORT 
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://chatwave-qjnp.onrender.com"
    ],
    credentials: true
}))

// server.js or app.js
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
}); 
app.use(express.json())
app.use(cookieParser());


app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)

app.listen(PORT,(req,res)=>{
    console.log(`server is running on ${PORT}`)
    connectDB()
}) 