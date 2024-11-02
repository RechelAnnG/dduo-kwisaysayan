import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

function EditQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedQuestions, quizName, gradeLevel, creationTime } = location.state || { selectedQuestions: [] };

  const db = getFirestore();

  const [pointsPerQuestion, setPointsPerQuestion] = useState(selectedQuestions.map(() => 1));
  const [timersPerQuestion, setTimersPerQuestion] = useState(selectedQuestions.map(() => "30 seconds"));
  const [totalPoints, setTotalPoints] = useState(pointsPerQuestion.reduce((acc, curr) => acc + curr, 0));

  useEffect(() => {
    setTotalPoints(pointsPerQuestion.reduce((acc, curr) => acc + curr, 0));
  }, [pointsPerQuestion]);

  const handlePointSelection = (points, index) => {
    const newPoints = [...pointsPerQuestion];
    newPoints[index] = parseInt(points);
    setPointsPerQuestion(newPoints);
  };

  const handleTimerSelection = (timer, index) => {
    const newTimers = [...timersPerQuestion];
    newTimers[index] = timer;
    setTimersPerQuestion(newTimers);
  };

  const handleSaveQuiz = async (status) => {
    const quizDocRef = doc(collection(db, "tbl_quizzes"));

    const questionsData = selectedQuestions.map((question, index) => ({
      Question_Text: question.Question_Text,
      Question_Type: question.Question_Type,
      Difficulty_Level: question.Difficulty_Level,
      Choices: question.Choices,
      Points: pointsPerQuestion[index],
      Timer: timersPerQuestion[index],
    }));

    await setDoc(quizDocRef, {
      Quiz_Name: quizName,
      Grade_Level: gradeLevel,
      Creation_Date: serverTimestamp(),
      Status: status,
      Number_Of_Questions: selectedQuestions.length,
      Questions: questionsData,
    });

    navigate("/Teacher/Library");
  };

  const renderQuestionsByDifficulty = (questions, difficulty) => {
    return (
      questions
        .filter(question => question.Difficulty_Level === difficulty)
        .map((question, index) => (
          <div key={question.id} className="bg-white p-2 md:p-4 rounded-md shadow-custom-darkblue flex flex-col gap-4">
            <div className="flex gap-4 md:items-center flex-col md:flex-row">
              <span className="text-gray-900 text-left border border-1 md:p-2 border-black p-1 rounded-md font-semibold text-base md:text-base">
                {index + 1}. {question.Question_Type} - {question.Difficulty_Level}
              </span>

              <div className="flex flex-row w-full md:w-1/2 gap-2">
                <select className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        value={pointsPerQuestion[index]}
                        onChange={e => handlePointSelection(e.target.value, index)}>
                  <option value="1">1 point</option>
                  <option value="2">2 points</option>
                  <option value="3">3 points</option>
                </select>

                <select className="w-1/2 p-1 md:p-2 text-xs md:text-base border border-gray-900 rounded-md"
                        value={timersPerQuestion[index]}
                        onChange={e => handleTimerSelection(e.target.value, index)}>
                  <option value="15 seconds">15 seconds</option>
                  <option value="30 seconds">30 seconds</option>
                  <option value="1 minute">1 min</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-900 text-left font-semibold text-base md:text-lg">
                {question.Question_Text}
              </span>
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
    );
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen pt-5 pb-5 bg-custom-brownbg md:p-6 md:pb-10">
      {/* General Quiz Information */}
      <div className="bg-white p-6 md:p-6 rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="md:flex-col md:flex md:items-center md:justify-center">
            <div className="w-24 h-24 md:w-20 md:h-20 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">Image Here</span>
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:mt-2">
              <button className="bg-gradient-to-r from-midp to-pink text-custom-textcolor p-1 text-sm md:text-xs font-bold rounded-md shadow-md hover:bg-yellow-600">
                Upload Image
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between md:w-full">
            <div className="flex-1 flex flex-col items-start">
              <h2 className="text-gray-900 text-base md:text-2xl font-bold">
                {quizName}
              </h2>
              <span className="text-gray-900 text-sm md:text-xl">
                {selectedQuestions.length} questions
              </span>
              <span className="text-gray-900 text-xs md:text-base">
                {gradeLevel}
              </span>
              <span className="text-gray-900 text-xs md:text-base">
                {creationTime}
              </span>
            </div>

            <div className="hidden md:flex md:flex-row md:gap-4 md:items-end">
              <button
                className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                onClick={() => handleSaveQuiz("draft")}
              >
                Draft
              </button>
              <button
                className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                onClick={() => handleSaveQuiz("published")}
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex px-6 items-baseline gap-4">
          <h2 className="text-gray-900 text-left text-xl md:text-2xl font-bold">
            {selectedQuestions.length} Questions
          </h2>
          <span className="text-gray-900 font-semibold text-base md:text-lg">
            ({totalPoints} points)
          </span>
        </div>

      {/* Easy Questions */}
      <div className="bg-pink p-6 md:p-6 rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
        <h2 className="text-custom-brownbg text-left text-xl md:text-2xl font-bold">Easy Questions</h2>
        {renderQuestionsByDifficulty(selectedQuestions, 'Easy')}
      </div>

      {/* Medium Questions */}
      <div className="bg-midp p-6 md:p-6 rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
        <h2 className="text-custom-brownbg text-left text-xl md:text-2xl font-bold">Medium Questions</h2>
        {renderQuestionsByDifficulty(selectedQuestions, 'Medium')}
      </div>

      {/* Hard Questions */}
      <div className="bg-darkp p-6 md:p-6 rounded-md shadow-custom-darkblue mx-2 md:mx-6 flex flex-col gap-4">
        <h2 className="text-custom-brownbg text-left text-xl md:text-2xl font-bold">Hard Questions</h2>
        {renderQuestionsByDifficulty(selectedQuestions, 'Hard')}
      </div>
    </div>
  );
}

export default EditQuizPage;
