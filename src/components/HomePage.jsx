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
      "roadmap": [
        {
          "week": 1,
          "items": [
            {
              "title": "What is Data Science?",
              "type": "article",
              "link": "https://datasciencehandbook.me/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Python Basics",
              "type": "article",
              "link": "https://realpython.com/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Python Basics Exercises",
              "type": "project",
              "link": "https://leetcode.com/",
              "expected_duration": "1 hour"
            }
          ]
        },
        {
          "week": 2,
          "items": [
            {
              "title": "Data Preprocessing",
              "type": "article",
              "link": "https://towardsdatascience.com/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Data Visualization",
              "type": "article",
              "link": "https://flowingdata.com/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Data Visualization Project",
              "type": "project",
              "link": "https://www.kaggle.com/",
              "expected_duration": "3 hours"
            }
          ]
        },
        {
          "week": 3,
          "items": [
            {
              "title": "Introduction to Machine Learning",
              "type": "article",
              "link": "https://machinelearningmastery.com/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Supervised Learning",
              "type": "article",
              "link": "https://www.coursera.org/",
              "expected_duration": "2 hours"
            },
            {
              "title": "Supervised Learning Exercises",
              "type": "project",
              "link": "https://www.kaggle.com/",
              "expected_duration": "3 hours"
            }
          ]
        },
        {
          "week": 4,
          "items": [
            {
              "title": "Data Science Project Development",
              "type": "project",
              "link": "https://www.kaggle.com/",
              "expected_duration": "8 hours"
            },
            {
              "title": "Data Science Review",
              "type": "article",
              "link": "https://datasciencehandbook.me/",
              "expected_duration": "1 hour"
            }
          ]
        }
      ]
    }
  }

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // Simulate backend call and redirect
      setTimeout(() => {
        setCourseData(demo_response.response.roadmap)
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
