import React, { useState } from "react";
import "./profile.css";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminProfile() {
  const userDetails = JSON.parse(localStorage.getItem("AdminData"));

  const [email, setEmail] = useState(userDetails.email);
  const [username, setUsername] = useState(userDetails.username);
  const [phonenumber, setPhonenumber] = useState(userDetails.phonenumber);

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);

  const showHidePass = () => {
    setShowPass(!showPass);
  };

  const logout = () => {
    if (userDetails !== null) {
      localStorage.clear();
      navigate("/home");
    }
  };

  const submit = () => {
    let err = [];

    setErrors(err);

    const validString = new RegExp("^[a-zA-Z]+$");
    const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$");
    const validPhone = new RegExp("^[0-9]{10}");

    if (!email || !validEmail.test(email)) {
      err["emailError"] = "Enter a valid email address. ";
    }

    if (!username) {
      err["usernameError"] = "Enter a valid Username. ";
    }

    if (!phonenumber || !validPhone.test(phonenumber)) {
      err["phonenumberError"] = "Enter a valid phoneNumber. ";
    }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      const payload = {
        id: userDetails.id,
        email: email,
        username: username,
        phoneNumber: phonenumber,
      };

      axios
        .patch("http://localhost:8500/user/admin/details/update", payload, {
          headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("admintoken")),
          },
        })
        .then((resp) => {
          alert("Successfully Added");
          console.log(resp.data);
          localStorage.setItem("AdiminData", JSON.stringify(resp.data));
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitPassword = () => {
    const payload = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    axios
      .patch("http://localhost:8500/user/admin/password/update/" + userDetails.id, payload, {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("admintoken")),
        },
      })
      .then((resp) => {
        alert(resp.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div>
      <div className="container-fluid row m-0">
        <div className="leftProfileStatus col-md-4">
          <div className="m-5 p-3" style={{ boxShadow: "0px 0px 10px #ccc", borderRadius: "4%" }}>
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <div className="m-5 p-3 " style={{ border: "1px solid black", width: "fit-content" }}>
                <h1 className="m-3 p-3">{userDetails.username}</h1>
              </div>
            </div>

            <div>
              <h3 className="m-1">
                <b>{userDetails.username}</b>
              </h3>
              <p>Personal Profile</p>
            </div>

            <div className="profileDetails m-3 p-3 text-left">
              <ul>
                <li className="p-3">
                  <i class="user outline icon"></i>
                  <span className="ml-2">
                    <a href="#profile">My Profile</a>
                  </span>
                </li>
                <li className="p-3">
                  <i class="sign-in icon"></i>
                  <span className="ml-2">
                    <a href="#loginDetails">Login Details</a>
                  </span>
                </li>
                <li className="p-3" onClick={logout}>
                  <i class="sign-out icon"></i>

                  <span className="ml-2">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="profile m-5 p-3" id="profile" style={{ boxShadow: "0px 0px 10px #ccc", borderRadius: "4%" }}>
            <div className="d-flex m-3" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div className="topProfile">
                <h1>Profile</h1>
              </div>
              <div className="editBtn">
                <button className="ui button mini" data-toggle="modal" data-target="#editDetails">
                  Edit
                </button>
              </div>
            </div>

            <div className="content m-3">
              <table className="ui table mt-5">
                <tr>
                  <td>Email</td>
                  <td>{userDetails.email}</td>
                </tr>
                <tr>
                  <td>Phone No</td>
                  <td>{userDetails.phoneNumber}</td>
                </tr>
              </table>
            </div>
          </div>

          <div className="loginDetails m-5 p-3" id="loginDetails" style={{ boxShadow: "0px 0px 10px #ccc", borderRadius: "4%" }}>
            <div className="d-flex m-3" style={{ justifyContent: "space-between", alignItems: "center" }}>
              <div className="topProfile">
                <h1>Login Details</h1>
              </div>

              <div className="changeBtn">
                <button className="ui button mini" data-toggle="modal" data-target="#changePassword">
                  Change password
                </button>
              </div>
            </div>

            <div className="content m-3">
              <table className="ui table mt-5">
                <tr>
                  <td>UserName</td>
                  <td>{userDetails.username}</td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>******</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Change details of user */}
      <div class="modal fade" id="editDetails" tabindex="-1" aria-labelledby="editDetailsLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editDetailsLabel">
                Edit Detials
              </h5>
              <div>
                <button class="ui icon button" data-dismiss="modal" aria-label="Close">
                  <i className="close icon red"></i>
                </button>
              </div>
            </div>
            <div class="modal-body">
              <div class="ui equal width form text-left">
                <div class="field">
                  <label>Email</label>

                  <div class="ui small left icon input">
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

                    <i class="at icon button"></i>
                  </div>
                </div>

                <div class="field">
                  <label>Phone Number</label>

                  <div class="ui small left icon input">
                    <input type="number" name="phonenumber" placeholder="PhoneNumber" value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} />

                    <i class="users icon"></i>
                  </div>
                </div>

                <div class="field">
                  <label>Username</label>

                  <div class="ui small left icon input">
                    <input type="text" name="username" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />

                    <i class="user icon button"></i>
                  </div>
                </div>

                <div className="mt-3 mb-3">
                  <button class="ui button small btn-block primary" onClick={submit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div class="modal fade" id="changePassword" tabindex="-1" aria-labelledby="changePasswordLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changePasswordLabel">
                Change Password
              </h5>
              <div>
                <button class="ui icon button" data-dismiss="modal" aria-label="Close">
                  <i className="close icon red"></i>
                </button>
              </div>
            </div>
            <div class="modal-body">
              <div class="ui equal width form text-left">
                <div class="field">
                  <label>Old Password</label>

                  <div class="ui small left icon input">
                    <input type="password" name="olpPassword" placeholder="Old Password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} />

                    <i class="lock icon button"></i>
                  </div>
                </div>

                <div class="field">
                  <label>New Password</label>

                  <div className="ui small left icon input right">
                    <input type={showPass ? "text" : "password"} name="newpassword" placeholder="New Password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />

                    <i className="lock icon"></i>

                    <button className="ui icon small button" onClick={showHidePass}>
                      {showPass ? <i className="eye icon"></i> : <i className="eye slash icon"></i>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 mb-3">
                <button class="ui button small btn-block primary" onClick={submitPassword}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default AdminProfile;
