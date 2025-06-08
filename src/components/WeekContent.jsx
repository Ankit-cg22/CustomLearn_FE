import ActionItem from "./ActionItem"
import useCourseStore from "../store/courseStore"
import { useEffect , useMemo, useState } from "react"
const WeekContent = ({ weekIdx }) => {
  const {courseData , setCourseData} = useCourseStore((state) => state)
  const [checked , setChecked] = useState([])
  const [week , setWeek] = useState(0)
  const [items , setItems] = useState([])
  useEffect(() => {
    const weekObj = courseData?.roadmap?.[weekIdx]
    const items = weekObj?.items || []
    const checked = items.map(item => !!item.checked)
    setChecked(checked)
    setItems(items)
    setWeek(weekObj?.week || 0)
  }, [courseData])
  const handleCheck = (idx) => {
    const updatedCourseData = {
      ...courseData,
      roadmap: courseData.roadmap.map((week, wIdx) => {
        if (wIdx !== weekIdx) return week;
        return {
          ...week,
          items: week.items.map((item, i) =>
            i === idx ? { ...item, checked: !item.checked } : item
          ),
        };
      }),
    };
    setCourseData(updatedCourseData);
  }
  console.log("courseData",items)
  const completed = useMemo(() => checked.filter(Boolean).length , [checked])
  const progress = useMemo(() => items.length ? Math.round((completed / items.length) * 100) : 0 , [completed, items.length]);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Week {week}</h2>
        <div className="flex-1 ml-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1 text-right">{completed} / {items.length} completed</div>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <ActionItem
            key={idx}
            item={item}
            checked={item.checked || false}
            onCheck={() => handleCheck(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export default WeekContent
