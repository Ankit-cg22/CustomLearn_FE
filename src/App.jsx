import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage, NewCoursePage , Login, MyCourses } from "./pages"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/newCourse" element={<NewCoursePage />} />
        <Route path="/myCourses" element={<MyCourses />} />
        <Route path="/myCourses/:courseId" element={<MyCourses />} />
      </Routes>
    </Router>
  )
}

export default App
