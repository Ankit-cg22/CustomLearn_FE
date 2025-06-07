import { CheckCircleIcon, VideoCameraIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const typeIcon = {
  article: <DocumentTextIcon className="w-6 h-6 text-blue-500" />,
  video: <VideoCameraIcon className="w-6 h-6 text-red-500" />,
  project: <CodeBracketIcon className="w-6 h-6 text-green-500" />,
  case_studies: <CheckCircleIcon className="w-6 h-6 text-purple-500" />,
}

const ActionItem = ({ item, checked, onCheck }) => {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${checked ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-200'}`}>
      <div>{typeIcon[item.type] || <DocumentTextIcon className="w-6 h-6 text-gray-400" />}</div>
      <div className="flex-1">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-lg text-blue-700 hover:underline">
          {item.title}
        </a>
        <div className="text-sm text-gray-500">{item.expected_duration}</div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className="w-5 h-5 accent-blue-600"
      />
    </div>
  )
}

export default ActionItem
