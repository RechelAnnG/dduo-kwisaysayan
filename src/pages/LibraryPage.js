import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CreateQuizModal from "../components/library/createQuizModal";

function LibraryPage() {
  const navigate = useNavigate(); // Initialize navigate function
  const [selected, setSelected] = useState("Published");
  const [createquizmodal, createquizsetModal] = useState(false);
  const createquiztoggleModal = () => {
    createquizsetModal(!createquizmodal);
  };

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
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>

              {/* Dropdown 2 */}
              <select
                className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
              >
                <option value="">Select Status</option>
                <option value="status1">Status 1</option>
                <option value="status2">Status 2</option>
                <option value="status3">Status 3</option>
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

      {/* White Container (Published) */}
      {selected === "Published" && (
        <div className="bg-white p-6 md:p-6  rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-4">
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
                  Kabihasnang Asya
                </h2>
                <span className="text-custom-brownnav text-sm md:text-xl">
                  2 questions
                </span>
                <span className="text-custom-brownnav text-xs md:text-base">
                  4th Grade
                </span>
                <span className="text-custom-brownnav text-xs md:text-base">
                  4 hours ago
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
      )}

      {/* Draft */}
      {selected === "Draft" && (
        <div className="bg-white p-6 md:p-6  rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-4">
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
                  Kabihasnang Asya
                </h2>
                <span className="text-custom-brownnav text-sm md:text-xl">
                  2 questions
                </span>
                <span className="text-custom-brownnav text-xs md:text-base">
                  4th Grade
                </span>
                <span className="text-custom-brownnav text-xs md:text-base">
                  4 hours ago
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
      )}

      <CreateQuizModal
        createquizmodal={createquizmodal}
        createquizsetModal={createquizsetModal}
        createquiztoggleModal={createquiztoggleModal}
      />
    </div>
  );
}

export default LibraryPage;
