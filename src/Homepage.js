import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LibraryPage from "./pages/LibraryPage";
import ClassPage from "./pages/ClassPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import QuestionBankPage from "./components/library/QuestionBankPage";
import CreateQuestionBankPage from "./components/library/CreateQuestionBankPage";
import QuestionBankViewPage from "./components/library/QuestionBankViewPage";
import EditQuestionAnswerPage from "./components/library/EditQuestionAnswerPage";
import CreateQuizPage from "./components/library/CreateQuizPage";
import EditQuizPage from "./components/library/EditQuizPage";
import DraftViewPage from "./components/library/DraftViewPage";
import PublishViewPage from "./components/library/PublishViewPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";

const Homepage = () => {
  const [activeLink, setActiveLink] = useState(0);


  return (
    <div className="flex h-screen overflow-hidden">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink}  />
      <div className="flex-1 overflow-y-scroll">
        <Routes>
          <Route
            path="/Library" element={<LibraryPage />}
          />
          <Route
            path="/Class" element={<ClassPage />}
          />
           <Route
            path="/Reports" element={<ReportsPage />}
          />
            <Route
            path="/Settings" element={<SettingsPage />}
          />
          <Route
            path="/Profile" element={<ProfilePage />}
          />
          <Route
            path="/Library/QuestionBank" element={<QuestionBankPage />}
          />
          <Route
            path="/Library/QuestionBank/Create" element={<CreateQuestionBankPage />}
          />
          <Route
            path="/Library/QuestionBank/View/:bankId" // Keep this dynamic
            element={<QuestionBankViewPage />}
          />
          <Route
            path="/Library/QuestionBank/Edit" element={<EditQuestionAnswerPage/>}
          />
           <Route
            path="/Library/CreateQuiz" element={<CreateQuizPage/>}
          />
           <Route
            path="/Library/EditQuiz" element={<EditQuizPage/>}
          />
           <Route
            path="/Library/Draft/View" element={<DraftViewPage/>}
          />
           <Route
            path="/Library/Publish/View" element={<PublishViewPage/>}
          />
           <Route
            path="/Student/Dashboard" element={<StudentDashboardPage/>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
