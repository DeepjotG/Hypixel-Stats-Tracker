import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import {
  getHypixelProfile,
  getPitProfile,
  getPitInventory,
  getPitEnderChest,
  decodeInventoryData,
} from "./services/hypixelServices.js";
import { GetPlayerUUID } from "./services/mojanServices.js";
import { authRoutes } from "./routes/Auth.js";
import { registerRoute } from "./routes/Register.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/login", authRoutes); // This will handle /login
app.use("/register", registerRoute);

app.get("/player/:username", async (req, res) => {
  const username = req.params.username;
  const uuid = await GetPlayerUUID(username);
  const data = await getPitProfile(uuid.id);
  const inv = await getPitInventory(data);

  // console.log(inv_armor);

  res.json(data);
});

export default app;

