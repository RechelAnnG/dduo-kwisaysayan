import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CreateQuizModal from "../components/library/createQuizModal";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function LibraryPage() {
  const navigate = useNavigate(); // Initialize navigate function
  const db = getFirestore();
  const [selected, setSelected] = useState("Published");
  const [createquizmodal, createquizsetModal] = useState(false);
  const createquiztoggleModal = () => {
    createquizsetModal(!createquizmodal);
  };
  const [quizzes, setQuizzes] = useState([]);
  const [sortOrder, setSortOrder] = useState("mostRecent");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      const querySnapshot = await getDocs(collection(db, "tbl_quizzes"));
      const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter by status
      let filteredQuizzes = quizzesData.filter(quiz => quiz.Status.toLowerCase() === selected.toLowerCase());

      // Filter by grade level
      if (selectedGradeLevel && selectedGradeLevel !== "All") {
        filteredQuizzes = filteredQuizzes.filter(quiz => quiz.Grade_Level === selectedGradeLevel);
      }

      // Sort based on selected order
      if (sortOrder === "mostRecent") {
        filteredQuizzes.sort((a, b) => b.Creation_Date.toDate() - a.Creation_Date.toDate());
      } else if (sortOrder === "leastRecent") {
        filteredQuizzes.sort((a, b) => a.Creation_Date.toDate() - b.Creation_Date.toDate());
      } else if (sortOrder === "alphabetical") {
        filteredQuizzes.sort((a, b) => a.Quiz_Name.localeCompare(b.Quiz_Name));
      }

      setQuizzes(filteredQuizzes);
    };

    fetchQuizzes();
  }, [selected, sortOrder, selectedGradeLevel]);

  return (
    <div className="flex-1 h-screen bg-custom-textcolor pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-darkp">
          <h1>LIBRARY</h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row md:gap-4">
        {/* First container */}
        <div className="flex-1 flex-shrink p-2 md:p-4 md:items-center md:flex md:h-20">
          <div className="flex flex-row gap-5">
            <button
              className={`w-full md:flex-1 ${
                selected === "Published" ? "text-pink underline underline-offset-2 decoration-pink" : "text-darkp"
              } text-base md:text-2xl font-bold`}
              onClick={() => setSelected("Published")}
            >
              Published
            </button>

            <button
              className={`w-full md:flex-1 ${
                selected === "Draft" ? "text-pink underline underline-offset-2 decoration-pink" : "text-darkp"
              } text-base md:text-2xl font-bold`}
              onClick={() => setSelected("Draft")}
            >
              Draft
            </button>
          </div>
        </div>

        {/* Second container */}
        <div className="flex-1 flex-shrink p-4 md:p-6 md:ml-auto">
          {/* Stack items vertically for mobile, arrange in a row for larger screens */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-2 md:justify-end">
            {/* Search Textbox */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-1/4 p-2 md:p-2 text-sm md:text-base border border-custom-brownnav rounded-md"
            />

            {/* Dropdowns Container - in a row for mobile and larger screens */}
            <div className="flex flex-row w-full md:w-1/2 gap-2">
              {/* Dropdown 1 */}
              <select
                className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="mostRecent">Most Recent</option>
                <option value="leastRecent">Least Recent</option>
                <option value="alphabetical">Alphabetical</option>
              </select>

              {/* Dropdown 2 */}
              <select
                className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
              >
                <option value="" disabled>Select grade level</option>
                <option value="All">All</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Create Quiz Button */}
      <div className="flex justify-end p-4 md:p-6">
        <button
          className="bg-gradient-to-r  from-midp to-pink text-custom-brownbg px-4 py-2 text-lg font-bold rounded-md shadow-md "
          onClick={createquiztoggleModal}
        >
          Create Quiz
        </button>
      </div>

      {/* Quizzes Display */}
      {quizzes.map((quiz) => {
        console.log(quiz.Creation_Date); // Log the Creation_Date for each quiz
        return (
          <div key={quiz.id} className="bg-white p-6 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-4">
            {/* Image and Text Content */}
            <div className="flex flex-row items-center gap-4">
              {/* Image Placeholder */}
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Image Here</span>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between md:w-full">
                <div className="flex-1 flex flex-col items-start">
                  <h2 className="text-custom-brownnav text-base md:text-2xl font-bold">
                    {quiz.Quiz_Name}
                  </h2>
                  <span className="text-custom-brownnav text-sm md:text-xl">
                    {quiz.Number_Of_Questions} questions
                  </span>
                  <span className="text-custom-brownnav text-xs md:text-base">
                    {quiz.Grade_Level}
                  </span>
                  <span className="text-custom-brownnav text-xs md:text-base">
                    {quiz.Creation_Date ? timeAgoDetailed(quiz.Creation_Date.toDate()) : "Invalid Date"}
                  </span>
                </div>

                {/* View Button for Laptop/Desktop */}
                <div className="hidden md:flex md:justify-center md:items-center md:ml-auto">
                  <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor  px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600">
                    View
                  </button>
                </div>
              </div>
            </div>

            {/* View Button for Mobile */}
            <div className="flex md:hidden mt-4">
              <button className="bg-gradient-to-r  from-midp to-pink text-custom-textcolor   w-full px-4 py-2 text-sm font-bold rounded-md shadow-md hover:bg-yellow-600">
                View
              </button>
            </div>
          </div>
        );
      })}

      <CreateQuizModal
        createquizmodal={createquizmodal}
        createquizsetModal={createquizsetModal}
        createquiztoggleModal={createquiztoggleModal}
      />
    </div>
  );
}

const timeAgoDetailed = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 1) {
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} ago`;
  }

  if (minutes >= 1) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
};

export default LibraryPage;
