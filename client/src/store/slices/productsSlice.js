import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    filters: {
      category: null,
      search: '',
      priceRange: [0, 10000],
      sortBy: 'name',
    },
    selectedProduct: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        search: '',
        priceRange: [0, 10000],
        sortBy: 'name',
      };
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setFilters, clearFilters, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;