import express from 'express';
import dotenv from 'dotenv';
import { getHypixelProfile, getPitProfile, getPitInventory } from './services/hypixelServices.js';
import { GetPlayerUUID } from './services/mojanServices.js';

dotenv.config();

const app = express();


app.get('/player/:username', async (req, res) => {
    const username = req.params.username;
    const uuid = await GetPlayerUUID(username);
    const data = await getPitProfile(uuid.id);
    const inv = await getPitInventory(data);

    console.log(inv); 

    res.json(data);
});

export default app;

