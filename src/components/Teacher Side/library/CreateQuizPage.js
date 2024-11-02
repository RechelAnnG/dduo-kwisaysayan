import arrowIcon from "../../../assets/images/arrow-icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // Assuming you've initialized Firebase

function CreateQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizName, gradeLevel, questionBankId } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState({
    Easy: {},
    Medium: {},
    Hard: {},
  });
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (questionBankId) {
          const questionCollection = collection(db, "tbl_question");
          const q = query(
            questionCollection,
            where("Question_Bank_ID", "==", questionBankId)
          );
          const querySnapshot = await getDocs(q);

          // Fetch questions and their answers
          const fetchedQuestions = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const questionData = {
              id: doc.id,
              ...doc.data(),
            };

            // Initialize Choices as an empty array
            let choices = [];

            // If the question type is Multiple Choice, fetch choices
            if (questionData.Question_Type === "Multiple Choice") {
              const choicesCollection = collection(db, "tbl_choices");
              const choicesQuery = query(
                choicesCollection,
                where("Question_ID", "==", questionData.id)
              );
              const choicesSnapshot = await getDocs(choicesQuery);
              choices = choicesSnapshot.docs.map(choiceDoc => ({
                id: choiceDoc.id,
                ...choiceDoc.data(),
              }));
            } else if (
              questionData.Question_Type === "True or False" ||
              questionData.Question_Type === "Yes or No"
            ) {
              // If the question type is True or False / Yes or No, fetch choices from tbl_choices
              const choicesCollection = collection(db, "tbl_choices");
              const choicesQuery = query(
                choicesCollection,
                where("Question_ID", "==", questionData.id)
              );
              const choicesSnapshot = await getDocs(choicesQuery);
              choices = choicesSnapshot.docs
                .map(choiceDoc => choiceDoc.data())
                .sort((a, b) => (a.Choice_Text === "True" || a.Choice_Text === "Yes" ? -1 : 1)); // Ensure consistent order of options with True/Yes first
            } else {
              // If the question type is Identification, fetch answers
              const answersCollection = collection(db, "tbl_answers");
              const answersQuery = query(
                answersCollection,
                where("Question_ID", "==", questionData.id)
              );
              const answersSnapshot = await getDocs(answersQuery);
              const answers = answersSnapshot.docs.map(answerDoc => ({
                id: answerDoc.id,
                ...answerDoc.data(),
              }));

              // Set the choices based on the answers fetched
              choices = answers.map(answer => ({
                Choice_Text: answer.Answer_text, // Use the answer text
                Is_Correct: answer.Answer_text === questionData.Correct_Answer, // Assuming you have a Correct_Answer field in the question
              }));
            }

            console.log("Fetched Question with Choices:", { ...questionData, Choices: choices }); // Log each question with its choices

            return { ...questionData, Choices: choices }; // Add choices to question data
          }));

          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [questionBankId]);

  const handleCreateClick = async () => {
    // Check if the total number of selected questions per difficulty level is at least 5
    for (const difficulty of ["Easy", "Medium", "Hard"]) {
      const totalSelected = Object.values(selectedQuestions[difficulty]).reduce((sum, count) => sum + (count || 0), 0);
      if (totalSelected < 5) {
        alert(`Please select at least 5 questions for ${difficulty} level.`);
        return;
      }
    }
  
    // Prepare the questions by type and difficulty level
    const questionsByType = {};
  
    for (const [difficulty, types] of Object.entries(selectedQuestions)) {
      for (const [questionType, count] of Object.entries(types)) {
        const questionsForType = questions.filter(
          (q) => q.Difficulty_Level === difficulty && q.Question_Type === questionType
        );
  
        if (questionsForType.length > 0) {
          questionsByType[`${difficulty}_${questionType}`] = {
            questions: questionsForType,
            count: count,
          };
        }
      }
    }
  
    console.log("Questions by Type:", questionsByType); // Log categorized questions by type
  
    // Call the Python backend to shuffle questions
    try {
      const response = await fetch('http://localhost:5000/shuffle-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions_by_type: questionsByType }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return; // Exit if there's an error
      }
  
      const shuffledQuestions = await response.json();
      console.log("Shuffled Questions:", shuffledQuestions); // Log shuffled questions
  
      navigate("/Teacher/Library/EditQuiz", {
        state: {
          selectedQuestions: shuffledQuestions,
          quizName: quizName,         // Pass quiz name
          gradeLevel: gradeLevel,     // Pass grade level
          creationTime: new Date().toLocaleString(), // Pass creation time
        },
      });
    } catch (error) {
      console.error("Error shuffling questions:", error);
    }
  };
  

  const handleQuestionCountChange = (difficulty, questionType, count) => {
    setSelectedQuestions((prev) => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        [questionType]: count,
      },
    }));
  };

  const renderQuestions = (difficulty, questionType) => {
    return questions
      .filter(
        (q) =>
          (difficultyFilter === "All" || q.Difficulty_Level === difficultyFilter) &&
          q.Difficulty_Level === difficulty &&
          q.Question_Type === questionType
      )
      .map((question, index) => (
        <tr key={question.id} className="border-b bg-white border-custom-brownnav">
          <td className="p-4">{`${index + 1}. ${question.Question_Text}`}</td>
        </tr>
      ));
  };

  const getQuestionCountValue = (difficulty, questionType) => {
    return selectedQuestions[difficulty]?.[questionType] || "";
  };

  return (
    <div className="flex-1 min-h-screen text-darkp bg-custom-brownbg pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-darkp">
          <h1 className="text-sm md:text-2xl">CREATE QUIZ</h1>
          <img
            src={arrowIcon}
            alt="Arrow Page"
            className="w-3 h-5 mx-5 md:w-4 md:h-7"
          />
          <h1 className="text-sm md:text-2xl">{`${quizName} - ${gradeLevel}`}</h1>
        </div>
      </header>

      {/* Dropdowns Container */}
      <div className="flex  px-6 pt-5 md:flex-row w-full md:w-1/2 gap-2 mt-2 md:mt-0">
        {/* Dropdown 1 */}
        <select
          className="w-full md:w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
          onChange={(e) => setDifficultyFilter(e.target.value)}
          value={difficultyFilter}
        >
          <option value="All">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      { difficultyFilter === "All" &&
        ["Easy", "Medium", "Hard"].map((difficulty) => (
        <div
          key={difficulty}
          className={`${
            difficulty === "Easy" ? "bg-pink" : difficulty === "Medium" ? "bg-midp" : "bg-darkp"
          } p-4 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-5 flex flex-col gap-4`}
        >
          <label className="text-custom-brownbg text-left text-xl md:text-xl font-bold mb-2 md:mb-0 md:mr-4">
            {difficulty.toUpperCase()}
          </label>

          {["Multiple Choice", "True or False", "Yes or No", "Identification"].map(
            (questionType) => (
              <div key={questionType}>
                <table className="w-full text-sm text-left bg-custom-brownbg shadow-custom-darkblue border-custom-brownnav text-gray-500 rounded-md overflow-hidden mt-4">
                  <thead>
                    <tr className="border-b-2 border-custom-brownnav">
                      <th className="p-4">
                        <div className="flex justify-between items-center">
                          <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0 md:mr-4">
                            {questionType}
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0">
                              Pick
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={getQuestionCountValue(difficulty, questionType)}
                              onChange={(e) => handleQuestionCountChange(difficulty, questionType, parseInt(e.target.value))}
                              className="w-9 md:w-14 p-2 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
                            />
                            <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0 md:mr-4">
                              questions
                            </label>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderQuestions(difficulty, questionType)}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      ))}

      {difficultyFilter !== "All" &&
        [difficultyFilter].map((difficulty) => (
          <div
          key={difficulty}
          className={`${
            difficulty === "Easy" ? "bg-pink" : difficulty === "Medium" ? "bg-midp" : "bg-darkp"
          } p-4 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-5 flex flex-col gap-4`}
        >
          <label className="text-custom-brownbg text-left text-xl md:text-xl font-bold mb-2 md:mb-0 md:mr-4">
            {difficulty.toUpperCase()}
          </label>

          {["Multiple Choice", "True or False", "Yes or No", "Identification"].map(
            (questionType) => (
              <div key={questionType}>
                <table className="w-full text-sm text-left bg-custom-brownbg shadow-custom-darkblue border-custom-brownnav text-gray-500 rounded-md overflow-hidden mt-4">
                  <thead>
                    <tr className="border-b-2 border-custom-brownnav">
                      <th className="p-4">
                        <div className="flex justify-between items-center">
                          <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0 md:mr-4">
                            {questionType}
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0">
                              Pick
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={getQuestionCountValue(difficulty, questionType)}
                              onChange={(e) => handleQuestionCountChange(difficulty, questionType, parseInt(e.target.value))}
                              className="w-9 md:w-14 p-2 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
                            />
                            <label className="text-custom-brownnav text-left text-sm md:text-lg font-semibold mb-2 md:mb-0 md:mr-4">
                              questions
                            </label>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderQuestions(difficulty, questionType)}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      ))}

<div className="flex justify-between p-4 md:p-6">
        <button
          className="bg-gradient-to-r from-midp to-pink text-custom-brownbg px-4 py-2 text-lg font-bold rounded-md shadow-md"
          onClick={handleCreateClick}
        >
          Create Quiz
        </button>

        <button className="bg-gradient-to-r from-midp to-pink text-custom-brownbg px-4 py-2 text-lg font-bold rounded-md shadow-md">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CreateQuizPage;
