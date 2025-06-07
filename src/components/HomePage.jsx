import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CourseDetailsForm from "./CourseDetailsForm"
import TitleCard from "./TitleCard"
import useCourseStore from "../store/courseStore"

function HomePage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const setCourseData = useCourseStore((state) => state.setCourseData)

  const demo_response = {
    "response": {
        "course_name": "Project Management Essentials",
        "roadmap": [
            {
                "week": 1,
                "items": [
                    {
                        "title": "Introduction to Project Management",
                        "type": "video",
                        "link": "https://www.youtube.com/watch?v=4eM73Mml9Q0",
                        "expected_duration": "2 hours"
                    },
                    {
                        "title": "Project Management Basics",
                        "type": "article",
                        "link": "https://www.projectmanagement.com/articles/335411/What-is-Project-Management",
                        "expected_duration": "1 hour"
                    },
                    {
                        "title": "Project Management Framework",
                        "type": "article",
                        "link": "https://www.wikihow.com/Understand-the-Project-Management-Framework",
                        "expected_duration": "2 hours"
                    }
                ],
                "milestone": "Understand the basics of project management and its framework"
            },
            {
                "week": 2,
                "items": [
                    {
                        "title": "Project Initiation and Planning",
                        "type": "video",
                        "link": "https://www.youtube.com/watch?v=KuTtXz6TjQo",
                        "expected_duration": "2 hours"
                    },
                    {
                        "title": "Project Scope Management",
                        "type": "article",
                        "link": "https://www.projectmanagement.com/articles/335411/Project-Scope-Management",
                        "expected_duration": "1 hour"
                    },
                    {
                        "title": "Project Schedule Management",
                        "type": "article",
                        "link": "https://www.wikihow.com/Create-a-Project-Schedule",
                        "expected_duration": "2 hours"
                    }
                ],
                "milestone": "Understand project initiation, planning, scope, and schedule management"
            },
            {
                "week": 3,
                "items": [
                    {
                        "title": "Project Cost Management",
                        "type": "video",
                        "link": "https://www.youtube.com/watch?v=4eM73Mml9Q0",
                        "expected_duration": "2 hours"
                    },
                    {
                        "title": "Project Quality Management",
                        "type": "article",
                        "link": "https://www.projectmanagement.com/articles/335411/Project-Quality-Management",
                        "expected_duration": "1 hour"
                    },
                    {
                        "title": "Project Resource Management",
                        "type": "article",
                        "link": "https://www.wikihow.com/Manage-Project-Resources",
                        "expected_duration": "2 hours"
                    }
                ],
                "milestone": "Understand project cost, quality, and resource management"
            },
            {
                "week": 4,
                "items": [
                    {
                        "title": "Project Risk Management",
                        "type": "video",
                        "link": "https://www.youtube.com/watch?v=KuTtXz6TjQo",
                        "expected_duration": "2 hours"
                    },
                    {
                        "title": "Project Communication Management",
                        "type": "article",
                        "link": "https://www.projectmanagement.com/articles/335411/Project-Communication-Management",
                        "expected_duration": "1 hour"
                    },
                    {
                        "title": "Project Stakeholder Management",
                        "type": "article",
                        "link": "https://www.wikihow.com/Identify-and-Analyze-Stakeholders",
                        "expected_duration": "2 hours"
                    }
                ],
                "milestone": "Understand project risk, communication, and stakeholder management"
            },
            {
                "week": 5,
                "items": [
                    {
                        "title": "Project Monitoring and Control",
                        "type": "video",
                        "link": "https://www.youtube.com/watch?v=4eM73Mml9Q0",
                        "expected_duration": "2 hours"
                    },
                    {
                        "title": "Project Closure",
                        "type": "article",
                        "link": "https://www.projectmanagement.com/articles/335411/Project-Closure",
                        "expected_duration": "1 hour"
                    },
                    {
                        "title": "Final Project Management Review",
                        "type": "article",
                        "link": "https://www.wikihow.com/Review-and-Evaluate-a-Project",
                        "expected_duration": "2 hours"
                    }
                ],
                "milestone": "Understand project monitoring, control, and closure"
            }
        ]
    }
}

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Simulate backend call and redirect
      setTimeout(() => {
        setCourseData(demo_response.response)
        navigate("/newCourse")
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow flex items-center px-8 h-16">
        <div className="font-bold text-2xl text-blue-600 tracking-wide">CustomLearn</div>
      </header>
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
