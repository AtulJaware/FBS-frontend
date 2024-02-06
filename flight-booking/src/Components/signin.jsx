import React from "react";
import { useState } from "react";
import "./signin.css";
import Navbar from "./navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const submit = (event) => {
    // event.preventDefault();


    let err = [];

    setErrors(err);

    const validString = new RegExp("^[a-zA-Z]+$");
    const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$");

    if (!fname || !validString.test(fname)) {
      err["fnameError"] = "Enter a valid name.";
    }
    if (!lname || !validString.test(lname)) {
      err["lnameError"] = "Enter a valid name. ";
    }

    if (!email || !validEmail.test(email)) {
      err["emailError"] = "Enter a valid email address. ";
    }

    if (!username) {
      err["usernameError"] = "Enter a valid Username. ";
    }

    if (!password) {
      err["passwordError"] = "Enter a valid password. ";
    }

    if (!gender || !validString.test(lname)) {
      err["genderError"] = "Enter a valid gender. ";
    }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      const payload = {
        firstName: fname,
        lastName: lname,
        email: email,
        username: username,
        password: password,
        gender: gender,
        role: 0,
      };

      axios
        .post("http://localhost:8500/user/passenger/add", payload)
        .then((resp) => {
          alert("Successfully Added")
          console.log(resp.data);
          navigate("/")
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }

    // console.log(payload)
  };

  const [showPass, setShowPass] = useState(false);
  const showHidePassword = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="container-fluid page" style={{ padding: "1rem", margin: "0px" }}>
      <Navbar />

      <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
        <div className="heading text-center pb-5">
          <h1>Register</h1>
        </div>
        <div className="field">
          <div className="two fields">
            <div className="field">
              <label>First Name</label>
              <input type="text" name="firstName" placeholder="First Name" value={fname} onChange={(event) => setFname(event.target.value)} />
              {errors.fnameError && <div className="ui red mini message">{errors.fnameError}</div>}
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" name="lastName" placeholder="Last Name" value={lname} onChange={(event) => setLname(event.target.value)} />
              {errors.lnameError && <div className="ui red mini message">{errors.lnameError}</div>}
            </div>
          </div>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field">
              <label>Email</label>
              <input type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              {errors.emailError && <div className="ui red mini message">{errors.emailError}</div>}
            </div>
            <div className="field">
              <label>Gender</label>
              <input type="text" name="gender" placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)} />
              {errors.genderError && <div className="ui red mini message">{errors.genderError}</div>}
            </div>
          </div>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field">
              <label>Username</label>
              <input type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
              {errors.usernameError && <div className="ui red mini message">{errors.usernameError}</div>}
            </div>
            <div className="field">
              <label>Password</label>
              <div className="d-flex">
                <input type={showPass ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <div className="ui icon buttons">
                  <button className="ui button" onClick={showHidePassword}>
                    <i className={showPass ? "eye icon" : "eye slash icon"}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="field pb-3">
          <button className="fluid ui yellow button" onClick={submit}>
            Register
          </button>
        </div>
        <div className="field text-center">
          <p>
            Already have an account ? <Link to={"/home"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
