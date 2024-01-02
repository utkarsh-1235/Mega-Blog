function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return (
    <div className={`px-4 py-2 rounded-lg text-center font-bold ${bgColor} ${textColor} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Button
