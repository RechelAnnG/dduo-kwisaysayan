import arrowIcon from "../../assets/images/arrow-icon.png";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Assuming you've initialized Firebase

function CreateQuizPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizName, gradeLevel, questionBankId } = location.state || {};

  const [questions, setQuestions] = useState([]);

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
          const fetchedQuestions = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuestions(fetchedQuestions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [questionBankId]);

  const handleCreateClick = () => {
    navigate("/Library/EditQuiz");
  };

  const renderQuestions = (difficulty, questionType) => {
    return questions
      .filter(
        (q) =>
          q.Difficulty_Level === difficulty && q.Question_Type === questionType
      )
      .map((question, index) => (
        <tr key={question.id} className="border-b bg-white border-custom-brownnav">
          <td className="p-4">{`${index + 1}. ${question.Question_Text}`}</td>
        </tr>
      ));
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

      {["Easy", "Medium", "Hard"].map((difficulty) => (
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
                            {/*number inputbox*/}
                            <input
                              type="number"
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
