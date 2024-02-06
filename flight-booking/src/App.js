import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/signin";
import AddFlight from "./Components/Flight/flightAdd";
import Home from "./Components/Home";
import SearchFlight from "./Components/Flight/searchFlight";
import FlightGetAll from "./Components/Flight/flightGetAll";
import FlightGet from "./Components/Flight/flightGet";
import BookFlight from "./Components/Flight/bookFlight";
import SearchBooking from "./Components/Flight/searchBooking";
import CheckIn from "./Components/Flight/checkIn";
import Login from "./Components/login";
import Profile from "./Components/profile";
import AvailableFlights from "./Components/Flight/availableFlights";
import Footer from "./Components/footer";
import About from "./Components/about";
import Payment from "./Components/payment";
import Sidebar from "./Components/sidebar";
import Adminpage from "./Components/adminpage";
import Users from "./Components/users";
import Flights from "./Components/Flight/flights";
import BoardingPass from "./Components/Flight/boardingPass";
import BookingDemo from "./Components/Flight/bookingDemo";
import Adminlogin from "./Components/adminlogin";
import ForbiddenPage from "./Components/forbiddenPage";
import Bookings from "./Components/bookings";
import FlightUpdate from "./Components/Flight/flightUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/addFlight" element={<AddFlight />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/search" element={<SearchFlight />}></Route>
          <Route path="/getAll" element={<FlightGetAll />}></Route>
          <Route path="/updateFlight/:id" element={<FlightUpdate />}></Route>
          <Route path="/getFlight/:id" element={<FlightGet />}></Route>
          <Route path="/bookFlight/:fid" element={<BookFlight />}></Route>
          <Route path="/checkin" element={<CheckIn />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/myProfile" element={<Profile />}></Route>
          <Route path="/availableFlights/:from/:to/:date" element={<AvailableFlights></AvailableFlights>}></Route>
          <Route path="/footer" element={<Footer></Footer>}></Route>
          <Route path="/aboutUs" element={<About />}></Route>
          <Route path="/sb" element={<Sidebar></Sidebar>}></Route>
          <Route path="/adminpage" element={<Adminpage />}></Route>
          <Route path="/payment/:fid" element={<Payment></Payment>}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/flights" element={<Flights />}></Route>
          <Route path="/boardingPass/:bid" element={<BoardingPass />}></Route>
          <Route path="/searchBooking" element={<SearchBooking></SearchBooking>}></Route>
          <Route path="/adminlogin" element={<Adminlogin />}></Route>
          <Route path="/bookingDemo/:fid" element={<BookingDemo/>}></Route>
          <Route path="/myBookings" element={<Bookings/>}></Route>
          <Route path="/forbidden" element={<ForbiddenPage/>}></Route>

        

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
