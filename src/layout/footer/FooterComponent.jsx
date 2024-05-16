import React, { useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginContext from "../../store/loginContext";
import { Box } from "@mui/material";
import FooterLinkComponent from "./FootetLink";
import ROUTES from "../../routes/ROUTES";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const FooterComponent = () => {
  const { login } = useContext(LoginContext);

  const alwaysLinks = [
    { to: ROUTES.ABOUT, children: <PriorityHighIcon />, label: "About" },
  ];

  const loggedInLinks = [
    { to: "FAVORITE", children: <FavoriteIcon />, label: "Favorite Cards" },
  ];

  const bizLinks = [
    { to: ROUTES.MYCARD, children: <ContactPageIcon />, label: "My Card" },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        mb: 0,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BottomNavigation showLabels>
          {alwaysLinks.map((myItem, index) => (
            <FooterLinkComponent
              to={myItem.to}
              key={"linksnav" + index}
              label={myItem.label}
            >
              {myItem.children}
            </FooterLinkComponent>
          ))}
          {login &&
            loggedInLinks.map((myItem, index) => (
              <FooterLinkComponent
                to={myItem.to}
                key={"linksnav2" + index}
                label={myItem.label}
              >
                {myItem.children}
              </FooterLinkComponent>
            ))}
          {login &&
            login.isBusiness &&
            bizLinks.map((myItem, index) => (
              <FooterLinkComponent
                to={myItem.to}
                key={"linksnav2" + index}
                label={myItem.label}
              >
                {myItem.children}
              </FooterLinkComponent>
            ))}
        </BottomNavigation>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MarkunreadIcon />
          talyakalush@gmail.com
          <LocalPhoneIcon />
          0540000000
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <p>@talya kalush</p>
        </Box>
      </Paper>
    </Box>
  );
};
export default FooterComponent;
