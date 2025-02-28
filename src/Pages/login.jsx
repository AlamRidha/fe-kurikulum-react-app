import FormLogin from "../Components/Fragments/FormLogin";
import AuthLayout from "../Components/Layouts/AuthLayout";
import useTitleBrowser from "../Hooks/useTitle";

const LoginPage = () => {
  useTitleBrowser("Login");
  return (
    <div>
      <AuthLayout title="LOGIN">
        <FormLogin />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
