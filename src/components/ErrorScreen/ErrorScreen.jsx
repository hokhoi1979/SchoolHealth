import PropTypes from "prop-types";

const ErrorScreen = ({ message }) => {

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div data-testid="error-screen" className="flex flex-col items-center justify-center h-screen text-gray-900">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={80}
                height={80}
                viewBox="0 0 24 24"
                className="animate-bounce"
            >
                <path
                    fill="#ff4444"
                    d="M11.001 10h2v5h-2zM11 16h2v2h-2z"
                ></path>
                <path
                    fill="#ff4444"
                    d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.99 1.99 0 0 0 .054 1.968A1.98 1.98 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.99 1.99 0 0 0 .054-1.968zM4.661 19L12 5.137L19.344 19z"
                ></path>
            </svg>

            <h1 className="text-2xl font-bold mt-4 normalText">Oops! Something went wrong.</h1>
            <p className="text-lg normalText text-gray-700 mt-2 text-center max-w-md">
                {message || "An unexpected error occurred. Please try again later."}
            </p>

            <button
                onClick={handleReload}
                className="mt-6 px-3 py-2 bg-[#ff8080] normalText text-base rounded-lg shadow-lg transition hover:bg-[#ff6666] active:bg-[#ff4444] cursor-pointer"
            >
                Reload Page
            </button>
        </div>
    );
};

ErrorScreen.propTypes = {
    message: PropTypes.string,
};

export default ErrorScreen;