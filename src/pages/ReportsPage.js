import viewarrowbutton from "../assets/images/viewArrowDark-icon.png"
import {CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

function ReportsPage() {
    return (
      <div className="flex-1 h-screen bg-custom-brownbg pb-4 md:pb-10">
        <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
          <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-darkp">
            <h1>REPORTS</h1>
          </div>
        </header>
  
        {/* First container */}
        <div className="p-4 md:p-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-4">
            <div className="text-lg text-left md:text-lg font-semibold  text-darkp md:mb-0">Filtered by:</div>
            <select className="p-2 border-2 border-pink rounded md:px-5 md:w-auto">
              <option value="">Filter 1</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <select className="p-2 border-2 border-pink rounded md:px-5 md:w-auto">
              <option value="">Filter 2</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <select className="p-2 border-2 border-pink rounded md:px-5 md:w-auto">
              <option value="">Filter 3</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </div>

        {/* Table/Grid Container */}
        <div className="p-4 md:p-5">
          <div className="overflow-x-auto md:hidden">
            <table className="w-full bg-white rounded-md shadow-md">
              <thead className="bg-gradient-to-r from-darkp to-midp text-custom-brownbg rounded-md ">
                <tr>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Quiz Name</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Grade Level</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Total Participants</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Accuracy</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">Kabihasnang Asya</td>
                  <td className="py-2 px-6 text-sm md:text-base">Grade 8</td>
                  <td className="py-2 px-6 text-sm md:text-base">38</td>
                  <td className="py-2 px-6 text-sm md:text-base">87%</td>
                  <td className="py-2 px-6 text-sm md:text-base">
                    <button className="px-2 py-1 md:px-4 md:py-2">
                      <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">Kabihasnang Asya</td>
                  <td className="py-2 px-6 text-sm md:text-base">Grade 10</td>
                  <td className="py-2 px-6 text-sm md:text-base">20</td>
                  <td className="py-2 px-6 text-sm md:text-base">87%</td>
                  <td className="py-2 px-6 text-sm md:text-base">
                    <button className="px-2 py-1 md:px-4 md:py-2">
                      <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">Kabihasnang Asya</td>
                  <td className="py-2 px-6 text-sm md:text-base">Grade 9</td>
                  <td className="py-2 px-6 text-sm md:text-base">34</td>
                  <td className="py-2 px-6 text-sm md:text-base">87%</td>
                  <td className="py-2 px-6 text-sm md:text-base">
                    <button className="px-2 py-1 md:px-4 md:py-2">
                      <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* Grid View for Laptops */}
          <div className="hidden md:grid grid-cols-4 bg-white rounded-md shadow-md">
            {/* Header */}
            <div className="col-span-4 grid grid-cols-5 gap-4 bg-gradient-to-r from-darkp to-midp text-custom-brownbg py-4 px-10 font-bold text-base md:text-lg rounded-t-md">
              <div className="text-left">Quiz Name</div>
              <div className="text-left">Grade Level</div>
              <div className="text-left">Total Participants</div>
              <div className="text-left  ml-auto">Accuracy</div>
              <div className="text-left ml-auto">Action</div>
            </div>
  
            {/* Sample Data */}
            <div className="col-span-4 grid grid-cols-5  border-b py-4 px-10 hover:bg-gray-100">
          <div className="text-left text-sm md:text-base">Kabihasnang Asya</div>
          <div className="text-left text-sm md:pl-5 md:text-base">Grade 8</div>
          <div className="text-left text-sm md:text-center md:text-base">38</div>
          <div className="text-left ml-auto text-sm px-4 md:text-base">
            <div className="w-12 h-12">
              <CircularProgressbar
                value={87}
                text={`${87}%`}
                styles={{
                  textSize: '1.5rem',
                  pathColor: '#10B981',
                  textColor: '#333',
                  trailColor: '#D1D5DB',
                }}
              />
            </div>
          </div>
          <div className="text-left ml-auto text-sm md:text-base">
            <button className="px-2 py-1 md:px-4 md:py-2">
              <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
            </button>
          </div>
        </div>
            <div className="col-span-4 grid grid-cols-5 border-b py-4 px-10 hover:bg-gray-100">
              <div className="text-left text-sm md:text-base">Kabihasnang Asya</div>
              <div className="text-left text-sm md:pl-5 md:text-base">Grade 10</div>
              <div className="text-left text-sm md:text-center md:text-base">20</div>
              <div className="text-left ml-auto text-sm px-4 md:text-base">
            <div className="w-12 h-12">
              <CircularProgressbar
                value={87}
                text={`${87}%`}
                styles={{
                  textSize: '1.5rem',
                  pathColor: '#10B981',
                  textColor: '#333',
                  trailColor: '#D1D5DB',
                }}
              />
            </div>
          </div>
              <div className="text-left ml-auto text-sm md:text-base">
                <button className="px-2 py-1 md:px-4 md:py-2">
                  <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                </button>
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-5  py-4 px-10 hover:bg-gray-100">
              <div className="text-left text-sm md:text-base">Kabihasnang Asya</div>
              <div className="text-left text-sm md:pl-5 md:text-base">Grade 9</div>
              <div className="text-left text-sm md:text-center md:text-base">34</div>
              <div className="text-left ml-auto text-sm px-4 md:text-base">
            <div className="w-12 h-12">
              <CircularProgressbar
                value={30}
                text={`${30}%`}
                styles={{
                  textSize: '1.5rem',
                  pathColor: '#10B981',
                  textColor: '#333',
                  trailColor: '#D1D5DB',
                }}
              />
            </div>
          </div>
              <div className="text-left ml-auto text-sm md:text-base">
                <button className="px-2 py-1 md:px-4 md:py-2">
                  <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
  
  export default ReportsPage;