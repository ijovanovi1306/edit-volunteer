import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "./userSlice";
import activitiesReducer from "./activitiesSlice";
import volunteersReducer from "./volunteersSlice";
import associationsReducer from "./associationsSlice";
import requestsReducer from "./requestsSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    activities: activitiesReducer,
    volunteers: volunteersReducer,
    associations: associationsReducer,
    requests: requestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
