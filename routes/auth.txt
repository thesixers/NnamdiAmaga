import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { createJwt, handleError } from '../middleware/general.js';

const router = express.Router();


const JWT_SECRET = 'your_jwt_secret_key';


router.post('/register', async (req, res) => {
    let {name, email,password,gender, dob} = req.body;
    console.log({name, email,password,gender, dob});

    try{
        let saved = await User.create({name, email,password,gender,dob});
        res.status(200).json({M: 'Account created'});
    }
    catch(err){
        console.log(err);
        let errors = handleError(err);
        console.log(errors);
        res.status(500).json({errors}); 
    }
  
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.login({ email, password });

        let id = user._id

        const token = createJwt(id);

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
       console.log(err.message);
       let error = handleError(err);
       res.status(500).json({error})
    }
});


router.post('/logout', (req, res) => {
  
});


router.get('/me', async (req, res) => {
  
});

export default router;
