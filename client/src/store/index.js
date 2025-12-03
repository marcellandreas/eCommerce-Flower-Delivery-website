import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import ordersReducer from './slices/ordersSlice';
import categoriesReducer from './slices/categoriesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    orders: ordersReducer,
    categories: categoriesReducer,
  },
});