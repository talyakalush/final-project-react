import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";
import Layout from "../styles/Layout.css";

const LayoutComponent = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  const [isDarkTheme, setDarkTheme] = useState(false);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "#efebe9",

    primary: "d7ccc8",
    "light.bodyColor": "*#ffebee",
    "dark.bodyColor": "*#121212",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <div style={{ backgroundColor: isDarkTheme ? "#121212" : "#efebe9" }}>
      <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
        <CssBaseline />
        <HeaderComponent
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
        />
        <MainComponent>
          {finishAutoLogin ? (
            children
          ) : (
            <Typography variant="h1">Loading...</Typography>
          )}
        </MainComponent>
        <FooterComponent />
      </ThemeProvider>
    </div>
  );
};
export default LayoutComponent;
