import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

function Bookings() {
  const userData = JSON.parse(localStorage.getItem("UserData"));
  //   const [list, setList] = useState([]);
  const [detailList, setDetailList] = useState([]);

  const [arr, setArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: initialList } = await axios.get("http://localhost:8300/booking/bookingDetails/" + userData.id);

      const nestedPromises = initialList.map(async (item) => {
        const { data: nestedlList } = await axios.get("http://localhost:8300/booking/details/" + item.id);
        return nestedlList;
      
      });

      // console.log(nestedPromises)

      const allNestedList = await Promise.all(nestedPromises);
      const mergeList = [].concat(...allNestedList);
      // console.log(mergeList)
      setArr(mergeList);
    };
    fetchData();
  }, [userData.id]);

  const submit =  async (bookingid, flightid) => {
    const payload = {
      bookingId: bookingid,
      flightId: flightid,
    };

   await axios.post("http://localhost:8400/checkin/add", payload).then((response) => {
      alert("You are checkedIn");
      window.location.reload();
      // console.log(response.data);
    });

    console.log(payload)
  };

  return (
    <div className="container">
      <Navbar />
      <div class="ui huge header m-3">
        <h2>Booking Details</h2>
      </div>
      <table class="ui red table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Flight Name</th>
            <th>Flight Number</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((l) => (
            <tr>
              <td>{l.id}</td>
              <td>{l.flightName}</td>
              <td>{l.flightNo}</td>
              <td>{l.source}</td>
              <td>{l.destination}</td>
              <td>{l.date}</td>
              <td>{l.departureTime}</td>
              <td>{l.arrivalTime}</td>
              <td>{l.firstName}</td>
              <td>{l.lastName}</td>
              <td>{l.fare}</td>
              <td>
                {l.checkedIn ? (
                  <Link to={`/boardingpass/` + l.id}>Boarding Pass</Link>
                ) : (
                  <button className="ui button primary" onClick={() => submit(l.id, l.flightId)}>
                    Check In
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
