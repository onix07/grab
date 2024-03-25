import {createSlice} from '@reduxjs/toolkit';
import {IDriver} from '../utils/model';

const initialState = {
  driver: {},
};
export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
  },
});

export const {setDriver} = driverSlice.actions;
export default driverSlice.reducer;
