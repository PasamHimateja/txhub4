import React from "react";
import { Routes, Route } from "react-router-dom";

import { AdminProvider } from "./context/AdminContext";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import RegisterUser from "./pages/RegisterUser";
import Settings from "./pages/Settings";
import ClassManagement from "./pages/ClassManagement";
import PaymentPage from "./pages/payment";
import Batches from "./pages/Batches";
import Mentors from "./pages/Mentors";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Basic safeguard if AdminRoute is bypassed
  if (!user || !user.isAdmin) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              color: "red",
              fontSize: "40px",
              marginBottom: "20px",
            }}
          >
            Access Denied
          </h1>

          <p
            style={{
              color: "#555",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            You do not have access to the Admin Portal.
          </p>

          <button
            onClick={() => {
              window.location.href = "http://localhost:5173";
            }}
            style={{
              padding: "12px 24px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go To Website
          </button>
        </div>
      </div>
    );
  }

  // ✅ Admin Access
  return (
    <AdminProvider>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="batches" element={<Batches />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="courses" element={<ClassManagement />} />
          <Route path="courses/:courseId" element={<CourseDetails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
}

export default App;