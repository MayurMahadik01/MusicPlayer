import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import {
  SpotifyDashboard
} from "./components/index";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SpotifyDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}



