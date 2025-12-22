

const GetPlayerUUID = async (username) => {
    try {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, {
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