import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import { DUMMY_LISTINGS } from './data';
import Footer from './components/Footer';
import CreateListingPage from './components/CreateListingPage';
import ListingDetailPage from './components/ListingDetailPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import MyPage from './components/MyPage';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { currentUser, isAuthenticated } = useAuth();
  const [listings, setListings] = useState(DUMMY_LISTINGS);
  const [recentViewedIds, setRecentViewedIds] = useState(() => {
    const raw = localStorage.getItem('badgerlease_recent_views');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [favoritesByUser, setFavoritesByUser] = useState(() => {
    const raw = localStorage.getItem('badgerlease_favorites_by_user');
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });

  const favoritesStorageKey = useMemo(() => {
    if (!currentUser) return null;
    return `badgerlease_favorites_${currentUser.email.toLowerCase()}`;
  }, [currentUser]);

  const savedListings = favoritesStorageKey
    ? favoritesByUser[favoritesStorageKey] || []
    : [];

  const updateFavorites = (nextFavorites) => {
    if (!favoritesStorageKey) return;
    const nextMap = {
      ...favoritesByUser,
      [favoritesStorageKey]: nextFavorites,
    };
    setFavoritesByUser(nextMap);
    localStorage.setItem('badgerlease_favorites_by_user', JSON.stringify(nextMap));
  };

  const handleSaveListing = (listing) => {
    if (!isAuthenticated) return;
    if (!savedListings.some(item => item.id === listing.id)) {
      updateFavorites([...savedListings, listing]);
    }
  };

  const handleRemoveListing = (listingId) => {
    updateFavorites(savedListings.filter(item => item.id !== listingId));
  };

  const handleAddListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const handleViewedListing = useCallback((listingId) => {
    setRecentViewedIds((prevIds) => {
      const nextIds = [listingId, ...prevIds.filter((id) => id !== listingId)].slice(0, 4);
      const unchanged =
        prevIds.length === nextIds.length && prevIds.every((value, index) => value === nextIds[index]);
      if (unchanged) {
        return prevIds;
      }
      localStorage.setItem('badgerlease_recent_views', JSON.stringify(nextIds));
      return nextIds;
    });
  }, []);

  const recentListings = recentViewedIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);

  const myListings = currentUser
    ? listings.filter((listing) => listing.postedByEmail === currentUser.email)
    : [];

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app-shell min-vh-100 d-flex flex-column bg-transparent">
        <Navigation savedCount={savedListings.length} listings={listings} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                listings={listings}
                savedListings={savedListings}
                onSaveListing={handleSaveListing}
                isAuthenticated={isAuthenticated}
                recentListings={recentListings}
              />
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage
                  myListings={myListings}
                  savedListings={savedListings}
                  onRemoveListing={handleRemoveListing}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/saved" element={<Navigate to="/mypage" replace />} />
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
                isAuthenticated={isAuthenticated}
                onViewed={handleViewedListing}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;