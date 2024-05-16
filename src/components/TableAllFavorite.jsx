import Grid from "@mui/material/Grid";
import React, { useState, useEffect, useContext, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import LoginContext from "../store/loginContext.js";
import searchContext from "../store/searchContext.js";

import { CgAddR } from "react-icons/cg";
const TableAllFavorite = ({ showTable, onHideTable, onCard }) => {
  const [rowsToShow, setRowsToShow] = useState(4);
  const [initialRowsToShow, setInitialRowsToShow] = useState(4);
  const [tableShown, setTableShown] = useState(showTable);
  const [cardData, setCardData] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [originalCardData, setOriginalCardData] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { search } = useContext(searchContext);
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
  useEffect(() => {
    setCards();
  }, [cardsToShow]);

  useEffect(() => {
    setCards();
  }, [setCards, cardsToShow]);
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

  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };

  return (
    <div>
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
            {cardData.slice(0, rowsToShow).map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.subtitle}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.type}</TableCell>

                  <TableCell>
                    <FavoriteIcon color={"error"} /> {item.likes.length}
                    <CgAddR
                      onClick={() => handleAboutCard(item._id)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />{" "}
                    About me
                  </TableCell>
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

export default TableAllFavorite;
