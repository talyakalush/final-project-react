import CardComponent from "../components/CardComponent";
import { useParams } from "react-router-dom";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import searchContext from "../store/searchContext";
import { useContext } from "react";
import LoginContext from "../store/loginContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TableFavorite from "../components/TableFavorite";

const FavoriteCard = () => {
  const [cardData, setCardData] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [originalCardData, setOriginalCardData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [initialCardsToShow, setInitialCardsToShow] = useState(4);

  const navigate = useNavigate();
  const { search } = useContext(searchContext);

  const { login } = useContext(LoginContext);
  useEffect(() => {
    try {
      axios
        .get("/cards")
        .then(({ data }) => {
          const likedCards = data.filter((card) =>
            card.likes.includes(login._id)
          );
          setCardData(likedCards);
          setOriginalCardData(data);
        })
        .catch((err) => {});
    } catch (err) {}
  }, [login._id, dataFromServer, search]);
  const setCards = useCallback(() => {
    let filteredCards;
    if (search) {
      filteredCards = cardData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filteredCards = cardData;
    }
    setCardData(filteredCards);
  }, [search, originalCardData]);
  useEffect(() => {
    setCards();
  }, [cardsToShow]);

  useEffect(() => {
    setCards();
  }, [setCards, cardsToShow]);
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
  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + 4);
  };
  const handleShowTable = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };
  const handleHideTable = () => {
    setShowTable(false);
    setCardsToShow(initialCardsToShow);
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

  return (
    <div>
      <h1 className="h1">
        My Favorite <FavoriteIcon />
      </h1>
      <h2 className="h2">Here you can find your favorite cards</h2>
      {showTable ? (
        <TableFavorite
          dataFromServerFiltered={dataFromServer}
          showTable={showTable}
          onHideTable={handleHideTable}
        />
      ) : (
        <Grid container spacing={2}>
          {cardData.slice(0, cardsToShow).map((item, index) => (
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
export default memo(FavoriteCard);
