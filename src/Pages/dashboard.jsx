import { useLogin } from "../Hooks/useLogin";

const DashbordPage = () => {
  const username = useLogin();

  return (
    <div>
      <h1>Hello World, Selamat Datang {username}</h1>
    </div>
  );
};

export default DashbordPage;
