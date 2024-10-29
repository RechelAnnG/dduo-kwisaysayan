import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import Homepage from "./Homepage";
import HomepageStudent from "./HomepageStudent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teacher/*" element={<Homepage />} />
          <Route path="/student/*" element={<HomepageStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
