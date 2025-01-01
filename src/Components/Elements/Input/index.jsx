import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { label, type, placeholder, name } = props;
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} name={name} ref={ref} />
    </div>
  );
});

export default InputForm;
