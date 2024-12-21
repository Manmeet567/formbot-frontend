import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

// Fetch all workspaces (owned and shared)
export const getWorkspaces = createAsyncThunk(
  "workspace/getWorkspaces",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/workspace/${userId}`);
      return response.data; // Return workspaces data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Create a new form inside a workspace
export const createForm = createAsyncThunk(
  "workspace/createForm",
  async ({ workspaceId, formData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/workspaces/${workspaceId}/forms`,
        formData
      );
      return response.data; // Return the created form
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Create a new folder inside a workspace
export const createFolder = createAsyncThunk(
  "workspace/createFolder",
  async ({ workspaceId, folderData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/workspace/${workspaceId}/folders`,
        folderData
      );
      return response.data; // Return the created folder
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  workspaces: [], // Store workspaces (both owned and shared)
  loading: false,
  error: null,
  permissions: {}, // Store edit permissions for shared workspaces
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { workspaceId, formId, formData } = action.payload;
      const workspace = state.workspaces.find((ws) => ws.id === workspaceId);
      if (workspace) {
        const form = workspace.forms.find((form) => form.id === formId);
        if (form) {
          form.data = formData; // Update the form data
        }
      }
    },
    updateFolder: (state, action) => {
      const { workspaceId, folderId, folderData } = action.payload;
      const workspace = state.workspaces.find((ws) => ws.id === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find(
          (folder) => folder.id === folderId
        );
        if (folder) {
          folder.data = folderData; // Update the folder data
        }
      }
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
      })
      .addCase(getWorkspaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.loading = false;
        const workspace = state.workspaces.find(
          (ws) => ws.id === action.payload.workspaceId
        );
        if (workspace) {
          workspace.forms.push(action.payload); // Add the new form to the workspace
        }
      })
      .addCase(createForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false;
        const workspace = state.workspaces.find(
          (ws) => ws.id === action.payload.workspaceId
        );
        if (workspace) {
          workspace.folders.push(action.payload); // Add the new folder to the workspace
        }
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { updateForm, updateFolder } = workspaceSlice.actions;
export default workspaceSlice.reducer;
