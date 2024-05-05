import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useAppDispatch } from "../store/store";
import { postVolunteer } from "../store/volunteersSlice";

const AddVolunteerDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [volunteer, setVolunteer] = useState({
    id: "",
    name: "",
    contact: "",
    city: "",
    activities: [] as string[],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setVolunteer((prevVolunteer) => ({
      ...prevVolunteer,
      [name]: value,
    }));
  };

  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const isChecked = volunteer.activities.includes(value);

    if (isChecked) {
      setVolunteer((prevVolunteer) => ({
        ...prevVolunteer,
        activities: prevVolunteer.activities.filter((activity) => activity !== value),
      }));
    } else {
      setVolunteer((prevVolunteer) => ({
        ...prevVolunteer,
        activities: [...prevVolunteer.activities, value],
      }));
    }
  };

  const handleAddVolunteer = () => {
    dispatch(postVolunteer(volunteer));
    setVolunteer({
      id: "",
      name: "",
      contact: "",
      city: "",
      activities: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Volunteer</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ID"
          name="id"
          value={volunteer.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          value={volunteer.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Contact"
          name="contact"
          value={volunteer.contact}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="City"
          name="city"
          value={volunteer.city}
          onChange={handleChange}
          fullWidth
        />
        <FormControl>
          <FormGroup>
            <DialogTitle>Activities</DialogTitle>
            {["Activity1", "Activity2", "Activity3"].map((activity) => (
              <FormControlLabel
                key={activity}
                control={
                  <Checkbox
                    checked={volunteer.activities.includes(activity)}
                    onChange={handleActivityChange}
                    name={activity}
                    value={activity}
                  />
                }
                label={activity}
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddVolunteer}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddVolunteerDialog;
