

export default function Button({handleClick, className, disabled, children}) {
  const btnClasses = `btn ${className ? className : ''} `;

  return (
    <button onClick={handleClick} className={btnClasses} disabled={disabled}>{children}</button>
  )
}
