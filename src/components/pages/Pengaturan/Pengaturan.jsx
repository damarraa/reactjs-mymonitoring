import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { getUserProfile, updateUserProfile } from "../../../api";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
import { AiOutlineCheckCircle } from "react-icons/ai";
import bcryptjs from "bcryptjs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Pengaturan = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [notification, setNotification] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/dataUser/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile.", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/api/dataUser/profile", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotification("Profil berhasil diubah!");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <div className="pl-4 mt-4">
        <div className="font-bold text-neutral-700 text-xl">
          Pengaturan Akun
        </div>
        <p className="mt-2 text-base">Tinjau dan perbarui detail akun Anda</p>
        <p className="font-light mt-2 text-sm">
          Lakukan pembaruan data terbaru
        </p>
      </div>
      {notification && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-md p-8 max-w-md w-full flex flex-col items-center">
          <AiOutlineCheckCircle fontSize={80} className="text-green-500 animate-check" />
            {notification}
          </div>
        </div>
      )}
      <div className="shadow-xl bg-sky-700 font-light flex p-7 mx-4 mt-5 text-white">
        <IoNotificationsOutline fontSize={40} className="ml-1" />
        <div className="ml-5">
          <p className="font-bold text-xl">Data Analis</p>
          <p className="text-sm mt-2">
            Harap pastikan data yang diperbarui telah sesuai
          </p>
        </div>
      </div>
      <div className="bg-white justify-center  mx-4 p-7 text-sm border shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex grid grid-cols-2 mx-6 ">
            <div className="mr-4">
              <label
                className="block mb-2 text-neutral-600 font-bold"
                htmlFor="name"
              >
                Nama
              </label>
              <input
                className="w-full border rounded py-3 px-3"
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="ml-4">
              <label
                className="block mb-2 text-neutral-600 font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full border rounded py-3 px-3"
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex grid grid-cols-2 mt-3 mx-6">
            <div className="mr-4">
              <label
                className="block mb-2 text-neutral-600 font-bold"
                htmlFor="current_password"
              >
                Password saat ini
              </label>
              <div className="relative">
                <input
                  className="w-full border rounded py-3 px-3"
                  type={showPassword.current ? "text" : "password"}
                  id="current_password"
                  name="current_password"
                  value={user.current_password}
                  onChange={handleChange}
                  placeholder="Password Saat Ini"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => toggleShowPassword("current")}
                >
                  {showPassword.current ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <label
                className="block mb-2 text-neutral-600 font-bold"
                htmlFor="password"
              >
                Password Baru
              </label>
              <div className="relative">
                <input
                  className="w-full border rounded py-3 px-3"
                  type={showPassword.new ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  value={user.new_password}
                  onChange={handleChange}
                  placeholder="Password Baru"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => toggleShowPassword("new")}
                >
                  {showPassword.new ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex grid grid-cols-2 mt-3 mx-6">
            <div className="mr-4">
              <label
                htmlFor="new_password_confirmation"
                className="block mb-2 text-neutral-600 font-bold"
              >
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <input
                  className="w-full border rounded py-3 px-3"
                  type={showPassword.confirm ? "text" : "password"}
                  id="new_password_confirmation"
                  name="new_password_confirmation"
                  value={user.new_password_confirmation}
                  onChange={handleChange}
                  placeholder="Konfirmasi Password Baru"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => toggleShowPassword("confirm")}
                >
                  {showPassword.confirm ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-6 mt-4 relative flex justify-end ">
            <button
              className="bg-slate-900 hover:bg-slate-950 text-white text-sm py-2 px-6 rounded"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pengaturan;
