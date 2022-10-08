const config = {
    accountID: "a9178a5d2a4b1e66cf3e4131ebf24e7f",
    XAuthKey: "6271bf4b87e030dd3374fcae2136a00a0d757",
    XAuthEmail: "skills4lifefirebase@gmail.com",
}

export function getCloudflareConfig() {
    if (!config) {
        throw new Error('No Cloudflare configuration object provided.');
    } else {
        return config;
    }
}
