import Button from "../elements/Button";
import FormInput from "../fragments/FormInput";
import { Link } from "react-router-dom";


const Login = () => {

  return (
    <div>
      <div className="bg-sky-600 ">
        <img src="/test.png" alt="" className="mb-7 object-fill h-16 w-46" />
        <h1 className="font-bold text-5xl text-white ml-20">MY-MONITORING</h1>
        <p className="text-white ml-20 mb-10 py-5 text-xl">
          Mengelola laporan monitoring dengan mudah dan cepat
        </p>
      </div>
      <div>
        <h1 className="font-bold text-xl txtcolor text-center">
          SELAMAT DATANG
        </h1>
        <p className=" text-center mt-3 font-light text-sm">Masuk untuk melanjutkan</p>
      </div>
      <div className="w-full flex justify-center">
        <form className="shadow-sm border rounded px-8 pt-6 pb-8 w-[400px] mt-3">
          <div className="">
            <FormInput
              judul="Email"
              type="email"
              value=""
              placeholder="Email"
              required
            ></FormInput>
          </div>

          <div className="input-box">
            <FormInput
              judul="Password"
              type="password"
              value=""
              placeholder="Password"
              required
            ></FormInput>
          </div>
          <Button type="submit" judul="MASUK"></Button>

          <div className="w-full flex justify-center mt-4">
            <p className="text-center text-sm">
              Belum punya akun? <Link to="/Register" className="text-blue-500">Daftar disini</Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;
