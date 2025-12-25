import zlib from "zlib";
import nbt from "prismarine-nbt";
import { promisify } from "util";


const gunzip = promisify(zlib.gunzip);

/**
 * Base decoder function for Hypixel NBT-encoded inventory data
 * Decodes base64 string, decompresses with gzip, and parses NBT data
 * @param {string} base64Data - Base64 encoded gzipped NBT data
 * @returns {Promise<Array>} - Simplified items array
 */
const decodeInventoryData = async (base64Data) => {
  try {
    const baseDecoded = Buffer.from(base64Data, "base64");
    const decompressed = await gunzip(baseDecoded);
    const nbtData = await nbt.parse(decompressed, "big");
    
    const itemsList = nbtData.parsed.value.i;
    const simplifiedItems = nbt.simplify(itemsList);
    
    return simplifiedItems;
  } catch (err) {
    throw new Error(`Failed to decode inventory data: ${err.message}`);
  }
};

const getHypixelProfile = async (uuid) => {
  try {
    const response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.API_KEY,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 403) {
        throw new Error("Invalid API key");
      }
      throw new Error(`Hypixel API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.cause || "Hypixel API request failed");
    }

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch Hypixel profile: ${err.message}`);
  }
};

const getPitProfile = async (uuid) => {
  try {
    const data = await getHypixelProfile(uuid);

    if (
      !data.player ||
      !data.player.stats ||
      !data.player.stats.Pit ||
      !data.player.stats.Pit.profile
    ) {
      throw new Error("Player does not have Pit stats");
    }

    return data.player.stats.Pit.profile;
  } catch (err) {
    throw err;
  }
};

const getPitInventory = async (profile) => {
  return await decodeInventoryData(profile.inv_contents.data);
};

const getPitEnderChest = async (profile) => {
  return await decodeInventoryData(profile.inv_enderchest.data);
};

export { getHypixelProfile, getPitProfile, getPitInventory, getPitEnderChest, decodeInventoryData };