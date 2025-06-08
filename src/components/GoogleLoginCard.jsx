import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginCard = ({ onSuccess, onError }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md">
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Sign in with Google</h2>
    <GoogleLogin onSuccess={onSuccess} onError={onError} width="100%" />
  </div>
);

export default GoogleLoginCard;
