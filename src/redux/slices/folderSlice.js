import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

// Create a new folder inside a workspace
export const createFolder = createAsyncThunk(
  "folder/createFolder",
  async ({ workspaceId, folderData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/folder/${workspaceId}/create`,
        folderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  folders: [],
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    updateFolder: (state, action) => {
      const { workspaceId, folderId, folderData } = action.payload;
      const folder = state.folders.find(
        (folder) => folder.id === folderId && folder.workspaceId === workspaceId
      );
      if (folder) {
        folder.data = folderData; // Update the folder data
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
      });
  },
});

export const { updateFolder } = folderSlice.actions;
export default folderSlice.reducer;