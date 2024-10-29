import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import profilePic from '../../assets/images/profileDark-icon.png';

function StudentDashboardPage() {
    const [quizCode, setQuizCode] = useState('');
    const navigate = useNavigate();
    const db = getFirestore();

    const enterQuiz = async () => {
        if (quizCode) {
            try {
                const quizzesQuery = query(
                    collection(db, "tbl_quizzes"),
                    where("Quiz_Code", "==", quizCode)
                );
                const querySnapshot = await getDocs(quizzesQuery);
                if (!querySnapshot.empty) {
                    let quizData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };

                    // Shuffle questions by calling backend using fetch
                    try {
                        const response = await fetch('http://localhost:5000/shuffle-questions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ questions: quizData.Questions }),
                        });

                        if (response.ok) {
                            const shuffledQuestions = await response.json();
                            quizData.Questions = shuffledQuestions; // Replace with shuffled questions
                        } else {
                            console.error("Error shuffling questions: ", response.statusText);
                        }
                    } catch (shuffleError) {
                        console.error("Error shuffling questions:", shuffleError);
                    }

                    navigate("/student/Quiz", { state: { quiz: quizData } }); // Pass quiz data to QuizTakingPage
                } else {
                    alert("Invalid quiz code. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                alert("Something went wrong. Please try again.");
            }
        } else {
            alert('Please enter a quiz code.');
        }
    };

    return (
        <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
            <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
                <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-custom-brownnav">
                    <h1>DASHBOARD</h1>
                </div>
            </header>

            {/* CONTENT CONTAINER */}
            <div className="flex flex-col items-center p-8 min-h-screen">
                <div className=" flex  gap-8 w-full">
                    <div className="bg-gray-200 justify-center items-center  flex gap-5 p-6 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <div className="flex flex-col">
                                <div className="text-xl text-left font-bold ">HELLO, </div>
                                <div className="text-xl text-left font-bold mb-4">CHEL</div>
                            </div>
                            <button className="bg-gray-300 w-full p-2 rounded-md">Gained points: 89</button>
                        </div>

                        <div className="flex ">
                        <img src={profilePic} alt="Profile" className="w-24 justify-center  items-center h-24 rounded-full" />
                        </div>
                    </div>

                    <div className="bg-gray-300 p-6 flex-1 rounded-lg shadow-md flex items-center justify-between">
                        <input
                            type="text"
                            value={quizCode}
                            onChange={(e) => setQuizCode(e.target.value)}
                            placeholder="Enter a join code"
                            className="w-full p-3 border border-gray-400 rounded-md text-lg"
                        />
                        <button
                            onClick={enterQuiz}
                            className="ml-4 p-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-lg"
                        >
                            JOIN
                        </button>
                    </div>
                </div>

                <div className="mt-12 w-full">
                    <h2 className="text-2xl text-left font-bold mb-4">Recent Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[ {
                            title: "Rizal - Student to Lover",
                            type: "Assigned",
                            count: 10,
                            accuracy: "40%",
                            color: "bg-yellow-400",
                        }, {
                            title: "MIDTERM EXAM in APPDET",
                            type: "Assigned",
                            count: 49,
                            accuracy: "84%",
                            color: "bg-green-500",
                        }].map((activity, index) => (
                            <button key={index} className="bg-gray-300 p-6 rounded-lg shadow-md flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className={`w-2 h-2 rounded-full ${activity.color} mr-2`}></div>
                                    <div className="font-semibold text-sm">{activity.type}</div>
                                </div>
                                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                                <p className="text-gray-500 text-sm mb-4">{activity.count} {activity.type === "Flashcards" ? "Flashcards" : "Qs"}</p>
                                {activity.status && (
                                    <div className="mt-auto text-white text-center py-1 rounded-md bg-pink-500 font-bold">
                                        {activity.status}
                                    </div>
                                )}
                                {activity.accuracy && (
                                    <div className={`mt-auto text-white text-center py-1 w-full rounded-md ${activity.color} font-bold`}>
                                        {activity.accuracy} accuracy
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboardPage;
