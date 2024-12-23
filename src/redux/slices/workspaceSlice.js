import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

export const getWorkspaces = createAsyncThunk(
  "workspace/getWorkspaces",
  async ({ rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/workspace/get-workspace`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  workspaces: [],
  activeWorkspace: null, // Track active workspace here
  loading: false,
  error: null,
  permissions: {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setActiveWorkspace: (state, action) => {
      // Set the active workspace when required
      state.activeWorkspace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkspaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkspaces.fulfilled, (state, action) => {
        state.loading = false;
        state.workspaces = action.payload; // Save workspaces (both owned and shared)
        
        // Set active workspace (default to first owned workspace, if available)
        const firstOwnedWorkspace = action.payload.owned[0];
        const firstSharedWorkspace = action.payload.shared[0];
        state.activeWorkspace = firstOwnedWorkspace || firstSharedWorkspace;
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setActiveWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
