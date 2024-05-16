import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ROUTES from "../routes/ROUTES";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link to={ROUTES.HOME}>
              {" "}
              <Button variant="contained">Back Home</Button>{" "}
            </Link>
          </Grid>
          <Grid item xs={6}>
            <img
              src="..//assets/imgs/404.jpg"
              alt="404"
              width={500}
              height={450}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default NotFoundPage;
