import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [
    firstName,
    setFirstName
  ] = useState(
    user.firstName
  );

  const [
    lastName,
    setLastName
  ] = useState(
    user.lastName
  );

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    showPasswordForm,
    setShowPasswordForm
  ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('openPasswordForm') === 'true') {
      setShowPasswordForm(true);
      localStorage.removeItem('openPasswordForm');
    }
  }, []);

  const [
    oldPassword,
    setOldPassword
  ] = useState("");

  const [
    newPassword,
    setNewPassword
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const updateProfile =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.put(
            "/auth/profile",
            {
              firstName,
              lastName
            }
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        toast.success(
          "Profile Updated"
        );

        window.location.reload();

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          error.message ||
          "Update Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  const changePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/change-password", {
        oldPassword,
        newPassword
      });

      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Change password failed";
      if (errorMsg.toLowerCase().includes("invalid") || errorMsg.toLowerCase().includes("incorrect") || errorMsg.toLowerCase().includes("wrong")) {
        toast.error(`${errorMsg}. Forgot your password? Reset it from login page.`);
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <Layout>

      <div className="max-w-4xl mx-auto space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

            My Profile

          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">

            Manage your personal information

          </p>

        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">

          <div className="flex items-center gap-6 mb-8">

            <div
              className="
              w-24
              h-24
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >

              {firstName?.[0]}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                {firstName} {lastName}

              </h2>

              <p className="text-slate-500 dark:text-slate-400">

                {user.email}

              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                First Name

              </label>

              <input
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                className="
                w-full
                h-12
                px-4
                border
                border-slate-300
                dark:border-slate-700
                rounded-xl
                dark:bg-slate-800
                dark:text-white
                "
              />

            </div>

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                Last Name

              </label>

              <input
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                className="
                w-full
                h-12
                px-4
                border
                border-slate-300
                dark:border-slate-700
                rounded-xl
                dark:bg-slate-800
                dark:text-white
                "
              />

            </div>

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                Email

              </label>

              <input
                disabled
                value={user.email}
                className="
                w-full
                h-12
                px-4
                border
                border-slate-300
                dark:border-slate-700
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
                dark:text-slate-300
                "
              />

            </div>

            <div>

              <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                Employee ID

              </label>

              <input
                disabled
                value={user.employeeId}
                className="
                w-full
                h-12
                px-4
                border
                border-slate-300
                dark:border-slate-700
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
                dark:text-slate-300
                "
              />

            </div>

          </div>

          <button
            onClick={updateProfile}
            disabled={loading}
            className="
            mt-8
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            transition
            "
          >

            {
              loading
                ? "Saving..."
                : "Save Changes"
            }

          </button>

        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                Security

              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">

                Change your password

              </p>

            </div>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>

          </div>

          {showPasswordForm && (
            <div className="space-y-5">

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                  Current Password

                </label>

                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="
                  w-full
                  h-12
                  px-4
                  border
                  border-slate-300
                  dark:border-slate-700
                  rounded-xl
                  dark:bg-slate-800
                  dark:text-white
                  "
                />

              </div>

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                  New Password

                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="
                  w-full
                  h-12
                  px-4
                  border
                  border-slate-300
                  dark:border-slate-700
                  rounded-xl
                  dark:bg-slate-800
                  dark:text-white
                  "
                />

              </div>

              <div>

                <label className="block text-sm mb-2 text-slate-600 dark:text-slate-400">

                  Confirm New Password

                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="
                  w-full
                  h-12
                  px-4
                  border
                  border-slate-300
                  dark:border-slate-700
                  rounded-xl
                  dark:bg-slate-800
                  dark:text-white
                  "
                />

              </div>

              <button
                onClick={changePassword}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>

            </div>
          )}

        </div>

      </div>

    </Layout>

  );

}

export default Profile;