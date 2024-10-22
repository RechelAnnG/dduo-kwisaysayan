import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/images/arrow-icon.png";
import deleteIcon from "../../assets/images/deleteRed-icon.png";
import addGreenIcon from "../../assets/images/addGreen-icon.png";

function EditQuestionAnswerPage() {
  const navigate = useNavigate(); // Create a navigate function

  const handleSaveClick = () => {
    // Handle any additional logic for saving the data here if needed
    navigate('/Library/QuestionBank/View'); // Redirect to the desired route
  };

  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl items-center font-bold text-custom-brownnav">
          <h1>QUESTION BANK</h1>
          <img
            src={arrowIcon}
            alt="Arrow Page"
            className="w-3 h-5 mx-5 md:w-4 md:h-7"
          />
          <h1>EDIT</h1>
        </div>
      </header>

      {/* First main container */}
      <div className="flex flex-col mt-5 md:mt-6 px-4">
        <div className="flex flex-col shadow-custom-darkblue p-4 gap-4 rounded-md w-full  md:flex-col ">

          <div className="flex items-center">
          <label className="text-custom-brownnav  text-left text-lg md:text-xl font-semibold  md:mb-0 md:mr-4">
            Question
          </label>
          <select className="text-xs border p-1 border-gray-300 ml-auto md:text-lg rounded-md">
                  
                  <option value="Option 1">Easy</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                </select>
          </div>
          <input
            type="text"
            className="md:w-1/2 border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Enter question bank name"
          />
          <label className="text-custom-brownnav text-left text-lg  md:text-xl font-semibold md:mb-0 md:mr-4">
              Choices         
           </label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[...Array(5)].map((_, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className="flex items-center gap-2 w-full"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 md:h-5 md:w-5"
                     
                    />
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 p-2 rounded-md w-full md:text-base"
                      placeholder={`Choice ${choiceIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {/* Button for mobile and desktop view aligned horizontally */}
                <button className="text-lg bg-custom-blue  bg-gradient-to-r from-midp to-pink px-5 text-custom-brownbg font-semibold  rounded-md"
                    onClick={handleSaveClick} >
                        Edit
                </button>
                  {/* Button for mobile and desktop view aligned horizontally */}
                <button className="text-lg bg-custom-blue  bg-gradient-to-r from-custom-red to-red-900 px-5 text-custom-brownbg font-semibold  rounded-md"
                    onClick={handleSaveClick} >
                        Cancel
                </button>
              </div>
        </div>
        
        
        
      </div>
                  
      

    </div>
  );
}

export default EditQuestionAnswerPage;