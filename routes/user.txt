import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkLogin } from '../middleware/general.js';
import User from '../model/user.js';
import HealthData from '../model/healthData.js';
import HealthStatus from '../model/healthStatus.js';

const router = express.Router();


router.get('/me', async (req, res) => {
     const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];
   
     if (token == null) {
       return res.status(401);
     }
   
     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
       if (err) {
         return res.status(401);
       }

       let id = decodedToken.id; 

       let Us = await User.findById(id);
       let HD = await HealthData.find();
       let HS = await HealthStatus.find();

        let fHS = HS.filter((e,i) => e.user === id);
        let fHD = HD.filter((e,i) => e.user === id);

       
       res.status(200).json({Us, fHD, fHS});
     })
});

export default router;
