import React, { useEffect, useState } from "react";
import {
  PictureAsPdf,
  AddCircleOutline,
  Close,
  Edit,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  addCourse,
  deleteCourse,
  getCourses,
} from "../../Firebaseservices/CourseService";
import {
  getStaffDetails,
  updateStaffDetails,
} from "../../Firebaseservices/StaffService";
import Loader from "../../Components/Loader";
import { apiService } from "../../Services/Apicall";

const Profile = () => {
  const [open, setOpen] = useState(false); // course modal
  const [editOpen, setEditOpen] = useState(false); // edit profile modal
  const [courseName, setCourseName] = useState("");
  const [materials, setMaterials] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");

  const uid = localStorage.getItem("uid"); // 🔹 stored after login

  // 🔹 Fetch staff details and courses on load
  useEffect(() => {
    fetchProfile();
    fetchCourse();
  }, []);

  const fetchProfile = async () => {
    const res = await getStaffDetails(uid);
    if (res.success) {
      setProfile(res.message);
      setMobile(res.message.phone || "");
      setSubject(res.message.subject || "");
    } else {
      console.error(res.message);
      alert(res.message);
    }
    setLoading(false);
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    const res = await updateStaffDetails(uid, {
      phone: mobile,
      subject: subject,
    });
    if (res.success) {
      alert("✅ Profile updated successfully!");
      setEditOpen(false);
      fetchProfile();
    } else {
      alert("❌ Update failed: " + res.message);
    }
    setLoading(false);
  };

  const handleAddCourse = async () => {
    if (!courseName) return;
    setLoading(true);
    const courseData = { c_name: courseName };
    const response = await addCourse(courseData);

    if (response.success) {
      alert("✅ Course added successfully!");
      const notificationPayload = {
        title: "New Course Added 📚",
        body: `A new course "${courseName}" has been added by ${profile?.name || "Staff"}. Check it out!`,
      };

      await apiService({
        endpoint: "https://firebasefcm.onrender.com/send-to-all",
        method: "POST",
        fullUrl: true,
        payload: notificationPayload,
      });
      setCourseName("");
      setOpen(false);
      fetchCourse();
    } else {
      alert("❌ Failed to add course.");
    }
    setLoading(false);
  };

  const fetchCourse = async () => {
    setLoading(true);
    const response = await getCourses();
    if (response.success) {
      setMaterials(response?.message);
    } else {
      alert("❌ Failed to fetch courses.");
    }
    setLoading(false);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setLoading(true);
      const res = await deleteCourse(courseId);
      if (res.success) {
        alert("✅ Course deleted successfully!");
        fetchCourse();
      } else {
        alert("❌ Failed to delete course: " + res.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Loader visible={loading} />
      <div className="p-8 min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Column - Profile Details */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex-1 relative">
            <div className="flex justify-end">
              <IconButton
                onClick={() => setEditOpen(true)}
                sx={{ color: "#22c55e" }}
              >
                <Edit />
              </IconButton>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={
                  profile?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/706/706830.png"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-green-100 shadow-sm mb-3"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {profile?.name || "Unknown"}
              </h2>
              <p className="text-gray-500 text-sm">
                {profile?.department || "Computer Science"}
              </p>
              <div className="h-0.5 w-24 bg-green-400 mt-2 rounded-full"></div>
            </div>

            <div className="space-y-4 text-sm mt-6">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{profile?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p className="font-medium">
                  {profile?.department || "Computer Science"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Subject</p>
                <p className="font-medium">{profile?.subject || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{profile?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium">{profile?.phone || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Course Materials */}
          <div
            style={{ maxHeight: "550px" }}
            className="bg-white rounded-2xl overflow-y-auto shadow-md p-6 flex-[2] relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800 text-lg">
                Generated Course Materials
              </h3>
              <IconButton
                onClick={() => setOpen(true)}
                sx={{
                  color: "#22c55e",
                  "&:hover": { color: "#16a34a" },
                }}
              >
                <AddCircleOutline fontSize="large" />
              </IconButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {materials.map((item, index) => (
                <div
                  key={index}
                  className="group relative border border-green-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-green-400"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-t-2xl" />
                  <div className="flex flex-row justify-between">
                    <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {item.c_name}
                    </h4>
                    <IconButton
                      onClick={() => handleDeleteCourse(item.C_ID)}
                      sx={{ color: "red" }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.createdAt || "N/A"}
                  </p>
                  {/* <p className="text-xs text-gray-400 mt-1">
                    Generated by{" "}
                    <span className="text-green-500 font-medium">
                      Gemini AI
                    </span>
                  </p> */}

                  <div className="flex justify-between items-center mt-5">
                    <button className="flex items-center gap-1 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-md text-sm transition-all duration-300 hover:shadow-md">
                      <PictureAsPdf fontSize="small" />
                      PDF
                    </button>
                    <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded-md text-sm transition-all duration-300 hover:shadow-md">
                      View Q&A
                    </button>
                    {/* 🔴 Trash Bin Delete Button */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🟢 Edit Profile Modal */}
        <Modal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          aria-labelledby="edit-profile-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 3,
              width: 400,
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Profile
              </h2>
              <IconButton
                onClick={() => setEditOpen(false)}
                sx={{ color: "gray" }}
              >
                <Close />
              </IconButton>
            </div>

            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              size="small"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              size="small"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleProfileUpdate}
              sx={{
                backgroundColor: "#22c55e",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#16a34a",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Modal>

        {/* 🟢 Add Course Modal */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="add-course-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 3,
              width: 400,
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Course
              </h2>
              <IconButton onClick={() => setOpen(false)} sx={{ color: "gray" }}>
                <Close />
              </IconButton>
            </div>

            <TextField
              fullWidth
              label="Course Name"
              variant="outlined"
              size="small"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleAddCourse}
              sx={{
                backgroundColor: "#22c55e",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#16a34a",
                },
              }}
            >
              Add Course
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
