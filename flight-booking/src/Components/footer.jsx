import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="row">
        <div className="col-md p-2 m-4">
          <div>
            <h2 className="">Key Features</h2>
            <ul className="text-left" style={{width:"fit-content",margin:"auto"}}>
              <li>
                <i className="plane icon"></i> Easy and Quick Flight Search
              </li>
              <li>
                <i className="credit card icon"></i> Secure Payment Options
              </li>
              <li>
                <i className="calendar icon"></i> Flexible Booking Options
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md p-3 m-4">
          <div>
            <h2>Meet the Team</h2>
            <div className="team-member">
              <h3>Atul Jaware</h3>
              <h4>Founder & Developer</h4>
              <h3>Flight Booking System</h3>
            </div>
          </div>
        </div>
        <div className="col-md p-3 m-4">
          {" "}
          <div>
            <h2>Contact Us</h2>
            <h4>If you have any questions or feedback, please feel free to reach out to us:</h4>
            <Link><i class="envelope outline icon large"></i></Link>
            <Link><i class="facebook icon large"></i></Link>
            <Link><i class="instagram icon large"></i></Link>

            <Link><i class="phone icon large"></i></Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <footer>
          <p>&copy; 2024 Flight Booking System</p>
          <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
