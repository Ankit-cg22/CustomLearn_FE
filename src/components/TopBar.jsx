import { useNavigate } from "react-router-dom"
import useUserStore from "../store/userStore"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { googleLogout } from "@react-oauth/google"

const TopBar = () => {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
    console.log("user ",  user)
  const handleLogOut = () => {
    googleLogout();
    clearUser();
    navigate("/login")
  }
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
          <>
            <img
              src={user.picture}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <button onClick={handleLogOut} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default TopBar
