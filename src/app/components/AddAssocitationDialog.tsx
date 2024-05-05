import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAppDispatch } from "../store/store";
import { postRequest } from "../store/requestsSlice";

const AddAssociationDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [association, setAssociation] = useState({
    id: "",
    name: "",
    city: "",
    activities: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAssociation((prevAssociation) => ({
      ...prevAssociation,
      [name]: value,
    }));
  };

  const handleAddAssociation = () => {
    dispatch(postRequest(association));
    setAssociation({
      id: "",
      name: "",
      city: "",
      activities: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Association</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="ID"
          name="id"
          value={association.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          value={association.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="City"
          name="city"
          value={association.city}
          onChange={handleChange}
          fullWidth
        />
        {/* Assuming activities are selected elsewhere */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddAssociation}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAssociationDialog;
