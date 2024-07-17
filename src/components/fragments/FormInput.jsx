import React from "react";
import Input from "../elements/Input";
import Label from "../elements/Label";

const FormInput = (props) => {
  const {
    judul,
    type,
    placeholder,
    value,
    onChange,
    required,
    options,
    id,
    name,
  } = props;
  // Jika tipe input adalah dropdown, kita akan menampilkan opsi dropdown
  if (type === "dropdown") {
    return (
      <div className="">
        <Label judul={judul}></Label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={value} // Nilai yang dipilih pada dropdown
          onChange={onChange} // Handler ketika nilai dropdown berubah
          required={required}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {/* Loop melalui setiap opsi dan buat elemen option */}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Jika tipe input bukan dropdown, kita akan menampilkan input biasa
  return (
    <div className="">
      <Label judul={judul}></Label>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default FormInput;
