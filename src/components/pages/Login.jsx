import { useState } from "react";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Simplified error state
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Submitting with email: ${formData.email} and password: ${formData.password}`
    );

    try {
      const response = await api.post(
        "/api/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response);
      console.log("Login successful");
      if (response.data) {
        console.log("Response data:", response.data);
        const { access_token, user } = response.data;

        // Save token to localStorage
        localStorage.setItem("token", access_token);

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Show success alert
        setShowAlert(true);

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          if (user.roles === "DataAnalyst") {
            navigate("/Dashboard");
          } else if (
            user.roles === "Operation" ||
            user.roles === "Maintenance"
          ) {
            // Redirect to mobile || e.g., deep link for mobile
            window.location.href = "url-kotlin-app";
          }
        }, 2000); // 2-second delay
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error response:", error.response.data);
        setError("Username or password is incorrect.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("Login failed. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className="bg-sky-900 flex w-full mb-5">
        <div>
          <h1 className="font-bold text-4xl text-white ml-20 mb-4 mt-16">
            MY-REPORTING
          </h1>
          <p className="text-white ml-20 text-md">
            Mengelola laporan monitoring dengan mudah dan cepat
          </p>
        </div>
        <div className="ml-auto mt-4 mr-8">
          <img src="electric.png" className="w-72" />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <form
          className="shadow-md border rounded px-8 pt-6 pb-8 w-[400px]"
          onSubmit={handleSubmit}
        >
          <div>
            <h1 className="font-bold text-md text-sky-950 text-center">
              SELAMAT DATANG
            </h1>
            <p className="text-center mt-1 font-light text-sm mb-2">
              Masuk untuk melanjutkan
            </p>
          </div>
          <div className="">
            <span>Email</span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded py-3 px-3"
              required
            />
          </div>

          <div className="mt-2 relative">
            <span>Password</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border rounded py-3 px-3"
              required
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" judul="MASUK"></Button>
        </form>
      </div>

      {showAlert && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
          Login berhasil!
        </div>
      )}
    </div>
  );
};

export default Login;
