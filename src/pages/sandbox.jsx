import React, { useState, useEffect } from "react";
import axios from "axios";
import searchContext from "../store/searchContext";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const Sandbox = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [originalUsersData, setOriginalUsersData] = useState([]);
  const { search } = useContext(searchContext);
  const [UsersToShow, setUsersToShow] = useState(4);

  useEffect(() => {
    axios
      .get("/users")
      .then(({ data }) => {
        setDataFromServer(data);
        setOriginalUsersData(data);
      })
      .catch((err) => {});
  }, [UsersToShow]);

  useEffect(() => {
    let filterUsers;
    if (search) {
      filterUsers = originalUsersData.filter((item) =>
        item.name.first.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      filterUsers = originalUsersData;
    }
    setDataFromServer(filterUsers);
  }, [search, UsersToShow]);

  const handleLoadMore = () => {
    setUsersToShow((prev) => prev + 4);
  };

  const handleSaveEditUser = async (userId, newIsBusiness) => {
    try {
      await axios.patch(`/users/${userId}`, {
        isBusiness: newIsBusiness,
      });

      setDataFromServer((prevData) =>
        prevData.map((currentUser) =>
          currentUser._id === userId
            ? { ...currentUser, isBusiness: newIsBusiness }
            : currentUser
        )
      );

      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleBusinessChange = (e, userId) => {
    const newIsBusiness = e.target.value === "true";
    setDataFromServer((prevData) =>
      prevData.map((user) =>
        user._id === userId ? { ...user, isBusiness: newIsBusiness } : user
      )
    );
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setDataFromServer(dataFromServer.filter((user) => user._id !== id));

      toast.success("User Deleted Successfully!", {
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
      console.error("Error deleting user:", err);
      toast.error("User Delete Error", {
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

  return (
    <div>
      <h1 className="h1">SandBox</h1>
      <h2 className="h2">
        In this page you show the users details of the website
      </h2>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: "25px",
          boxShadow: "0px 0px 5px #ccc",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: "antiquewhite",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <div>Name</div>
              </TableCell>
              <TableCell align="right">
                <span>Email</span>
              </TableCell>
              <TableCell align="right">
                <div>Address</div>
              </TableCell>
              <TableCell align="right">
                <div>Phone</div>
              </TableCell>
              <TableCell align="right">
                <div>Is Business</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFromServer.slice(0, UsersToShow).map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.name.first}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.address.city}</TableCell>
                <TableCell align="right">{user.phone}</TableCell>
                <TableCell align="right">
                  <select
                    value={user.isBusiness.toString()}
                    onChange={(e) => handleBusinessChange(e, user._id)}
                  >
                    <option value={"true"}>true</option>
                    <option value={"false"}>false</option>
                  </select>
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{ color: "rgb(102, 7, 15)" }}
                    onClick={() =>
                      handleSaveEditUser(user._id, user.isBusiness)
                    }
                  >
                    SAVE
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{ color: "rgb(102, 7, 15)" }}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
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
            }}
          >
            Load More
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default Sandbox;
