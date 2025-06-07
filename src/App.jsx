import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import NewCoursePage from "./components/NewCoursePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newCourse" element={<NewCoursePage />} />
      </Routes>
    </Router>
  )
}

export default App
