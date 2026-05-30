const AuthLayout = ({ left, right }) => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {left}
            {right}
        </div>
    );
};

export default AuthLayout;