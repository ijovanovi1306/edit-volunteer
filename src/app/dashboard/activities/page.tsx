"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { deleteActivity, fetchActivities } from "../../store/activitiesSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ReduxProvider from "@/app/store/redux-provider";
import AddActivityDialog from "@/app/components/AddActivityDialog";
import { Button, Box } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddVolunteerDialog from "@/app/components/AddVolunteerDialog";
import { Activity } from "@/app/lib/definitions";

const ActivitiesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const activities = useAppSelector((state) => state.activities.activities);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleDelete = (activityId: string) => {
    if (!isAdmin) {
      return;
    }
    dispatch(deleteActivity(activityId));
  };

  const handleOpenDialog = (activityId: string) => {
    const selected = activities.find(activity => activity.id === activityId);
    setSelectedActivity(selected || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedActivity(null);
    setOpenDialog(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "action1",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) =>
        
        isAdmin && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </Button>
          
        ),
    },
    {
      field: "action2",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) =>
        
        <Button
          variant="outlined"
          onClick={() => handleOpenDialog(params.row.id as string)}
        >
          Edit
        </Button>
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={activities}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
      />
      <AddVolunteerDialog open={openDialog} onClose={handleCloseDialog} activity={selectedActivity} /> 
    </div>
  );
};

const Page: React.FC = () => {
  // State to manage the visibility of the AddActivityDialog
  const [openDialog, setOpenDialog] = React.useState(false);

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
        <ActivitiesPage />
        <AddActivityDialog open={openDialog} onClose={handleCloseDialog} />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Add New Activity
          </Button>
        </Box>
      </div>
    </ReduxProvider>
  );
};

export default Page;
