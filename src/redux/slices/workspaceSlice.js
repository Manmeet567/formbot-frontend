import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";

export const getWorkspaces = createAsyncThunk(
  "workspace/getWorkspaces",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/workspace/${workspaceId}/get-workspace`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  activeWorkspace: null,
  workspace: null,
  loading: false,
  error: null,
  permissions: {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setActiveWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    },
    setWorkspace: (state, action) => {
      state.workspace = action.payload;
    },
  },
});

export const { setActiveWorkspace, setWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
