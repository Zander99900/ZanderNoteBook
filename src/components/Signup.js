import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    //To prevent page reload
    e.preventDefault();
    //API Call
    const { name, email, password, cpassword } = credentials;
    if (cpassword !== password) {
      props.showAlert("Passwords Do not match", "danger");
    } else {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json);
      if (json.success) {
        localStorage.setItem("auth-token", json.authToken);
        history("/login");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Value Entered", "danger");
      }
    }
  };

  const onChange = (e) => {
    // The below line means: keep the value of note as it is but update the fields of event e's name & value
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="my-3">
      <h2 className="my-3">Create a new Account to use ZanderNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Your Name"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="name@gmail.com"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password must be 8 characters"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Password must be same as above"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
