import { useState } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import TextInputComponent from "../components/TextInputComponent";
import validateSchema from "../validation/cardValidation";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import ToServer from "./EditCardPage/ToServer";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";

const CreateCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    price: "",
    style: "",
    area: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    price: "",
    style: "",
    area: "",
    type: "",
  });
  const navigate = useNavigate();

  let keysArray = Object.keys(inputsValue);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });

    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };

  const handleCreateCard = (e) => {
    e.preventDefault();
    axios
      .post("cards", ToServer(inputsValue))

      .then(({ data }) => {
        navigate(ROUTES.MYCARD);
        toast.success(" you successfully created a card", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("Card creation error", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "rgb(237, 225, 227)",
        padding: "15px",
      }}
    >
      <img
        src="..//assets/imgs/beuteful.jpg"
        alt="bute"
        width={150}
        height={150}
        style={{
          borderRadius: "70px",
          marginTop: "10px",
          boxShadow: "10px 10px 5px #888888",
        }}
      ></img>
      <Avatar sx={{ m: 1, bgcolor: "#5d4037" }}>
        <CreateIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create your card
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{
          mt: 3,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            marginBottom: 5,
            marginLeft: 10,
          }}
        >
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#d7ccc8",
            color: "gray",
            width: "85%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={Object.keys(errors).length > 0}
          onClick={handleCreateCard}
        >
          Create Card
        </Button>
      </Box>
    </Box>
  );
};
export default CreateCardPage;
