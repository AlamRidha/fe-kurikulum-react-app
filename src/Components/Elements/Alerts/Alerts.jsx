import { IoMdInformationCircle } from "react-icons/io";

const Alert = (props) => {
  const { msg, statusMsg } = props;
  return (
    <div
      className="flex items-center justify-center p-4 my-4 text-sm text-red-800 rounded-lg bg-gray-100"
      role="alert"
    >
      <IoMdInformationCircle className="flex-shrink-0 inline w-5 h-5 me-2" />

      <span className="sr-only">Info</span>

      <div>
        <span className="font-medium">{statusMsg}</span> {""}
        {msg}
      </div>
    </div>
  );
};

export default Alert;
