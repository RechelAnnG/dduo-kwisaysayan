import React, { useEffect, useState } from "react";
import arrowIcon from "../../assets/images/arrow-icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

function PublishViewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz } = location.state || {};
  const db = getFirestore();
  const [questions, setQuestions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (quiz) {
      const fetchQuestions = async () => {
        try {
          const quizDocRef = doc(db, "tbl_quizzes", quiz.id);
          const quizDoc = await getDoc(quizDocRef);

          if (quizDoc.exists()) {
            const quizData = quizDoc.data();
            setQuestions(quizData.Questions || []);
          } else {
            console.log("Quiz document does not exist");
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();
    }
  }, [quiz, db]);

  const handlePointsChange = (index, newPoints) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].Points = newPoints;
    setQuestions(updatedQuestions);
  };

  const handleTimerChange = (index, newTimer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].Timer = newTimer;
    setQuestions(updatedQuestions);
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSaveClick = async () => {
    if (quiz && questions.length > 0) {
      try {
        const quizDocRef = doc(db, "tbl_quizzes", quiz.id);
        await updateDoc(quizDocRef, {
          Questions: questions,
        });
        alert("Changes saved successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  if (!quiz) {
    return <div className="flex justify-center items-center h-screen">Quiz data not available</div>;
  }

  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg md:pb-10">
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

      <div className="bg-white p-6 mt-5 md:p-6 rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="md:flex-col md:flex md:items-center md:justify-center">
            <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Image Here</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between md:w-full">
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
                {quiz.Creation_Date ? new Date(quiz.Creation_Date.seconds * 1000).toLocaleString() : "Invalid Date"}
              </span>
            </div>

            <div className="hidden md:flex md:flex-row md:gap-4 md:items-end">
              {isEditing ? (
                <button
                  className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                  onClick={handleSaveClick}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
              <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600">
                Preview
              </button>
              <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600">
                Start now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-baseline gap-4 pl-2 pt-4 md:pl-6">
        <h2 className="text-gray-900 text-left text-xl md:text-2xl font-bold">
          {quiz.Number_Of_Questions} Questions
        </h2>
      </div>

      {questions.length > 0 ? (
        questions.map((question, index) => (
          <div key={index} className="bg-white p-2 mx-2 mt-4 md:p-4 md:mx-6 rounded-md shadow-custom-darkblue flex flex-col gap-4">
            <div className="flex items-center">
            {question.Difficulty_Level}
            <div className="flex flex-row md:ml-auto gap-2">
                <label className="flex items-center gap-2">
                  <span>Points:</span>
                  <select
                    value={question.Points}
                    onChange={(e) => handlePointsChange(index, e.target.value)}
                    className="border p-1 rounded-md"
                    disabled={!isEditing}
                  >
                    {[1, 2, 3].map((point) => (
                      <option key={point} value={point}>
                        {point}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2">
                  <span>Timer:</span>
                  <select
                    value={question.Timer}
                    onChange={(e) => handleTimerChange(index, e.target.value)}
                    className="border p-1 rounded-md"
                    disabled={!isEditing}
                  >
                    {["15 seconds", "30 seconds", "1 minute"].map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              </div>
            <div className="flex gap-4 md:items-center flex-col md:flex-row">
              <span className="text-gray-900 text-left  rounded-md font-semibold text-base md:text-base">
                {question.Question_Text}
              </span>

              
            </div>

            <div className="flex flex-col">
              <span className="text-gray-500 text-left font-semibold text-base md:text-lg">
                Choices
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-2 gap-x-6 gap-y-3">
              {question.Choices && question.Choices.map((choice, choiceIndex) => (
                <span 
                  key={choiceIndex} 
                  className={`text-gray-900 text-left font-semibold text-sm md:text-lg ${choice.Is_Correct ? 'border-2 rounded-md px-2 border-pink' : ''}`}
                >
                  {choice.Choice_Text}
                </span>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center p-4">No questions available</div>
      )}
    </div>
  );
}

export default PublishViewPage;
