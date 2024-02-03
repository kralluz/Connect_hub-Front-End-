import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Session from "../pages/Session";
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/session" element={<Session />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
