import viewarrowbutton from "../../assets/images/viewArrowDark-icon.png";

function ClassPage() {
    return (
      <div className="flex-1 h-screen bg-custom-brownbg pb-4 md:pb-10">
       <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
          <div className="flex p-2 md:p-4 text-lg md:text-3xl font-bold text-darkp">
            <h1>CLASS</h1>
          </div>
        </header>
  
        {/* First Container */}
        <div className="flex justify-between items-center px-2 md:px-5 pt-5">
          <div className="text-lg md:text-2xl text-darkp font-semibold">Class List</div>
          <button className=" bg-gradient-to-r  from-midp to-pink px-2 py-1 md:px-5 md:py-3 font-bold rounded-md text-base md:text-xl text-custom-brownbg">
            Create Class
          </button>
        </div>
  
        {/* Table/Grid Container */}
        <div className="p-2 md:p-5">
          <div className="overflow-x-auto md:hidden shadow-custom-darkblue">
            <table className="w-full bg-custom-brownbg rounded-md shadow-custom-darkblue">
              <thead className="bg-gradient-to-r from-darkp to-midp text-custom-brownbg rounded-md shadow-custom-darkblue">
                <tr>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Class</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Section</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Students</th>
                  <th className="py-2 px-6 text-sm md:text-base font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Data */}
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">1</td>
                  <td className="py-2 px-6 text-sm md:text-base">johndoe</td>
                  <td className="py-2 px-6 text-sm md:text-base">johndoe@example.com</td>
                  <td className="py-2 px-6 text-sm md:text-base">
                    <button className="px-2 py-1 md:px-4 md:py-2">
                      <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                    </button>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">2</td>
                  <td className="py-2 px-6 text-sm md:text-base">janedoe</td>
                  <td className="py-2 px-6 text-sm md:text-base">janedoe@example.com</td>
                  <td className="py-2 px-6 text-sm md:text-base">
                    <button className="px-2 py-1 md:px-4 md:py-2">
                      <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-6 text-sm md:text-base">3</td>
                  <td className="py-2 px-6 text-sm md:text-base">alice</td>
                  <td className="py-2 px-6 text-sm md:text-base">alice@example.com</td>
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
          <div className="hidden md:grid grid-cols-4 gap-4 bg-white rounded-md shadow-md">
            {/* Header */}
            <div className="col-span-4 grid grid-cols-4 gap-4 bg-gradient-to-r from-darkp to-midp text-custom-brownbg py-4 px-10 font-bold text-base md:text-lg rounded-t-md">
              <div className="text-left">Class</div>
              <div className="text-left">Section</div>
              <div className="text-left">Students</div>
              <div className="text-left ml-auto">Action</div>
            </div>
  
            {/* Sample Data */}
            <div className="col-span-4 grid grid-cols-4 gap-4 border-b py-4 px-10 hover:bg-gray-100">
              <div className="text-left text-sm md:text-base">1</div>
              <div className="text-left text-sm md:text-base">johndoe</div>
              <div className="text-left text-sm md:text-base">johndoe@example.com</div>
              <div className="text-left ml-auto text-sm md:text-base">
                <button className="px-2 py-1 md:px-4 md:py-2">
                  <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                </button>
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-4 gap-4 border-b py-4 px-10 hover:bg-gray-100">
              <div className="text-left text-sm md:text-base">2</div>
              <div className="text-left text-sm md:text-base">janedoe</div>
              <div className="text-left text-sm md:text-base">janedoe@example.com</div>
              <div className="text-left ml-auto text-sm md:text-base">
                <button className="px-2 py-1 md:px-4 md:py-2">
                  <img src={viewarrowbutton} alt="View" className="w-4 md:w-6" />
                </button>
              </div>
            </div>
            <div className="col-span-4 grid grid-cols-4 gap-4 py-4 px-10 hover:bg-gray-100">
              <div className="text-left text-sm md:text-base">3</div>
              <div className="text-left text-sm md:text-base">alice</div>
              <div className="text-left text-sm md:text-base">alice@example.com</div>
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
  
  export default ClassPage;
