import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/context//useAuth";
import { useLogoutMutation } from "/src/store";

export default function LogoutButton() {
  const [logoutApi] = useLogoutMutation();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi(isLoggedIn);
      toast.success("Logout berhasil!");
      logout();
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Logout gagal!");
    }
  };

  return (
    <div
      className="text-blue-600 cursor-pointer hover:text-blue-700 hover:underline underline-offset-2"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}
