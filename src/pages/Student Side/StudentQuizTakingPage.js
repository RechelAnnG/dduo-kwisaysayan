import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function StudentQuizTakingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz } = location.state || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentIdentificationAnswer, setCurrentIdentificationAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [totalPoints, setTotalPoints] = useState(0); // Total points of the quiz
  const [currentPoints, setCurrentPoints] = useState(0); // Points scored so far

  useEffect(() => {
    if (!quiz) {
      alert("No quiz data found. Please enter a valid quiz code.");
      navigate("/student/Dashboard");
    }
  }, [quiz, navigate]);

  useEffect(() => {
    if (quiz && quiz.Questions.length > 0) {
      const timerString = quiz.Questions[currentQuestionIndex]?.Timer || "15 seconds";
      const timerValue = parseInt(timerString.split(" ")[0]);
      const timeUnit = timerString.split(" ")[1];
      const timerInSeconds = timeUnit.startsWith("min") ? timerValue * 60 : timerValue;
      setTimeLeft(timerInSeconds);
    }
  }, [quiz, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleNextQuestion();
    }
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    // Calculate total points when quiz data is loaded
    if (quiz) {
      const total = quiz.Questions.reduce((acc, question) => acc + (question.Points || 0), 0);
      setTotalPoints(total);
    }
  }, [quiz]);

  const handleAnswerChange = (questionId, answer) => {
    const currentAnswers = answers[questionId] || [];

    if (currentQuestion.Question_Type === "Multiple Choice") {
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((ans) => ans !== answer)
        : [...currentAnswers, answer];
      setAnswers({ ...answers, [questionId]: updatedAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const handleIdentificationChange = (value) => {
    setCurrentIdentificationAnswer(value);
  };

  const handleNextQuestion = async () => {
    const questionId = currentQuestion.id;
    const questionType = currentQuestion.Question_Type;
  
    let updatedAnswers = { ...answers };
    
    if (questionType === "Identification") {
      updatedAnswers[questionId] = currentIdentificationAnswer;
    } else if (questionType === "Multiple Choice") {
      updatedAnswers[questionId] = answers[questionId] || [];
    } else {
      updatedAnswers[questionId] = answers[questionId];
    }
  
    setAnswers(updatedAnswers);
  
    let requestBody = {};
    if (questionType === "Multiple Choice") {
      requestBody = {
        answer: updatedAnswers[questionId],
        correct_answer: currentQuestion.Choices.filter((choice) => choice.Is_Correct).map(choice => choice.Choice_Text),
        question_type: questionType,
        points: currentQuestion.Points // Add points to the request
      };
    } else if (questionType === "Identification") {
      requestBody = {
        answer: currentIdentificationAnswer,
        correct_answer: currentQuestion.Choices.find((choice) => choice.Is_Correct).Choice_Text,
        question_type: questionType,
        points: currentQuestion.Points // Add points to the request
      };
    } else {
      requestBody = {
        answer: updatedAnswers[questionId],
        correct_answer: currentQuestion.Choices.find((choice) => choice.Is_Correct).Choice_Text,
        question_type: questionType,
        points: currentQuestion.Points // Add points to the request
      };
    }
  
    try {
      const response = await fetch("http://localhost:5000/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
      setFeedback(data.message);

      if (data.correct) {
        setCurrentPoints((prevPoints) => prevPoints + currentQuestion.Points); // Add points for correct answer
      }
  
      alert(data.message);
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  
    setCurrentIdentificationAnswer("");
    setFeedback("");
  
    if (currentQuestionIndex < quiz.Questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Reset the answers based on question type
      if (currentQuestion.Question_Type === "True or False" || currentQuestion.Question_Type === "Yes or No") {
          setAnswers((prevAnswers) => ({ ...prevAnswers, [currentQuestion.id]: null })); // Clear answer
      } else if (currentQuestion.Question_Type === "Identification") {
          setCurrentIdentificationAnswer(""); // Clear identification answer
      }
  } else {
      navigate("/student/Result/Page", { state: { answers, quiz } });
  }
  };

  const handleSubmitQuiz = () => {
    if (currentQuestionIndex < quiz.Questions.length - 1) {
      handleNextQuestion();
    } else {
      navigate("/student/Result/Page", { state: { answers, quiz } });
    }
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-pink"; // Change to your desired color class for easy
      case "Medium":
        return "bg-midp"; // Your existing class for medium
      case "Hard":
        return "bg-darkp"; // Change to your desired color class for hard
      default:
        return ""; // No specific class if difficulty is not recognized
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const questions = quiz.Questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-custom-brownbg">
      <div className="p-4 md:py-6 flex flex-1 flex-col gap-5">
        <div className="flex-1 bg-white p-14 md:p-5 gap-4 w-full shadow-custom-darkblue rounded-md flex flex-col">
          <div className={`flex flex-col shad border p-2 rounded-md ${getDifficultyClass(currentQuestion.Difficulty_Level)}`}>
            <div className="text-lg font-bold text-left text-custom-brownbg">{quiz.Quiz_Name}</div>
            <div className="text-lg font-bold text-left text-custom-brownbg mb-2">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="text-lg font-bold text-left text-custom-brownbg">
              Points: {currentPoints}/{totalPoints}
            </div>
            <div className="text-lg font-bold text-left text-custom-brownbg">
              Time Left: {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
            </div>
          </div>

          {currentQuestion ? (
            <div className={`flex flex-1 flex-col shad border items-center justify-center p-2 rounded-md ${getDifficultyClass(currentQuestion.Difficulty_Level)}`}>
              <div className="text-lg font-bold text-custom-brownbg">{currentQuestion.Question_Text}</div>
            </div>
          ) : (
            <div>No questions available for this quiz.</div>
          )}
        </div>

        {/* Choices Section */}
        {currentQuestion && currentQuestion.Question_Type === "Multiple Choice" && (
          <div className="bg-white p-14 md:p-5 w-full shadow-custom-darkblue rounded-md">
            <div className="grid grid-row gap-4">
              {currentQuestion.Choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={answers[currentQuestion.id]?.includes(choice.Choice_Text) || false}
                    onChange={() => handleAnswerChange(currentQuestion.id, choice.Choice_Text)}
                  />
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={choice.Choice_Text}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Radio Buttons Section for True/False and Yes/No */}
        {currentQuestion && (currentQuestion.Question_Type === "True or False" || currentQuestion.Question_Type === "Yes or No") && (
          <div className="bg-white p-14 md:p-5 w-full shadow-custom-darkblue rounded-md">
            <div className="grid grid-row gap-4">
              {currentQuestion.Choices.map((choice, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    className="form-radio h-5 w-5 text-blue-600"
                    checked={answers[currentQuestion.id] === choice.Choice_Text}
                    onChange={() => handleAnswerChange(currentQuestion.id, choice.Choice_Text)}
                  />
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    value={choice.Choice_Text}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Identification Question Section */}
        {currentQuestion && currentQuestion.Question_Type === "Identification" && (
          <div className="bg-white p-14 md:p-5 w-full shadow-custom-darkblue rounded-md">
            <div className="grid grid-row gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter your answer here"
                  value={currentIdentificationAnswer}
                  onChange={(e) => handleIdentificationChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmitQuiz}
            className="text-sm bg-custom-blue bg-gradient-to-r from-midp to-pink px-4 py-2 text-custom-brownbg font-semibold rounded-md"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentQuizTakingPage; // good code
