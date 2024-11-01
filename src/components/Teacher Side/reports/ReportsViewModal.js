import React from 'react';
import xButton from '../../../assets/images/xButtonLight-icon.png';
import profilePic from '../../../assets/images/profileDark-icon.png';

export default function ReportsViewModal({ ReportsViewModal, ReportsViewtoggleModal }) {
    if (!ReportsViewModal) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 h-auto rounded-lg shadow-2xl transform transition-all duration-500 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="text-xl text-left font-semibold">Chellyace</h3>
              <p className="text-sm text-gray-500">Oct 19, 2024, 03:12 am </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-1" onClick={ReportsViewtoggleModal}>
              <img src={xButton} alt="Close" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 text-black">
          {/* Metrics Overview */}
          <div className="flex md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white flex-1 border p-4 rounded-md text-center">
            <p className="text-sm text-gray-600">Accuracy</p>
              <p className="text-xl font-bold">0%</p>
              
            </div>
            <div className="bg-white flex-1 border p-4 rounded-md text-center">
              <p className="text-sm text-gray-600">Points</p>
              <p className="text-xl font-bold">0/25</p>
             
            </div>
          </div>

           {/* Metrics Overview */}
           <div className="flex md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Correct</p>
                <p className="text-xl font-bold">0</p>
                
                </div>
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Unattempted</p>
                <p className="text-xl font-bold">0</p>
                
                </div>
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                <p className="text-sm text-gray-600">Incorrect</p>
                <p className="text-xl font-bold">0</p>
                
                </div>
          </div>

          {/* Question Review */}
          <div className="bg-white border text-left p-2 rounded-md mt-6 overflow-y-auto max-h-80">
            <div className="bg-white border text-left p-6 rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">&#x2716; Incorrect</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">Fill in the Blank</span>
                <p className="ml-auto text-gray-500">12 seconds | 0 point</p>
              </div>
              <p className="text-lg font-bold mb-2">1. Question</p>
              <div className="grid grid-cols-3 ml-4">
                <p className="text-sm text-gray-700 mb-2">choice 1</p>
                <p className="text-sm text-gray-700 mb-2">choice 2</p>
                <p className="text-sm text-gray-700 mb-2">choice 3</p>
                <p className="text-sm text-gray-700 mb-2">choice 4</p>
                <p className="text-sm text-gray-700 mb-2">choice 5</p>
              </div>
              <div className="ml-4 font-semibold">
                <p className="text-sm text-gray-700 mb-2">Answer: <span className="text-red-500">choice 2</span></p>
                <p className="text-sm text-gray-700">Correct answer: <span className="text-green-500">choice 4</span></p>
              </div>
            </div>

            <div className="bg-white border text-left p-6 rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md">&#x2716; Incorrect</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">Fill in the Blank</span>
                <p className="ml-auto text-gray-500">12 seconds | 0 point</p>
              </div>
              <p className="text-lg font-bold mb-2">1. Question</p>
              <div className="grid grid-cols-3 ml-4">
                <p className="text-sm text-gray-700 mb-2">choice 1</p>
                <p className="text-sm text-gray-700 mb-2">choice 2</p>
                <p className="text-sm text-gray-700 mb-2">choice 3</p>
                <p className="text-sm text-gray-700 mb-2">choice 4</p>
                <p className="text-sm text-gray-700 mb-2">choice 5</p>
              </div>
              <div className="ml-4 font-semibold">
                <p className="text-sm text-gray-700 mb-2">Answer: <span className="text-red-500">choice 2</span></p>
                <p className="text-sm text-gray-700">Correct answer: <span className="text-green-500">choice 4</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}