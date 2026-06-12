import React from "react";
import { Routes, Route } from "react-router-dom";

import StudentAdminLayout from "./layouts/StudentAdminLayout";
import MyCourses from "./pages/MyCourses";
import LiveClasses from "./pages/LiveClasses";
import Assignments from "./pages/Assignments";
import SampleCertificates from "./pages/SampleCertificates";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StudentAdminLayout />}>
        <Route index element={<MyCourses />} />
        <Route path="live-classes" element={<LiveClasses />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="certificates" element={<SampleCertificates />} />
        <Route path="profile" element={<Profile />} />
        <Route path="notes" element={<Notes />} />
      </Route>
    </Routes>
  );
}

export default App;
