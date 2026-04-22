import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import { DUMMY_LISTINGS } from './data';
import SavedPage from './components/SavedPage';
import Footer from './components/Footer';
import CreateListingPage from './components/CreateListingPage';
import ListingDetailPage from './components/ListingDetailPage';
import './App.css';

function App() {
  const [listings, setListings] = useState(DUMMY_LISTINGS);
  const [savedListings, setSavedListings] = useState([]);

  const handleSaveListing = (listing) => {
    if (!savedListings.some(item => item.id === listing.id)) {
      setSavedListings([...savedListings, listing]);
    }
  };

  const handleRemoveListing = (listingId) => {
    setSavedListings(savedListings.filter(item => item.id !== listingId));
  };

  const handleAddListing = (newListing) => {
    setListings([newListing, ...listings]);
  };

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column bg-transparent">
        <Navigation savedCount={savedListings.length} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                listings={listings}
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
          <Route
            path="/create"
            element={<CreateListingPage onAddListing={handleAddListing} />}
          />
          <Route
            path="/listings/:id"
            element={
              <ListingDetailPage
                listings={listings}
                savedListings={savedListings}
                onSaveListing={handleSaveListing}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;