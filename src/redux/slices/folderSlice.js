import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

export const createFolder = createAsyncThunk(
  "folder/createFolder",
  async ({ activeWorkspace, folderData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/folder/${activeWorkspace}/create`,
        folderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folder/deleteFolder",
  async ({ folderId, workspaceId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `/folder/${folderId}/delete-folder`,
        {
          data: { workspaceId },
        }
      );
      return { folderId, workspaceId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  folders: [],
  activeFolder: null,
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setfolders: (state, action) => {
      state.folders = action.payload;
    },
    updateFolder: (state, action) => {
      const { workspaceId, folderId, folderData } = action.payload;
      const folder = state.folders.find(
        (folder) => folder.id === folderId && folder.workspaceId === workspaceId
      );
      if (folder) {
        folder.data = folderData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.folders.push(action.payload);
        toast.success("Folder Created");
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Handle deleteFolder action
      .addCase(deleteFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.folders = state.folders.filter(
          (folder) => folder._id !== action.payload.folderId
        );
        toast.success("Folder Deleted");
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { updateFolder, setfolders } = folderSlice.actions;
export default folderSlice.reducer;
