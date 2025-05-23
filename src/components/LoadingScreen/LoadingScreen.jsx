const LoadingScreen = () => {
    return (
        <div data-testid="loading-screen" className="absolute inset-0 flex h-screen justify-center items-center backdrop-blur-xs z-200">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#16648c] border-t-transparent"></div>
        </div>
    )
};

export default LoadingScreen;