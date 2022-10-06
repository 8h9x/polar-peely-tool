import { profileOperation } from "./profileOperation.js";

export async function claimPeelyReward(accountId, accessToken, rewardGraphId) {
    return await profileOperation("UnlockRewardNode", accountId, accessToken, {
        nodeId: "ERG.Node.D.1",
        rewardGraphId: rewardGraphId,
        rewardCfg: ""
    });
};