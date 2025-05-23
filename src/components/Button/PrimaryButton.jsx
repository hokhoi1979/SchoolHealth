import PropTypes from "prop-types";

const PrimaryButton = ({ text = "Button", className = "" }) => {
  return (
    <button
      className={`btn-utility bg-btn-primary text-btn-primary hover:bg-btn-primary ${className}`}
      style={{ cursor: "pointer" }}
    >
      {text}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default PrimaryButton;
