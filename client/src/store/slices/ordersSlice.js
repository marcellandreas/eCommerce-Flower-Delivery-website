import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrdersAPI } from '../../services/api';

export const createOrder = createAsyncThunk(
  'orders/create',
  async ({ api, orderData }) => {
    const ordersAPI = createOrdersAPI(api);
    const response = await ordersAPI.create(orderData);
    return response.data.data;
  }
);

export const fetchOrders = createAsyncThunk('orders/fetchAll', async ({ api, params }) => {
  const ordersAPI = createOrdersAPI(api);
  const response = await ordersAPI.getAll(params);
  return response.data.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders || [];
      });
  },
});

export const { setCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;