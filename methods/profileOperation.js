import { request } from "undici";

export async function profileOperation(operation, accountId, accessToken, payload) {
    const { body } = await request(`https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${accountId}/client/${operation}?profileId=athena&rvn=-1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload ?? {})
    });
    return await body.json();
};