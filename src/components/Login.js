import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    //To prevent page reload
    e.preventDefault();
    //API Call
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      localStorage.setItem("auth-token", json.authToken);
      props.showAlert("Login Successful", "success");
      history("/");
    } else {
      props.showAlert("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    // The below line means: keep the value of note as it is but update the fields of event e's name & value
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-3">
      <h2 className="my-2">Login To View Your Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="name@gmail.com"
            onChange={onChange}
          />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password must be 8 characters"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
