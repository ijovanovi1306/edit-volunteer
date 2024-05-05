import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Association } from "../lib/definitions";

interface AssociationsState {
  associations: Association[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AssociationsState = {
  associations: [],
  status: "idle",
  error: null,
};

export const fetchAssociations = createAsyncThunk(
  "associations/fetchAssociations",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/associations");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch associations:", error);
      throw error;
    }
  }
);

export const postAssociation = createAsyncThunk(
  "associations/postAssociation",
  async (newAssociation: Association) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/associations",
        newAssociation
      );
      return response.data;
    } catch (error) {
      console.error("Failed to post association:", error);
      throw error;
    }
  }
);

export const deleteAssociation = createAsyncThunk(
  "associations/deleteAssociation",
  async (associationId: string) => {
    try {
      await axios.delete(`http://localhost:3001/associations/${associationId}`);
      return associationId;
    } catch (error) {
      console.error("Failed to delete association:", error);
      throw error;
    }
  }
);

const associationsSlice = createSlice({
  name: "associations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssociations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAssociations.fulfilled,
        (state, action: PayloadAction<Association[]>) => {
          state.status = "succeeded";
          state.associations = action.payload;
        }
      )
      .addCase(fetchAssociations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch associations";
      })
      .addCase(postAssociation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        postAssociation.fulfilled,
        (state, action: PayloadAction<Association>) => {
          state.status = "succeeded";
          state.associations.push(action.payload);
        }
      )
      .addCase(postAssociation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to post association";
      })
      .addCase(deleteAssociation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteAssociation.fulfilled,
        (state, action: PayloadAction<string>) => {
          const deletedId = action.payload;
          state.status = "succeeded";
          state.associations = state.associations.filter(
            (association) => association.id !== deletedId
          );
        }
      )
      .addCase(deleteAssociation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete association";
      });
  },
});

export default associationsSlice.reducer;
