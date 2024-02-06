import Navbar from "../navbar";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function AvailableFlights() {
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const [list, setList] = useState([]);

  const { from, to, date } = useParams();

  const warning = () => {
    if(userData===null){
      alert("Please Login")
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8200/search/getAll", {
        params: {
          source: from,
          destination: to,
          date: date,
        },
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  });

  return (
    <div className="flights">
      <Navbar></Navbar>
      <div className="m-3 p-3" style={{ display: "inline-grid" }}>
        {list.length > 0 ? (
          list.map((flight) => (
            <div class="ui cards">
              <div class="card">
                <div class="content">
                  <div class="header">{flight.flightName}</div>
                  <div class="description">
                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                      <div>
                        <p>
                          from:<b>{flight.source}</b>
                        </p>
                      </div>
                      <div>
                        <p>
                          to:<b>{flight.destination}</b>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                      <div>
                        <p>
                          departure:<b>{flight.departureTime}</b>
                        </p>
                      </div>
                      <div>
                        <p>
                          arrival:<b>{flight.arrivalTime}</b>
                        </p>
                      </div>
                    </div>
                    <div className="d-flex" style={{ justifyContent: "space-between" }}>
                      <div>
                        <p>
                          Fare:<b>{flight.fare}</b>
                        </p>
                      </div>
                      <div>
                        <p>
                          Date:<b>{flight.date}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui bottom attached button">
                  <Link to={userData ? `/bookingDemo/${flight.id}` : ""} onClick={warning}>
                    <i class="add icon"></i>
                    Book Flight
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h1>Sorry No flights are available</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableFlights;
