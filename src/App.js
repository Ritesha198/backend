import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const App = express()

App.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
App.use(express.json({limit:"19 kb"}))
App.use(express.urlencoded({extended: true, limit:"19 kb"}))
App.use(cookieParser())

//routes import

import userRouter from './Routes/user.routes.js'

//routes declearation

App.use("/api/v1/users", userRouter)

export {App}