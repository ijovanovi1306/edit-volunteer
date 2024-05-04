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
  async (activityId: string) => {
    try {
      await axios.delete(`http://localhost:3001/activities/${activityId}`);
      return activityId;
    } catch (error) {
      console.error("Failed to delete activity:", error);
      throw error;
    }
  }
);

// Thunk for updating activity details
export const updateActivityDetails = createAsyncThunk(
  "activities/updateActivityDetails",
  async (updatedActivity: Activity) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/activities/${updatedActivity.id}`,
        updatedActivity
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update activity details:", error);
      throw error;
    }
  }
);

// Thunk for updating volunteers for an activity
export const updateActivityVolunteers = createAsyncThunk(
  "activities/updateActivityVolunteers",
  async ({ activityId, updatedActivity }: { activityId: string, updatedActivity: Activity }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/activities/${activityId}`,
        updatedActivity
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update activity volunteers:", error);
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
        (state, action: PayloadAction<string>) => {
          const deletedId = action.payload;
          state.status = "succeeded";
          state.activities = state.activities.filter(
            (activity) => activity.id !== deletedId
          );
        }
      )
      .addCase(deleteActivity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete activity";
      })
      // Add cases for updating activity details
      .addCase(updateActivityDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateActivityDetails.fulfilled,
        (state, action: PayloadAction<Activity>) => {
          state.status = "succeeded";
          state.activities = state.activities.map(activity =>
            activity.id === action.payload.id ? action.payload : activity
          );
        }
      )
      .addCase(updateActivityDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update activity details";
      })
      // Add cases for updating activity volunteers
      .addCase(updateActivityVolunteers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateActivityVolunteers.fulfilled,
        (state, action: PayloadAction<{ activityId: string, volunteers: string[] }>) => {
          state.status = "succeeded";
          const { activityId, volunteers } = action.payload;
          state.activities = state.activities.map(activity =>
            activity.id === activityId ? { ...activity, volunteers } : activity
          );
        }
      )
      .addCase(updateActivityVolunteers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update activity volunteers";
      });
  },
});

export default activitiesSlice.reducer;
