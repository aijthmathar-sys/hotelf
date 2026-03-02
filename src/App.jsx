import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HotelList from "./pages/HotelList";
import RoomList from "./pages/RoomList";
import BookingPage from "./pages/BookingPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./admin/AdminDashboard";

import Navbar from "./components/Navbar";
import BookingHistory from "./pages/BookingHistory";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>

      {/* Top Navbar */}
      <Navbar />

      <Routes>

        {/* USER FLOW */}
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/booking" element={<BookingPage />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

    </Router>
  );
}

export default App;