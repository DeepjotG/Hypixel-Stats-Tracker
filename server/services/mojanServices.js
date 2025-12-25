

const GetPlayerUUID = async (username) => {
    try {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Player not found');
            }
            throw new Error(`Mojang API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.id) {
            throw new Error('Invalid response from Mojang API');
        }
        
        return data;
    } catch (err) {
        throw new Error(`Failed to fetch player UUID: ${err.message}`);
    }
}

const GetPlayerProfile = async (uuid) => {
    try {
        const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err.message);
    }
}


export { GetPlayerUUID, GetPlayerProfile };