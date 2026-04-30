import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const LISTINGS_STORAGE_KEY = 'badgerlease_listings';
const LISTINGS_SCHEMA_VERSION_KEY = 'badgerlease_listings_schema_version';
const LISTINGS_SCHEMA_VERSION = '2026-04-29-v2';

function App() {
  const { currentUser, isAuthenticated } = useAuth();
  const [listings, setListings] = useState(() => {
    const schemaVersion = localStorage.getItem(LISTINGS_SCHEMA_VERSION_KEY);
    if (schemaVersion !== LISTINGS_SCHEMA_VERSION) {
      localStorage.setItem(LISTINGS_SCHEMA_VERSION_KEY, LISTINGS_SCHEMA_VERSION);
      localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(DUMMY_LISTINGS));
      return DUMMY_LISTINGS;
    }

    const raw = localStorage.getItem(LISTINGS_STORAGE_KEY);
    if (!raw) return DUMMY_LISTINGS;
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : DUMMY_LISTINGS;
    } catch {
      return DUMMY_LISTINGS;
    }
  });
  const [, setRecentViewedIds] = useState(() => {
    const raw = localStorage.getItem('badgerlease_recent_views');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });
  const [sessionViewedIds, setSessionViewedIds] = useState([]);
  const [favoritesByUser, setFavoritesByUser] = useState(() => {
    const raw = localStorage.getItem('badgerlease_favorites_by_user');
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  });
  const [inquiries, setInquiries] = useState(() => {
    const raw = localStorage.getItem('badgerlease_inquiries');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
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

  const handleDeleteListing = useCallback((listingId) => {
    setListings((prev) => prev.filter((l) => l.id !== listingId));
    setRecentViewedIds((prev) => {
      const next = prev.filter((id) => id !== listingId);
      localStorage.setItem('badgerlease_recent_views', JSON.stringify(next));
      return next;
    });
    setFavoritesByUser((prevMap) => {
      const nextMap = {};
      Object.keys(prevMap).forEach((key) => {
        nextMap[key] = (prevMap[key] || []).filter((l) => l.id !== listingId);
      });
      localStorage.setItem('badgerlease_favorites_by_user', JSON.stringify(nextMap));
      return nextMap;
    });
    setInquiries((prev) => {
      const next = prev.filter((q) => q.listingId !== listingId);
      localStorage.setItem('badgerlease_inquiries', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleAddListing = (newListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const handleRestoreSampleListings = useCallback(() => {
    setListings(DUMMY_LISTINGS);
  }, []);

  useEffect(() => {
    localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  const listingShareUrl = useCallback((listingId) => {
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${window.location.origin}${normalizedBase}listings/${listingId}`;
  }, []);

  const handleShareListingUrl = useCallback(async (listingId) => {
    const url = listingShareUrl(listingId);
    await navigator.clipboard.writeText(url);
  }, [listingShareUrl]);

  const handleViewedListing = useCallback((listingId) => {
    setSessionViewedIds((prevIds) => {
      const nextIds = [listingId, ...prevIds.filter((id) => id !== listingId)].slice(0, 4);
      return nextIds;
    });
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

  const sessionRecentListings = sessionViewedIds
    .map((id) => listings.find((listing) => listing.id === id))
    .filter(Boolean);

  const myListings = currentUser
    ? listings.filter((listing) => listing.postedByEmail === currentUser.email)
    : [];
  const myListingIds = new Set(myListings.map((listing) => listing.id));
  const inboxInquiries = inquiries.filter((inquiry) => {
    if (!currentUser) return false;
    const ownsListingById = myListingIds.has(inquiry.listingId);
    const ownsListingByEmail = inquiry.ownerEmail === currentUser.email;
    return ownsListingById || ownsListingByEmail;
  });

  const handleCreateInquiry = useCallback((payload) => {
    setInquiries((prev) => {
      const next = [
        ...prev,
        {
          id: Date.now(),
          ...payload,
          status: 'new',
          createdAt: new Date().toISOString(),
          replies: [],
        },
      ];
      localStorage.setItem('badgerlease_inquiries', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleReplyInquiry = useCallback((inquiryId, message) => {
    setInquiries((prev) => {
      const next = prev.map((inquiry) => {
        if (inquiry.id !== inquiryId) return inquiry;
        return {
          ...inquiry,
          status: 'responded',
          replies: [
            ...(inquiry.replies || []),
            {
              id: Date.now(),
              fromName: currentUser?.name || 'Owner',
              fromEmail: currentUser?.email || '',
              message,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
      localStorage.setItem('badgerlease_inquiries', JSON.stringify(next));
      return next;
    });
  }, [currentUser]);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app-shell min-vh-100 d-flex flex-column bg-transparent">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation savedCount={savedListings.length} listings={listings} />
        <main id="main-content" tabIndex="-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  listings={listings}
                  savedListings={savedListings}
                  onSaveListing={handleSaveListing}
                  isAuthenticated={isAuthenticated}
                  sessionRecentListings={sessionRecentListings}
                  onRestoreSampleListings={handleRestoreSampleListings}
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
                    onDeleteListing={handleDeleteListing}
                    onShareListingUrl={handleShareListingUrl}
                    inboxInquiries={inboxInquiries}
                    onReplyInquiry={handleReplyInquiry}
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
                  inquiries={inquiries}
                  onCreateInquiry={handleCreateInquiry}
                />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;