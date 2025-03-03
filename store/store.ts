import { configureStore, combineReducers } from "@reduxjs/toolkit";
import folderReducer from "./folderSlice";
import fileReducer from "./fileSlice";
import storage from "redux-persist/lib/storage"; // ✅ FIX: Use lowercase `storage`
import { persistReducer, persistStore } from "redux-persist"; // ✅ FIX: Correct import

// 🔹 Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage, // ✅ FIX: Use lowercase `storage`
};

// 🔹 Combine Reducers
const rootReducer = combineReducers({
  file: fileReducer,
  folder: folderReducer, // ✅ Added `folderReducer`
});

// 🔹 Apply Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Fixes some Redux-Persist warnings
    }),
});

// 🔹 Persistor
export const persistor = persistStore(store);

// 🔹 Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
