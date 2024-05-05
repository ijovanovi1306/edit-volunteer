"use client";

import React, { useEffect } from "react";
import {
  fetchAssociations,
  postAssociation,
  deleteAssociation,
} from "../../store/associationsSlice";
import { Association } from "../../lib/definitions";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Button, Box } from "@mui/material";
import ReduxProvider from "@/app/store/redux-provider";

import AddAssociationDialog from "@/app/components/AddAssocitationDialog";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { deleteRequest, fetchRequests } from "@/app/store/requestsSlice";
import { Request } from "../../lib/definitions";

const AssociationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const associations = useAppSelector(
    (state: any) => state.associations.associations
  );
  const requests = useAppSelector((state: any) => state.requests.requests);
  const isAdmin = useAppSelector((state: any) => state.user.isAdmin);

  useEffect(() => {
    dispatch(fetchAssociations());
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleApproveRequest = (requestId: string) => {
    const requestToApprove = requests.find(
      (request: Request) => request.id === requestId
    );
    if (requestToApprove) {
      dispatch(postAssociation(requestToApprove));
      dispatch(deleteRequest(requestId));
    }
  };

  const handleDenyRequest = (requestId: string) => {
    const requestToDeny = requests.find(
      (request: Request) => request.id === requestId
    );
    if (requestToDeny) {
      dispatch(deleteRequest(requestId));
    }
  };

  const handleDeleteAssociation = (associationId: string) => {
    dispatch(deleteAssociation(associationId));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Associations
      </Typography>
      <List>
        {associations.map((association: Association) => (
          <ListItem key={association.id}>
            <ListItemText
              primary={association.name}
              secondary={`City: ${association.city}`}
            />
            {isAdmin && (
              <Button
                variant="contained"
                onClick={() => handleDeleteAssociation(association.id)}
              >
                Delete
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      {isAdmin && (
        <>
          <Typography variant="h4" gutterBottom>
            Requests
          </Typography>
          <List>
            {requests.map((request: Request) => (
              <ListItem key={request.id}>
                <ListItemText
                  primary={request.name}
                  secondary={`City: ${request.city}`}
                />
                <Button
                  variant="contained"
                  onClick={() => handleApproveRequest(request.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDenyRequest(request.id)}
                >
                  Deny
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

const Page: React.FC = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <ReduxProvider>
      <div>
        <AddAssociationDialog open={openDialog} onClose={handleCloseDialog} />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Add New Association
          </Button>
        </Box>
        <AssociationsPage />
      </div>
    </ReduxProvider>
  );
};

export default Page;
