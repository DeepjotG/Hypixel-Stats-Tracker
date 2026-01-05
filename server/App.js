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
import { authRouter } from "./routes/auth.js";
import { registerRouter } from "./routes/register.js";
import { refreshRouter } from "./routes/refresh.js";
import { logoutRouter } from "./routes/logout.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOption.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

//Handling option credentials check before CORS! is needed to fectch cookie credential requirements
app.use(credentials);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// Routes
app.use("/login", authRouter); // This will handle /login
app.use("/register", registerRouter);
app.use("/refresh", refreshRouter); // This will handle /refresh
app.use("/logout", logoutRouter);

app.get("/player/:username", async (req, res) => {
  const username = req.params.username;
  const uuid = await GetPlayerUUID(username);
  const data = await getPitProfile(uuid.id);
  const inv = await getPitInventory(data);

  // console.log(inv_armor);

  res.json(data);
});

export default app;

