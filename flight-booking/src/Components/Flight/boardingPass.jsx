import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";

function BoardingPass() {
  const [list, setList] = useState({});

  const [isPrinting, setIsPrinting] = useState(false);
  const handlePrint = (areaID) => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 0);
  };

  const { bid } = useParams();

  useEffect(() => {
    axios.get("http://localhost:8300/booking/" + bid).then((response) => {
      console.log(response.data);
      setList(response.data);
    });
  }, [bid]);

  return (
    <div className="container" style={{background:"white"}}>
      <div className="m-5 text-left printArea" style={{ borderRadius: "20px" , border:"1px solid #aaa"}}>
        <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "center", background: "darkblue", color: "#fff", borderRadius: "20px 20px 0px 0px" }}>
          <div className="p-2 ml-2">
            <i className="plane icon"></i>
          </div>
          <div className="p-2 mr-3">
            <h4>Boarding Pass</h4>
          </div>
        </div>

        <div className="">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="mt-4 ml-4">
              <p>Passenger Name</p>
              <h2 className="m-0">
                {list.firstName} {list.lastName}
              </h2>
            </div>

            <div className="mt-4 mr-4" style={{ height: "auto", margin: "0 auto", maxWidth: 80, width: "100%" }}>
              <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={JSON.stringify(list)} viewBox={`0 0 256 256`} />
            </div>
          </div>

          <div className="d-flex mt-4 ml-4 mb-3" style={{ justifyContent: "space-between" }}>
            <div>
              <p>From</p>
              <h2 className="m-0">{list.source}</h2>
            </div>
            <div className="mr-4">
              <p>Carrier</p>
              <h2 className="m-0">{list.flightName}</h2>
            </div>
          </div>

          <div className="d-flex mt-4 ml-4 mb-3" style={{ justifyContent: "space-between" }}>
            <div>
              <p>To</p>
              <h2 className="m-0">{list.destination}</h2>
            </div>
            <div>
              <p>Date</p>
              <h2 className="m-0">{list.date}</h2>
            </div>
            <div className="mr-4">
              <p>Time</p>
              <h2 className="m-0">{list.departureTime}</h2>
            </div>
          </div>

          <div className="d-flex mt-4 ml-4 mb-3" style={{ justifyContent: "space-between" }}>
            <div>
              <p>Flight</p>
              <h2 className="m-0">{list.flightNo}</h2>
            </div>
            <div>
              <p>Seat</p>
              <h2 className="m-0">55L</h2>
            </div>
            <div>
              <p>Gate</p>
              <h2 className="m-0">22</h2>
            </div>
            <div className="mr-4">
              <p>Board Till</p>
              <h2 className="m-0">{list.departureTime}</h2>
            </div>
          </div>
        </div>

        <div className="" style={{ height: "30px", background: "darkblue", borderRadius: "0px 0px 20px 20px" }}></div>
      </div>

      <div className="">
        <button onClick={() => handlePrint("printArea")} style={{ display: isPrinting ? "none" : "block" }} className="ui button mini primary">
          Download
        </button>
      </div>
    </div>
  );
}

export default BoardingPass;
