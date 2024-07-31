import express from 'express'
import auth from '../controllers/auth.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/register', auth.createUser);

router.post('/login', auth.login);

router.patch('/:id',verifyToken, auth.updateUser);

export default router
