function SettingsPage() {
  return (
    <div className="flex-1 bg-custom-brownbg min-h-screen">
      <header className="flex items-center shadow-custom-darkblue h-16 md:h-20 sticky top-0 bg-custom-brownbg z-10">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-custom-brownnav">
          <h1>SETTINGS</h1>
        </div>
      </header>

      {/* First Container */}
      <div className="flex flex-col space-y-4 p-4 md:p-8 md:items-center">
        {/* Container 1 */}
        <div className="bg-white p-4 md:p-6 rounded shadow-md md:w-3/4 lg:w-2/3">
          <div className="flex items-start">
            <h2 className="text-lg md:text-xl font-semibold">Profile</h2>
          </div>
          <div className="text-left pt-5">
            <p className="text-lg md:text-xl pb-10 font-semibold ">Last Name</p>
            <p className="text-lg md:text-xl font-semibold ">First Name</p>
          </div>
        </div>

        {/* Container 2 */}
        <div className="bg-white p-4 md:p-6 rounded shadow-md md:w-3/4 lg:w-2/3">
          <div className="flex items-start">
            <h2 className="text-lg md:text-xl font-semibold">Game Settings</h2>
          </div>
          <div className="text-left pt-5">
            <p className="text-lg md:text-xl pb-10 font-semibold ">Background Music</p>
            <p className="text-lg md:text-xl font-semibold ">Sound Effects</p>
          </div>
        </div>

        {/* Container 3 */}
        <div className="bg-white p-4 md:p-6 rounded shadow-md md:w-3/4 lg:w-2/3">
        <div className="flex items-start">
            <h2 className="text-lg md:text-xl font-semibold">Account Settings</h2>
          </div>
          <div className="text-left pt-5">
            <p className="text-lg md:text-xl pb-10 font-semibold ">Change Password</p>
            <p className="text-lg md:text-xl font-semibold ">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;