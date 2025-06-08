import useCourseStore from "../store/courseStore"
import useUserStore from "../store/userStore"
import WeekContent from "../components/WeekContent"
import TopBar from "../components/TopBar"
import { useState } from "react"
import axios from "axios"

function NewCoursePage() {
  const courseData = useCourseStore((state) => state.courseData)
  const user = useUserStore((state) => state.user)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  const handleSaveCourse = async () => {
    if (!courseData) return;
    setSaving(true)
    setSaveMsg("")
    // Prepare request body: just courseData + email field
    const reqBody = {
      ...courseData,
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">{courseData?.course_name}</h1>
          {courseData?.roadmap?.map((week) => (
            <WeekContent key={week.week} weekIdx={week.week-1} />
          ))}
          <div className="flex justify-center mt-8">
            {!user ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={() => window.location.href = "/login"}
              >
                Sign in to save course
              </button>
            ) : (
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                onClick={handleSaveCourse}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Course"}
              </button>
            )}
          </div>
          {saveMsg && <div className="text-center mt-2 text-sm text-gray-700">{saveMsg}</div>}
        </div>
      </main>
    </div>
  )
}

export default NewCoursePage
