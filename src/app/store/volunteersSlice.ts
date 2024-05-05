import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Volunteer } from "../lib/definitions";

interface VolunteersState {
  volunteers: Volunteer[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VolunteersState = {
  volunteers: [],
  status: "idle",
  error: null,
};

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/volunteers");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch volunteers:", error);
      throw error;
    }
  }
);

export const postVolunteer = createAsyncThunk(
  "volunteers/postVolunteer",
  async (newVolunteer: Volunteer) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/volunteers",
        newVolunteer
      );
      return response.data;
    } catch (error) {
      console.error("Failed to post volunteer:", error);
      throw error;
    }
  }
);

export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (volunteerId: string) => {
    try {
      await axios.delete(`http://localhost:3001/volunteers/${volunteerId}`);
      return volunteerId;
    } catch (error) {
      console.error("Failed to delete volunteer:", error);
      throw error;
    }
  }
);

// Thunk for updating volunteer details
export const updateVolunteerDetails = createAsyncThunk(
  "volunteers/updateVolunteerDetails",
  async (updatedVolunteer: Volunteer) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/volunteers/${updatedVolunteer.id}`,
        updatedVolunteer
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update volunteer details:", error);
      throw error;
    }
  }
);

const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchVolunteers.fulfilled,
        (state, action: PayloadAction<Volunteer[]>) => {
          state.status = "succeeded";
          state.volunteers = action.payload;
        }
      )
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch volunteers";
      })
      .addCase(postVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        postVolunteer.fulfilled,
        (state, action: PayloadAction<Volunteer>) => {
          state.status = "succeeded";
          state.volunteers.push(action.payload);
        }
      )
      .addCase(postVolunteer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to post volunteer";
      })
      .addCase(deleteVolunteer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteVolunteer.fulfilled,
        (state, action: PayloadAction<string>) => {
          const deletedId = action.payload;
          state.status = "succeeded";
          state.volunteers = state.volunteers.filter(
            (volunteer) => volunteer.id !== deletedId
          );
        }
      )
      .addCase(deleteVolunteer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete volunteer";
      })
      // Add cases for updating volunteer details
      .addCase(updateVolunteerDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateVolunteerDetails.fulfilled,
        (state, action: PayloadAction<Volunteer>) => {
          state.status = "succeeded";
          state.volunteers = state.volunteers.map(volunteer =>
            volunteer.id === action.payload.id ? action.payload : volunteer
          );
        }
      )
      .addCase(updateVolunteerDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update volunteer details";
      });
  },
});

export default volunteersSlice.reducer;
