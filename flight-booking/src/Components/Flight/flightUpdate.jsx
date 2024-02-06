import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar";
import "./flightUpdate.css";

function FlightUpdate() {
  const [fid, setFid] = useState("");
  const [fname, setFname] = useState("");
  const [fnumber, setFnumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [departuretime, setDeparturetime] = useState("");
  const [arrivaltime, setArrivaltime] = useState("");
  const [fare, setFare] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8100/flight/get/" + id).then((response) => {
      setFid(response.data.id);
      setFname(response.data.flightName);
      setFnumber(response.data.flightNo);
      setSource(response.data.source);
      setDate(response.data.date);
      setDestination(response.data.destination);
      setDeparturetime(response.data.departureTime);
      setArrivaltime(response.data.arrivalTime);
      setFare(response.data.fare);

      console.log(response.data);
    });
  }, [id]);

  const submit = (event) => {
    // event.preventDefault();

    let err = [];

    setErrors(err);

    const validString = new RegExp("^[a-zA-Z]+$");
    const validEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{3}$");
    const validId = new RegExp("^[0-9]+$");
    const validFlightNumber = new RegExp("^[A-Z]{3}[0-9]{3}");

    if (!fname || !validString.test(fname)) {
      err["fnameError"] = "Enter a valid name.";
    }

    if (!fnumber || !validFlightNumber.test(fnumber)) {
      err["fnumberError"] = "Enter a valid flight Number. ";
    }

    if (!source) {
      err["sourceError"] = "Enter a valid Source. ";
    }

    if (!destination) {
      err["destinationError"] = "Enter a valid Destination. ";
    }

    if (!date) {
      err["dateError"] = "Enter a valid Date. ";
    }

    if (!departuretime) {
      err["departureTimeError"] = "Enter a valid Time. ";
    }

    if (!arrivaltime) {
      err["arrivalTimeError"] = "Enter a valid Time. ";
    }

    if (!fare) {
      err["fareError"] = "Enter a valid fare. ";
    }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      const payload = {
        id: fid,
        flightName: fname,
        flightNo: fnumber,
        source: source,
        destination: destination,
        date: date,
        departureTime: departuretime,
        arrivalTime: arrivaltime,
        fare: fare,
      };

      axios.put("http://localhost:8100/flight/update", payload).then((resp) => {
        alert("Flight is updateed Successfully");
        console.log(resp.data);
        navigate("/flights");
      });
    }
  };

  return (
    <div>
      <div className="image"></div>
      <div className="container-fluid page" style={{ padding: "1rem", margin: "0px" }}>
        <Sidebar></Sidebar>
        <div class="ui huge header">Fill the details of the flight</div>

        <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
          {/* <div class="field">
            <label>Flight Id</label>
            <input type="number" name="flight-Id" placeholder="Flight Id" value={fid} onChange={(event) => setFid(event.target.value)} />
            
         </div> */}
          <div class="field">
            <label>Flight Name</label>
            <input type="text" name="flight-name" placeholder="Flight Name" value={fname} onChange={(event) => setFname(event.target.value)} />
            {errors.fnameError && <div className="ui red mini message">{errors.fnameError}</div>}
          </div>
          <div class="field">
            <label>Flight Number</label>
            <input type="text" name="flight-number" placeholder="Flight Number" value={fnumber} onChange={(event) => setFnumber(event.target.value)} />
            {errors.fnumberError && <div className="ui red mini message">{errors.fnumberError}</div>}
          </div>
          <div class="field">
            <label>Source</label>
            <input type="text" name="source" placeholder="Source" value={source} onChange={(event) => setSource(event.target.value)} />
            {errors.sourceError && <div className="ui red mini message">{errors.sourceError}</div>}
          </div>
          <div class="field">
            <label>Destination</label>
            <input type="text" name="destination" placeholder="Destination" value={destination} onChange={(event) => setDestination(event.target.value)} />
            {errors.destinationError && <div className="ui red mini message">{errors.destinationError}</div>}
          </div>
          <div class="field">
            <label>Date</label>
            <input type="text" name="date" placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)} />
            {errors.dateError && <div className="ui red mini message">{errors.dateError}</div>}
          </div>
          <div class="field">
            <label>Departure Time</label>
            <input type="time" name="departure-time" placeholder="Departure Time" value={departuretime} onChange={(event) => setDeparturetime(event.target.value)} />
            {errors.departureTimeError && <div className="ui red mini message">{errors.departureTimeError}</div>}
          </div>
          <div class="field">
            <label>Arrival Time</label>
            <input type="time" name="arrival-time" placeholder="Arrival Time" value={arrivaltime} onChange={(event) => setArrivaltime(event.target.value)} />
            {errors.arrivalTimeError && <div className="ui red mini message">{errors.arrivalTimeError}</div>}
          </div>
          <div class="field">
            <label>Fare</label>
            <input type="text" name="fare" placeholder="Fare" value={fare} onChange={(event) => setFare(event.target.value)} />
            {errors.fareError && <div className="ui red mini message">{errors.fareError}</div>}
          </div>
          {/* <div class="field">
                    <div class="ui checkbox">
                        <input type="checkbox" tabindex="0" class="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                    </div>
                </div> */}
          <button class="ui button primary" type="submit" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightUpdate;
