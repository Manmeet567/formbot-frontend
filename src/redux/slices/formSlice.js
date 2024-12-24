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
  activeForm: null,
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForms: (state, action) => {
      state.forms = action.payload;
    },
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
});

export const { updateForm, setForms } = formSlice.actions;
export default formSlice.reducer;
