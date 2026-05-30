import LoginBanner from '../Components/LoginBanner.jsx';
import LoginForm from '../Components/LoginForm.jsx';
import AuthLayout from '../layout/AuthLayout.jsx';

const LoginPage = () => {

    return (
        <AuthLayout
            left={<LoginBanner />}
            right={<LoginForm />}
        />
    );
};

export default LoginPage;
