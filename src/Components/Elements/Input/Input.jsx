import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, placeholder, name } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      ref={ref}
      className="text-sm border border-gray-300 rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-80"
    />
  );
});

export default Input;
