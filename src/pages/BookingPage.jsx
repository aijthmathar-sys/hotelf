import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkRoomAvailability } from "../api/AvailabilityApi";
import "./BookingPage.css";

function BookingPage() {

  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <h3>No booking data found. Please select a room again.</h3>;
  }

  const { roomId, checkIn, checkOut, guests, price } = location.state;

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    )
  );

  const totalPrice = nights * Number(price);

  const [available, setAvailable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkRoomAvailability(roomId, checkIn, checkOut)
      .then(res => setAvailable(res.data))
      .catch(err => console.log(err));
  }, [roomId, checkIn, checkOut]);

  // 💳 Payment Handler with Login Check
  const handlePayment = async () => {

    if (loading) return;

    try {
      setLoading(true);

      // 🔐 Check Login by calling secure endpoint
      await axios.get(import.meta.env.VITE_API_URL, {
        withCredentials: true
      });

    } catch {
      alert("Please login to continue 🔐");
      navigate("/login");
      return;
    }

    try {

      const res = await axios.post(
        import.meta.env.VITE_API_URL,
        {
          roomId,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests,
          amount: totalPrice
        },
        { withCredentials: true }
      );

      const orderId = res.data;

      const options = {
        key: "rzp_test_SKfh1FJYF4os6h",
        amount: totalPrice * 100,
        currency: "INR",
        order_id: orderId,

        handler: async function (response) {

          await axios.post(
            "http://localhost:9090/api/payment/verify",
            {
              roomId,
              checkInDate: checkIn,
              checkOutDate: checkOut,
              guests,
              totalPrice,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            },
            { withCredentials: true }
          );

          alert("Booking Confirmed ✅");
          navigate("/booking-history");
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed ❌");
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">

      <div className="booking-card">

        <h2>Booking Details</h2>

        <p><b>Check In:</b> {checkIn}</p>
        <p><b>Check Out:</b> {checkOut}</p>
        <p><b>Guests:</b> {guests}</p>
        <p><b>Total Nights:</b> {nights}</p>
        <p className="price">Total Price: ₹{totalPrice}</p>

        {available === null && <p>Checking availability...</p>}

        {available === false && (
          <h3 className="not-available">Room Not Available ❌</h3>
        )}

        {available === true && (
          <div className="available-box">
            <h3>Room Available ✅</h3>
            <button onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Pay Now 💳"}
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default BookingPage;