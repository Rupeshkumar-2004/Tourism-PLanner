import RegisterForm from "../Components/RegisterForm";
import RegisterBanner from "../Components/RegisterBanner";
import AuthLayout from "../layout/AuthLayout";

const RegisterPage = () => {

  return (
    <AuthLayout
    left={<RegisterForm />}
    right={<RegisterBanner />}
    />
  );
};
export default RegisterPage;
