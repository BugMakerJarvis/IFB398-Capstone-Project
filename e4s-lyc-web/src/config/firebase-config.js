const config = {
    apiKey: "AIzaSyB55nB6biTGAYkXTuqdT22XHdk5M5z6yLA",
    authDomain: "e4s-lyc-web-f1383.firebaseapp.com",
    projectId: "e4s-lyc-web-f1383",
    storageBucket: "e4s-lyc-web-f1383.appspot.com",
    messagingSenderId: "1079123934925",
    appId: "1:1079123934925:web:d05bc5ae532b4790187384",
    measurementId: "G-DDPZP04QRM"
}

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.Add your web app\'s configuration object to firebase-config.js');
    } else {
        return config;
    }
}
