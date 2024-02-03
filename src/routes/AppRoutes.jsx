import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Session from "../pages/Session";
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Session />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
