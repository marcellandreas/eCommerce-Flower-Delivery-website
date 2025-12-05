import { Text } from "../Text";

const Loading = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            <Text level="body" className="text-center text-dark-textSecondary">Loading...</Text>
        </div>
    );
};

export { Loading }