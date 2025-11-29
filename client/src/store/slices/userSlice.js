import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUsersAPI } from '../../services/api';

export const fetchCurrentUser = createAsyncThunk('user/fetchCurrent', async (api) => {
  const usersAPI = createUsersAPI(api);
  const response = await usersAPI.getCurrentUser();
  return response.data.data;
});

export const updateCurrentUser = createAsyncThunk(
  'user/updateCurrent',
  async ({ api, data }) => {
    const usersAPI = createUsersAPI(api);
    const response = await usersAPI.updateCurrentUser(data);
    return response.data.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;





