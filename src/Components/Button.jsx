import "./Button.css";

const Button = ({ id, text, onClick, type = "button" }) => {
  return (
    <button id={id} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
