import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CourseDetailsForm from "../components/CourseDetailsForm"
import TitleCard from "../components/TitleCard"
import useCourseStore from "../store/courseStore"
import TopBar from "../components/TopBar"
import axios from "axios"
import useUserStore from "../store/userStore"

function HomePage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setCourseData , setCourseId} = useCourseStore((state) => state)
  const user = useUserStore((state) => state.user)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Call backend to generate course
      const res = await axios.post("http://127.0.0.1:8000/generate", { ...values })
      if (res.data) {
        setCourseData(res.data.response)
        navigate("/newCourse")
      } else {
        alert("Failed to generate course.")
      }
    } catch (error) {
      console.error(error)
      alert("Error generating course.")
    }
    setLoading(false)
  }

  // Save course logic (same as in NewCoursePage)
  const handleSaveCourse = async () => {
    const courseData = useCourseStore.getState().courseData
    if (!courseData) return;
    setSaving(true)
    setSaveMsg("")
    const reqBody = {
      skill: courseData.skill || courseData.course_name || "",
      currentKnowledge: courseData.currentKnowledge || "",
      hoursPerWeek: courseData.hoursPerWeek || courseData.hours_per_week || 0,
      noOfWeeks: courseData.noOfWeeks || courseData.no_of_weeks || courseData.roadmap?.length || 0,
      learningStyle: courseData.learningStyle || [],
      learningGoal: courseData.learningGoal || "",
      email: user?.email || ""
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/courses/add", reqBody, {
        headers: { "Content-Type": "application/json" }
      })
      if (res.status === 200 || res.status === 201) {
        setSaveMsg("Course saved!")
      } else {
        setSaveMsg("Failed to save course.")
      }
    } catch (e) {
      setSaveMsg("Error saving course.")
    }
    setSaving(false)
  }

  useEffect(() => {
    setCourseData({})
    setCourseId(null);
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar/>
      <main className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-5xl gap-12 justify-center items-center px-4 py-8">
          <div className="flex-1 text-left">
            <TitleCard/>
          </div>
          <div className="flex-1">
            <CourseDetailsForm onFinish={onFinish} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
