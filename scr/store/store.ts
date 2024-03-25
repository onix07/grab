import {configureStore} from '@reduxjs/toolkit';
import driverReducer from '../store/driverSlice';
import userReducer from '../store/userSlice';
import rideReducer from '../store/rideSlice';

export const store = configureStore({
  reducer: {
    driver: driverReducer,
    users: userReducer,
    ride: rideReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
