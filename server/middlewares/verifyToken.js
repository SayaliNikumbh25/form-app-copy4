import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const verifyToken = (req,res,next) =>{
    console.log("at verify token")
    console.log(req.header('Authorization'))
    try {
        const token = req.header('Authorization').split(' ')[1];
        console.log("token",token)
        if(!token) return res.status(401).json({Message: 'Token not found or invalid'});
        const decoded = jwt.verify(token,process.env.SECRET);
        console.log(decoded)
        req.refUserId = decoded.UserId; 
        
        next();
    } catch (error) {
        res.status(500).json({Message: 'Token not found or invalid'});
  
    }
}

export default verifyToken