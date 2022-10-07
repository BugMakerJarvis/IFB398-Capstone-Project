const config = {
    apiKey: "AIzaSyAy14ZhjlSgdf01Fz5iOZ7NwCBRIXmEuvE",
    authDomain: "e4s-lyc-st.firebaseapp.com",
    projectId: "e4s-lyc-st",
    storageBucket: "e4s-lyc-st.appspot.com",
    messagingSenderId: "651420867257",
    appId: "1:651420867257:web:21580fabc64bf263b55968",
    measurementId: "G-FV5WFBMR53"
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.Add your web app\'s configuration object to firebase-config.js');
    } else {
        return config;
    }
}
