import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { updateActivityVolunteers } from "../store/activitiesSlice";
import { Activity, Volunteer } from "../lib/definitions";

const AddVolunteerDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  activity: any;
}> = ({ open, onClose, activity }) => {
  const dispatch = useAppDispatch();
  const [newVolunteer, setNewVolunteer] = useState("");

  const handleAddVolunteer = () => {
    const updatedActivity: Activity = {
      ...activity,
      volunteers: [...activity.volunteers, newVolunteer],
    };
    dispatch(
      updateActivityVolunteers({ activityId: activity.id, updatedActivity })
    ); // Dispatch action to update volunteers
    setNewVolunteer(""); // Clear the input field
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ID"
          name="id"
          value={activity?.id || ""}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={activity?.name || ""}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Date"
          name="date"
          value={activity?.date || ""}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={activity?.location || ""}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={activity?.description || ""}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="New Volunteer"
          name="newVolunteer"
          value={newVolunteer}
          onChange={(e) => setNewVolunteer(e.target.value)}
          fullWidth
        />
        <Button onClick={handleAddVolunteer}>Add Volunteer</Button>
        <Card>
          <CardContent>
            {/* Display already added volunteers */}
            {activity?.volunteers.map((volunteer: Volunteer) => (
              <div key={volunteer.id}>{volunteer.name}</div>
            ))}
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddVolunteer}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVolunteerDialog;
