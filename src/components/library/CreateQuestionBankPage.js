import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebaseConfig"; // Import firebaseConfig
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import arrowIcon from "../../assets/images/arrow-icon.png";
import deleteIcon from "../../assets/images/deleteRed-icon.png";
import addGreenIcon from "../../assets/images/addGreen-icon.png";

function CreateQuestionBankPage() {
  const [questionContainers, setQuestionContainers] = useState([{ 
    id: 1, 
    selectedOption: "", 
    questionText: "", 
    difficultyLevel: "", 
    correctAnswersCount: 0, 
    choices: Array(5).fill().map(() => ({ text: "", isCorrect: false })), 
    trueFalseAnswer: null, 
    yesNoAnswer: null,
    identificationAnswer: "" // Updated line
  }]);
  const [questionBankName, setQuestionBankName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const navigate = useNavigate();

  const handleDropdownChange = (event, index) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[index].selectedOption = event.target.value;
    updatedContainers[index].trueFalseAnswer = null;
    updatedContainers[index].yesNoAnswer = null;
    updatedContainers[index].identificationAnswer = "";
    setQuestionContainers(updatedContainers);
  };

  const handleDeleteClick = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      const updatedContainers = questionContainers.filter((_, i) => i !== index);
      setQuestionContainers(updatedContainers);
    }
  };

  const handleAddContainerClick = () => {
    setQuestionContainers([...questionContainers, { 
      id: questionContainers.length + 1, 
      selectedOption: "", 
      questionText: "", 
      difficultyLevel: "", 
      correctAnswersCount: 0, 
      choices: Array(5).fill().map(() => ({ text: "", isCorrect: false })), 
      trueFalseAnswer: null, 
      yesNoAnswer: null,
      identificationAnswer: ""
    }]);
  };

  const handleCheckboxChange = (event, containerIndex, choiceIndex) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[containerIndex].choices[choiceIndex].isCorrect = event.target.checked;
    setQuestionContainers(updatedContainers);
  };

  const handleChoiceTextChange = (event, containerIndex, choiceIndex) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[containerIndex].choices[choiceIndex].text = event.target.value;
    setQuestionContainers(updatedContainers);
  };

  const handleTrueFalseChange = (containerIndex, value) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[containerIndex].trueFalseAnswer = value;
    setQuestionContainers(updatedContainers);
  };

  const handleYesNoChange = (containerIndex, value) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[containerIndex].yesNoAnswer = value;
    setQuestionContainers(updatedContainers);
  };

  const handleIdentificationAnswerChange = (event, index) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[index].identificationAnswer = event.target.value;
    setQuestionContainers(updatedContainers);
  };

  const handleQuestionTextChange = (event, index) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[index].questionText = event.target.value;
    setQuestionContainers(updatedContainers);
  };

  const handleDifficultyChange = (event, index) => {
    const updatedContainers = [...questionContainers];
    updatedContainers[index].difficultyLevel = event.target.value;
    setQuestionContainers(updatedContainers);
  };

  const handleSaveClick = async () => {
    try {
      const questionBankDocRef = await addDoc(collection(db, "tbl_questionBank"), {
        Question_Bank_Name: questionBankName,
        Grade_Level: gradeLevel,
        Creation_Date: serverTimestamp(),
        Modified_Date: serverTimestamp(),
      });

      const questionBankId = questionBankDocRef.id;

      for (const container of questionContainers) {
        const questionDocRef = await addDoc(collection(db, "tbl_question"), {
          Question_Bank_ID: questionBankId,
          Question_Type: container.selectedOption,
          Question_Text: container.questionText,
          Difficulty_Level: container.difficultyLevel,
        });

        if (container.selectedOption === "Multiple Choice") {
          for (let i = 0; i < container.choices.length; i++) {
            await addDoc(collection(db, "tbl_choices"), {
              Question_ID: questionDocRef.id,
              Choice_Text: container.choices[i].text,
              Is_Correct: container.choices[i].isCorrect,
            });
          }
        } else if (container.selectedOption === "True or False" || container.selectedOption === "Yes or No") {
          await addDoc(collection(db, "tbl_answers"), {
            Question_ID: questionDocRef.id,
            Answer_text: container.trueFalseAnswer || container.yesNoAnswer,
          });
        } else if (container.selectedOption === "Identification") {
          await addDoc(collection(db, "tbl_answers"), {
            Question_ID: questionDocRef.id,
            Answer_text: container.identificationAnswer,
          });
        }
      }

      navigate('/Library/QuestionBank');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
          <h1>CREATE</h1>
        </div>
      </header>

      {/* First main container */}
      <div className="flex flex-col md:flex-row mt-5 md:mt-6 px-4">
        <div className="flex flex-col w-full md:items-center md:flex-row">
          <div className="flex">
            <label className="text-custom-brownnav text-left text-lg md:text-xl font-semibold mb-2 md:mb-0 md:mr-4">
              Question bank name
            </label>
            {/*GRADE LEVEL*/}
            <select
              className="text-xs border border-gray-300 ml-auto md:text-lg mb-2 rounded-md"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
            >
              <option value="" disabled>
                Grade level
              </option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 10">Grade 10</option>
            </select>
          </div>

          {/*QUESTION BANK NAME INPUT*/}
          <input
            type="text"
            className="md:w-1/2 border border-gray-300 rounded-md p-2 text-base focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Enter question bank name"
            value={questionBankName}
            onChange={(e) => setQuestionBankName(e.target.value)}
          />
        </div>
      </div>

      {questionContainers.map((container, index) => (
        <div
          key={index}
          className="bg-white p-4 md:p-6 rounded-md shadow-custom-darkblue mx-4 md:mx-4 mt-4 flex flex-col gap-4"
        >
          {/*QUESTION TYPE*/}
          <div className="grid grid-cols-2 text-xs md:text-base md:flex gap-4 items-center">
            <label className="flex text-left items-center gap-2">
              <input
                type="radio"
                name={`questionType-${index}`}
                value="Multiple Choice"
                onChange={(event) => handleDropdownChange(event, index)}
                disabled={!!container.selectedOption}
              />
              Multiple Choice
            </label>
            <label className="flex text-left items-center gap-2">
              <input
                type="radio"
                name={`questionType-${index}`}
                value="True or False"
                onChange={(event) => handleDropdownChange(event, index)}
                disabled={!!container.selectedOption}
              />
              True or False
            </label>
            <label className="flex text-left items-center gap-2">
              <input
                type="radio"
                name={`questionType-${index}`}
                value="Yes or No"
                onChange={(event) => handleDropdownChange(event, index)}
                disabled={!!container.selectedOption}
              />
              Yes or No
            </label>
            <label className="flex text-left items-center gap-2">
              <input
                type="radio"
                name={`questionType-${index}`}
                value="Identification"
                onChange={(event) => handleDropdownChange(event, index)}
                disabled={!!container.selectedOption}
              />
              Identification
            </label>
          </div>

          {/*Question Text*/}
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md"
            placeholder="Type your question here..."
            value={container.questionText}
            onChange={(e) => handleQuestionTextChange(e, index)}
          />

          {/*Difficulty Level*/}
          <div className="flex items-center gap-4">
            <p className="text-base md:text-lg font-semibold">Difficulty Level</p>
            <select
              className="text-xs border border-gray-300 ml-auto md:text-lg rounded-md"
              value={container.difficultyLevel}
              onChange={(e) => handleDifficultyChange(e, index)}
            >
              <option value="" disabled>
                Select difficulty level
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/*For multiple choice, the correct answer is/are selected checkbox/es */}
          {container.selectedOption === "Multiple Choice" && (
            <div className="bg-pink p-4 md:p-6 rounded-md shadow-custom-darkblue mt-4 flex flex-col gap-4">
              <div className="flex md:items-center flex-col md:flex-row md:gap-3">
                <p className="text-base text-left md:text-lg font-semibold">Choices</p>
                <p className="text-xs text-left md:text-base">
                  (select checkbox for correct answer)
                </p>
                <p className="text-xs text-left md:text-base">
                  {container.correctAnswersCount > 0 && `  ${container.correctAnswersCount} correct answer${container.correctAnswersCount > 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {container.choices.map((choice, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className="flex items-center gap-2 w-full"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 md:h-5 md:w-5"
                      checked={choice.isCorrect}
                      onChange={(event) => handleCheckboxChange(event, index, choiceIndex)}
                    />
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 p-2 rounded-md w-full md:text-base"
                      placeholder={`Choice ${choiceIndex + 1}`}
                      value={choice.text}
                      onChange={(event) => handleChoiceTextChange(event, index, choiceIndex)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*For true or false, the correct answer is the chosen radio button */}
          {container.selectedOption === "True or False" && (
            <div className="bg-custom-yellow p-4 md:p-6 rounded-md shadow-custom-darkblue mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["True", "False"].map((option, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className="flex items-center gap-2 w-full"
                  >
                    <input
                      type="radio"
                      name={`trueFalse-${index}`}
                      className="h-4 w-4 md:h-5 md:w-5"
                      checked={container.trueFalseAnswer === option}
                      onChange={() => handleTrueFalseChange(index, option)}
                    />
                    <label className="flex-1 border border-gray-300 p-2 rounded-md w-full md:text-base">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*For yes or no, the correct answer is the chosen radio button */}
          {container.selectedOption === "Yes or No" && (
            <div className="bg-darkp p-4 md:p-6 rounded-md shadow-custom-darkblue mt-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Yes", "No"].map((option, choiceIndex) => (
                  <div
                    key={choiceIndex}
                    className="flex items-center gap-2 w-full"
                  >
                    <input
                      type="radio"
                      name={`yesNo-${index}`}
                      className="h-4 w-4 md:h-5 md:w-5"
                      checked={container.yesNoAnswer === option}
                      onChange={() => handleYesNoChange(index, option)}
                    />
                    <label className="flex-1 border border-gray-300 p-2 rounded-md w-full md:text-base">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/*for identification, the correct answer is inputed text in the textbox*/}
          {container.selectedOption === "Identification" && (
            <div className="bg-teal-700 p-4 md:p-6 rounded-md shadow-custom-darkblue mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="text-base md:text-lg font-semibold">Answer</p>
              </div>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md"
                placeholder="Type the correct answer here..."
                value={container.identificationAnswer}
                onChange={(e) => handleIdentificationAnswerChange(e, index)}
              />
            </div>
          )}

          {container.selectedOption && (
            <button
              className="flex gap-2 text-custom-brownnav self-end"
              onClick={() => handleDeleteClick(index)}
            >
              <img src={deleteIcon} alt="Delete Icon" className="w-4 h-6" />
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-between p-4">
        <button
          className="flex gap-2 text-custom-brownnav "
          onClick={handleAddContainerClick}
        >
          <img src={addGreenIcon} alt="Add Icon" className="w-6 h-6" />
        </button>
        <button
          className="text-lg bg-custom-blue bg-gradient-to-r from-midp to-pink px-5 text-custom-brownbg font-semibold rounded-md"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateQuestionBankPage;
