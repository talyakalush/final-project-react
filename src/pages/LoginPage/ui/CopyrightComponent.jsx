import { Link, Typography } from "@mui/material";

const CopyrightComponent = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a
        style={{ color: "inherit" }}
        href="https://www.linkedin.com/in/talya-kalush/"
        target="_blank"
      >
        Talya Kalush
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyrightComponent;
