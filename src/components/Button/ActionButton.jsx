import PropTypes from "prop-types";

const ActionButton = ({
  text = "Button",
  className = "",
}) => {
  return (
    <button
      className={`btn-confirm ${className} transition duration-300`}
      style={{ cursor: "pointer" }}
    >
      {text}
    </button>
  );
};

ActionButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default ActionButton;
