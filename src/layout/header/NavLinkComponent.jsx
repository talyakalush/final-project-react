import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none", margin: 2 }}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{
            cursor: "pointer",
            padding: 1,

            borderRight: "2px solid rgba(0, 0, 0, 0.12)",
          }}
          variant="h6"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
