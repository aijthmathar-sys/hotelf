import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../api/bookingApi";
import { useNavigate } from "react-router-dom";
import "./BookingHistory.css";

function BookingHistory() {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      alert("Booking Cancelled ❌");
      fetchBookings();
    } catch (err) {
      alert("Cancel failed");
      console.log(err);
    }
  };

  return (
    <div className="history-page">

      <button
        className="home-btn"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>

      <h2 className="history-title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="booking-grid">

          {bookings.map((b) => (
            <div key={b.id} className="booking-card">

              <p><b>Room ID:</b> {b.room?.id}</p>
              <p><b>Check-In:</b> {b.checkInDate}</p>
              <p><b>Check-Out:</b> {b.checkOutDate}</p>
              <p><b>Guests:</b> {b.guests}</p>
              <p><b>Total:</b> ₹{b.totalPrice}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    b.status === "CONFIRMED"
                      ? "status-confirmed"
                      : "status-cancelled"
                  }
                >
                  {b.status}
                </span>
              </p>

              {b.status === "CONFIRMED" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(b.id)}
                >
                  Cancel Booking
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default BookingHistory;