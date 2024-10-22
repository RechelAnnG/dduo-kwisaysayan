import React, { useState, useEffect } from 'react';
import xButton from '../../assets/images/xButtonLight-icon.png';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js';

export default function CreateQuizModal({ createquizmodal, createquiztoggleModal }) {
  const [topicName, setTopicName] = useState('');
  const [questionBanks, setQuestionBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionBanks = async () => {
      try {
        const questionBankCollection = collection(db, 'tbl_questionBank');
        const querySnapshot = await getDocs(questionBankCollection);
        const banks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestionBanks(banks);
      } catch (error) {
        console.error('Error fetching question banks:', error);
      }
    };

    fetchQuestionBanks();
  }, []);

  if (!createquizmodal) return null;

  // Handle Create button click
  const handleCreateQuiz = () => {
    if (!topicName.trim()) {
      alert('Please enter a topic name.');
      return;
    }
    if (!selectedBank) {
      alert('Please choose a question bank.');
      return;
    }
    if (!gradeLevel) {
      alert('Please choose a grade level.');
      return;
    }

    // Close modal
    createquiztoggleModal();

    // Navigate to CreateQuizPage with the quiz data
    navigate('/Library/CreateQuiz', {
      state: {
        quizName: topicName,
        gradeLevel: gradeLevel,
        questionBankId: selectedBank,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-custom-brownbg w-auto h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out">
        <div className="bg-gradient-to-r from-midp to-pink text-custom-brownbg flex items-center justify-between p-4 rounded-t-lg">
          <h2 className="text-white text-lg md:text-xl font-bold">Create Quiz</h2>
          <button className="rounded-full p-1" onClick={createquiztoggleModal}>
            <img src={xButton} alt="Close" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 text-custom-bronwnnav">
          <label htmlFor="topicName" className="text-base md:text-lg text-left font-semibold">
            Quiz Name:
          </label>
          <input
            id="topicName"
            type="text"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
            className="border border-custom-brownnav rounded-md px-4 py-2 text-custom-brownnav"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="grade" className="text-base md:text-lg text-left font-semibold">
              Choose grade level:
            </label>
            <select
              id="grade"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="border border-custom-brownnav rounded-md px-4 py-2 text-custom-brownnav"
            >
              <option value="" disabled>Grade level</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="questionType" className="text-base md:text-lg text-left font-semibold">
              Choose question bank:
            </label>
            <select
              id="questionType"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="border border-custom-brownnav rounded-md px-4 py-2 text-custom-brownnav"
            >
              <option value="" disabled>
                Choose question bank
              </option>
              {questionBanks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.Question_Bank_Name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-gradient-to-r from-midp to-pink text-custom-brownbg font-bold mt-5 py-2 px-6 rounded-md hover:bg-custom-brownnav transition-all duration-300"
            onClick={handleCreateQuiz}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
