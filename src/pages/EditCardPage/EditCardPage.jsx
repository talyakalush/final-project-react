import { useEffect, useState, useContext } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import { fromServer } from "./normalizeEdit";
import ROUTES from "../../routes/ROUTES";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ToServer from "./ToServer";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EditCardPage = () => {
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
  let { id } = useParams();
  let keysArray = Object.keys(inputsValue);
  const { login } = useContext(LoginContext);
  useEffect(() => {
    if (!id || !login) {
      return;
    }
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id === login._id || login.isAdmin) {
          setInputsValue(fromServer(data));
          setErrors({});
        } else {
          toast.error("The card you are trying to edit is not yours!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(ROUTES.HOME);
        }
      })
      .catch((err) => {});
  }, [id, login]);

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

  const handleUpdateChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/cards/" + id, ToServer(inputsValue));
      toast.success("Card update successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.MYCARD);
    } catch (error) {}
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

        padding: "13px",
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
        <ModeEditIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit your card
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3, marginLeft: 16 }}>
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
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              ml: "0%",
              bgcolor: "#d7ccc8",
              color: "gray",
            }}
            disabled={Object.keys(errors).length > 0}
            onClick={handleUpdateChanges}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "#d7ccc8",
                color: "gray",
              }}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default EditCardPage;
