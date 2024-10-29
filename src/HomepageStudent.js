import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavStudent from "./components/NavStudent";
import StudentDashboardPage from "./pages/Student Side/StudentDashboardPage";
import StudentQuizTakingPage from "./pages/Student Side/StudentQuizTakingPage";
import StudentQuizResultPage from "./pages/Student Side/StudentQuizResultPage";

const HomepageStudent = () => {
  const [activeLink, setActiveLink] = useState(0);


  return (
    <div className="flex h-screen overflow-hidden">
      <NavStudent activeLink={activeLink} setActiveLink={setActiveLink}  />
      <div className="flex-1 overflow-y-scroll">
        <Routes>
          <Route
            path="Dashboard" element={<StudentDashboardPage />}
          />
          <Route
            path="Quiz" element={<StudentQuizTakingPage/>}
          />
          <Route
            path="Result/Page" element={<StudentQuizResultPage/>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default HomepageStudent;
