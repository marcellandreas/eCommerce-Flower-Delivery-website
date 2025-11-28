import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSidebarOpen: false,
    isCartOpen: false,
    modal: {
        isOpen: false,
        type: null,
        data: null,
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        openModal: (state, action) => {
            state.modal = {
                isOpen: true,
                type: action.payload.type,
                data: action.payload.data || null,
            };
        },
        closeModal: (state) => {
            state.modal = {
                isOpen: false,
                type: null,
                data: null,
            };
        },
    },
});

export const {
    toggleSidebar,
    setSidebarOpen,
    toggleCart,
    openModal,
    closeModal
} = uiSlice.actions;

export default uiSlice.reducer;
