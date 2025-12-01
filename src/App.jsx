import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Login from "./components/Login"; // NEW LOGIN PAGE
import Dashboard from "./components/Dashboard"; // NEW DASHBOARD PAGE
import GISAppointmentForm from "./components/GISAppointmentForm"; // Example form component
// Home page ko ek component bana diya
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
        <Route path="/form/gis-appointment" element={<GISAppointmentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
