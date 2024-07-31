import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import env from 'dotenv';

env.config();

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    try {
      const existingUser = await User.findOne({ email });
      console.log("existingUser", existingUser)
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({ username, email, password: hashedPassword });
      const resp= await newUser.save();
      console.log("resp",resp)
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
      res.status(201).json({ token, user: { id: newUser._id, username, email  } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  const login = async (req, res) => {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase()
  
    try {
      const user = await User.findOne({email:lowerEmail });
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ UserId: user._id, username:user.username },process.env.SECRET);
      res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.lowerEmail } });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, oldPassword, password } = req.body;
    console.log(id,email, oldPassword, password )
    try {
      console.log("here")
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (oldPassword && password) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Old password is incorrect' });
        }
        user.password = await bcrypt.hash(password, 12);
      }
  
      if (email) user.email = email;
      
      const updatedUser = await user.save();
      console.log("updatedUser", updatedUser)
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }

export default {createUser, login, updateUser}