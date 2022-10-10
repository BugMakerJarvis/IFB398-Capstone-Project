const config = {
    accountID: "a9178a5d2a4b1e66cf3e4131ebf24e7f",
    XAuthKey: "ab7984082a3405609f27188423c893cabf543",
    XAuthEmail: "skills4lifefirebase@gmail.com",
}

export function getCloudflareConfig() {
    if (!config) {
        throw new Error('No Cloudflare configuration object provided.');
    } else {
        return config;
    }
}
