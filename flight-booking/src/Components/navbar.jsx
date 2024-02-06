import { Link } from "react-router-dom";
import Adminlogin from "./adminlogin";
import Login from "./login";
import "./navbar.css";

function Navbar() {
  const userData = JSON.parse(localStorage.getItem("UserData"));

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary justify-content-between">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <h2>Flight Booking </h2>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ color: "#fff" }}>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/aboutUs">
                  About
                </a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>

            {(userData === null) ? (
              <div>
                <button type="ui button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                  Login or create account
                </button>

                <button type="ui button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop2">
                  Login as a Admin
                </button>
              </div>
            ) : (
              <div style={{ color: "#fff" }}>
                <Link to={"/myProfile"}>Hi {userData.username}</Link>
              </div>
            )}

            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content p-3">
                  <div class="modal-header">
                    <h3 class="modal-title fs-5" id="staticBackdropLabel" style={{ color: "black" }}>
                      Login or SignUp
                    </h3>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body p-3">
                    <Login></Login>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content p-3">
                  <div class="modal-header">
                    <h3 class="modal-title fs-5" id="staticBackdropLabel" style={{ color: "black" }}>
                      Login
                    </h3>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body p-3">
                    <Adminlogin></Adminlogin>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
