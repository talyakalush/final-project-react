import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import TextInputComponent from "../../components/TextInputComponent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import normalizeRegister from "./normalizeRegister";
import { validateSchema } from "../../validation/registerValidation";
import { toast } from "react-toastify";
import CopyrightComponent from "./ui/CopyrightComponent";
const RegisterPage = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();
  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });

    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        return { ...copyOfErrors };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToPost = normalizeRegister({ ...inputsValue, isBusiness });
      await axios.post("/users/register", dataToPost);
      toast.success(" Register Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error("Register error", {
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
    }
  };

  const handleCheckboxChange = (event) => {
    setIsBusiness(event.target.checked);
  };

  let keysArray = Object.keys(inputsValue);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "rgb(237, 225, 227)",
        // padding: "25px",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#5d4037" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register Page
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 3, marginLeft: 15 }}
      >
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <Grid item xs={12} sm={4} key={"inputs" + keyName}>
              <TextInputComponent
                id={keyName}
                label={keyName}
                value={inputsValue[keyName]}
                onChange={handleInputsChange}
                onBlur={handleInputsBlur}
                errors={errors[keyName]}
                required={errors[keyName] === "" ? true : false}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isBusiness}
                onChange={handleCheckboxChange}
                value="allowExtraEmails"
                color="error"
              />
            }
            label="Business Account"
          />
        </Grid>
        <Button
          type="submit"
          variant="contained"
          style={{
            marginLeft: 2,
            bgcolor: "#d7ccc8",
            color: "gray",
            width: "85%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={Object.keys(errors).length > 0}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN} style={{ color: "gray" }}>
              {"Already have an account? Sign in"}
            </Link>
          </Grid>
        </Grid>
        <CopyrightComponent />
      </Box>
    </Box>
  );
};

export default RegisterPage;
