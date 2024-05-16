import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import LoginContext from "../../store/loginContext";
import searchContext from "../../store/searchContext";
import normalizeHome from "./normalizeHome";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaHeart } from "react-icons/fa";
import TableHome from "../../components/TableHome";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [type, setType] = useState("");
  const [cardsToShow, setCardsToShow] = useState(4);
  const [initialCardsToShow, setInitialCardsToShow] = useState(4);
  const [showTable, setShowTable] = useState(false);
  const { search } = useContext(searchContext);
  const { login } = useContext(LoginContext);

  const navigate = useNavigate();
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
    let updatedDataFromServerFiltered = [...originalData];

    if (search) {
      updatedDataFromServerFiltered = updatedDataFromServerFiltered?.filter(
        (item) => item?.type?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      updatedDataFromServerFiltered = updatedDataFromServerFiltered?.filter(
        (item) => item?.type?.toLowerCase().includes(type.toLowerCase())
      );
    }

    setDataFromServer(updatedDataFromServerFiltered);
  }, [type, originalData]);

  let dataFromServerFiltered = normalizeHome(
    dataFromServer,
    login ? login._id : undefined
  );
  if (search) {
    dataFromServerFiltered = dataFromServerFiltered?.filter((item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + 4);
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
  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  const handleShowTable = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };
  const handleHideTable = () => {
    setShowTable(false);
    setCardsToShow(initialCardsToShow);
  };
  const handleChange = (event) => {
    const selectedTitle = event.target.value;
    setType(selectedTitle);
  };
  const handleClearFilters = () => {
    setType("");
    setDataFromServer(originalData);
  };
  return (
    <div>
      <div>
        <h1 className="h1">
          <FaHeart /> The Weddsite <FaHeart />
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src="..//assets/imgs/wadhome.jpg"
            alt="wed"
            width={220}
            height={220}
            style={{
              borderRadius: "50%",
              border: "3px solid black",
            }}
            className="moving-image"
          ></img>
        </div>
        <h2 className="h2">
          All the wedding vendors in one place, with tools to help you organize
          your big day!
        </h2>
        <br></br>
        <h3 className="h2">The vendors you will find on our website:</h3>
        <TableHome />

        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <img
              src="..//assets/imgs/homewaar.jpg"
              alt="wedding"
              width={155}
              height={155}
              style={{
                borderRadius: "75px",
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)",
                border: "2px solid black",
              }}
            ></img>
          </div>
          {!showTable ? (
            <FormControl sx={{ minWidth: 120, m: 1 }}>
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
          ) : (
            ""
          )}
          {!showTable ? (
            <div>
              <Button onClick={handleClearFilters}>clear</Button>
              <div>{type && <p>Selected Type: {type}</p>}</div>
            </div>
          ) : (
            ""
          )}
        </Box>
        {showTable ? (
          <TableComponent
            dataFromServerFiltered={dataFromServerFiltered}
            showTable={showTable}
            onHideTable={handleHideTable}
          />
        ) : (
          <Grid container spacing={2}>
            {dataFromServerFiltered.slice(0, cardsToShow).map((item, index) => (
              <Grid item lg={3} md={4} xs={12} sm={6} key={"carsCard" + index}>
                <CardComponent
                  id={item._id}
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  img={item.image.url}
                  phone={item.phone}
                  cardNumber={item.bizNumber}
                  liked={item.liked}
                  onCard={handleAboutCard}
                  onDelete={handleDeleteCard}
                  onEdit={handleEditCard}
                  onLike={handleLikeCard}
                />
              </Grid>
            ))}
          </Grid>
        )}
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          {!showTable && (
            <React.Fragment>
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
                onClick={handleShowTable}
                sx={{
                  bgcolor: "#d7ccc8",
                  color: "gray",
                  borderRadius: "10px",
                  mt: 3,
                }}
              >
                Show Table
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default HomePage;
