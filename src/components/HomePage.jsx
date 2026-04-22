import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListingCard from './ListingCard';
import FilterPanel from './FilterPanel';

const HomePage = ({ listings, savedListings, onSaveListing }) => {
    const [filters, setFilters] = useState({ maxPrice: '', bedrooms: 'All' });

    // Filter listings based on current state
    const filteredListings = useMemo(() => {
        return listings.filter((listing) => {
            // Check max price
            if (filters.maxPrice && listing.price > parseFloat(filters.maxPrice)) {
                return false;
            }

            // Check bedrooms
            if (filters.bedrooms !== 'All') {
                if (filters.bedrooms === '3+') {
                    if (listing.bedrooms < 3) return false;
                } else {
                    if (listing.bedrooms.toString() !== filters.bedrooms) return false;
                }
            }

            return true;
        });
    }, [filters, listings]);

    return (
        <div className="pt-4 pb-5">
            <Container>
                <div className="hero-section mb-5">
                    <h1 className="fw-bolder mb-3" style={{ fontSize: '3.5rem' }}>
                        <span className="text-gradient-danger">Badger</span><span className="text-gradient-primary">Lease</span>
                    </h1>
                    <p className="fs-5 mb-0" style={{ color: '#475569', fontWeight: 500 }}>UW-Madison's premier student sublease marketplace</p>
                </div>

                <FilterPanel filters={filters} onFilterChange={setFilters} />

                <Row className="mb-4 align-items-center">
                    <Col>
                        <h4 className="fw-bold mb-0 text-dark">
                            Available Listings <span className="text-muted fs-5">({filteredListings.length})</span>
                        </h4>
                    </Col>
                </Row>

                {filteredListings.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                        <h4 className="text-muted mb-2">No listings found 😢</h4>
                        <p className="text-secondary">Try adjusting your filters to see more results.</p>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {filteredListings.map((listing) => {
                            const isSaved = savedListings.some(item => item.id === listing.id);
                            return (
                                <Col key={listing.id}>
                                    <ListingCard
                                        listing={listing}
                                        onSave={onSaveListing}
                                        isSaved={isSaved}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default HomePage;
