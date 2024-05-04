import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { postActivity } from '../store/activitiesSlice';

const AddActivityDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [activity, setActivity] = useState({
    id: 0,
    name: '',
    date: '',
    location: '',
    description: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    // Convert id string to number
    const parsedValue = name === 'id' ? parseInt(value) : value;
  
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: parsedValue,
    }));
  };

  const handleAddActivity = () => {
    dispatch(postActivity(activity));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Activity</DialogTitle>
      <DialogContent>
      <TextField
          autoFocus
          margin="dense"
          label="ID"
          name="id"
          value={activity.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          value={activity.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Date"
          name="date"
          value={activity.date}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={activity.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Description"
          name="description"
          value={activity.description}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddActivity}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddActivityDialog;
