import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoomsByHotel } from "../api/roomApi";
import "./RoomList.css";

function RoomList() {

  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Refresh Safety
  if (!location.state) {
    return <h3>Please search hotel again.</h3>;
  }

  const { hotelId, checkIn, checkOut, guests } = location.state;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotelId) {
      getRoomsByHotel(hotelId)
        .then(res => setRooms(res.data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [hotelId]);

  if (loading) return <p>Loading rooms...</p>;
  if (rooms.length === 0) return <p>No Rooms Found</p>;

  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="room-page">

      <h2 className="room-title">Available Rooms</h2>

      <div className="room-grid">
        {rooms.map(r => {

          const totalPrice = nights * Number(r.price);

          return (
            <div
              key={r.id}
              className="room-card"
              onClick={() =>
                navigate("/booking", {
                  state: {
                    roomId: r.id,
                    checkIn,
                    checkOut,
                    guests,
                    price: Number(r.price)
                  }
                })
              }
            >
              <h3>Room {r.roomNumber} - {r.type}</h3>
              <p>Price per Night: ₹{r.price}</p>
              <p>Total for {nights} night(s): ₹{totalPrice}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default RoomList;