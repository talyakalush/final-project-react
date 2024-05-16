import React, { useEffect, useState } from "react";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ROUTES from "../routes/ROUTES";
import { useContext, useCallback } from "react";
import searchContext from "../store/searchContext";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import LoginContext from "../store/loginContext";
import TableMyCard from "../components/TableMyCard";
const MyCard = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const { login } = useContext(LoginContext);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [originalCardData, setOriginalCardData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [initialRowsToShow, setInitialRowsToShow] = useState(4);

  const { search } = useContext(searchContext);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/cards/my-cards");
        setDataFromServer(response.data);
        setOriginalCardData(response.data);

        if (search) {
          const filteredCards = response.data.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          );
          setDataFromServer(filteredCards);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [search]);

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
      } catch (err) {}
    } else {
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
  };

  const handleEditCard = (id) => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };

  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + 4);
  };
  const handleShowTable = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };
  const handleHideTable = () => {
    setShowTable(false);
    setCardsToShow(initialRowsToShow);
  };

  return (
    <div>
      <h1 className="h1">
        My Cards <DashboardIcon />
      </h1>
      <h2 className="h2">Here you can find your cards</h2>
      {showTable ? (
        <TableMyCard
          dataFromServerFiltered={dataFromServer}
          showTable={showTable}
          onHideTable={handleHideTable}
        />
      ) : (
        <Grid container spacing={2}>
          {dataFromServer.slice(0, cardsToShow).map((item, index) => (
            <Grid item lg={3} md={4} xs={12} sm={6} key={"carsCard" + index}>
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                type={item.type}
                cardNumber={item.bizNumber}
                liked={item.likes.includes(login._id)}
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
  );
};

export default MyCard;
