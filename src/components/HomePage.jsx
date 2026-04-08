import React, { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListingCard from './ListingCard';
import FilterPanel from './FilterPanel';

const DUMMY_LISTINGS = [
    {
        id: 1,
        title: "Spacious Room near State St",
        price: 850,
        bedrooms: 2,
        location: "Downtown Madison",
        amenities: ["In-unit Laundry", "Furnished", "Gym"]
    },
    {
        id: 2,
        title: "Camp Randall Sublet",
        price: 600,
        bedrooms: 4,
        location: "Campus Area",
        amenities: ["Parking", "A/C"]
    },
    {
        id: 3,
        title: "Luxury 1 Bed Apartment",
        price: 1200,
        bedrooms: 1,
        location: "Capitol Square",
        amenities: ["Pool", "Gym", "Doorman", "Pet Friendly"]
    },
    {
        id: 4,
        title: "Cozy Studio Walkable to Class",
        price: 950,
        bedrooms: 1,
        location: "Langdon/State Street",
        amenities: ["Furnished", "Utilities Included"]
    },
    {
        id: 5,
        title: "Huge 3 Bedroom Sublease",
        price: 2100,
        bedrooms: 3,
        location: "Monroe Street",
        amenities: ["Backyard", "Garage", "Washer/Dryer"]
    },
    {
        id: 6,
        title: "Affordable Shared Room",
        price: 450,
        bedrooms: 2,
        location: "Regent Neighborhood",
        amenities: ["Balcony", "A/C", "Dishwasher"]
    },
    {
        id: 7,
        title: "Modern 4B/2B Townhouse",
        price: 3200,
        bedrooms: 4,
        location: "Vilas Area",
        amenities: ["In-unit Laundry", "Basement", "Parking"]
    },
    {
        id: 8,
        title: "Sunny 1 Bedroom close to UW",
        price: 1100,
        bedrooms: 1,
        location: "University Ave",
        amenities: ["Gym", "Secure Entry", "Furnished"]
    }
];

const HomePage = ({ savedListings, onSaveListing }) => {
    const [filters, setFilters] = useState({ maxPrice: '', bedrooms: 'All' });

    // Filter listings based on current state
    const filteredListings = useMemo(() => {
        return DUMMY_LISTINGS.filter((listing) => {
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
    }, [filters]);

    return (
        <div className="pt-4 pb-5">
            <Container>
                <div className="mb-5 text-center">
                    <h1 className="fw-bolder text-primary mb-3" style={{ fontSize: '3rem' }}>
                        <span className="text-danger">Badger</span>Lease
                    </h1>
                    <p className="text-secondary fs-5 mb-0">UW-Madison's premier student sublease marketplace</p>
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
