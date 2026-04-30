import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FilterPanel from './FilterPanel';
import HeroSection from './HeroSection';
import EmptyState from './EmptyState';
import ListingGrid from './ListingGrid';
import CompareBar from './CompareBar';
import CompareModal from './CompareModal';
import { calculateMatchScore } from '../utils/matchScore';

const HomePage = ({
    listings,
    savedListings,
    onSaveListing,
    isAuthenticated,
    sessionRecentListings,
    onRestoreSampleListings,
}) => {
    const initialFilters = {
        query: '',
        maxPrice: '',
        bedrooms: 'All',
        sortBy: 'recommended',
        petFriendlyOnly: false,
        noSmokingOnly: false,
        studyFriendlyOnly: false,
    };
    const [filters, setFilters] = useState(initialFilters);
    const [comparedIds, setComparedIds] = useState([]);
    const [showCompare, setShowCompare] = useState(false);

    // Filter listings based on current state
    const filteredListings = useMemo(() => {
        const matchedListings = listings.filter((listing) => {
            const query = filters.query.trim().toLowerCase();
            if (query) {
                const haystack = `${listing.title} ${listing.location} ${listing.amenities.join(' ')}`.toLowerCase();
                if (!haystack.includes(query)) {
                    return false;
                }
            }

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

            if (filters.petFriendlyOnly && !listing.roommatePrefs?.petFriendly) return false;
            if (filters.noSmokingOnly && listing.roommatePrefs?.smokingAllowed) return false;
            if (filters.studyFriendlyOnly && !listing.roommatePrefs?.studyFriendly) return false;

            return true;
        });

        if (filters.sortBy === 'price_low_high') {
            return [...matchedListings].sort((a, b) => a.price - b.price);
        }
        if (filters.sortBy === 'price_high_low') {
            return [...matchedListings].sort((a, b) => b.price - a.price);
        }
        if (filters.sortBy === 'bedrooms_high_low') {
            return [...matchedListings].sort((a, b) => b.bedrooms - a.bedrooms);
        }
        if (filters.sortBy === 'recommended') {
            return [...matchedListings].sort(
                (a, b) => calculateMatchScore(b, filters) - calculateMatchScore(a, filters)
            );
        }
        return matchedListings;
    }, [filters, listings]);

    const comparedListings = comparedIds
        .map((id) => listings.find((listing) => listing.id === id))
        .filter(Boolean);

    const handleToggleCompare = (listingId) => {
        setComparedIds((prev) => {
            if (prev.includes(listingId)) {
                return prev.filter((id) => id !== listingId);
            }
            if (prev.length >= 3) {
                return prev;
            }
            return [...prev, listingId];
        });
    };

    return (
        <div className="pt-4 pb-5">
            <Container>
                <HeroSection
                    title={
                        <>
                            <span className="text-gradient-danger">Badger</span>
                            <span className="text-gradient-primary">Lease</span>
                        </>
                    }
                    subtitle="Find a sublease fast with better filters, photo previews, and saved favorites."
                    listingCount={filteredListings.length}
                    isAuthenticated={isAuthenticated}
                />

                <FilterPanel filters={filters} onFilterChange={setFilters} onReset={() => setFilters(initialFilters)} />
                <CompareBar
                    selectedCount={comparedIds.length}
                    onOpen={() => setShowCompare(true)}
                    onClear={() => setComparedIds([])}
                />
                <CompareModal
                    show={showCompare}
                    onHide={() => setShowCompare(false)}
                    listings={comparedListings}
                />

                {(sessionRecentListings || []).length > 0 && (
                    <section className="mb-5">
                        <h2 className="h4 fw-bold mb-3">Recently Viewed</h2>
                        <ListingGrid
                            listings={sessionRecentListings}
                            savedListings={savedListings}
                            onSaveListing={onSaveListing}
                            isAuthenticated={isAuthenticated}
                            comparedIds={comparedIds}
                            onToggleCompare={handleToggleCompare}
                            filters={filters}
                        />
                    </section>
                )}

                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="h4 fw-bold mb-0 text-dark">
                            Available Listings <span className="text-muted fs-5">({filteredListings.length})</span>
                        </h2>
                    </Col>
                </Row>

                {filteredListings.length === 0 ? (
                    listings.length === 0 ? (
                        <div className="text-center py-5 glass-panel rounded-4">
                            <h2 className="h4 fw-bold mb-2">No listings in the marketplace</h2>
                            <p className="text-secondary mb-4">
                                If you deleted demo listings while testing, you can reload the original sample set.
                            </p>
                            <Button className="btn-premium px-4" onClick={onRestoreSampleListings}>
                                Reload sample listings
                            </Button>
                        </div>
                    ) : (
                        <EmptyState
                            title="No listings found"
                            description="Try adjusting your filters to see more results."
                        />
                    )
                ) : (
                    <ListingGrid
                        listings={filteredListings}
                        savedListings={savedListings}
                        onSaveListing={onSaveListing}
                        isAuthenticated={isAuthenticated}
                        comparedIds={comparedIds}
                        onToggleCompare={handleToggleCompare}
                        filters={filters}
                    />
                )}
            </Container>
        </div>
    );
};

export default HomePage;
