import { configureStore } from "@reduxjs/toolkit";
import animalsReducer from "./reducers/animalsSlice";

const store = configureStore({
  reducer: {
    animals: animalsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
