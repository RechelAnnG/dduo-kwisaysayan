import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function EditQuizPage() {

    const navigate = useNavigate(); // Create navigate function
    const handleDraftViewClick = () => {
        navigate("/Library/Draft/View"); // Redirect to the specified path
      };

      const handlePublishViewClick = () => {
        navigate("/Library/Publish/View"); // Redirect to the specified path
      };
   
    return (
    <div className="flex flex-col gap-4 min-h-screen pt-5 pb-5 bg-custom-brownbg  md:p-6 md:pb-10">

        {/* White Container */}
        <div className="bg-white p-6 md:p-6  rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
            {/* Image and Text Content */}
            <div className="flex flex-row items-center gap-4">
                <div className="md:flex-col md:flex md:items-center md:justify-center">
                    {/* Image Placeholder */}
                    <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">Image Here</span>
                    </div>

                    {/* Upload Image Button for Laptop/Desktop */}
                    <div className="hidden md:flex md:flex-col md:items-center md:mt-2">
                        <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor p-1 text-sm md:text-xs font-bold rounded-md shadow-md hover:bg-yellow-600">
                        Upload Image
                        </button>
                    </div>
                </div>
            
            {/* Text Content */}
            <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between md:w-full">
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

                {/* Buttons for Laptop/Desktop */}
                <div className="hidden md:flex md:flex-row md:gap-4 md:items-end">
                <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor  px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                onClick={handleDraftViewClick} >
                Draft
                </button>
                <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor  px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                 onClick={handlePublishViewClick} >
                    Publish
                </button>
                </div>
            </div>
            </div>

            {/* View Button for Mobile */}
            <div className="flex flex-col gap-2 md:hidden">
                <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600">
                    Upload Image
                </button>
                <div className="flex gap-2">
                    <button className="bg-gradient-to-r flex-1 from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600"
                    onClick={handleDraftViewClick} >
                        Draft
                    </button>
                    <button className="bg-gradient-to-r flex-1 from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600"
                    onClick={handlePublishViewClick} >
                        Publish
                    </button>
                </div>
            </div>
        </div>

        {/* White Container */}
        <div className="bg-gradient-to-r from-midp to-pink p-6 md:p-6  rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
            <div className="flex items-baseline gap-4">
                 <h2 className="text-custom-brownbg text-left text-xl md:text-2xl font-bold">
                    2 Questions
                </h2>
                <span className="text-custom-brownbg font-semibold text-base md:text-lg">
                    (2 points)
                </span>
            </div>    

            {/* White Container */}
            <div className="bg-white p-2 md:p-4  rounded-md shadow-custom-darkblue   flex flex-col gap-4">

               <div className="flex gap-4 md:items-center flex-col md:flex-row">
                    <span className="text-gray-900 text-left border border-1 md:p-2  border-black p-1 rounded-md font-semibold text-base md:text-base">
                        1. Multiple Choice
                    </span>

                    {/* Dropdowns Container - in a row for mobile and larger screens */}
                    <div className="flex flex-row w-full md:w-1/2 gap-2">
                        {/* Dropdown 1 */}
                        <select
                            className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        >
                            <option value="" disabled selected>Select points</option>
                            <option value="category1">1 point</option>
                            <option value="category2">2 points</option>
                            <option value="category3">3 points</option>
                        </select>

                        {/* Dropdown 2 */}
                        <select
                            className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        >
                            <option value="" disabled selected>Select timer</option>
                            <option value="status1">15 seconds</option>
                            <option value="status2">30 seconds</option>
                            <option value="status3">1 min</option>
                        </select>
                    </div>
               </div>

               <div className="flex flex-col">
                    <span className="text-gray-900 text-left font-semibold text-base md:text-lg">
                        Sino ang pambansang bayani ng pilipinas?
                    </span>

                    <span className="text-gray-500 text-left font-semibold text-base md:text-lg">
                        Choices
                    </span>
               </div>

               <div className="grid grid-cols-2  md:grid-cols-3 md:gap-2 gap-x-6 gap-y-3">
                     <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        Apolinario Abini
                    </span>
                    <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        Jose Rizal
                    </span>
                    <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        Ferdinand Magellan
                    </span>
                    <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        Andres Bonifacio
                    </span>
                    <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                       Francisco Balagtas Baltazar
                    </span>
              </div>

            </div>

            {/* White Container */}
            <div className="bg-white p-2 md:p-4  rounded-md shadow-custom-darkblue   flex flex-col gap-4">

               <div className="flex gap-4 md:items-center flex-col md:flex-row">
                    <span className="text-gray-900 text-left border border-1 md:p-2  border-black p-1 rounded-md font-semibold text-base md:text-base">
                        1. True or False
                    </span>

                    {/* Dropdowns Container - in a row for mobile and larger screens */}
                    <div className="flex flex-row w-full md:w-1/2 gap-2">
                        {/* Dropdown 1 */}
                        <select
                            className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        >
                            <option value="" disabled selected>Select points</option>
                            <option value="category1">1 point</option>
                            <option value="category2">2 points</option>
                            <option value="category3">3 points</option>
                        </select>

                        {/* Dropdown 2 */}
                        <select
                            className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        >
                            <option value="" disabled selected>Select timer</option>
                            <option value="status1">15 seconds</option>
                            <option value="status2">30 seconds</option>
                            <option value="status3">1 min</option>
                        </select>
                    </div>
               </div>

               <div className="flex flex-col">
                    <span className="text-gray-900 text-left font-semibold text-base md:text-lg">
                        Si Dr. Jose Rizal ba ay isa sa bayani ng pilipinas?
                    </span>

                    <span className="text-gray-500 text-left font-semibold text-base md:text-lg">
                        Choices
                    </span>
               </div>

               <div className="grid grid-cols-2  md:grid-cols-3 md:gap-2 gap-x-6 gap-y-3">
                     <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        True
                    </span>
                    <span className="text-gray-900 text-left font-semibold text-sm md:text-lg">
                        False
                    </span>
              </div>

            </div>
        </div>
    </div>
    );
  }
  
  export default EditQuizPage;
