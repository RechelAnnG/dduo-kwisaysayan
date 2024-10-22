import React, { useState } from 'react';

function StudentDashboardPage() {
    const [quizCode, setQuizCode] = useState('');

    const enterQuiz = () => {
        if (quizCode) {
            alert('Proceeding with quiz code: ' + quizCode);
            // Add the redirection or logic to handle the quiz code here
            // Example: window.location.href = `/quiz/${quizCode}`;
        } else {
            alert('Please enter a quiz code.');
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-8 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Student Dashboard</h1>
                <p className="mb-6">Please enter your quiz code to begin:</p>
                <div className="input-container mb-4">
                    <input
                        type="text"
                        value={quizCode}
                        onChange={(e) => setQuizCode(e.target.value)}
                        placeholder="Enter Quiz Code"
                        className="p-3 w-4/5 max-w-xs border border-gray-300 rounded-md text-lg"
                    />
                </div>
                <button
                    onClick={enterQuiz}
                    className="p-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Enter Quiz
                </button>
            </div>
        </div>
    );
}

export default StudentDashboardPage;
