const InputField = ({ label, type = "text", value, onChange, placeholder, icon: Icon, id }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5"
            >
                {label}
            </label>

            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                )}

                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="block w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-sm bg-slate-50 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all outline-none"
                />
            </div>
        </div>
    );
};

export default InputField;