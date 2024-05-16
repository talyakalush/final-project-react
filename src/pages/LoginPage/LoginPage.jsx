import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import CopyrightComponent from "./ui/CopyrightComponent";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import validateLogin, {
  validateEmailLogin,
  validatePasswordLogin,
} from "../../validation/loginValidation";
const clientId =
  "496271653432 - johd68tpv38qt71jkh1pjev7c1ubdiro.apps.googleusercontent.com";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { setLogin, login } = useContext(LoginContext);
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmailLogin({ email: emailValue });
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };
  const handlePasswordBlur = () => {
    let dataFromJoi = validatePasswordLogin({ password: passwordValue });
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userKey = emailValue.toLowerCase();
    const userConsecutiveFailedAttempts =
      parseInt(localStorage.getItem(`${userKey}_consecutiveFailedAttempts`)) ||
      0;
    try {
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem("token", data);
      const decoded = jwtDecode(data);

      setLogin(decoded);
      const { isBusiness, isAdmin } = decoded;
      toast.success(
        isAdmin
          ? "LoggedIn Successfully - Admin"
          : isBusiness
          ? "LoggedIn Successfully - Business"
          : "LoggedIn Successfully",
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
      localStorage.removeItem(`${userKey}_consecutiveFailedAttempts`);
      navigate(ROUTES.HOME);
    } catch (err) {
      setLogin(null);
      localStorage.clear();
      toast.error("Login error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "red",
        toastId: "error-login",
      });
      const newUserConsecutiveFailedAttempts =
        userConsecutiveFailedAttempts + 1 || 1;
      localStorage.setItem(
        `${userKey}_consecutiveFailedAttempts`,
        newUserConsecutiveFailedAttempts.toString()
      );
      if (newUserConsecutiveFailedAttempts >= 3) {
        const lockoutDuration = 24 * 60 * 60 * 1000;
        const newLockoutEndTime = Date.now() + lockoutDuration;
        localStorage.setItem(
          `${userKey}_loginLockout`,
          newLockoutEndTime.toString()
        );
        toast.error("Account locked. Please try again in 24 hours.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "red",
          toastId: "lockout-error",
        });
      }
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("../assets/imgs/weddd1.jpg")',
          backgroundSize: "cover",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5d4037" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {emailError && <Alert severity="error">{emailError}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            <Link to={ROUTES.FORGOTPASSWORD} style={{ color: "gray" }}>
              {"Forgot Password?"}
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={emailError || passwordError ? true : false}
            >
              Sign In
            </Button>

            <Link to={ROUTES.REGISTER} style={{ color: "gray" }}>
              {"Don't have an account? Sign Up"}
            </Link>
            <CopyrightComponent sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
