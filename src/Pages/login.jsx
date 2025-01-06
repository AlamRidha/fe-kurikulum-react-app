import FormLogin from "../Components/Fragments/FormLogin";
import AuthLayout from "../Components/Layouts/AuthLayout";

const LoginPage = () => {
  return (
    <div>
      <AuthLayout title="LOGIN">
        <FormLogin />
      </AuthLayout>
    </div>
  );
};

export default LoginPage;
