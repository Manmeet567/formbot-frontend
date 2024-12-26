import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";

const initialState = {
  activeWorkspace: null,
  loading: false,
  error: null,
  permission: null,
};

export const fetchWorkspaceById = createAsyncThunk(
  "workspace/fetchWorkspaceById",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        `/workspace/${workspaceId}/get-workspace`
      );
      console.log("asdfad", response?.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch workspace"
      );
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setActiveWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    },
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceById.fulfilled, (state, action) => {
        state.loading = false;
        state.activeWorkspace = action.payload;
        state.permission = action.payload.permission;
      })
      .addCase(fetchWorkspaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveWorkspace, setPermission } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
