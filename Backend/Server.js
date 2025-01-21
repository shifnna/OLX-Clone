import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import {connectDB} from './Config/db.js';
import morgan from 'morgan'
import ProductRouter from './Router/ProductRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:5000', // Replace with your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));


app.use(morgan('dev'))

app.use('/', ProductRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
connectDB()