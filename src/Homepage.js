import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LibraryPage from "./pages/Teacher Side/LibraryPage";
import ClassPage from "./pages/Teacher Side/ClassPage";
import ReportsPage from "./pages/Teacher Side/ReportsPage";
import SettingsPage from "./pages/Teacher Side/SettingsPage";
import ProfilePage from "./pages/Teacher Side/ProfilePage";
import QuestionBankPage from "./components/Teacher Side/library/QuestionBankPage";
import CreateQuestionBankPage from "./components/Teacher Side/library/CreateQuestionBankPage";
import QuestionBankViewPage from "./components/Teacher Side/library/QuestionBankViewPage";
import EditQuestionAnswerPage from "./components/Teacher Side/library/EditQuestionAnswerPage";
import CreateQuizPage from "./components/Teacher Side/library/CreateQuizPage";
import EditQuizPage from "./components/Teacher Side/library/EditQuizPage";
import DraftViewPage from "./components/Teacher Side/library/DraftViewPage";
import PublishViewPage from "./components/Teacher Side/library/PublishViewPage";
import ReportsViewPage from "./components/Teacher Side/reports/ReportsViewPage";

const Homepage = () => {
  const [activeLink, setActiveLink] = useState(0);


  return (
    <div className="flex h-screen overflow-hidden">
      <Nav activeLink={activeLink} setActiveLink={setActiveLink}  />
      <div className="flex-1 overflow-y-scroll">
        <Routes>
          <Route
            path="Library" element={<LibraryPage />}
          />
          <Route
            path="Class" element={<ClassPage />}
          />
           <Route
            path="Reports" element={<ReportsPage />}
          />
            <Route
            path="Settings" element={<SettingsPage />}
          />
          <Route
            path="Profile" element={<ProfilePage />}
          />
          <Route
            path="Library/QuestionBank" element={<QuestionBankPage />}
          />
          <Route
            path="Library/QuestionBank/Create" element={<CreateQuestionBankPage />}
          />
          <Route
            path="Library/QuestionBank/View/:bankId" // Keep this dynamic
            element={<QuestionBankViewPage />}
          />
          <Route
            path="Library/QuestionBank/Edit" element={<EditQuestionAnswerPage/>}
          />
           <Route
            path="Library/CreateQuiz" element={<CreateQuizPage/>}
          />
           <Route
            path="Library/EditQuiz" element={<EditQuizPage/>}
          />
           <Route
            path="Library/Draft/View" element={<DraftViewPage/>}
          />
           <Route
            path="Library/Publish/View" element={<PublishViewPage/>}
          />
          <Route
            path="Library/Reports/View" element={<ReportsViewPage/>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
