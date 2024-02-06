import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Adminlogin() {
  const adminData = JSON.parse(localStorage.getItem("AdminData"));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState("");

  const submit = () => {
    let err = [];

    setErrors(err);

    if (!username) {
      err["usernameError"] = "Please enter username.";
    }

    if (!password) {
      err["passwordError"] = "Please enter password. ";
    }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      const payload = {
        username: username,
        password: password,
      };

      axios
        .post("http://localhost:8500/user/authenticate", payload)
        .then((response) => {
          localStorage.setItem("admintoken", JSON.stringify(response.data));

          axios
            .get("http://localhost:8500/user/admin/login/" + username + "/" + password, {
              headers: {
                Authorization: "Bearer " + response.data,
              },
            })
            .then((resp) => {
              alert("Login successfull");
              localStorage.setItem("AdminData", JSON.stringify(resp.data));
              navigate("/adminpage");
            })
            .catch((error) => {
              alert(error.response.data);
              console.log(error.response.data);
            });
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };

  return (
    <div>
      <div class="ui form text-left">
      <div class="field">
          <label>Username</label>
          <input placeholder="Username" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          {errors.usernameError && <div className="ui red mini message">{errors.usernameError}</div>}
        </div>
        <div class="field">
          <label>Password</label>
          <input placeholder="Password" type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
          {errors.passwordError && <div className="ui red mini message">{errors.passwordError}</div>}
        </div>
        <div>
          <button type="button" class="ui button mini" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="ui button primary mini" onClick={submit}>
            Login
          </button>
        </div>
        {/* <div className="field text-center" style={{ color: "black" }}>
          <p>
            Don't have an account ? <Link to={"/signin"}>Create Account</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Adminlogin;
