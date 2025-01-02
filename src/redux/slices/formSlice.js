import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";

// Create a form
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

// Delete a form
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

// Get a form
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

// Update flow of a form
export const updateFlow = createAsyncThunk(
  "form/updateFlow",
  async ({ formId, flow, title }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/form/${formId}/update-flow`, {
        flow,
        title
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const getResponses = createAsyncThunk(
  "form/getResponses",
  async ({ formId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/response/${formId}/get-responses`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const initialState = {
  forms: [],
  activeForm: null,
  responses: [],
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
      // Create form cases
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

      // Delete form cases
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

      // Get form cases
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
      })

      // Update flow cases
      .addCase(updateFlow.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateFlow.fulfilled, (state, action) => {
        state.loading = false;
        if (state.activeForm && state.activeForm._id === action.payload._id) {
          state.activeForm.flow = action.payload.updatedFlow;
        }
        toast.success("Flow Updated");
      })
      .addCase(updateFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Update flow cases
      .addCase(getResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload;
      })
      .addCase(getResponses.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setForms, setActiveForm } = formSlice.actions;
export default formSlice.reducer;
