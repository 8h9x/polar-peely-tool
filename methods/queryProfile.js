import { profileOperation } from "./profileOperation.js";

export async function queryProfile(accountId, accessToken) {
    return await profileOperation("QueryProfile", accountId, accessToken);
};