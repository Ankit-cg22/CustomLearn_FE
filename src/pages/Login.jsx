import TopBar from "../components/TopBar";
import GoogleLoginCard from "../components/GoogleLoginCard";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  useEffect(() => {
    // Redirect to home if already logged in
    if (user) {
      navigate(redirectPath, { replace: true });
    }
    // On mount, clear any expired user
    if (user && user.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (now >= user.exp) {
        clearUser();
      }
    }
  }, [user, clearUser, navigate]);

  const handleLoginSuccess = (credentialResponse) => {
    const decodedData = jwtDecode(credentialResponse.credential);
    setUser({
      name: decodedData.name,
      email: decodedData.email,
      picture: decodedData.picture,
      iat: decodedData.iat,
      exp: decodedData.exp,
      credential: credentialResponse.credential,
    });

    navigate(redirectPath, { replace: true });
  };

  const handleLoginError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBar />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
          <GoogleLoginCard onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </main>
    </div>
  );
}

export default Login;