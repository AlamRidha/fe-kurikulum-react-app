import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { label, type, placeholder, name, onChange, value, errors } = props;
  return (
    <div className="mb-6">
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
      {errors && <p className="text-sm text-red-500 mt-1">{errors}</p>}
    </div>
  );
});

export default InputForm;
