import React, { useState } from "react";
import arrowIcon from "../../../assets/images/arrow-icon.png";
import ReportsViewmodal from "./ReportsViewModal";

function ReportsViewPage() {
  const [activeTab, setActiveTab] = useState("participants");
  const [ReportsViewModal, ReportsViewsetModal] = useState(false);
  const ReportsViewtoggleModal = () => {
    ReportsViewsetModal(!ReportsViewModal);
  };
  const questions = [
    {
      id: 1,
      type: "Multiple Choice",
      difficulty: "Easy",
      question: "Ano ang pangunahing layunin ng Katipunan?",
      choices: [
        { text: "Kalayaan mula sa Espanya", correctCount: 18 },
        { text: "Pagsuporta sa mga pari", correctCount: 3 },
        { text: "Pagpapababa ng buwis", correctCount: 1 },
      ],
    },
    {
      id: 2,
      type: "Multiple Choice",
      difficulty: "Easy",
      question: "Sino ang itinuturing na Supremo ng Katipunan?",
      choices: [
        { text: "Emilio Aguinaldo", correctCount: 5 },
        { text: "Andres Bonifacio", correctCount: 20 },
        { text: "Francisco Baltazar", correctCount: 2 },
      ],
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-custom-brownnav">
          <h1>REPORTS</h1>
          <img
            src={arrowIcon}
            alt="Arrow Page"
            className="w-3 h-5 mx-5 md:w-4 md:h-7"
          />
          <h1>VIEW</h1>
        </div>
      </header>

      {/* First container */}
      <div className="p-4 md:py-6">
        <div className="bg-gray-100 text-left p-4 rounded-md">
          <div className="">
            <h2 className="text-md md:text-lg font-medium">KWISAYSAYAN</h2>
            <p>Grade 8 &nbsp; | &nbsp; 10/27/24</p>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Accuracy", value: "0%" },
            { label: "Completion rate", value: "0%" },
            { label: "Total students", value: "24" },
            { label: "Questions", value: "30" },
          ].map((metric, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md text-center">
              <h3 className="text-xs md:text-sm font-medium">{metric.label}</h3>
              <p className="text-lg md:text-xl font-semibold mt-1">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Participants / Questions Tab */}
        <div className="mt-8">
          <div className="flex border-b mb-4">
            <button
              className={`px-2 md:px-4 py-2 font-semibold ${
                activeTab === "participants"
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("participants")}
            >
              Participants
            </button>
            <button
              className={`px-2 md:px-4 py-2 font-semibold ${
                activeTab === "questions"
                  ? "text-gray-800 border-b-2 border-gray-800"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("questions")}
            >
              Questions
            </button>
          </div>

          {activeTab === "participants" && (
            <div>
              {/* Sort and Legend Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
                <select className="border border-gray-300 p-2 rounded-md">
                  <option>Sort by:</option>
                  <option>Name</option>
                  <option>Accuracy</option>
                  <option>Points</option>
                </select>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500"></div>
                    <span className="text-xs md:text-sm">Correct</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-500"></div>
                    <span className="text-xs md:text-sm">Incorrect</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-500"></div>
                    <span className="text-xs md:text-sm">Unattempted</span>
                  </div>
                </div>
              </div>

              {/* Participants List */}
              <div className="bg-gray-100 p-4 rounded-md">
                {[0, 1].map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 bg-white p-4 rounded-md shadow-sm space-y-4 md:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-semibold">Baltazar, Hazel Joy</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="w-full bg-gray-200 h-4 rounded-sm overflow-hidden md:w-64">
                            <div className="bg-green-500 h-full" style={{ width: "70%" }}></div>
                            <div className="bg-red-500 h-full" style={{ width: "20%" }}></div>
                            <div className="bg-gray-500 h-full" style={{ width: "10%" }}></div>
                        </div>
                        <div className="bg-red-100 text-left text-red-600 px-2 py-1 rounded-md  w-11">
                        <span className="text-sm font-bold">&#x2716;</span> 1
                      </div>
                    </div>    
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8">
                      <div className="text-center">
                        <p className="text-lg font-semibold">70%</p>
                        <p className="text-xs md:text-sm text-gray-600">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">23/25</p>
                        <p className="text-xs md:text-sm text-gray-600">Points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">16230</p>
                        <p className="text-xs md:text-sm text-gray-600">Score</p>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={ReportsViewtoggleModal} >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="bg-gray-100 p-4 rounded-md">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className="bg-white p-6 text-left rounded-md mb-6 shadow-sm"
                >
                  <h2 className="text-lg font-semibold mb-2">
                    {question.type} - {question.difficulty}
                  </h2>
                  <p className="font-medium mb-2">Question</p>
                  <p className="mb-4">{question.question}</p>
                  <p className="font-medium mb-2">Choices</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {question.choices.map((choice, index) => (
                      <div
                        key={index}
                        className="p-2 border rounded-md text-center"
                      >
                        <p>{choice.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {choice.correctCount} answered correctly
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ReportsViewmodal
        ReportsViewModal={ReportsViewModal}
        ReportsViewsetModal={ReportsViewsetModal}
        ReportsViewtoggleModal={ReportsViewtoggleModal}
      />
    </div>
  );
}

export default ReportsViewPage;
