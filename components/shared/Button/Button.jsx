const Button = ({ label, textColor, bgColor, hoverColor, className }) => {
  return (
    <button
      className={`rounded py-2 px-4 bg-${bgColor} hover:bg-${hoverColor} text-${textColor} ${className}`}
    >
      {label}
    </button>
    // <button className={classnames(`rounded py-2 px-4 bg-${bgColor} hover:bg-${hoverColor} text-${textColor}`, {

    // })}>{label}</button>
  );
}

// Button.defaultProps = {
//   bgColor: 'transparent',
//   hoverColor: 'transparent',
//   border: 
// }
 
export default Button;