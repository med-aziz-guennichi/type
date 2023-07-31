import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import {
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ user: userSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);
/**
 * Middleware function used to configure default middleware.
 * This function takes in a `getDefaultMiddleware` function
 * and returns the configured middleware.
 * @author Aziz Guennichi
 * @param {function} getDefaultMiddleware - The function to get the default middleware.
 * @returns {function} - The configured middleware function.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Configure the serializableCheck options
      serializableCheck: {
        // Ignore specific actions from being checked for serializability
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
