import registerUser from "../controllers/userControllers";
import loginUser from "../controllers/userControllers";
import logoutUser from "../controllers/userControllers";

import express from 'express'

const router = express.Router();

router.post('/register', registerUser.registerUser);
router.post('/login', loginUser.loginUser);
router.get('/logout', logoutUser.logoutUser);

export default router;

