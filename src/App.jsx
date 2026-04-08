import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SavedPage from './components/SavedPage';
import './App.css';

function App() {
  const [savedListings, setSavedListings] = useState([]);

  const handleSaveListing = (listing) => {
    if (!savedListings.some(item => item.id === listing.id)) {
      setSavedListings([...savedListings, listing]);
    }
  };

  const handleRemoveListing = (listingId) => {
    setSavedListings(savedListings.filter(item => item.id !== listingId));
  };

  return (
    <Router>
      <div className="bg-light min-vh-100 font-monospace" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navigation savedCount={savedListings.length} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                savedListings={savedListings}
                onSaveListing={handleSaveListing}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <SavedPage
                savedListings={savedListings}
                onRemoveListing={handleRemoveListing}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;