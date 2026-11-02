// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TODO: Replace with your actual Firebase project configuration details
const firebaseConfig = {
    apiKey: "AIzaSyBRrvbIb2oJmRR2VvPapc04CoPb2la2DNA",
    authDomain: "middleman-3b4d7.firebaseapp.com",
    projectId: "middleman-3b4d7",
    storageBucket: "middleman-3b4d7.firebasestorage.app",
    messagingSenderId: "958222361835",
    appId: "1:958222361835:web:9243b6991c98744884caae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// 1. Sign In / Sign Up with Google
export async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log("Google User Logged In:", user);
        return { success: true, user };
    } catch (error) {
        console.error("Google Auth Error:", error.message);
        return { success: false, error: error.message };
    }
}

// 2. Sign Up with Email & Password
export async function registerWithEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Registered:", userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Registration Error:", error.message);
        return { success: false, error: error.message };
    }
}

// 3. Sign In with Email & Password
export async function loginWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In:", userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login Error:", error.message);
        return { success: false, error: error.message };
    }
}

// 4. Sign Out
export async function logoutUser() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// 5. Monitor Auth State Changes (Check if user is logged in)
export function monitorAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}
