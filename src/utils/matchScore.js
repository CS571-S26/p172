export function calculateMatchScore(listing, filters) {
  let score = 50;

  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (listing.price <= max) score += 15;
    else score -= 20;
  }

  if (filters.bedrooms !== 'All') {
    if (filters.bedrooms === '3+' && listing.bedrooms >= 3) score += 10;
    else if (listing.bedrooms.toString() === filters.bedrooms) score += 10;
    else score -= 8;
  }

  if (filters.query?.trim()) {
    const text = `${listing.title} ${listing.location} ${listing.amenities.join(' ')}`.toLowerCase();
    if (text.includes(filters.query.trim().toLowerCase())) score += 10;
  }

  if (filters.petFriendlyOnly && listing.roommatePrefs?.petFriendly) score += 6;
  if (filters.noSmokingOnly && !listing.roommatePrefs?.smokingAllowed) score += 6;
  if (filters.studyFriendlyOnly && listing.roommatePrefs?.studyFriendly) score += 6;

  return Math.max(0, Math.min(100, score));
}

export function getMatchTone(score) {
  if (score >= 80) return 'success';
  if (score >= 65) return 'primary';
  if (score >= 50) return 'warning';
  return 'secondary';
}
