const Button = ({
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full rounded-xl bg-slate-900 hover:bg-slate-800
                py-3.5 text-sm font-semibold text-white
                shadow-sm transition duration-150
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;