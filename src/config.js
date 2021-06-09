const GRAPHQL_HOST = "https://t30294-s50525.sandbox.mozu.com/graphql";
// const HOST = "";
const config = {
    "accessTokenUrl": process.env.AUTH_URL || "https://home.mozu.com/api/platform/applications/authtickets/oauth",
    "clientId":  process.env.CLIENT_ID || "d4e9bb5.sleepy_hollow.1.0.0.Release",
    "sharedSecret": process.env.SHARED_SECRET || "a84414e1fcdd425bbd4c4ac68428b61c",
    "apiHost":  process.env.API_HOST || "https://t30294-s50525.sandbox.mozu.com",
}

export default config
export {
    GRAPHQL_HOST
}