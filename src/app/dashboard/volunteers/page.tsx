"use client";

import React, { useEffect, useState } from "react";
import { fetchVolunteers, deleteVolunteer } from "../../store/volunteersSlice";
import { Volunteer } from "@/app/lib/definitions";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ReduxProvider from "@/app/store/redux-provider";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import AddVolunteerDialog from "@/app/components/AddVolunteerDialog";

const VolunteersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const volunteers = useAppSelector(
    (state: any) => state.volunteers.volunteers
  );
  const isAdmin = useAppSelector((state: any) => state.user.isAdmin);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchVolunteers());
  }, [dispatch]);

  const handleDeleteVolunteer = (volunteerId: string) => {
    if (isAdmin) {
      dispatch(deleteVolunteer(volunteerId));
    }
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
  };

  const filteredVolunteers = volunteers.filter((volunteer: Volunteer) => {
    if (selectedCity && volunteer.city !== selectedCity) {
      return false;
    }

    if (selectedActivities.length > 0) {
      const intersection = volunteer.activities.filter((activity) =>
        selectedActivities.includes(activity)
      );
      if (intersection.length === 0) {
        return false;
      }
    }

    return true;
  });

  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const activity = event.target.name;
    const isChecked = event.target.checked;

    setSelectedActivities((prevSelectedActivities) => {
      if (isChecked) {
        return [...prevSelectedActivities, activity];
      } else {
        return prevSelectedActivities.filter(
          (selectedActivity) => selectedActivity !== activity
        );
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box mb={2}>
          <FormControl sx={{ width: 200, minWidth: 200 }}>
            <InputLabel>Select City</InputLabel>
            <Select value={selectedCity} onChange={handleCityChange}>
              <MenuItem value="">All Cities</MenuItem>
              {volunteers.map((volunteer: Volunteer) => (
                <MenuItem key={volunteer.city} value={volunteer.city}>
                  {volunteer.city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Select Activities</Typography>
          <FormGroup>
            {(
              Array.from(
                new Set<string>(
                  volunteers.flatMap(
                    (volunteer: Volunteer) => volunteer.activities
                  )
                )
              ) as string[]
            ).map((activity) => (
              <FormControlLabel
                key={activity}
                control={
                  <Checkbox
                    checked={selectedActivities.includes(activity)}
                    onChange={handleActivityChange}
                    name={activity}
                  />
                }
                label={activity}
              />
            ))}
          </FormGroup>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid container spacing={2}>
          {filteredVolunteers.map((volunteer: Volunteer) => (
            <Grid item key={volunteer.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader title={volunteer.id} />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {volunteer.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Contact: {volunteer.contact}
                  </Typography>
                  <Typography color="text.secondary">
                    City: {volunteer.city}
                  </Typography>
                  <Typography color="text.secondary">
                    Activities: {volunteer.activities.join(", ")}
                  </Typography>
                </CardContent>
                {isAdmin && (
                  <Button
                    onClick={() => handleDeleteVolunteer(volunteer.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Page: React.FC = () => {
  // State to manage the visibility of the AddActivityDialog
  const [openDialog, setOpenDialog] = useState(false);

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to handle closing the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ReduxProvider>
      <div>
        <VolunteersPage />
        <AddVolunteerDialog open={openDialog} onClose={handleCloseDialog} />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Add New Volunteer
          </Button>
        </Box>
      </div>
    </ReduxProvider>
  );
};

export default Page;
