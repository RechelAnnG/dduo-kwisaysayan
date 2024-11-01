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
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Redirect if no quiz data is found in state
    if (!quiz) {
      alert("No quiz data found. Please enter a valid quiz code.");
      navigate("/student/Dashboard");
    } else {
      // Shuffle questions using Fisher-Yates algorithm
      fetch('http://localhost:5000/shuffle-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions: quiz.Questions }),
      })
        .then(response => response.json())
        .then(data => {
          setShuffledQuestions(data);
        })
        .catch(error => {
          console.error('Error shuffling questions:', error);
          setShuffledQuestions(quiz.Questions); // Fallback to original questions if shuffling fails
        });
    }
  }, [quiz, navigate]);

  useEffect(() => {
    if (shuffledQuestions && shuffledQuestions.length > 0) {
      const timerString = shuffledQuestions[currentQuestionIndex]?.Timer || "15 seconds";
      const timerValue = parseInt(timerString.split(" ")[0]);
      const timeUnit = timerString.split(" ")[1];

      const timerInSeconds = timeUnit.startsWith("min") ? timerValue * 60 : timerValue;
      setTimeLeft(timerInSeconds);
    }
  }, [shuffledQuestions, currentQuestionIndex]);

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

  const handleAnswerChange = (questionId, answer) => {
    const currentAnswers = answers[questionId] || [];

    // Different handling based on question type
    if (currentQuestion.Question_Type === "Multiple Choice") {
      const updatedAnswers = currentAnswers.includes(answer)
        ? currentAnswers.filter((ans) => ans !== answer)
        : [...currentAnswers, answer];
      setAnswers({ ...answers, [questionId]: updatedAnswers });
    } else {
      // For True/False and Yes/No questions
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const handleIdentificationChange = (value) => {
    setCurrentIdentificationAnswer(value);
  };

  const handleNextQuestion = () => {
    // Save identification answer if it's an identification question
    if (currentQuestion.Question_Type === "Identification") {
      setAnswers({ ...answers, [currentQuestion.id]: currentIdentificationAnswer });
      setCurrentIdentificationAnswer(""); // Reset identification answer
    }

    // Clear current answer for next question
    setAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[currentQuestion.id]; // Remove answer for current question
      return updatedAnswers;
    });

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }else {
      // Navigate to result page after the last question
      navigate("/student/Result/Page", { state: { answers, quiz } });
    }
  };

  const handleSubmitQuiz = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      handleNextQuestion();
    } else {
      // Navigate to result page
      navigate("/student/Result/Page", { state: { answers, quiz } });
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  // Ensure Questions exist in the quiz data
  const questions = shuffledQuestions || [];
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
          <div className="flex flex-col shad border bg-midp p-2 rounded-md">
            <div className="text-lg font-bold text-left text-custom-brownbg ">{quiz.Quiz_Name}</div>
            <div className="text-lg font-bold text-left text-custom-brownbg mb-2">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="text-lg font-bold text-left text-custom-brownbg">
              Time Left: {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
            </div>
          </div>

          {currentQuestion ? (
            <div className="flex flex-1 flex-col shad border items-center justify-center bg-midp p-2 rounded-md">
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
                    name={currentQuestion.id} // Ensure the same name for radio buttons
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

export default StudentQuizTakingPage; //back here in case
