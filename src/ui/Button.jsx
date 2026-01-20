

export default function Button({handleClick, classes, disabled, children}) {
  const btnClasses = `btn ${classes ? classes : ''} `;

  return (
    <button onClick={handleClick} className={btnClasses} disabled={disabled}>{children}</button>
  )
}
