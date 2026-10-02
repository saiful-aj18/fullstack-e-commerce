function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = ""
}) {
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300",
    outline:
      "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white",
    danger:
      "border border-red-200 text-red-600 hover:bg-red-50"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;