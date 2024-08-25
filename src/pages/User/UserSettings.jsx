import { useState } from "react";
import Navbar from "../../components/Navbar";
import useChangePassword from "../../hooks/useChangePassword";

const UserSettings = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, ChangePassword } = useChangePassword();

  const handlesubmit = async (e) => {
    e.preventDefault();
    await ChangePassword(password);
  };

  const user = JSON.parse(localStorage.getItem("store-user"));
  console.log(password.password);
  return (
    <>
      <Navbar />
      <div>
        <h1 className="text-2xl  text-gray-800 dark:text-white font-medium p-5">
          User Settings
        </h1>
      </div>
      <div className="flex-col">
        <div className="w-full max-w-lg p-5 m-2 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className=" p-5 flex justify-around px-4 pt-4">
            <img src={user.profilePic} alt="" className="w-24 h-24" />
            <div className=" ">
              <h2 className="text-2xl p-2 text-gray-800 dark:text-white font-semibold uppercase">
                {user.fullName}
              </h2>
              <h2
                className="text-xl p-2 text-gray-800 dark:text-slate-400
            font-semibold "
              >
                {user.username}
              </h2>
            </div>
          </div>
        </div>{" "}
        <div className="w-full max-w-4xl p-5 m-2 mt-10 border  border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg ">
          <div className=" p-5 px-4 pt-4  justify-around sm:flex">
            <div>
              <h1 className="dark:text-white font-semibold text-2xl">
                Change Password
              </h1>
              <p className="text-gray-800 dark:text-slate-400 font-semibold text-lg">
                Update your password associated with your account.
              </p>
            </div>
            <div className="">
              <div className="m-2">
                <h2>Current Password</h2>
                <input
                  type="password"
                  className="w-full input input-bordered  h-10"
                  value={password.currentPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      currentPassword: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="m-2">
                {" "}
                <h2>New Password</h2>
                <input
                  type="password"
                  className="w-full input input-bordered  h-10"
                  value={password.password}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      password: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div className="m-2">
                {" "}
                <h2>Confirm Password</h2>
                <input
                  type="password"
                  className="w-full input input-bordered  h-10"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      confirmPassword: e.target.value,
                    })
                  }
                ></input>
              </div>

              <button
                className="btn m-2  btn-md text-sm bg-blue-700"
                onClick={handlesubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Change"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserSettings;
