import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import workspaceReducer from './slices/workspaceSlice';
import formReducer from './slices/formSlice';
import folderReducer from './slices/folderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    form: formReducer,
    folder: folderReducer
  },
});
