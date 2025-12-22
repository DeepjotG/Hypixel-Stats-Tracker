import zlib from "zlib";
import nbt from "prismarine-nbt";
import { promisify } from "util";


const gunzip = promisify(zlib.gunzip);

const getHypixelProfile = async (uuid) => {
    try {
        const response = await fetch(`https://api.hypixel.net/v2/player?uuid=${uuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.API_KEY,
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
}

const getPitProfile = async (uuid) => {
    try {
        const data = await getHypixelProfile(uuid);
        return data.player.stats.Pit.profile;
    } catch (err) {
        console.log(err.message);
    }
}


const getPitInventory = async (profile) => {
    const baseDecoded = Buffer.from(profile.inv_contents.data, 'base64');
    const decompressed = await gunzip(baseDecoded);
    const nbtData = await nbt.parse(decompressed, 'big');

    const itemsList = nbtData.parsed.value.i;

    const simplifiedItems = nbt.simplify(itemsList);

    simplifiedItems.forEach((item, index) => {
        if (item.id) {
            console.log(`Slot ${index}:`, {
                itemId: item.id,
                count: item.Count,
                name: item.tag?.display?.Name, // Custom item name
                lore: item.tag?.display?.Lore, // Item description lines
                extraAttributes: item.tag?.ExtraAttributes // Hypixel data
            });
        }
        
    });

    return simplifiedItems;


}



export { getHypixelProfile, getPitProfile, getPitInventory };