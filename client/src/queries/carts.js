import { useQuery } from "@tanstack/react-query";
import { useApi } from '../lib/axios';

export const cartKeys = {
    all: ["carts"],
    lists: () => [...cartKeys.all, "list"],
};

export const useAllCarts = () => {
    const api = useApi();
    return useQuery({
        queryKey: cartKeys.lists(),
        queryFn: () => api.get("/cart/all"),
    });
};
