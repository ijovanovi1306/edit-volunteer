"use client";

import { useRouter } from "next/navigation";

import { setAdmin } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import React from "react";
import ReduxProvider from "../store/redux-provider";
import { Slider, Typography } from "@mui/material";
import UserProfileCard from "../components/UserProfileCard";

const DashboardUserSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    dispatch(setAdmin(newValue === 1));
  };

  return (
    <div
      style={{
        width: "300px",
        minWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <UserProfileCard />
      <Typography id="admin-slider" gutterBottom>
        Are you a User or an Admin?
      </Typography>
      <Slider
        aria-labelledby="admin-slider"
        value={isAdmin ? 1 : 0}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={1}
        marks={[
          { value: 0, label: "User" },
          { value: 1, label: "Admin" },
        ]}
        min={0}
        max={1}
      />

      <Typography
        sx={{
          backgroundColor: "#ffefb5",
          color: "#7c5b01",
          border: "1px solid #f9d770",
          borderRadius: "5px",
          padding: "10px",
          marginTop: "20px",
        }}
        gutterBottom
      >
        Please do not forget to host src/app/lib/volunteers-data.json with
        json-server since data is there.
      </Typography>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <ReduxProvider>
      <div>
        <DashboardUserSlider />
      </div>
    </ReduxProvider>
  );
};

export default Page;
