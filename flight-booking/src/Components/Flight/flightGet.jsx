import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function FlightGet() {
  const { id } = useParams();

  const [flight, setFlight] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8281/flight/get/" + id).then((response) => {
      setFlight(response.data);
    });
  }, [id]);

  return (
    <div>
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
             <Link to={`/updateFlight/${id}`}>
              <i class="update icon"></i>
              Update Flight
            </Link> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightGet;
