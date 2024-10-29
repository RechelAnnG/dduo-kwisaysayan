function ProfilePage() {
  return (
    <div className="flex-1 min-h-screen bg-custom-brownbg pb-4 md:pb-10">
        <header className="flex items-center shadow-custom-darkblue h-16 md:h-20">
        <div className="flex p-2 md:p-4 text-lg md:text-2xl font-bold text-custom-brownnav">
          <h1>PROFILE</h1>
        </div>
      </header>

      {/*First container*/}
      <div className="p-4 md:py-10 flex justify-center">
        <div className="bg-white p-14 md:p-10 shadow-custom-darkblue rounded-md flex items-center justify-center flex-col">
          <p className="text-2xl md:text-3xl font-bold md:mb-5 mb-4">Admin</p>
          <div className="w-48 h-48 bg-gray-300 mb-4  md:mb-5"></div>
          <button className="bg-gradient-to-r  from-midp to-pink text-custom-brownbg md:px-8 md:py-4 px-4 py-2 rounded-md mb-4">Edit Profile</button>
          <p className="text-lg md:text-xl mb-4">Last Name</p>
          <p className="text-lg md:text-xl">First Name</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;