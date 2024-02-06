import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import { useNavigate } from "react-router-dom";

function CheckIn() {
  const [bid, setBid] = useState("");

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    await axios.get("http://localhost:8300/booking/getFlight/" + bid).then((resp) => {
      const payload = {
        bookingId: bid,
        flightId: resp.data,
      };

        axios.post("http://localhost:8400/checkin/add/", payload).then((response) => {
        alert("You are checkedIn");
        navigate("/boardingpass/"+bid)
      });
    });
  };

  return (
    <div>
      <Navbar/>
      <form class="ui form">
        <div class="field">
          <label>Enter your booking Id to CheckIn</label>
          <input type="number" name="bid" placeholder="Bid" value={bid} onChange={(event) => setBid(event.target.value)} />
        </div>

        <button class="ui button" type="submit" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckIn;
