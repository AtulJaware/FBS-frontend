import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function BookingDEtailList({ id, userId, quantity, totalFare }) {
  const [list, setList] = useState([]);

  const submit = (bid,fid) => {

    const payload = {
      bookingId: bid,
      flightId: fid,
    };

    axios.post("http://localhost:8400/checkin/add/", payload).then((response) => {
      alert("You are checkedIn");
      window.location.reload();
      console.log(response.data);
    });
  };

  useEffect(() => {
   
  }, [id]);

  return (
    <div>
      {list.map((l) => (
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
              <Link to = {`/boardingpass/`+l.id}>Boarding Pass</Link>
            ) : (
              <button className="ui button primary" onClick={()=>submit(l.id,l.flightId)}>
                Check In
              </button>
            )}
          </td>
        </tr>
      ))}
    </div>
  );
}

export default BookingDEtailList;
