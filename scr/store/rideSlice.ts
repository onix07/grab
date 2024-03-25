import {createSlice} from '@reduxjs/toolkit';
import {IRide} from '../utils/model';

const initialState = {
  ride: {},
};
export const rideSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setRide: (state, action) => {
      state.ride = action.payload;
    },
    setRideStatus: (state, action) => {
      state.ride = {...state.ride, status: action.payload};
    },
  },
});

export const {setRide, setRideStatus} = rideSlice.actions;
export default rideSlice.reducer;
