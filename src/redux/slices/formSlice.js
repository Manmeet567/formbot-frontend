import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

// Create a new form inside a workspace
export const createForm = createAsyncThunk(
  "form/createForm",
  async ({ workspaceId, formData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/workspaces/${workspaceId}/forms`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  forms: [],
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const { workspaceId, formId, formData } = action.payload;
      const form = state.forms.find(
        (form) => form.id === formId && form.workspaceId === workspaceId
      );
      if (form) {
        form.data = formData; // Update the form data
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms.push(action.payload);
        toast.success("Form Created");
      })
      .addCase(createForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { updateForm } = formSlice.actions;
export default formSlice.reducer;
