import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name, onChange, value, hasError } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      ref={ref}
      className={`text-sm border ${
        hasError ? "border-red-500" : "border-gray-300"
      } rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-80 focus:outline-none focus:ring-2 ${
        hasError ? "focus:ring-red-500" : "focus:ring-blue-500"
      }`}
    />
  );
});

export default Input;

// className="w-full px-3 py-2 text-sm border border-gray-300 rounded text-slate-700 placeholder:opacity-80"
