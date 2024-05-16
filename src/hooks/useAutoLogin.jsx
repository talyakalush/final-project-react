import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";
import { toast } from "react-toastify";

const useAutoLogin = () => {
  const { setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      let token = localStorage.getItem("token");
      if (!token) {
        setFinishAutoLogin(true);
        return;
      }

      let userData = jwtDecode(token);
      if (!userData || !userData._id) {
        setFinishAutoLogin(true);
        return;
      }

      axios
        .get("/users/" + userData._id)
        .then(({ data }) => {
          setLogin(userData);
          setFinishAutoLogin(true);
          setLogoutTimeout();
        })
        .catch((err) => {
          setFinishAutoLogin(true);
        });
    };

    const setLogoutTimeout = () => {
      const twentyFourHoursInMilliseconds = 4 * 60 * 60 * 1000;

      setTimeout(() => {
        setLogin(null);
        localStorage.removeItem("token");
        toast.info(
          "Your account has been automatically logged out after 4 hours.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      }, twentyFourHoursInMilliseconds);
    };

    checkToken();
  }, [setFinishAutoLogin, setLogin]);

  return finishAutoLogin;
};

export default useAutoLogin;
