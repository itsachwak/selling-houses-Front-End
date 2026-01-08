document.addEventListener('DOMContentLoaded', function() {
    const listings = Array.from(document.querySelectorAll('.gallery_lines'));
    const originalListings = [...listings];
    const filterForm = document.getElementById('filters');
    const sortSelect = document.getElementById('sort');

    let currentFilters = {
        type: '',
        priceMin: '',
        priceMax: '',
        amenities: []
    };

    function getListingPrice(listing) {
        const priceElement = listing.querySelector('.display3 h3, .display3 h3 em, .display3 sub h3');
        if (!priceElement) return 0;
        let priceText = priceElement.textContent.trim();
        priceText = priceText.replace(/[^\d.]/g, '');
        if (priceText.includes('M')) return parseFloat(priceText) * 1000000;
        if (priceText.includes('B')) return parseFloat(priceText) * 1000000000;
        return parseFloat(priceText) || 0;
    }

    function getListingRating(listing) {
        const ratingElement = listing.querySelector('.rate');
        return ratingElement ? parseInt(ratingElement.textContent) : 0;
    }

    function getListingType(listing) {
        const titleElement = listing.querySelector('.desc h3');
        if (!titleElement) return '';
        const title = titleElement.textContent.toLowerCase();
        if (title.includes('villa')) return 'villa';
        if (title.includes('hotel room')) return 'hotel room';
        if (title.includes('f-2') || title.includes('studio')) return 'f-2';
        if (title.includes('f-3') || title.includes('appartement')) return 'f3';
        return '';
    }

    function listingMatchesFilters(listing) {
        if (currentFilters.type && getListingType(listing) !== currentFilters.type) return false;
        const listingPrice = getListingPrice(listing);
        if (currentFilters.priceMin && listingPrice < parseFloat(currentFilters.priceMin)) return false;
        if (currentFilters.priceMax && listingPrice > parseFloat(currentFilters.priceMax)) return false;
        return true;
    }

    function applySorting(listingsToSort) {
        switch(sortSelect.value) {
            case 'price-asc': return listingsToSort.sort((a, b) => getListingPrice(a) - getListingPrice(b));
            case 'rating-desc': return listingsToSort.sort((a, b) => getListingRating(b) - getListingRating(a));
            case 'price-desc': return listingsToSort.sort((a, b) => getListingPrice(b) - getListingPrice(a));
            case 'bookings-desc': return listingsToSort.sort((a, b) => getListingPrice(b) - getListingPrice(a));
            default: return [...originalListings];
        }
    }

    function applyAllFilters() {
        let filteredListings = originalListings.filter(listingMatchesFilters);
        filteredListings = applySorting(filteredListings);
        const container = document.body;
        listings.forEach(listing => listing.remove());
        filteredListings.forEach(listing => {
            container.insertBefore(listing, document.querySelector('.right-part'));
        });
    }

    sortSelect.addEventListener('change', applyAllFilters);

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const typeSelect = filterForm.querySelector('select:first-of-type');
        const priceMinSelect = filterForm.querySelectorAll('select')[1];
        const priceMaxSelect = filterForm.querySelectorAll('select')[2];
        const amenityCheckboxes = Array.from(filterForm.querySelectorAll('input[type="checkbox"]:checked'));
        
        currentFilters = {
            type: typeSelect.value,
            priceMin: priceMinSelect.value.replace(/[^\d.]/g, ''),
            priceMax: priceMaxSelect.value.replace(/[^\d.]/g, ''),
            amenities: amenityCheckboxes.map(cb => cb.value)
        };
        
        applyAllFilters();
    });

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            alert('Search functionality would go here');
        });
    }
});  