const Loading = () => {
    return (
        <div className="flex items-center justify-center h-full">
            {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div> */}
            <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

export default Loading;