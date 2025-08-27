

export default function Button({handleClick, classes, children}) {
  const btnClasses = `btn ${classes ? classes : ''} `;

  return (
    <button onClick={handleClick} className={btnClasses}>{children}</button>
  )
}
