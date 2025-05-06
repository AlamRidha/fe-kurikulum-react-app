const TextAreaForm = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
        rows={4}
      />
      {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
    </div>
  );
};

export default TextAreaForm;
