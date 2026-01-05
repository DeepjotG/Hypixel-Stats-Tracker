import express from 'express';
import { authUser, requiredFields } from "../controllers/loginController.js"


const router = express.Router();

router.post("/", requiredFields, authUser);

export { router as authRouter };