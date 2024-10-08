import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify";
import { getStorage,ref,uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeRHBtOBN_TV6sxCJ8kSPwqNGQDPIHvUQ",
    authDomain: "swiftsale-1fd2a.firebaseapp.com",
    projectId: "swiftsale-1fd2a",
    storageBucket: "swiftsale-1fd2a.appspot.com",
    messagingSenderId: "741695973862",
    appId: "1:741695973862:web:495dea185d56add90d8e27"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signUp = async (username,email,password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth,email,password);
        const user = response.user;
        await setDoc(doc(db,"users",user.uid),{
            id: user.uid,
            username: username.toLowerCase(),
            email,
            profileDp:""
        })
    } catch (error) {
        console.error(error);
        toast.error(error.code)
    }
}

const signIn = async (email,password)=>{
    try {
        const response = await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code);
    }
}

const logout = async()=>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code);
    }
}


const upload = async (file) => {
  
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);
  
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve,reject)=>{
      // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         resolve(downloadURL);
        });
      }
    );
    })
    
  };



export {signIn, signUp, logout, auth, db, upload };