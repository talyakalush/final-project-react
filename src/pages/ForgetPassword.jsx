import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [emailValue, setEmailValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/forgotPassword", {
        email: emailValue,
      })
      .then((response) => {
        toast.success("Check your email for reset password link");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>ForgetPassword</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
