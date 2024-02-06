import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar";

function BookingDemo() {

  const userData = JSON.parse(localStorage.getItem("UserData"))

  const [quantity, setQuantity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [errors, setErrors] = useState("");

  const { fid } = useParams();

  const [arrOfObject, setArrOfObject] = useState([]);

  const navigate = useNavigate();

  const add = () => {
    let err = [];

    setErrors(err);

    const validString = new RegExp("^[a-zA-Z]+$");
    const validAge = new RegExp("^[0-9]{2}")
  

    if (!fname || !validString.test(fname)) {
      err["fnameError"] = "Enter a valid name.";
    }
    if (!lname || !validString.test(lname)) {
      err["lnameError"] = "Enter a valid name. ";
    }

    if (!gender || !validString.test(lname)) {
      err["genderError"] = "Enter a valid gender. ";
    }

    
    if (!age || !validAge.test(age)) {
      err["ageError"] = "Enter a valid age. ";
    }

    
    if (!phonenumber) {
      err["phoneError"] = "Enter a valid number. ";
    }

    const noError = Object.keys(err).length === 0;

    if (noError) {
      const payload = {
        fname: fname,
        lname: lname,
        gender: gender,
        age:age,
        phonenumber:phonenumber
      };

      setArrOfObject(arrOfObject.concat(payload));

      setFname("");
      setLname("");
      setGender("");
      setAge("");
      setPhonenumber("");
    }
  };

  return (
    <div className="container-fluid page" style={{ padding: "1rem", margin: "0px" }}>
      <Navbar></Navbar>
      <div className="container register text-left ui form p-5 m-5" style={{ width: "45vw" }}>
        <div className="heading text-center pb-5">
          <h1>Fill your personal details</h1>
        </div>
        <div class="field">
          <label>First Name</label>
          <input type="text" name="first-name" placeholder="First Name" value={fname} onChange={(event) => setFname(event.target.value)} />
          {errors.fnameError && <div className="ui red mini message">{errors.fnameError}</div>}
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="text" name="last-name" placeholder="Last Name" value={lname} onChange={(event) => setLname(event.target.value)} />
          {errors.lnameError && <div className="ui red mini message">{errors.lnameError}</div>}
        </div>
        <div class="field">
          <label>Gender</label>
          <input type="text" name="gender" placeholder="Gender" value={gender} onChange={(event) => setGender(event.target.value)} />
          {errors.genderError && <div className="ui red mini message">{errors.genderError}</div>}
        </div>
        <div class="field">
          <label>Age</label>
          <input type="number" name="age" placeholder="Age" value={age} onChange={(event) => setAge(event.target.value)} />
          {errors.ageError && <div className="ui red mini message">{errors.ageError}</div>}
        </div>
        <div class="field">
          <label>Phone Number</label>
          <input type="number" name="age" placeholder="Phone Number" value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} />
          {errors.phoneError && <div className="ui red mini message">{errors.phoneError}</div>}
       </div>

        <button className="ui button" onClick={add}>
          Add
        </button>

        <div>
          {arrOfObject.length > 0 &&
            arrOfObject.map((o) => (
              <div key={o.id}>
                <p>
                  {o.id} {o.fname} {o.lname} {o.gender}
                </p>
              </div>
            ))}
        </div>

        <button className="ui button primary" onClick={() => navigate(`/payment/${fid}`,{state:arrOfObject})}>
          Book
        </button>
      </div>
    </div>
  );
}
export default BookingDemo;
