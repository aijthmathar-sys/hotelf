import { useEffect, useState } from "react";
import {
  getAllHotels,
  updateHotel,
  deleteHotel,
  addHotel
} from "../api/hotelApi";

import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomsByHotel
} from "../api/roomApi";

import "./AdminDashboard.css";

function AdminDashboard() {

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState({});
  const [editHotel, setEditHotel] = useState(null);
  const [editRoom, setEditRoom] = useState(null);

  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    address: "",
    pricePerNight: "",
    description: ""
  });

  const [roomForm, setRoomForm] = useState({
    hotelId: "",
    roomNumber: "",
    type: "",
    price: "",
    available: true
  });

  // LOAD HOTELS
  const loadHotels = () => {
    getAllHotels().then(res => {
      setHotels(res.data);
      res.data.forEach(h => loadRooms(h.id));
    });
  };

  // LOAD ROOMS
  const loadRooms = async (hotelId) => {
    const res = await getRoomsByHotel(hotelId);
    setRooms(prev => ({ ...prev, [hotelId]: res.data }));
  };

  useEffect(() => {
    loadHotels();
  }, []);

  // HOTEL ADD
  const handleAddHotel = async () => {
    await addHotel(newHotel);
    setNewHotel({
      name: "",
      city: "",
      address: "",
      pricePerNight: "",
      description: ""
    });
    loadHotels();
  };

  // HOTEL UPDATE
  const handleHotelUpdate = async () => {
    await updateHotel(editHotel.id, editHotel);
    setEditHotel(null);
    loadHotels();
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    loadHotels();
  };

  // ROOM ADD
  const handleAddRoom = async () => {
    await createRoom(roomForm.hotelId, roomForm);
    setRoomForm({
      hotelId: "",
      roomNumber: "",
      type: "",
      price: "",
      available: true
    });
    loadRooms(roomForm.hotelId);
  };

  // ROOM UPDATE
  const handleRoomUpdate = async () => {
    await updateRoom(editRoom.id, editRoom);
    setEditRoom(null);
    loadRooms(editRoom.hotel.id);
  };

  // ROOM DELETE
  const handleDeleteRoom = async (roomId, hotelId) => {
    await deleteRoom(roomId);
    loadRooms(hotelId);
  };

  return (
    <div className="admin-page">

      <div className="hotel-section">
        <h2>Hotel Management</h2>

        {/* HOTEL FORM */}
        <input
          placeholder="Name"
          value={editHotel ? editHotel.name : newHotel.name}
          onChange={(e) =>
            editHotel
              ? setEditHotel({ ...editHotel, name: e.target.value })
              : setNewHotel({ ...newHotel, name: e.target.value })
          }
        />

        <input
          placeholder="City"
          value={editHotel ? editHotel.city : newHotel.city}
          onChange={(e) =>
            editHotel
              ? setEditHotel({ ...editHotel, city: e.target.value })
              : setNewHotel({ ...newHotel, city: e.target.value })
          }
        />

        <input
          placeholder="Address"
          value={editHotel ? editHotel.address : newHotel.address}
          onChange={(e) =>
            editHotel
              ? setEditHotel({ ...editHotel, address: e.target.value })
              : setNewHotel({ ...newHotel, address: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={editHotel ? editHotel.pricePerNight : newHotel.pricePerNight}
          onChange={(e) =>
            editHotel
              ? setEditHotel({ ...editHotel, pricePerNight: e.target.value })
              : setNewHotel({ ...newHotel, pricePerNight: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={editHotel ? editHotel.description : newHotel.description}
          onChange={(e) =>
            editHotel
              ? setEditHotel({ ...editHotel, description: e.target.value })
              : setNewHotel({ ...newHotel, description: e.target.value })
          }
        />

        <button onClick={editHotel ? handleHotelUpdate : handleAddHotel}>
          {editHotel ? "Update Hotel" : "Add Hotel"}
        </button>

        {/* HOTEL LIST */}
        <div className="hotel-list">
          {hotels.map(h => (
            <div className="hotel-card" key={h.id}>

              <h4>{h.name}</h4>
              <p>{h.city}</p>
              <p>{h.address}</p>

              <button onClick={() => setEditHotel(h)}>Edit</button>
              <button onClick={() => handleDeleteHotel(h.id)}>Delete</button>

              {/* ADD ROOM */}
              <div className="room-add">
                <h5>Add Room</h5>

                <input
                  placeholder="Room No"
                  onChange={(e)=>setRoomForm({...roomForm, hotelId:h.id, roomNumber:e.target.value})}
                />
                <input
                  placeholder="Type"
                  onChange={(e)=>setRoomForm({...roomForm, type:e.target.value})}
                />
                <input
                  placeholder="Price"
                  onChange={(e)=>setRoomForm({...roomForm, price:e.target.value})}
                />

                <button onClick={handleAddRoom}>Add Room</button>
              </div>

              {/* ROOM LIST */}
              <div className="room-list">
                <h5>Rooms</h5>

                {rooms[h.id]?.map(r => (
                  <div key={r.id} className="room-card">

                    {editRoom?.id === r.id ? (
                      <>
                        <input
                          value={editRoom.roomNumber}
                          onChange={(e)=>setEditRoom({...editRoom, roomNumber:e.target.value})}
                        />
                        <input
                          value={editRoom.type}
                          onChange={(e)=>setEditRoom({...editRoom, type:e.target.value})}
                        />
                        <input
                          value={editRoom.price}
                          onChange={(e)=>setEditRoom({...editRoom, price:e.target.value})}
                        />

                        <button onClick={handleRoomUpdate}>Save</button>
                        <button onClick={()=>setEditRoom(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>Room: {r.roomNumber}</p>
                        <p>Type: {r.type}</p>
                        <p>₹ {r.price}</p>

                        <button onClick={()=>setEditRoom(r)}>Edit</button>
                        <button onClick={()=>handleDeleteRoom(r.id, h.id)}>Delete</button>
                      </>
                    )}

                  </div>
                ))}

              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;