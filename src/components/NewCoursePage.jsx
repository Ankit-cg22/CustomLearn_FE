import useCourseStore from "../store/courseStore"
import WeekContent from "./WeekContent"

function NewCoursePage() {
  const courseData = useCourseStore((state) => state.courseData)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow flex items-center px-8 h-16">
        <div className="font-bold text-2xl text-blue-600 tracking-wide">CustomLearn</div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-start px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Your Personalized Course</h1>
        <div className="w-full max-w-3xl">
          {courseData && courseData.map((week) => (
            <WeekContent key={week.week} week={week.week} items={week.items} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default NewCoursePage
