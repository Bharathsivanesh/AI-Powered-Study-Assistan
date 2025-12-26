import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseconfig/Firebaseconfig";

/* 🔹 Get student name using UID */
const getStudentNameByUid = async (uid) => {
  const q = query(
    collection(db, "student_details"),
    where("uid", "==", uid)
  );

  const snap = await getDocs(q);
  if (snap.empty) return "Unknown Student";

  return snap.docs[0].data().name;
};

/* 🔹 Listen staff chats WITH student name */
export const listenStaffChats = (staffUid, callback) => {
  const q = query(
    collection(db, "chats"),
    where("staffId", "==", staffUid),
    orderBy("lastMessageTime", "desc")
  );

  return onSnapshot(q, async (snapshot) => {
    const chats = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const studentName = await getStudentNameByUid(data.studentId);

        return {
          chatId: docSnap.id,
          ...data,
          studentName, // 👈 ADD NAME
        };
      })
    );

    callback(chats);
  });
};

/* 🔹 Listen messages */
export const listenToChatMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    );
  });
};

/* 🔹 Staff send message */
export const sendStaffMessage = async ({
  chatId,
  text,
  staffUid,
  studentId,
}) => {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId: staffUid,
    senderRole: "staff",
    timestamp: serverTimestamp(),
  });

  await setDoc(
    doc(db, "chats", chatId),
    {
      lastMessage: text,
      lastMessageTime: serverTimestamp(),
    },
    { merge: true }
  );
};
