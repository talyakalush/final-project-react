import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import LoginContext from "../store/loginContext.js";
import normalizeHome from "../pages/HomePage/normalizeHome.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { CgAddR } from "react-icons/cg";
const TableComponent = ({ showTable, onHideTable, onCard }) => {
  const [rowsToShow, setRowsToShow] = useState(4);
  const [initialRowsToShow, setInitialRowsToShow] = useState(4);
  const [tableShown, setTableShown] = useState(showTable);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(normalizeHome(data));
        setOriginalData(normalizeHome(data));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    setInitialRowsToShow(rowsToShow);
    setTableShown(showTable);
  }, [showTable]);

  const handleLoadMore = () => {
    setRowsToShow((prev) => prev + 4);
  };

  const handleReset = () => {
    setRowsToShow(initialRowsToShow);
    onHideTable();
  };

  const handleDeleteCard = async (id) => {
    if (dataFromServer.user_id == login._id) {
      toast.error("You cannot delete the card, you did not create it!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (userConfirmed) {
      try {
        await axios.delete("/cards/" + id);

        setDataFromServer((currentDataFromServer) =>
          currentDataFromServer.filter((card) => card._id !== id)
        );

        toast.success("Card deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (err) {
        toast.error("you can not deleted !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
    }
  };
  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);

      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex !== -1) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
      if (data.likes.includes(login._id)) {
        toast.success("Card liked successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Card unliked successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {}
  };
  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleChange = (event) => {
    event.stopPropagation();
    const selectedTitle = event.target.value;
    setType(selectedTitle);
  };

  const handleClearFilters = () => {
    setType("");
    setDataFromServer(originalData);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value={"DJ"}>DJ</MenuItem>
          <MenuItem value={"wedding photographer"}>
            wedding photographer
          </MenuItem>
          <MenuItem value={"Caterers"}>Caterers</MenuItem>
          <MenuItem value={"Makeup & Hair"}>Makeup & Hair</MenuItem>
          <MenuItem value={"Wedding ring"}>Wedding ring</MenuItem>
          <MenuItem value={"Event halls"}>Event halls</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button onClick={handleClearFilters}>clear</Button>
        <div>{type && <p>Selected Type: {type}</p>}</div>
      </div>
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "30px",
          backgroundColor: "rgb(237, 225, 227)",
          boxShadow: "1px 1px 1px 1px #888888",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Subtitle</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Type</TableCell>
              <TableCell sx={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataFromServer
              .filter((item) => type === "" || item.type === type)
              .slice(0, rowsToShow)
              .map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.subtitle}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.type}</TableCell>

                    {login && (
                      <TableCell>
                        <DeleteIcon
                          onClick={() => handleDeleteCard(item._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <ModeIcon onClick={() => handleEditCard(item._id)} />
                        <FavoriteIcon
                          onClick={() => handleLikeCard(item._id)}
                          style={{
                            color: item.likes.includes(login._id)
                              ? "red"
                              : "inherit",
                            cursor: "pointer",
                          }}
                        />
                        <CgAddR
                          onClick={() => handleAboutCard(item._id)}
                          style={{ marginLeft: "10px" }}
                        />{" "}
                        About me
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button
          onClick={handleLoadMore}
          sx={{
            bgcolor: "#d7ccc8",
            color: "gray",
            borderRadius: "10px",
            mt: 3,
            mr: 2,
          }}
        >
          Load More
        </Button>
        <Button
          onClick={handleReset}
          sx={{
            bgcolor: "#d7ccc8",
            color: "gray",
            borderRadius: "10px",
            mt: 3,
          }}
        >
          Show Cards
        </Button>
      </Grid>
    </div>
  );
};

export default TableComponent;
