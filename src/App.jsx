import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HomePage, NewCoursePage , Login } from "./pages"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newCourse" element={<NewCoursePage />} />
      </Routes>
    </Router>
  )
}

export default App
