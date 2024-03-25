import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../utils/model';

const initialState = {
  user: [],
};
export const userSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
