import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const InputCustom = ({
  labelContent,
  id,
  placeholder,
  name,
  onChange,
  value,
  classWrapper = "",
  onBlur,
  errors,
  touched,
  typeInput = "text",
}) => {
  return (
    <div className={classWrapper}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {labelContent}
      </label>
      <input
        type={typeInput}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        // value={value.hoTen}
        // onChange={handleChange}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      {errors && touched ? (
        <p className="text-red-500">
          <FontAwesomeIcon icon="fa-regular fa-circle-xmark" /> {errors}
        </p>
      ) : null}
    </div>
  );
};

export default InputCustom;
