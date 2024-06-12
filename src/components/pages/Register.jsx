import React, { useState } from "react";
import Button from "../elements/Button";
import FormInput from "../fragments/FormInput";
import { REGISTER } from "../../link/navigation"
import api from "../../api";

const Register = () => {
  
  // State untuk menyimpan nilai form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");

  // Ambil token CSRF dari meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  // Handler untuk mengirim data form ke API saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      roles
    };

    try {
      // Kirim data ke API menggunakan Axios dengan menyertakan token CSRF
      const response = await api.post("/api/register", data, {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        }
      });
      console.log(response.data); // Tampilkan response dari API
      // Lakukan pengalihan halaman atau tindakan lain jika diperlukan setelah pendaftaran berhasil
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <div className="bg-sky-600 ">
        <img src="/test.png" alt="" className="mb-10 object-fill h-16 w-46" />
        <h1 className="font-bold text-6xl text-white ml-20">MY-MONITORING</h1>
        <p className="text-white ml-20 mb-10 py-5 text-xl">
          Mengelola laporan monitoring dengan mudah dan cepat
        </p>
      </div>
      <div>
        <h1 className="font-bold text-xl txtcolor text-center">
          MARI BERGABUNG
        </h1>
        <p className=" text-center mt-3 font-light text-sm">Daftarkan dirimu</p>
      </div>
      <div className="w-full flex justify-center">

        <form className="shadow-sm border rounded px-8 pt-6 pb-8 w-[400px] mt-3" onSubmit={handleSubmit}>
          <div className="input-box">
            <FormInput
              judul="Name"
              id="name"
              name="name"
              type="text"
              // value={formData.name}
              value={name}
              placeholder="Name"
              // onChange={handleChange}
              onChange={(e) => setName(e.target.value)}
              required
            ></FormInput>
          </div>

          <div className="input-box">
            <FormInput
              judul="Email"
              id="email"
              name="email"
              type="email"
              // value={formData.email}
              value={email}
              placeholder="Email"
              // onChange={handleChange}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></FormInput>
          </div>

          <div className="input-box">
            <FormInput
              judul="Password"
              id="password"
              name="password"
              type="password"
              // value={formData.password}
              value={password}
              placeholder="Password"
              // onChange={handleChange}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></FormInput>
          </div>

          <div className="input-box">
            <div className="block text-base mb-2">
              <label className="txtcolor font-normal" htmlFor="roles">
                Pilih Role
              </label>
            </div>
            <select
              className="max-w-xs border text-base px-2.5 py-2 focus:outline-none focus:ring-0 focus:border-blue-600 rounded-lg bg-gray-50 border-gray-300 text-gray-900 w-full"
              id="roles"
              name="roles"
              // value={formData.roles}
              value={roles}
              placeholder="Pilih Role"
              onChange={(e) => setRoles(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Pilih Role
              </option>
              <option value="DataAnalyst">Data Analyst</option>
              <option value="Operation">Operation</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <Button type="submit" judul="MASUK"></Button>
          <div className="mt-4">
            {REGISTER.map((link) => (
              <a 
                key={link.key}
                href={link.path}
                className="text-blue-500 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
