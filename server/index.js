import express from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js'
import formRoutes from './routes/forms.js'
import folderRoutes from './routes/folder.js'
import cors from 'cors'
import verifyToken from './middlewares/verifyToken.js';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

env.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'))

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

app.listen(5000, ()=>{
    mongoose.connect("mongodb+srv://sayalinikumbh:sayali2598@cluster1.06ujhga.mongodb.net/form-builder?retryWrites=true&w=majority&appName=Cluster1")
    .then(()=>{console.log('Connected to database Successfuly')})
    .then(()=> console.log(`Server is running at port 5000`))
   
})

