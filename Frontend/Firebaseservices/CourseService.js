import { db } from "../firebaseconfig/Firebaseconfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase/Supabaseconfig";
export const addCourse = async (courseData) => {
  try {
   
    const staffUid = localStorage.getItem("uid");

 
    const courseId = uuidv4();

    
    const finalCourseData = {
      C_ID: courseId,
      UID: staffUid,
      c_name: courseData.c_name,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

 
    const coursesCollection = collection(db, "courses_list");
    await addDoc(coursesCollection, finalCourseData);

    return {
      success: true,
      message: "Course added successfully!",
    };
  } catch (error) {
    console.error("Error adding course:", error);
    return {
      success: false,
      message: "Failed to add course",
    };
  }
};

export const getCourses = async () => {
  try {
    const staffUid = localStorage.getItem("uid");
    
    const q = query(
      collection(db, "courses_list"),
      where("UID", "==", staffUid)
    );

    const querySnapshot = await getDocs(q);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      message: courses,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const uploadPDFToCourse = async (file, courseId) => {
  try {
    if (!file || !courseId)
      return { success: false, message: "Missing file or courseId" };

   
    const filePath = `course_pdfs/${courseId}/${file.name}`;
    const { data, error } = await supabase.storage
      .from("Hostep-attendence")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: true, // allows overwriting existing file
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return { success: false, message: error.message };
    }

    // 2️⃣ Get Public URL
    const { data: publicData } = supabase.storage
      .from("Hostep-attendence")
      .getPublicUrl(filePath);

    const fileUrl = publicData.publicUrl;

   
    const q = query(
      collection(db, "courses_list"),
      where("C_ID", "==", courseId)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { success: false, message: "Course not found" };
    }

    const courseDoc = snapshot.docs[0];
    const courseRef = doc(db, "courses_list", courseDoc.id);

   
    await updateDoc(courseRef, {
      file_url: fileUrl,
      file_name: file.name,
      uploadedAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "PDF uploaded successfully",
      url: fileUrl,
    };
  } catch (error) {
    console.error("Error in uploadPDFToCourse:", error);
    return { success: false, message: error.message };
  }
};

export const updateCourseWithQA = async (courseId, qaPairs) => {
  try {
    const q = query(
      collection(db, "courses_list"),
      where("C_ID", "==", courseId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("❌ No course found with that C_ID:", courseId);
      return { success: false, message: "Course not found" };
    }

    const courseDoc = querySnapshot.docs[0].ref;

    await updateDoc(courseDoc, {
      qa_pairs: arrayUnion(...qaPairs),
    });

    console.log("✅ Q&A successfully added to Firestore!");
    return { success: true };
  } catch (error) {
    console.error("❌ Firestore update error:", error);
    return { success: false, error };
  }
};
