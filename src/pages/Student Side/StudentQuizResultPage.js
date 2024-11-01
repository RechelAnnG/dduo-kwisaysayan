import profilePic from '../../assets/images/profileDark-icon.png';


function StudentQuizResultPage() {
    return (
      <div className=" rounded-md bg-custom-brownbg flex-1 min-h-screen ">

  
        {/*First container*/}
        <div className="p-5 flex justify-center">
          <div className=" p-14 md:p-6 shadow-custom-darkblue rounded-md flex items-center justify-center flex-col">
              <div className=" flex  gap-8 w-full">
                    <div className="bg-white border  justify-center items-center  flex gap-5 rounded-lg shadow-md">
                      <div className="flex ">
                        <img src={profilePic} alt="Profile" className="w-24 justify-center  items-center h-24 rounded-full" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r  from-midp to-pink p-4 flex-1 rounded-lg shadow-md flex items-center justify-between">
                      <div className="text-xl text-white text-left font-bold ">RECHEL ANN DE GUZMAN</div>
                    </div>
              </div>

              <div className=" flex  mt-5 gap-5 w-full">
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                  <p className="text-sm font-semibold text-gray-600">Accuracy</p>
                  <p className="text-xl font-bold">0%</p>
                </div>

                
                
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                  <p className="text-sm font-semibold text-gray-600">Points</p>
                  <div className="flex justify-center">
                    <p className="text-2xl items-start font-bold">0</p>
                    <p className="text-xl font-bold">/</p>
                    <p className="text-xl font-bold">35</p>
                  </div>
                  
                </div>
              </div>

              <div className=" flex  mt-5 gap-5 w-full">
                <div className="bg-white flex-1 border p-4 rounded-md text-center">
                  <p className="text-sm font-semibold text-gray-600">Correct</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                
                <div className="bg-white font-semibold flex-1 border p-4 rounded-md text-center">
                  <p className="text-sm text-gray-600">Incorrect</p>
                  <p className="text-xl font-bold">0</p>
                </div>

                <div className="bg-white font-semibold flex-1 border p-4 rounded-md text-center">
                  <p className="text-sm text-gray-600">Unattempted</p>
                  <p className="text-xl font-bold">0</p>
                </div>
              </div>

          {/* Question Review */}
          <div className="bg-white border  text-left w-full  p-4 flex-col gap-2 flex rounded-md mt-6 overflow-y-auto max-h-80">
           <div className="bg-white  flex-1 border text-left p-3 rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-100 text-xs text-red-600 px-2 py-1 rounded-md">&#x2716; Incorrect</span>
                <span className="bg-gray-100 text-xs text-gray-800 px-2 py-1 rounded-md">Fill in the Blank</span>
                <p className="ml-auto text-xs text-gray-500">12 seconds | 0 point</p>
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

            <div className="bg-white flex-1 border text-left p-3 rounded-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-100 text-xs text-red-600 px-2 py-1 rounded-md">&#x2716; Incorrect</span>
                <span className="bg-gray-100 text-xs text-gray-800 px-2 py-1 rounded-md">Fill in the Blank</span>
                <p className=" ml-auto text-xs text-gray-500">12 seconds | 0 point</p>
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
  
  export default StudentQuizResultPage;