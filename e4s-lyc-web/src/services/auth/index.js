import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    inMemoryPersistence,
    sendEmailVerification,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import {collection, getFirestore, query, where, getDocs, doc, setDoc, updateDoc, addDoc} from "firebase/firestore";

export async function signInWithGoogle() {
    // Sign in Firebase using popup auth and Google as the identity provider.

    await setPersistence(getAuth(), inMemoryPersistence)
        .then(() => {
            // In memory persistence will be applied to the signed in Google user
            // even though the persistence was set to 'none' and a page redirect
            // occurred.
            const provider = new GoogleAuthProvider();
            return signInWithPopup(getAuth(), provider);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
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
}

export function signOutUser() {
    // Sign out of Firebase.
    return signOut(getAuth());
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

export async function register(email, password, firstName, lastName) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    await updateProfile(getAuth().currentUser, {
        displayName: `${firstName} ${lastName}`
    }).then(() => {
        // Profile updated!
        console.log("User profile updated!");
    }).catch((error) => {
        // An error occurred
        console.log("An error occurred when updating profile!", error);
    });
    await sendEmailVerification(userCredential.user);
    return userCredential;
}

export async function signIn(email, password) {
    await setPersistence(getAuth(), browserSessionPersistence)
        .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return signInWithEmailAndPassword(getAuth(), email, password);
        });
}

export async function resetPwd(email) {
    await sendPasswordResetEmail(getAuth(), email)
        .then(() => {
            // Password reset email sent!
            // ..
            console.log("Password reset email sent!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("An error occurred when sending password reset email!", error);
        });
}

export async function getUserProfile(email) {
    const q = query(collection(getFirestore(), 'userProfile'), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    let user = {};
    let pathSegments = "";
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        user = doc.data();
        pathSegments = doc.ref.path.split("/")[1];
    });
    return {user: user, pathSegments: pathSegments};
}

export async function updateUserProfile(email, data) {
    const res = await getUserProfile(email);
    if (JSON.stringify(res.user) === "{}") {
        await addDoc(collection(getFirestore(), 'userProfile'), {email: email, ...data})
    } else {
        const docRef = doc(getFirestore(), "userProfile", res.pathSegments);
        await updateDoc(docRef, data);
    }
}
