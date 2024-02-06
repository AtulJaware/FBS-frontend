import Navbar from "./navbar";
import "./about.css";
import Footer from "./footer";

function About() {
  return (
    <div>
      <div className="about">
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="details row">
          <div className="col-md-6"></div>
          <div className="col-md-6 text-left">
            <div className="p-3 mt-5">
              <h1 style={{ fontSize: "2.5rem" }}>About Our Flight Booking System</h1>
              <div>
                <p style={{ fontSize: "1.5rem" }}>
                  Welcome to our state-of-the-art flight booking system! We are dedicated to making your travel experience seamless and enjoyable. Our platform offers a wide range of features and
                  benefits to enhance your flight booking process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default About;
