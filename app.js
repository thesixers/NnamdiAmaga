import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import auth from './routes/auth.js';
import healthData from './routes/healthData.js';
import healthStatus from './routes/healthStatus.js'
import cors from 'cors';
import userRoute from './routes/user.js';


const app= express();

// Load environment variables
config();

const {PORT, MONGO_URI} = process.env

const port = PORT || 3003; 

// MongoDB Connection
connect(MONGO_URI)
.then(() => {
    console.log('MongoDB connected'); 
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.log('MongoDB connection error: ', err.message);
});

// Middleware
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));  
app.use(cors());

// Routes
app.get('/', (req,res)=>{
    // res.redirect('/api/auth');
    res.json({
        connection: true,
        status: 'connected'
    })
});

app.use('/auth', auth);
app.use('/healthdata', healthData);
app.use('/healthstatus', healthStatus);
app.use('/user', userRoute);