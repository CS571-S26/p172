import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({ title, subtitle, listingCount, isAuthenticated }) => {
  return (
    <div className="hero-section mb-5">
      <p className="hero-kicker mb-3">MADISON STUDENT HOUSING</p>
      <h1 className="fw-bolder mb-3" style={{ fontSize: '3.5rem' }}>
        {title}
      </h1>
      <p className="fs-5 mb-0" style={{ color: '#334155', fontWeight: 500 }}>
        {subtitle}
      </p>
      <div className="hero-actions d-flex gap-3 justify-content-center flex-wrap mt-4">
        <Link to="/create" className="text-decoration-none">
          <span className="btn-premium d-inline-block px-4 py-2">Post Your Listing</span>
        </Link>
        <Link to={isAuthenticated ? '/mypage' : '/login'} className="text-decoration-none">
          <span className="btn btn-light fw-semibold px-4 py-2 rounded-pill border">View Favorites</span>
        </Link>
      </div>
      <div className="hero-metrics d-flex justify-content-center gap-3 flex-wrap mt-4">
        <span className="hero-pill">{listingCount} active listings</span>
        <span className="hero-pill">Verified contact emails</span>
        <span className="hero-pill">Built for CS571 Final</span>
      </div>
    </div>
  );
};

export default HeroSection;
