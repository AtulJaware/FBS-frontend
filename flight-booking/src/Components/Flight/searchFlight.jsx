import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

function SearchFlight() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const submit = () => {
         navigate(`/availableFlights/${from}/${to}/${date}`)
  }

  return (
    <div>
      <div class="ui sizer vertical segment" id="header">
        <div class="ui huge header">Book Domestic Flights</div>
      </div>

      <div class="ui equal width form">
        <div class="fields">
          <div class="field">
            <label>From</label>
            <input type="text" placeholder="From" value={from} onChange={(event) => setFrom(event.target.value)} />
          </div>
          <div class="field">
            <label>To</label>
            <input type="text" placeholder="To" value={to} onChange={(event) => setTo(event.target.value)} />
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>Date</label>
            <input type="text" placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
        </div>

        <button class="ui button" type="submit" onClick={submit}>
          Search
        </button>
      </div>
      <div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default SearchFlight;
