import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextInputComponent from "../../components/TextInputComponent";
import LoginContext from "../../store/loginContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import normalizeFromServer from "../RegisterPage/normalizeFromServer";
import normalizeProfile from "./editProfilePage";
import { validateSchema1 } from "../../validation/profileValidation";
import ProfileContext from "../../store/profileContext";

const ProfilePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalData, setOriginalData] = useState("");
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    alt: "",
    url: "",
  });
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const { login } = useContext(LoginContext);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (_id !== login._id) {
      return;
    }
    axios
      .get(`/users/${_id}`)
      .then(({ data }) => {
        if (data && typeof data === "object") {
          setDataFromServer(data);
          setInputsValue(normalizeFromServer(data));
          setOriginalData(data);
          setProfileData(normalizeFromServer(data));
          setErrors({});
        } else {
          setErrors({ server: "Invalid data format" });
        }
      })
      .catch((err) => {
        toast.error("Profile update error", {
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
      });
  }, [_id, login._id, navigate, setProfileData]);
  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };
  const handleInputsBlur = (e) => {
    const { error } = validateSchema1[e.target.id]({
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
      const response = await axios.put(
        `/users/${_id}`,
        normalizeProfile(inputsValue)
      );

      toast.success("Profile update successfully!", {
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
    } catch (error) {}
  };

  let keysArray = Object.keys(inputsValue);

  return (
    <Box
      sx={{
        width: "100%",
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
        style={{
          m: 1,
          bgcolor: "#5d4037",
          width: "10%",
          height: "10%",
          borderRadius: 100,
          backgroundColor: "white",
        }}
        src={inputsValue.url}
        alt={inputsValue.alt}
      />

      <Typography component="h1" variant="h5">
        Profile Page
      </Typography>
      <Box component="form" noValidate sx={{ mt: 3, marginLeft: 15 }}>
        <Grid container spacing={2}>
          {keysArray.map(
            (keyName) =>
              keyName !== "isBusiness" &&
              keyName !== "password" &&
              keyName !== "email" && (
                <Grid item xs={12} sm={4} key={"inputs" + keyName}>
                  <TextInputComponent
                    key={"inputs" + keyName}
                    id={keyName}
                    label={keyName}
                    value={inputsValue[keyName] || " "}
                    onChange={handleInputsChange}
                    onBlur={handleInputsBlur}
                    errors={errors[keyName]}
                    required={errors[keyName] === "" ? true : false}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Box>

      <Button
        type="submit"
        variant="contained"
        style={{ marginTop: "10px" }}
        sx={{
          mb: 2,
          bgcolor: "#d7ccc8",
          color: "gray",
          width: "85%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleUpdateChanges}
        disabled={Object.keys(errors).length > 0}
      >
        Update
      </Button>
    </Box>
  );
};
export default ProfilePage;
