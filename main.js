import readline from "readline";
import { fetch } from "undici";

async function claim_polar_peely(id, token, rewardGraphId) {
    const res = await fetch(`https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${id}/client/UnlockRewardNode?profileId=athena&rvn=-1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            nodeId: "ERG.Node.D.1",
            rewardGraphId: rewardGraphId,
            rewardCfg: ""
        })
    });
    return await res.json();
};

async function fetch_profile(id, token) {
    const res = await fetch(`https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/${id}/client/QueryProfile?profileId=athena&rvn=-1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
    });
    return await res.json();
};

async function authenticate(auth_code) {
    const res = await fetch("https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic MzQ0NmNkNzI2OTRjNGE0NDg1ZDgxYjc3YWRiYjIxNDE6OTIwOWQ0YTVlMjVhNDU3ZmI5YjA3NDg5ZDMxM2I0MWE="
        },
        body: `grant_type=authorization_code&code=${auth_code}`
    });
    return await res.json();
};

async function read(question) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    return new Promise((res) => rl.question(question + " ", (answer) => {
        rl.close(); res(answer);
    }));
};

async function main() {
    const code = await read("Please enter a valid auth code from https://www.epicgames.com/id/api/redirect?clientId=3446cd72694c4a4485d81b77adbb2141&responseType=code");
    const auth = await authenticate(code);
    const profile = await fetch_profile(auth.account_id, auth.access_token);
    const items = profile.profileChanges[0].profile.items;
    let rewardGraphId;
    for (const item in items) {
        if(items[item].templateId === "AthenaRewardGraph:s19_winterfest") rewardGraphId = item;
    };
    claim_polar_peely(auth.account_id, auth.access_token, rewardGraphId);
    console.log("Polar Peely Skin Successfully Claimed!");
};

if (parseFloat(process.version.slice(1, 5)) < 14.8) {
    console.error("Please update to node version 14.8 or greater!");
} else {
    main();
};