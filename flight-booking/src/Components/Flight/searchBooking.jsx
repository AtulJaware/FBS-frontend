import axios from "axios";
import React from "react";
import { useState } from "react";


function SearchBooking() {

    const [id, setId] = useState('')
    const [details, setDetails] = useState({})

    const submit = () => {
        axios.get("http://localhost:8300/booking/" + id).then(response => {
            setDetails(response.data);
        })
    }


    return (
        <div>
            <div class="ui sizer vertical segment" id="header">
                <div class="ui huge header">Enter your reference Id</div>
            </div>

            <div class="ui equal width form">
                <div class="fields">
                    <div class="field">
                        <label>Id</label>
                        <input type="text" placeholder="Id" value={id} onChange={(event) => setId(event.target.value)} />
                    </div>
                </div>
                <button class="ui button" type="submit" onClick={submit}>Search</button>
            </div>
            <div>
                <table border={2}>
                    <tbody>
                        <tr>
                            <td>{details.flightName}</td>
                            <td>{details.source}</td>
                            <td>{details.destination}</td>
                            <td>{details.date}</td>
                            <td>{details.departureTime}</td>
                            <td>{details.arrivalTime}</td>
                        </tr>

                    </tbody>
                </table>

            </div>
        </div>

    )

}

export default SearchBooking;