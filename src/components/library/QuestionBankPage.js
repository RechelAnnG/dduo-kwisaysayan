
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import arrowIcon from "../../assets/images/arrow-icon.png";
import { db } from "../../firebaseConfig.js"; // Import Firebase database
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions

function QuestionBankPage() {
  const [selectedOption, setSelectedOption] = useState("by bank name"); // Default to 'by bank name'
  const [gradeLevel, setGradeLevel] = useState("All"); // Default to 'All' for grade level
  const [difficultyLevel, setDifficultyLevel] = useState("All"); // Default to 'All' for difficulty level
  
  const [questionBanks, setQuestionBanks] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    // Fetch data from the database when the component mounts
    const fetchQuestionBanks = async () => {
      const querySnapshot = await getDocs(collection(db, "tbl_questionBank"));
      const banks = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestionBanks(banks);
    };
    fetchQuestionBanks();

    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "tbl_question"));
      const fetchedQuestions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(fetchedQuestions);
    };
    fetchQuestions();

    const fetchChoices = async () => {
      const querySnapshot = await getDocs(collection(db, "tbl_choices"));
      const fetchedChoices = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setChoices(fetchedChoices);
    };
    fetchChoices();

    const fetchAnswers = async () => {
      const querySnapshot = await getDocs(collection(db, "tbl_answers"));
      const fetchedAnswers = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAnswers(fetchedAnswers);
    };
    fetchAnswers();
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleGradeLevelChange = (event) => {
    setGradeLevel(event.target.value);
  };

  const handleCreateQuestionBankClick = () => {
    navigate("/Library/QuestionBank/Create"); // Redirect to the specified path
  };

  const handleViewbankClick = (bankId) => {
    navigate(`/Library/QuestionBank/View/${bankId}`);    // Properly use backticks for string interpolation
  };
  


const filteredQuestionBanks = questionBanks.filter((bank) => {
  if (selectedOption === "by bank name") {
    // If 'All' is selected or gradeLevel is not set, show all question banks
    if (gradeLevel === "All" || !gradeLevel) {
      return true;
    }
    // Otherwise, filter by grade level
    return bank.Grade_Level?.toLowerCase() === gradeLevel.toLowerCase();
  }
  return true;
});


const filteredQuestions = questions.filter((question) => {
  if (selectedOption === "All") {
    // Find the question bank that corresponds to this question
    const questionBank = questionBanks.find(bank => bank.id === question.Question_Bank_ID);

    // If 'All' is selected for grade level, skip this filter
    const matchesGradeLevel = gradeLevel === "All" || 
      (questionBank && questionBank.Grade_Level?.toLowerCase() === gradeLevel.toLowerCase());

    // If 'All' is selected for difficulty level, skip this filter
    const matchesDifficultyLevel = difficultyLevel === "All" || 
      question.Difficulty_Level?.toLowerCase() === difficultyLevel.toLowerCase();

    // Return true if both filters match (or if 'All' is selected for both)
    return matchesGradeLevel && matchesDifficultyLevel;
  }
  return true; // If 'All' is not selected, return all questions
}).map((question) => {
  return {
    ...question,
    Choices: choices.filter((choice) => choice.Question_ID === question.id).map((choice) => choice.Choice_Text),
    Answer: answers.find((answer) => answer.Question_ID === question.id)?.Answer_text || "",
  };
});




  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl items-center font-bold text-custom-brownnav">
          <h1>LIBRARY</h1>
          <img
            src={arrowIcon}
            alt="Arrow Page"
            className="w-3 h-5 mx-5 md:w-4 md:h-7"
          />
          <h1>QUESTION BANK</h1>
        </div>
      </header>

      <div className="flex flex-col md:flex-row md:items-center md:gap-2 px-4 pt-5 md:pt-6">
        {/* Main container for search input, dropdowns, and button */}
        <div className="flex flex-col md:flex-row flex-1 w-full items-center gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-1/4 p-2 text-sm md:text-base border border-custom-brownnav rounded-md"
          />

          {/* Dropdowns Container */}
          <div className="flex flex-row md:flex-row w-full md:w-1/2 gap-2 mt-2 md:mt-0">
            {/* Dropdown 1 */}
            <select
              value={selectedOption}
              onChange={handleDropdownChange}
              className="w-full md:w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
            >
              <option value="" disabled>Select an option</option>
              <option value="All">All</option>
              <option value="by bank name">By question bank name</option>
            </select>

            {/* Difficulty Level Dropdown */}
              {selectedOption === "All" && (
                <select
                  value={difficultyLevel}
                  onChange={handleDifficultyChange}
                  className="w-auto md:w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
                >
                  <option value="All">All</option> {/* Add 'All' option */}
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              )}

              {/* Grade Level Dropdown */}
              <select
                value={gradeLevel}
                onChange={handleGradeLevelChange}
                className="w-full md:w-1/2 p-1 md:p-2 text-xs md:text-base border border-custom-brownnav rounded-md"
              >
                <option value="All">All</option> {/* Add 'All' option */}
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
          </div>

          {/* Create Quiz Button */}
          <button
            className="bg-gradient-to-r from-midp to-pink text-custom-brownbg px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md md:ml-auto mt-2 md:mt-0  self-end"
            onClick={handleCreateQuestionBankClick} // Add onClick handler
          >
            Create question bank
          </button>
        </div>
      </div>

      {/* Conditionally Render Containers */}
      {selectedOption === "by bank name" && filteredQuestionBanks.map((bank) => (
        <div key={bank.id} className="bg-white p-6 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-4">
          {/* By bank name container */}
          <div className="flex flex-row items-center gap-4">
            {/* Text Content */}
            <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between md:w-full">
              <div className="flex-1 flex flex-col items-start">
                <h2 className="text-custom-brownnav text-base md:text-2xl font-bold">
                  {bank.Question_Bank_Name}
                </h2>
                <span className="text-custom-brownnav text-sm md:text-xl">
                  {/* Count of questions in the bank */}
                  {questions.filter((q) => q.Question_Bank_ID === bank.id).length} questions
                </span>
                <span className="text-custom-brownnav text-xs md:text-base">
                  {bank.Grade_Level}
                </span>
              </div>

              {/* View Button for Laptop/Desktop */}
              <div className="hidden md:flex md:justify-center md:items-center md:ml-auto">
                <button
                  className="bg-gradient-to-r from-midp to-pink text-custom-textcolor px-4 py-2 text-sm md:text-base font-bold rounded-md shadow-md hover:bg-yellow-600"
                  onClick={() => handleViewbankClick(bank.id)}
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* View Button for Mobile */}
          <div className="flex md:hidden mt-4">
            <button
              className="bg-gradient-to-r from-midp to-pink text-custom-textcolor w-full px-4 py-2 text-sm font-bold rounded-md shadow-md hover:bg-yellow-600"
              onClick={() => handleViewbankClick(bank.id)}
            >
              View
            </button>
          </div>
        </div>
      ))}

{selectedOption === "All" && filteredQuestions.map((question) => (
  <div key={question.id} className="bg-white p-6 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-6 mt-4 flex flex-col gap-4 text-left">
    {/* All Container */}
    <div>
      <p className="text-sm font-medium text-gray-500">{question.Difficulty_Level}</p>

      <h3 className="text-lg font-semibold">Question</h3>
      <p className="text-gray-700 mt-2">
        {question.Question_Text}
      </p>
    </div>

    {/* Choices Container */}
    <div>
      <h3 className="text-lg font-semibold">Choices:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-2">
        {question.Choices.length > 0 ? (
          question.Choices.map((choice, index) => (
            <div key={index}>{choice}</div>
          ))
        ) : (
          <div>{question.Answer}</div>
        )}
      </div>
    </div>
  </div>
))}

    </div>
  );
}

export default QuestionBankPage;
