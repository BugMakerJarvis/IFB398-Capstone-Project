import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

export async function signInWithGoogle() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export async function signInWithFacebook() {
    // Sign in Firebase using popup auth and Facebook as the identity provider.
    const provider = new FacebookAuthProvider();
    await signInWithPopup(getAuth(), provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    ;
}

export function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth())
        .then(() => console.log("Sign-out successful."))
        .catch((error) => console.log("Sign-out failed.", error));
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
export function getUserName() {
    return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
    return !!getAuth().currentUser;
}

export async function register(email, password) {
    createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

export async function signIn(email, password) {
    signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log(user)
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}
