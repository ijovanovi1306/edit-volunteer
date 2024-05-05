import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Request } from "../lib/definitions";

interface RequestsState {
  requests: Request[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RequestsState = {
  requests: [],
  status: "idle",
  error: null,
};

export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async () => {
    try {
      const response = await axios.get("http://localhost:3001/requests");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch requests:", error);
      throw error;
    }
  }
);

export const postRequest = createAsyncThunk(
  "requests/postRequest",
  async (newRequest: Request) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/requests",
        newRequest
      );
      return response.data;
    } catch (error) {
      console.error("Failed to post request:", error);
      throw error;
    }
  }
);

export const deleteRequest = createAsyncThunk(
  "requests/deleteRequest",
  async (requestId: string) => {
    try {
      await axios.delete(`http://localhost:3001/requests/${requestId}`);
      return requestId;
    } catch (error) {
      console.error("Failed to delete request:", error);
      throw error;
    }
  }
);

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRequests.fulfilled,
        (state, action: PayloadAction<Request[]>) => {
          state.status = "succeeded";
          state.requests = action.payload;
        }
      )
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch requests";
      })
      .addCase(postRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        postRequest.fulfilled,
        (state, action: PayloadAction<Request>) => {
          state.status = "succeeded";
          state.requests.push(action.payload);
        }
      )
      .addCase(postRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to post request";
      })
      .addCase(deleteRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteRequest.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.requests = state.requests.filter(
            (request) => request.id !== action.payload
          );
        }
      )
      .addCase(deleteRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to delete request";
      });
  },
});

export default requestsSlice.reducer;
