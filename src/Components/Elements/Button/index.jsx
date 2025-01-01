// component button
export default function Button(props) {
  const {
    children,
    classname = "bg-black",
    type = "button",
    onClick = () => {},
  } = props;

  return (
    <button
      className={`${classname} h-10 px-6 font-semibold rounded-lg text-white items-center`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
