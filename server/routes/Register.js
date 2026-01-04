import express from 'express';
import { registerUser } from '../controllers/registerController.js';

const registerRoute = express.Router();

registerRoute.post("/", registerUser);


export { registerRoute };
