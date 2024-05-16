import axios from "axios";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState, useCallback } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import searchContext from "../store/searchContext";
import { useContext } from "react";
import { Button } from "@mui/material";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import TableAllFavorite from "../components/TableAllFavorite";

const FavoriteAdmin = () => {
  const [cardData, setCardData] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [originalCardData, setOriginalCardData] = useState([]);
  const { search } = useContext(searchContext);
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);
  const [initialRowsToShow, setInitialRowsToShow] = useState(4);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        const likedCards = data.filter(
          (card) => card.likes && card.likes.length > 0
        );
        setCardData(likedCards);
        setOriginalCardData(data);
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [search]);
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
  const handleLoadMore = () => {
    setCardsToShow((prev) => prev + 4);
  };
  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  const handleShowTable = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };
  const handleHideTable = () => {
    setShowTable(false);
    setCardsToShow(initialRowsToShow);
  };
  return (
    <div className="FavoriteAdmin">
      <h1 className="h1">All the Favorites</h1>
      {showTable ? (
        <TableAllFavorite
          dataFromServerFiltered={cardData}
          showTable={showTable}
          onHideTable={handleHideTable}
        />
      ) : (
        <Grid container spacing={2}>
          {cardData.slice(0, cardsToShow).map((item, index) => (
            <Grid item lg={3} md={4} xs={12} sm={6} key={"carsCard" + index}>
              <Card
                square
                raised
                onClick={() => handleAboutCard(item._id)}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid black",
                  backgroundImage: `url(${item.image.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  opacity: "0.7",
                  height: "300px",
                  "&:hover": {
                    opacity: "1",
                  },
                }}
              >
                <CardHeader
                  className="card"
                  title={item.title}
                  subheader={
                    <Typography className="card">{item.subtitle}</Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography className="card">Type:{item.type}</Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mt: 15 }}>
                    <FavoriteIcon color={"error"} />
                    <Typography variant="body2" className="card">
                      {item.likes.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid />
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
export default FavoriteAdmin;
