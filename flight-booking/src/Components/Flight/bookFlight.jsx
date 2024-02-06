import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar";

function BookFlight() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");


  const { fid } = useParams();

  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();

    const payload = {
      firstName: fname,
      lastName: lname,
      gender: gender,
      age:age,
      phoneNumber:phonenumber
    };

    axios.post("http://localhost:8300/booking/book/" + fid, payload).then((resp) => {
      alert("Flight is added Successfully");
      navigate("/checkIn")
    });
  };

  return (
    <div className="container-fluid page" style={{ padding: "1rem", margin: "0px" }}>
      <Navbar></Navbar>
      <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
        <div className="heading text-center pb-5">
          <h1>Fill y our personal details</h1>
        </div>
        <div class="field">
          <label>First Name</label>
          <input type="text" name="first-name" placeholder="First Name" value={fname} onChange={(event) => setFname(event.target.value)} />
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="text" name="last-name" placeholder="Last Name" value={lname} onChange={(event) => setLname(event.target.value)} />
        </div>
        <div class="field">
          <label>Gender</label>
          <input type="text" name="gender" placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)} />
        </div>
        <div class="field">
          <label>Age</label>
          <input type="number" name="age" placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)} />
        </div>
        <div class="field">
          <label>Phone Number</label>
          <input type="number" name="age" placeholder="Phone Number" value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} />
        </div>

        {/* <div class="field">
            <div class="ui checkbox">
                <input type="checkbox" tabindex="0" class="hidden" />
                <label>I agree to the Terms and Conditions</label>
            </div>
        </div> */}
        <button class="ui button primary" type="submit" onClick={submit}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default BookFlight;
