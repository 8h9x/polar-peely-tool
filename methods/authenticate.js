import { request } from "undici";

export async function authenticate(authorizationCode) {
    const { body } = await request("https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE="
        },
        body: `grant_type=authorization_code&code=${authorizationCode}`
    });
    return await body.json();
};