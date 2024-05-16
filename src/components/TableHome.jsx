import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { FaCamera } from "react-icons/fa";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { GiDiamondRing } from "react-icons/gi";
import RoomIcon from "@mui/icons-material/Room";
import { FaScrewdriver } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
const TableHome = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "30vh",
      }}
    >
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "30vw",
          borderRadius: "20px",
        }}
        component={Paper}
      >
        <Table
          sx={{
            width: "30vw",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",

                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <FaCamera />
                  wedding photographers{" "}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <FaScrewdriver />
                  Makeup & Hair{" "}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "8vw",

                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <HeadphonesIcon />
                  DJ{" "}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <GiDiamondRing />
                  Wedding ring
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <RestaurantIcon />
                  Caterers
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    "&:hover": {
                      background: "#f5f2f5",
                      borderRadius: "20px",
                    },
                  }}
                >
                  <RoomIcon />
                  Event halls
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default TableHome;
