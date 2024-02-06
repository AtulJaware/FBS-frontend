import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function FlightsRowList({ id, flightName, flightNo, source, destination, date, departureTime, arrivalTime, fare }) {
  const deleteFlight = () => {
    axios
      .delete("http://localhost:8100/flight/delete/" + id)
      .then((resp) => {
        alert(resp.data);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <tbody>
      <tr key={id}>
        <td>{id}</td>
        <td>{flightName}</td>
        <td>{flightNo}</td>
        <td>{source}</td>
        <td>{destination}</td>
        <td>{date}</td>
        <td>{departureTime}</td>
        <td>{arrivalTime}</td>
        <td>{fare}</td>
        <td>
          <Link className="ui button" to={`/updateFlight/${id}`}>
            View
          </Link>
        </td>
        <td>
          <button className="ui button red" data-toggle="modal" data-target={`#${flightNo}`}>
            Delete
          </button>
        </td>
        <div class="modal" tabindex="-1" id={flightNo}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Delete Flight</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>Are you sure you want to delete flight with Id {id}?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="ui button" data-dismiss="modal">
                  Cancel
                </button>
                <button type="button" class="ui button red" onClick={deleteFlight}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </tr>
    </tbody>
  );
}

export default FlightsRowList;
