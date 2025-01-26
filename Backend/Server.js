import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './Config/db.js';
import ProductRouter from './Router/ProductRoutes.js';
import UserRouter from "./Router/UserRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import session from 'express-session';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // Set secure to true if you're using HTTPS
}));


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies
}));//This will allow your frontend and backend to communicate across different ports. You can also configure CORS more strictly depending on your needs.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", UserRouter);
app.use('/', ProductRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB();
