import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./navbar";

function Payment() {

  const userData = JSON.parse(localStorage.getItem("UserData"));

  const [flight, setFlight] = useState({});

  const { fid } = useParams();

  const location = useLocation();

  const arr = location.state;

  const navigate = useNavigate()

  console.log(arr);

  useEffect(() => {
    axios.get("http://localhost:8100/flight/get/" + fid).then((response) => {
      setFlight(response.data);
    });
  }, [fid]);

  const book = async () => {
    const bookPayload = {
      // get fare of flight by flightId
      userId: userData.id,
      quantity: arr.length,
      totalFare: arr.length * flight.fare,
    };

    await axios.post("http://localhost:8300/booking/bookingDetails/book/", bookPayload).then((resp) => {
      arr.map(async (o) => {
        const payload = {
          id: o.id,
          firstName: o.fname,
          lastName: o.lname,
          gender: o.gender,
          age: o.age,
          phoneNumber: o.phonenumber,
          bookingFlightDetailsId: resp.data.id,
        };

        await axios.post("http://localhost:8300/booking/book/" + fid, payload).then((resp) => {
          console.log(resp.data);
        });
      });
      alert(`Successfully booked ${arr.length} tickets`);
      navigate("/myBookings");
    });
  };

  const handleCheckout = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const options = {
        key: "rzp_test_4z3PnPNDPUNvr3", // Enter your razorpay key here
        // Cok2ejoZz2bEitqNTr67mwLX
        amount: (arr.length * flight.fare) * 100, // amount in paise
        currency: "INR",
        name: "Flight Fare",
        description: "Test Transaction",
        image: "YOUR_LOGO_URL", // Add your logo URL here
        handler: function (response) {
          //   alert(response);
          //   console.log(response);
          alert("Payment is successfull");
          book();
        },
        prefill: {
          name: userData.username,
          email: userData.email,
          contact: 8638902619,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex mt-3 pb-4" style={{ justifyContent: "center" }}>
        <div class="ui raised card">
          <div class="content">
            <div class="header d-flex mb-3" style={{ justifyContent: "space-between" }}>
              <div class="">
                <h4 className="mb-1" style={{ fontSize: "11px", color: "#777", fontWeight: "400" }}>
                  {flight.flightNo}
                </h4>
                <p style={{ fontSize: "13px" }}>{flight.flightName}</p>
              </div>
              <div>
                <h4 className="mb-1" style={{ fontSize: "11px", color: "#777", fontWeight: "400" }}>
                  Date
                </h4>
                <p style={{ fontSize: "13px" }}>{flight.date}</p>
              </div>
            </div>
            <hr></hr>
            <div class="description">
              <div className="d-flex m-3" style={{ justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "11px", color: "#777", fontWeight: "400" }}>From </p>
                  <p style={{ fontSize: "13px", color: "#000", fontWeight: "600" }}> {flight.source}</p>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#777", fontWeight: "400" }}>To </p>
                  <p style={{ fontSize: "13px", color: "#000", fontWeight: "600" }}>{flight.destination}</p>
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#777", fontWeight: "400" }}>Departure Time</p>
                  <p style={{ fontSize: "13px", color: "#000", fontWeight: "600" }}>{flight.departureTime}</p>
                </div>
              </div>
              <hr></hr>
              <div>
                <div className="mt-4 text-left">
                  <h4 style={{ color: "#000" }}>Passengers ({location.state.length})</h4>
                </div>
                <div className="mt-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arr.map((l) => (
                        <tr>
                          <td>
                            {l.fname} {l.name}
                          </td>
                          <td>{l.age}</td>
                          <td>{l.phonenumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr></hr>
              <div>
                <div className="mt-4 text-left">
                  <h4 style={{ color: "#000" }}>
                    Total : <span style={{ color: "#777" }}> &#8377; {location.state.length * flight.fare}</span>
                  </h4>
                </div>
              </div>
              <div className="mt-3">
                <button className="ui button mini btn-block primary" onClick={handleCheckout}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
