// Firebaseservices/StaffService.js
import { db } from "../firebaseconfig/Firebaseconfig";
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";


export const getStaffDetails = async (uid) => {
  try {
    const q = query(collection(db, "staff_details"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No staff record found" };
    }

    const staffData = querySnapshot.docs[0].data();
    const staffId = querySnapshot.docs[0].id;

    return { success: true, message: { id: staffId, ...staffData } };
  } catch (error) {
    console.error("❌ Error fetching staff details:", error);
    return { success: false, message: error.message };
  }
};


export const updateStaffDetails = async (uid, updatedData) => {
  try {
    const q = query(collection(db, "staff_details"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No staff record found" };
    }

    const staffDocId = querySnapshot.docs[0].id;
    const staffRef = doc(db, "staff_details", staffDocId);

    await updateDoc(staffRef, updatedData);

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("❌ Error updating staff:", error);
    return { success: false, message: error.message };
  }
};
