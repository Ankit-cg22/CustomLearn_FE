import useCourseStore from "../store/courseStore"
import WeekContent from "../components/WeekContent"
import TopBar from "../components/TopBar"

function NewCoursePage() {
  const courseData = useCourseStore((state) => state.courseData)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">{courseData?.course_name}</h1>
          {courseData?.roadmap?.map((week) => (
            <WeekContent key={week.week} week={week.week} items={week.items} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default NewCoursePage
