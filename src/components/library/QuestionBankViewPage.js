import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the bankId from the URL
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import arrowIcon from "../../assets/images/arrow-icon.png";

function QuestionBankViewPage() {
  const [questions, setQuestions] = useState([]);
  const [questionBank, setQuestionBank] = useState(null);
  const [selectedOption, setSelectedOption] = useState("all"); // Define selectedOption state
  const [selectedDifficulty, setSelectedDifficulty] = useState("all"); // Define selectedDifficulty state
  const navigate = useNavigate();
  const { bankId } = useParams(); // Get bankId from the route

  useEffect(() => {
    const fetchQuestionBankData = async () => {
      try {
        // Fetch the specific question bank based on bankId
        const questionBankQuery = query(
          collection(db, "tbl_questionBank"),
          where("__name__", "==", bankId) // Query using the document ID
        );
        const questionBankSnapshot = await getDocs(questionBankQuery);
        const questionBankData = questionBankSnapshot.docs[0]?.data();
        setQuestionBank(questionBankData);

        if (questionBankData) {
          // Fetch questions associated with the question bank
          const questionQuery = query(
            collection(db, "tbl_question"),
            where("Question_Bank_ID", "==", bankId) // Use bankId to filter questions
          );
          const questionSnapshot = await getDocs(questionQuery);
          const questionData = await Promise.all(
            questionSnapshot.docs.map(async (doc) => {
              const question = { id: doc.id, ...doc.data() };
              if (question.Question_Type === "Multiple Choice") {
                // Fetch choices for multiple choice questions
                const choicesQuery = query(
                  collection(db, "tbl_choices"),
                  where("Question_ID", "==", doc.id)
                );
                const choicesSnapshot = await getDocs(choicesQuery);
                question.choices = choicesSnapshot.docs.map((choiceDoc) =>
                  choiceDoc.data()
                );
              } else if (
                question.Question_Type === "True or False" ||
                question.Question_Type === "Yes or No"
              ) {
                // Fetch the choices for True or False / Yes or No questions from tbl_choices
                const choicesQuery = query(
                  collection(db, "tbl_choices"),
                  where("Question_ID", "==", doc.id)
                );
                const choicesSnapshot = await getDocs(choicesQuery);
                question.answerOptions = choicesSnapshot.docs
                  .map((choiceDoc) => choiceDoc.data())
                  .sort((a, b) => (a.Choice_Text === "True" || a.Choice_Text === "Yes" ? -1 : 1)); // Ensure consistent order of options with True/Yes first
              } else if (question.Question_Type === "Identification") {
                // Fetch the correct answer for Identification questions
                const answersQuery = query(
                  collection(db, "tbl_answers"),
                  where("Question_ID", "==", doc.id)
                );
                const answersSnapshot = await getDocs(answersQuery);
                question.answers = answersSnapshot.docs.map((answerDoc) =>
                  answerDoc.data()
                );
              }
              return question;
            })
          );
          setQuestions(questionData);
        }
      } catch (error) {
        console.error("Error fetching question bank data: ", error);
      }
    };

    fetchQuestionBankData();
  }, [bankId]); // Depend on bankId to fetch the correct data

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleEditClick = (questionId) => {
    navigate(`/Library/QuestionBank/Edit/${questionId}`);
  };

  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl items-center font-bold text-custom-brownnav">
          <h1 className="text-sm md:text-2xl">QUESTION BANK</h1>
          <img
            src={arrowIcon}
            alt="Arrow Page"
            className="w-3 h-5 mx-5 md:w-4 md:h-7"
          />
          <h1 className="text-sm md:text-2xl">
            {questionBank?.Question_Bank_Name} - {questionBank?.Grade_Level}
          </h1>
        </div>
      </header>

      {/*For the filter, if all, then all the under selected question bank will be displayed, then vice versa for other options*/}
      <div className="mx-2 mt-5 md:p-4">
        <div className="flex flex-row md:flex-row md:items-center md:gap-4 gap-4">
          <div className="flex text-lg text-left md:text-xl font-semibold  text-darkp md:mb-0 ">Filtered by:</div>
          <select className=" md:p-2 border-2 border-pink rounded md:px-5 md:w-auto" onChange={handleDropdownChange}>
            <option value="all">All</option>
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True or False">True or False</option>
            <option value="Yes or No">Yes or No</option>
            <option value="Identification">Identification</option>
          </select>
          <select className="md:p-2 border-2 border-pink rounded md:px-5 md:w-auto" onChange={handleDifficultyChange}>
            <option value="all">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/*data from the selected question bank*/}
      {questions
        .filter((question) =>
          (selectedOption === "all" || selectedOption === "" ? true : question.Question_Type === selectedOption) &&
          (selectedDifficulty === "all" || selectedDifficulty === "" ? true : question.Difficulty_Level === selectedDifficulty)
        )
        .map((question) => (
          <div
            key={question.id}
            className="bg-white p-6 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-2"
          >
            <div className="flex">
              <div className="flex gap-1">
                <div className="flex text-sm text-left md:text-xl font-semibold  text-darkp md:mb-0 ">{question.Question_Type}</div>
                <div className="flex text-sm text-left md:text-xl font-semibold  text-darkp md:mb-0 ">-</div>
                <div className="flex text-sm text-left md:text-xl font-semibold  text-darkp md:mb-0 ">{question.Difficulty_Level}</div>
              </div>
              <button
                className="ml-auto text-sm bg-custom-blue md:text-xl  bg-gradient-to-r from-midp to-pink px-5 text-custom-brownbg font-semibold rounded-md"
                onClick={() => handleEditClick(question.id)}
              >
                Edit
              </button>
            </div>

            <div className="flex text-sm text-left md:text-xl font-semibold text-darkp md:mb-0">Question</div>
            <textarea
              className="flex-1 border border-gray-300 p-2 rounded-md w-full md:text-base"
              placeholder="question"
              rows="2"
              value={question.Question_Text}
              readOnly
            />

            {question.Question_Type === "Multiple Choice" && (
              <>
                <div className="flex text-sm text-left md:text-xl font-semibold text-darkp md:mb-0">Choices</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {question.choices?.map((choice, index) => (
                    <div key={index} className={`p-2 border rounded-md ${choice.Is_Correct ? 'border-pink' : 'border-gray-300'}`}>
                      {choice.Choice_Text}
                    </div>
                  ))}
                </div>
              </>
            )}

            {(question.Question_Type === "True or False" || question.Question_Type === "Yes or No") && (
              <>
                <div className="flex text-sm text-left md:text-xl font-semibold text-darkp md:mb-0">Answer Options</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {question.answerOptions?.map((option, index) => (
                    <div key={index} className={`p-2 border rounded-md ${option.Is_Correct ? 'border-pink' : 'border-gray-300'}`}>
                      {option.Choice_Text}
                    </div>
                  ))}
                </div>
              </>
            )}{/* go back here in case*/}

            {question.Question_Type === "Identification" && (
              <>
                <div className="flex text-sm text-left md:text-xl font-semibold text-darkp md:mb-0">Correct Answer</div>
                <div className="p-2 border border-pink rounded-md">
                  {question.answers?.[0]?.Answer_text}
                </div>
              </>
            )}
          </div> 
        ))}
    </div>
  );
}

export default QuestionBankViewPage;
