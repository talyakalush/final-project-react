import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const FooterLinkComponent = ({ to, children, label }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "rgb(87, 65, 36)" : "text.headerColor"}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
          }}
          variant="h6"
        >
          {children}
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default FooterLinkComponent;
