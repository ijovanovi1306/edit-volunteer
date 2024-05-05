import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

const UserProfileCard: React.FC = () => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        marginBottom: '20px',
        width: "400px",
        minWidth: "400px",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Ivan Jovanovic
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Nedavno diplomirao na PMFST, prijavljen na EDIT Junior React Dev zbog
          interesa u razvoj web i mobilnih aplikacija i stjecanja novih
          vjestina.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Nazalost, zbog zauzetosti poslom i osobnom situacijom nisam bio u
          mogucnosti posvetiti se ovome projektu onoliko koliko sam se nadao,
          dapace gotovo i nikako, s time da sam bio i u grupi koja je kasnila
          tjedan dana... Unatoc svemu tome sam gledao barem poraditi na
          funkcionalnosti, s naglaskom na CRUD metode jer s time do prije mjesec
          dana i nisam imao nekog doticaja. Sve u svemu, ja se ispricavam i
          nadam se da sam donekle uspio zadovoljiti minimalne uvjete ovog
          projekta.
        </Typography>
        <Link
          href="https://github.com/ijovanovi1306"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
