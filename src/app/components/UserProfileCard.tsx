import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const UserProfileCard: React.FC = () => {
  return (
    <Card style={{padding: 10, marginBottom: 20,}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Ivan Jovanovic
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Freshly graduated from PMFST and an aspiring software engineer who recently got hooked into web and mobile app development.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Unfortunately due to being overly busy with work and unfortunate life circumstances I have not been able to give my whole to EDIT as I had hoped to initially, 
          so I want to apologise for the lackness of quality and details in this project right away. Tried my best in the short time I had available for it,
          while also trying to tackle new techologies along side it, am not sure it is matching the modern standards but I hope you still like it.
        </Typography>
        <Link href="https://github.com/ijovanovi1306" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
