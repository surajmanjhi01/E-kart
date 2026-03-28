import express from 'express';
import{register, verify,reVerify,login,logout,forgotPassword,verifyOTP,changePassword, allUsers,getUserByid} from '../Controller/userController.js';
import { isAuthenticated,isAdmin } from '../middleware/isAuthenticated.js';
const router=express.Router();
router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reVerify);
router.post('/login', login);
 router.post('/logout',isAuthenticated,logout);
 router.post('/forgot-password',forgotPassword);
router.post('/verify-otp/:email',verifyOTP);
router.post('/change-password/:email',changePassword);
router.get('/all-user',isAuthenticated,isAdmin,allUsers)
router.get('/user/:userId',getUserByid)
 
export default router;