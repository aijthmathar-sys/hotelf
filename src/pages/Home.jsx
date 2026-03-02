import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    navigate("/hotels", {
      state: { city, checkIn, checkOut, guests }
    });
  };

  return (
    <div className="home-container">

      {/* LEFT DESIGN */}
      <div className="left-section">
        <h1>StayFinder</h1>
        <p>
          Find the perfect stay for your trip.
          Book hotels easily with secure payment.
        </p>
      </div>

      {/* RIGHT SEARCH BOX */}
      <div className="search-box">
        <h2>Search Hotels</h2>

        <input
          placeholder="City"
          onChange={(e)=>setCity(e.target.value)}
        />

        <input
          type="date"
          onChange={(e)=>setCheckIn(e.target.value)}
        />

        <input
          type="date"
          onChange={(e)=>setCheckOut(e.target.value)}
        />

        <input
          type="number"
          placeholder="Guests"
          onChange={(e)=>setGuests(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

    </div>
  );
}

export default Home;