import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js'
import formRoutes from './routes/forms.js'
import folderRoutes from './routes/folder.js'
import cors from 'cors'
import verifyToken from './middlewares/verifyToken.js';

env.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/folders',folderRoutes);

app.get('/',(req,res)=>{
    res.json({
        Status: 'Sucess',
        Message:'Api working fine'
    })
})

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log('Connected to database Successfuly')})
    .then(()=> console.log(`Server is running at port ${process.env.PORT} `))
   
})

