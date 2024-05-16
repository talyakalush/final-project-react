import { useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";

import LoginContext from "./store/loginContext";
import searchContext from "./store/searchContext";
import ProfileContext from "./store/profileContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [login, setLogin] = useState(null);
  const [search, setSearch] = useState(null);
  const [profileData, setProfileData] = useState(null);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      <LoginContext.Provider value={{ login, setLogin }}>
        <searchContext.Provider value={{ search, setSearch }}>
          <ToastContainer />
          <LayoutComponent>
            <Router />
          </LayoutComponent>
        </searchContext.Provider>
      </LoginContext.Provider>
    </ProfileContext.Provider>
  );
}

export default App;
