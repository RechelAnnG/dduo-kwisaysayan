import arrowIcon from "../../assets/images/arrow-icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation


function PublishViewPage() {
    
    const navigate = useNavigate(); // Create navigate function

    const handleEditClick = () => {
        navigate("/Library/EditQuiz"); // Redirect to the specified path
      };

    return (
      <div className="flex-1 min-h-screen bg-custom-brownbg  md:pb-10">
            <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
                <div className="flex p-2 md:p-4 text-lg md:text-2xl items-center font-bold text-custom-brownnav">
                    <h1>PUBLISHED</h1>
                    <img
                        src={arrowIcon}
                        alt="Arrow Page"
                        className="w-3 h-5 mx-5 md:w-4 md:h-7"
                    />
                    <h1>VIEW</h1>
                </div>
            </header>

            {/* White Container */}
        <div className="bg-white p-6 mt-5 md:p-6  rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
            {/* Image and Text Content */}
            <div className="flex flex-row items-center gap-4">
                <div className="md:flex-col md:flex md:items-center md:justify-center">
                    {/* Image Placeholder */}
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-gray-500">Image Here</span>
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
                onClick={handleEditClick}  >
                Edit
                </button>
                <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor  px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600">
                    Preview
                </button>
                <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor  px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600">
                    Start now
                </button>
                </div>
            </div>
            </div>

            {/* View Button for Mobile */}
            <div className=" flex gap-2 md:hidden">

                <button className="bg-gradient-to-r flex-1 from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600"
                 onClick={handleEditClick}  >
                   Edit
                </button>
                <button className="bg-gradient-to-r flex-1 from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600"
                  >
                   Preview
                </button>
                <button className="bg-gradient-to-r flex-1 from-midp to-pink text-custom-textcolor p-3 text-xs font-bold rounded-md shadow-md hover:bg-yellow-600">
                    Start now
                </button>
            </div>
            </div>

            <div className="flex items-baseline gap-4 pl-2 pt-4 md:pl-6 ">
                 <h2 className="text-gray-900 text-left text-xl md:text-2xl font-bold">
                    2 Questions
                </h2>
            </div>  

            {/* White Container */}
            <div className="bg-white p-2 mx-2 mt-4 md:p-4 md:mx-6 md:mt-4  rounded-md shadow-custom-darkblue   flex flex-col gap-4">

               <div className="flex gap-4 md:items-center  flex-col md:flex-row">
                    <span className="text-gray-900 text-left   md:p-2  rounded-md font-semibold text-base md:text-base">
                        1. Multiple Choice
                    </span>

                    {/* point and dropdown container*/}
                    <div className="flex flex-row md:ml-auto  gap-2">
                        {/* point */}
                        <span className="text-gray-900 text-left  border border-black md:p-2  p-1 rounded-md font-semibold text-base md:text-base flex-1 md:flex-none">
                             2 points
                        </span>

                        {/* timer */}
                        <span className="text-gray-900 text-left  border border-black md:p-2  p-1 rounded-md font-semibold text-base md:text-base flex-1 md:flex-none">
                             30 seconds
                        </span>
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
            <div className="bg-white p-2 mx-2 mt-4 md:p-4 md:mx-6 md:mt-4  rounded-md shadow-custom-darkblue   flex flex-col gap-4">

               <div className="flex gap-4 md:items-center  flex-col md:flex-row">
                    <span className="text-gray-900 text-left   md:p-2  rounded-md font-semibold text-base md:text-base">
                        2. True or False
                    </span>

                    {/* point and dropdown container*/}
                    <div className="flex flex-row md:ml-auto  gap-2">
                        {/* point */}
                        <span className="text-gray-900 text-left  border border-black md:p-2  p-1 rounded-md font-semibold text-base md:text-base flex-1 md:flex-none">
                             2 points
                        </span>

                        {/* timer */}
                        <span className="text-gray-900 text-left  border border-black md:p-2  p-1 rounded-md font-semibold text-base md:text-base flex-1 md:flex-none">
                             30 seconds
                        </span>
                    </div>
                    
               </div>

               <div className="flex flex-col">
                    <span className="text-gray-900 text-left font-semibold text-base md:text-lg">
                        Si Dr. Jose Rizal ba ay isa sa mga bayani?
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
    );
  }
  export default  PublishViewPage;