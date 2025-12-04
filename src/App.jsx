import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateUserForm from "./components/Form/CreateUserForm";
import GISAppointmentForm from "./components/GISAppointmentForm";
import DigyaanshForm from "./components/DigyaanshForm";
import RaiderAppointmentForm from "./components/RaiderAppointmentForm";
import UserDashboard from "./components/User/UserDashboard";
import ExcelUpload from "./components/ExcelUpload";
import AdminSweeperData from "./components/AdminSweeperData";
import UserList from "./components/UserList";

// ⭐ Experience Certificate Component
import DeepakExperience from "./components/ExperienceCertificate";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />

        {/* Forms */}
        <Route path="/form/gis-appointment" element={<GISAppointmentForm />} />
        <Route path="/form/digyaansh-appointment" element={<DigyaanshForm />} />
        <Route path="/form/raider-appointment" element={<RaiderAppointmentForm />} />



<Route path="/users" element={<UserList />} />


<Route path="/admin/sweeper-data" element={<AdminSweeperData />} />

<Route path="/upload-excel" element={<ExcelUpload />} />

        {/* ⭐ NEW ROUTE FIX ⭐ */}
        <Route
          path="/form/digyaansh-experience"
          element={<DeepakExperience />}
        />
        <Route path="/form/create-user" element={<CreateUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
