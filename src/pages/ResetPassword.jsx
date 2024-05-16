import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  console.log("token", token);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/resetPassword/" + token, {
        password,
      })

      .then((response) => {
        if (response.data.status) {
          alert("Password reset");
          navigate(ROUTES.LOGIN);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <label htmlFor="email">New Password:</label>
        <input
          type="password"
          autoComplete="off"
          placeholder="**"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
