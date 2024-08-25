import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const ChangePassword = async ({
    currentPassword,
    password,
    confirmPassword,
  }) => {
    const success = handleInputErrors({
      currentPassword,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/user/ChangePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.message) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, ChangePassword };
};
export default useChangePassword;

function handleInputErrors({ currentPassword, password, confirmPassword }) {
  if (!currentPassword || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password === currentPassword) {
    toast.error("Current Password and new Password are same");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
