import Sidebar from "../sidebar";
import React from "react";
import FlightGetAll from "./flightGetAll";


function Flights(){
    return(
        <div>
             <Sidebar/>
              <FlightGetAll></FlightGetAll>
        </div>
    )
}

export default Flights;