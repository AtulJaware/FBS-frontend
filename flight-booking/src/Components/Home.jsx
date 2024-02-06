import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import "./Home.css";
import Navbar from "./navbar";

function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState("");

  const submit = () => {
    let err = [];

    setErrors(err);

    const validString = new RegExp("^[a-zA-Z]+$");
    const validDate = new RegExp("^d{2}-d{2}-d{4}");

    if (!from || !validString.test(from)) {
      err["fromError"] = "Enter a valid Source.";
    }
    if (!to || !validString.test(to)) {
      err["toError"] = "Enter a valid Destination.";
    }
    if(!date){
      err["dateError"] = "Enter a valid Date. "
    }

    // if (!date || !validDate.test(date)) {
    //   err["dateError"] = "Enter a valid Date";
    // }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      // alert(date);
      navigate(`/availableFlights/${from}/${to}/${date}`);
    }
  };

  return (
    <div>
      <div className="home">
        <Navbar></Navbar>
        <div className="body">
          <div className="container">
            <div className="content">
              <div class="ui equal width form">
                <div class="fields text-left">
                  <div class="p-4 field">
                    <label>From</label>
                    <input type="text" placeholder="From" value={from} onChange={(event) => setFrom(event.target.value)} />
                    {errors.fromError && <div className="ui red mini message">{errors.fromError}</div>}
                  </div>
                  <div class="p-4 field">
                    <label>To</label>
                    <input type="text" placeholder="To" value={to} onChange={(event) => setTo(event.target.value)} />
                    {errors.toError && <div className="ui red mini message">{errors.toError}</div>}
                  </div>
                  <div class="p-4 field">
                    <label>Date</label>
                    <input type="date" placeholder="Date" value={date} onChange={(event) => setDate(event.target.value)} />
                    {errors.dateError && <div className="ui red mini message">{errors.dateError}</div>}
                  </div>
                </div>
              </div>
              <div className="search-btn">
                <button class="ui large primary button" type="submit" onClick={submit}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
