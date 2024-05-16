import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { memo } from "react";
import LoginContext from "../store/loginContext";
import { useContext } from "react";

const CardComponent = ({
  title,
  subtitle,
  img,
  type,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onDelete,
  onEdit,
  onLike,
  onCard,
  likesCount,
}) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
  };
  const handleAboutClick = () => {
    onCard(id);
  };
  const { login } = useContext(LoginContext);

  return (
    <Card
      square
      raised
      sx={{
        borderRadius: "20px",
        border: "1px solid black",
        backgroundImage: `url(${img})`,
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "0.7",
        height: "280px",

        "&:hover": {
          opacity: "1",
        },
      }}
    >
      <CardHeader
        className="card"
        title={title}
        subheader={<Typography className="card">{subtitle}</Typography>}
        onClick={handleAboutClick}
      ></CardHeader>

      <CardContent>
        <Typography className="card">
          <Typography component="span" fontWeight={700}>
            type:
          </Typography>
          {type}
        </Typography>

        {login && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            <Box>
              {login.isBusiness && (
                <>
                  <IconButton
                    onClick={handleDeleteClick}
                    style={{ backgroundColor: "black", opacity: 0.3 }}
                  >
                    <DeleteIcon style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    onClick={handleEditClick}
                    style={{
                      backgroundColor: "black",
                      opacity: 0.4,
                      marginLeft: 6,
                    }}
                  >
                    <ModeIcon style={{ color: "white" }} />
                  </IconButton>
                </>
              )}
            </Box>
            <Box>
              <IconButton
                onClick={handleLikeClick}
                style={{
                  backgroundColor: "black",
                  opacity: 0.4,
                }}
              >
                <FavoriteIcon style={{ color: liked ? "red" : "white" }} />
                <Typography variant="body2" color={"white"}>
                  {likesCount}
                </Typography>
              </IconButton>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  phone: PropTypes.string.isRequired,
  web: PropTypes.string,
  style: PropTypes.string,
  type: PropTypes.string.isRequired,
  cardNumber: PropTypes.number,
  id: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onCard: PropTypes.func.isRequired,
};

export default memo(CardComponent);
