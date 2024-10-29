import profilePic from '../../assets/images/profileDark-icon.png';


function StudentQuizResultPage() {
    return (
      <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">

  
        {/*First container*/}
        <div className="p-4 md:py-10 flex justify-center">
          <div className="bg-white p-14 md:p-10 shadow-custom-darkblue rounded-md flex items-center justify-center flex-col">
          <div className=" flex  gap-8 w-full">
                    <div className="bg-gray-200 justify-center items-center  flex gap-5 p-6 rounded-lg shadow-md">
                        <div className="flex ">
                        <img src={profilePic} alt="Profile" className="w-24 justify-center  items-center h-24 rounded-full" />
                        </div>
                    </div>

                    <div className="bg-gray-300 p-6 flex-1 rounded-lg shadow-md flex items-center justify-between">
                    <div className="text-xl text-left font-bold mb-4">RECHEL ANN DE GUZMAN</div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default StudentQuizResultPage;