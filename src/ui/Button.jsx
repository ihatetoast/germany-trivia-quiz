export default function Button({
  handleClick,
  className,
  disabled,
  children,
  type = 'button',
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`btn ${className || ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
