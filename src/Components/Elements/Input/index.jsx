import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { label, type, placeholder, name, onChange, value, errors } = props;
  return (
    <div className="w-full mb-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        ref={ref}
        value={value}
        onChange={onChange}
        hasError={!!errors}
      />
      {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
    </div>
  );
});

export default InputForm;
