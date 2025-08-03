
import { Link, Route, Routes } from "react-router-dom";
import PositionPage from './pages/PositionPage.jsx'
import TeacherPage from './pages/TeacherPage.jsx';
import { BookA, BookTemplate, CircuitBoard, PinIcon, TableIcon } from "lucide-react";

function App() {

  return (

    <div className="w-full h-screen flex flex-row justify-between items-start ">
      <div className="w-1/6 h-full flex flex-col justify-start items-center">
        <Link to="/" className="px-20 py-2 bg-white rounded-md border-2 border-gray-300 hover:text-purple-400 hover:bg-purple-100 transition-all duration-300 mb-4 mt-10 flex flex-row items-center">
          <BookA/>
          Giáo viên
        </Link>
        <Link to="/position" className="px-16 py-2 bg-white rounded-md border-2 border-gray-300 hover:text-purple-400 hover:bg-purple-100 transition-all duration-300 flex flex-row items-center">
          <PinIcon/>
          Vị trí công tác
        </Link>
      </div>
      <div className="w-5/6 h-screen flex justify-start">
        <Routes>
          <Route path="/" element={<TeacherPage />} />
          <Route path="/position" element={<PositionPage />} />
        </Routes>
      </div>
    </div>

  )
}

export default App
