import express from 'express';
import { authUser, requiredFields } from "../controllers/loginController.js"


const authRoutes = express.Router();

authRoutes.post("/", requiredFields, authUser);


export { authRoutes };