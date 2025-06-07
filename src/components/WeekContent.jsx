import { useState } from "react"
import ActionItem from "./ActionItem"

const WeekContent = ({ week, items }) => {
  const [checked, setChecked] = useState(Array(items.length).fill(false))

  const handleCheck = (idx) => {
    const updated = [...checked]
    updated[idx] = !updated[idx]
    setChecked(updated)
  }

  const completed = checked.filter(Boolean).length
  const progress = Math.round((completed / items.length) * 100)

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
            checked={checked[idx]}
            onCheck={() => handleCheck(idx)}
          />
        ))}
      </div>
    </div>
  )
}

export default WeekContent
