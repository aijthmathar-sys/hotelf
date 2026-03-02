import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchHotels } from "../api/hotelApi";
import "./HotelList.css";

function HotelList() {

    const location = useLocation();
    const navigate = useNavigate();

    const { city, checkIn, checkOut, guests } = location.state || {};

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        if(city){
            searchHotels(city)
            .then(res => {

                const hotelList = Array.isArray(res.data)
                    ? res.data
                    : res.data.content || res.data.data || [];

                setHotels(hotelList);

            })
            .catch(err => console.log(err));
        }
    }, [city]);

    return (
        <div className="hotel-page">

            <h2 className="hotel-title">
                Hotels in {city}
            </h2>

            {hotels.length === 0 ? (
                <p>No Hotels Found</p>
            ) : (
                <div className="hotel-grid">

                    {hotels.map(hotel => (

                        <div 
                            key={hotel.id}
                            className="hotel-card"
                            onClick={() => navigate("/rooms", {
                                state: {
                                    hotelId: hotel.id,
                                    checkIn,
                                    checkOut,
                                    guests
                                }
                            })}
                        >

                            <h3>{hotel.name}</h3>
                            <p><b>Address:</b> {hotel.address}</p>
                            <p><b>City:</b> {hotel.city}</p>
                            <p><b>Description:</b> {hotel.description}</p>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default HotelList;