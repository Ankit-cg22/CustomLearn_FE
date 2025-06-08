import { useNavigate } from "react-router-dom"
import useUserStore from "../store/userStore"
import { ArrowRightOnRectangleIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { googleLogout } from "@react-oauth/google"
import { useRef, useState , useEffect } from "react"

const TopBar = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogOut = () => {
    googleLogout();
    clearUser();
    navigate("/login")
  }

  // Close dropdown on outside click
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }
  // Attach/detach event listener
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <header className="bg-white shadow flex items-center px-8 h-16 justify-between">
      <div className="font-bold text-2xl text-blue-600 tracking-wide cursor-pointer" onClick={() => navigate("/")}>CustomLearn</div>
      <div className="ml-auto flex items-center gap-4">
        {!user ? (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <img
                src={user.picture}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => { setDropdownOpen(false); navigate("/courses"); }}
                >
                  <UserCircleIcon className="w-5 h-5 text-blue-600" />
                  My Courses
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                  onClick={handleLogOut}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default TopBar
