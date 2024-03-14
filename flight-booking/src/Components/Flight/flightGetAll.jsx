import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FlightsRowList from "./flightsRowList";

function FlightGetAll() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8281/flight/getAll").then((response) => {
      setList(response.data);
    });
  });

  const addFlight = () => {
    navigate("/addFlight");
  };

  return (
    <div>
      <div className="container">
        <div class="ui huge header m-3">
          <h2>View All the flights</h2>
        </div>

        <div>
          <table class="ui red table">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Flight Name</th>
                <th>Flight Number</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Price</th>
                <th>
                  <button className="ui button primary" onClick={addFlight}>
                    Add Flight
                  </button>
                </th>
              </tr>
            </thead>
            {list.length > 0 &&
              list.map((l) => (
                <FlightsRowList
                  id={l.id}
                  flightName={l.flightName}
                  flightNo={l.flightNo}
                  source={l.source}
                  destination={l.destination}
                  date={l.date}
                  departureTime={l.departureTime}
                  arrivalTime={l.arrivalTime}
                  fare={l.fare}></FlightsRowList>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlightGetAll;
