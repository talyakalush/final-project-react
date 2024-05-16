import { Fragment } from "react";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardComponent from "../components/CardComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import LoginContext from "../store/loginContext";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const AboutMyPage = () => {
  const [cardData, setCardData] = useState([]);
  const [dataFromServer, setDataFromServer] = useState([]);
  const [images, setImages] = useState([]);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setCardData([data]);
      })
      .catch((err) => {});
  }, [id, dataFromServer]);

  useEffect(() => {
    if (cardData.length > 0 && cardData[0].type) {
      const type = cardData[0].type;

      axios
        .get(`/product/?category=${type}`)
        .then(({ data }) => {
          setImages(data.hits);
        })
        .catch((err) => {
          console.error("Error fetching images:", err);
        });
    }
  }, [cardData]);

  const handleLikeCard = async (id) => {
    if (!login) {
      toast.error("You must be logged in to like cards.", {
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
  const handleEditCard = () => {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  };
  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(237, 225, 227)",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        mt: "10px",
      }}
    >
      <Fragment>
        <h1 className="h1">
          About{" "}
          {cardData && cardData[0] && cardData[0].title
            ? cardData[0].title
            : "no title"}{" "}
        </h1>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          {cardData.map((item, index) => (
            <Grid
              item
              lg={3}
              md={4}
              xs={6}
              sm={6}
              sx={{ margin: "10px", justifyContent: "center" }}
              key={"carsCard" + index}
            >
              <CardComponent
                id={item._id}
                title={item.title}
                subtitle={item.subtitle}
                img={item.image.url}
                phone={item.phone}
                type={item.type}
                cardNumber={item.bizNumber}
                liked={item.likes.includes(login?._id)}
                likesCount={item.likes.length}
                onCard={handleAboutCard}
                onDelete={handleDeleteCard}
                onEdit={handleEditCard}
                onLike={handleLikeCard}
              />
            </Grid>
          ))}

          <div
            style={{
              border: "1px solid white",
              padding: "5px",
              borderRadius: "25px",
              boxShadow: "1px 1px 5px grey",
              textAlign: "left",
              color: "black",
              backgroundColor: "rgb(185, 161, 161)",
              fontFamily: "Comfortaa",
            }}
          >
            <Typography component="span" fontWeight={900}>
              description:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].description
              ? cardData[0].description
              : "no description"}{" "}
            <br></br>
            <br></br>
            <Typography component="span" fontWeight={900}>
              subtitle:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].subtitle
              ? cardData[0].subtitle
              : "no subtitle"}{" "}
            <br></br>
            <br></br>
            <Typography component="span" fontWeight={900}>
              style:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].country
              ? cardData[0].style
              : "no style" + " "}{" "}
            <br></br>
            <br></br>
            <Typography component="span" fontWeight={900}>
              web:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].web
              ? cardData[0].web
              : "no web"}
            {""} <br></br>
            <br></br>
            <Typography component="span" fontWeight={900}>
              price:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].web
              ? cardData[0].price
              : "no price"}{" "}
            <br></br>
            <br></br>
            <Typography component="span" fontWeight={900}>
              type:
            </Typography>{" "}
            {cardData && cardData[0] && cardData[0].web
              ? cardData[0].type
              : "no type"}
          </div>
        </Grid>
      </Fragment>

      <div>
        <h3>Sample photos</h3>
        {images.map((img, index) => (
          <img key={index} src={img.webformatURL} alt={img.tags} height={100} />
        ))}
      </div>
    </Box>
  );
};
export default AboutMyPage;
