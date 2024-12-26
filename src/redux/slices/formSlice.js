import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

export const createForm = createAsyncThunk(
  "form/createForm",
  async ({ workspaceId, folderId, formData }, { rejectWithValue }) => {
    try {
      const url = folderId
        ? `/form/${workspaceId}/${folderId}/create-form`
        : `/form/${workspaceId}/create-form`;

      const response = await apiClient.post(url, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteForm = createAsyncThunk(
  "form/deleteForm",
  async ({ formId, workspaceId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/form/${formId}/delete-form`, {
        data: { workspaceId },
      });

      return { formId, workspaceId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const getForm = createAsyncThunk(
  "form/getForm",
  async ({ workspaceId, folderId, formId }, { rejectWithValue }) => {
    try {
      const url = folderId
        ? `/form/${workspaceId}/${folderId}/${formId}/get-form`
        : `/form/${workspaceId}/${formId}/get-form`;

      const response = await apiClient.get(url);

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
    setActiveForm: (state, action) => {
      state.activeForm = action.payload;
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
      })

      // Existing deleteForm cases
      .addCase(deleteForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.forms = state.forms.filter(
          (form) => form._id !== action.payload.formId
        );
        toast.success("Form Deleted");
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForm.fulfilled, (state, action) => {
        state.loading = false;
        state.activeForm = action.payload; 
      })
      .addCase(getForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      });
  },
});

export const { setForms, setActiveForm } = formSlice.actions;
export default formSlice.reducer;
