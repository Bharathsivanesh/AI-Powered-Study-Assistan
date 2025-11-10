import { auth, db } from "../firebaseconfig/Firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


export const signUpStaff = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    
    await updateProfile(userCredential.user, { displayName: name });

    const staffCollection = collection(db, "staff_details");
    await addDoc(staffCollection, { name, uid, email });

    return {
      success: true,
      message: "Signup successfull!",
      data: { uid, name, email },
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      success: false,
      message: err.message || "Signup failed",
    };
  }
};

export const loginStaff = async (email, password) => {
  try {
   
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

   
    const q = query(collection(db, "staff_details"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const staffData = querySnapshot.docs[0].data();
      return {
        success: true,
        message: "Login successfull",
        data: {
          ...staffData,
          uid,
        },
      };
    } else {
      return {
        success: false,
        message: "Staff details not found in Firestore",
      };
    }
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      message: err.message || "Login failed",
    };
  }
};
