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

import GISAppointmentForm from "./components/GISAppointmentForm";
import DigyaanshForm from "./components/DigyaanshForm";
import RaiderAppointmentForm from "./components/RaiderAppointmentForm";

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

        {/* Forms */}
        <Route path="/form/gis-appointment" element={<GISAppointmentForm />} />
        <Route path="/form/digyaansh-appointment" element={<DigyaanshForm />} />
        <Route path="/form/raider-appointment" element={<RaiderAppointmentForm />} />

        {/* ⭐ NEW ROUTE FIX ⭐ */}
        <Route
          path="/form/digyaansh-experience"
          element={<DeepakExperience />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
