import PropTypes from "prop-types";

const SecondaryButton = ({ text = "Button", className = "" }) => {
  return (
    <button
      className={`btn-utility bg-btn-secondary text-btn-secondary hover:bg-btn-secondary ${className}`}
      style={{ cursor: "pointer" }}
    >
      {text}
    </button>
  );
};

SecondaryButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default SecondaryButton;
