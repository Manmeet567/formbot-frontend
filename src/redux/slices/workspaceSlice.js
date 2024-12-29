import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

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
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch workspace"
      );
    }
  }
);

// New async thunk to add a shared user to the workspace
export const addSharedUser = createAsyncThunk(
  "workspace/addSharedUser",
  async ({ workspaceId, email, permission }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/workspace/${workspaceId}/add-workspace`,
        { email, permission }
      );
      return response.data; // Return the updated workspace or a success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to add shared user"
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
    updateOwnerName: (state, action) => {
      const { userId, userName } = action.payload;

      if (state.activeWorkspace && state.activeWorkspace.ownerId === userId) {
        state.activeWorkspace.ownerName = userName;
      }
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
      })
      .addCase(addSharedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSharedUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("User Invited!");
        // Optionally, update the activeWorkspace with the newly shared user info
        // Example: state.activeWorkspace = action.payload;
      })
      .addCase(addSharedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setActiveWorkspace, setPermission, updateOwnerName } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
