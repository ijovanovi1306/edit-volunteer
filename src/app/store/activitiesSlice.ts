import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Activity } from "../lib/definitions";

interface ActivitiesState {
  activities: Activity[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  status: "idle",
  error: null,
};

export const fetchActivities = createAsyncThunk(
  "activities/fetchActivities",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/activities");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      throw error;
    }
  }
);

export const postActivity = createAsyncThunk(
  "activities/postActivity",
  async (newActivity: Activity) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/activities",
        newActivity
      );
      return response.data;
    } catch (error) {
      console.error("Failed to post activity:", error);
      throw error;
    }
  }
);

export const deleteActivity = createAsyncThunk(
  "activities/deleteActivity",
  async (activityId: number | null) => {
    try {
      await axios.delete(`http://localhost:3001/activities/${activityId}`);
      return activityId;
    } catch (error) {
      console.error("Failed to delete activity:", error);
      throw error;
    }
  }
);

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchActivities.fulfilled,
        (state, action: PayloadAction<Activity[]>) => {
          state.status = "succeeded";
          state.activities = action.payload;
        }
      )
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch activities";
      })
      .addCase(postActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        postActivity.fulfilled,
        (state, action: PayloadAction<Activity>) => {
          state.status = "succeeded";
          state.activities.push(action.payload);
        }
      )
      .addCase(postActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to post activity";
      })
      .addCase(deleteActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteActivity.fulfilled,
        (state, action: PayloadAction<number | null>) => {
          const deletedId = action.payload;
          if (deletedId !== null) {
            state.status = "succeeded";
            state.activities = state.activities.filter(
              (activity) => activity.id !== deletedId
            );
          }
        }
      )
      .addCase(deleteActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete activity";
      });
  },
});

export default activitiesSlice.reducer;
