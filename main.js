import { authenticate } from "./methods/authenticate.js";
import { claimPeelyReward } from "./methods/claimPeelyReward.js";
import { queryProfile } from "./methods/queryProfile.js";
import { read } from "./methods/read.js";

try {
    const code = await read("Please enter a valid authorization code from https://www.epicgames.com/id/api/redirect?clientId=3446cd72694c4a4485d81b77adbb2141&responseType=code");
    const { access_token, account_id } = await authenticate(code);
    const profile = await queryProfile(account_id, access_token);
    const items = profile.profileChanges[0].profile.items;
    const rewardGraphId = items.find(item => item.templateId === "AthenaRewardGraph:s19_winterfest");
    await claimPeelyReward(account_id, access_token, rewardGraphId);
    
    console.log("Successfully claimed the polar peely outfit!");
} catch (err) {
    console.error("An errror occured while trying to claim the polar peely outfit:", err);
};