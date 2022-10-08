import {getCloudflareConfig} from "../../config/cloudflare-config";
import {getVideoCardConfig} from "../../config/video-config";

const cloudflareConfig = getCloudflareConfig();

const videoConfig = getVideoCardConfig();

const signed_url_restrictions = {
    //limit viewing for the next 2 hours
    exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60),
    downloadable: true,
    accessRules: [{"type": "ip.geoip.country", "country": ["US", "MX"], "action": "block"}]
};

export async function getStreamSignedToken(index) {
    try {
        return await fetch(`https://api.cloudflare.com/client/v4/accounts/${cloudflareConfig.accountID}/stream/${videoConfig[index - 1].videoID}/token`, {
            method: 'POST',
            headers: {
                "content-type": "application/json;charset=UTF-8",
                "X-Auth-Key": cloudflareConfig.XAuthKey,
                "X-Auth-Email": cloudflareConfig.XAuthEmail,
            },
            body: JSON.stringify(signed_url_restrictions)
        }).then((res) => res.json());
    } catch (e) {
        console.log("An error occurred when getting the stream's signed token.");
    }
}
