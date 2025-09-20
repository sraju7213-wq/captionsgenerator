// Brand data and configuration
const brandData = {
  "brands": [
    {
      "id": "furniturehub12",
      "name": "Furniture Hub 12",
      "description": "Modern, industrial furniture for cafes and offices",
      "industry": "Modern Furniture (India)",
      "tone": "Professional, Industrial, Modern",
      "target": "Cafes, Offices, Restaurants",
      "keywords": ["Quality", "Stylish", "Industrial", "Modern furniture", "Workspace", "Office design"],
      "website": "www.Exportofindia.com",
      "hashtags": ["#ModernFurniture", "#IndustrialStyle", "#OfficeDesign", "#WorkspaceGoals", "#FurnitureDesign", "#InteriorDesign"],
      "sampleCaptions": [
        "Transform your workspace with industrial elegance ⚡",
        "Where modern meets functional - office furniture redefined 🏢",
        "Elevate your cafe's ambiance with our signature pieces ☕"
      ]
    },
    {
      "id": "asian_bazaar",
      "name": "Asian Bazaar",
      "description": "Vintage and historical aesthetic modern furniture",
      "industry": "Vintage Decor & Modern Furniture",
      "tone": "Aesthetic, Historical, Trendy",
      "target": "Home decorators, Vintage enthusiasts",
      "keywords": ["Vintage", "Modern", "Historical aesthetics", "Sydney warehouse", "Decor"],
      "website": "https://asian-bazaar.com.au/",
      "hashtags": ["#VintageFurniture", "#HistoricalDesign", "#ModernVintage", "#HomeDecor", "#AntiqueStyle", "#VintageDecor"],
      "sampleCaptions": [
        "Where history meets contemporary living ✨",
        "Vintage soul, modern heart - furniture with stories to tell 📚",
        "Transform your space with timeless elegance 🏛️"
      ]
    },
    {
      "id": "exportofindia",
      "name": "Export of India",
      "description": "Premium, durable, customizable furniture",
      "industry": "Premium Furniture",
      "tone": "Premium, Trustworthy, Quality-focused",
      "target": "Quality-conscious buyers",
      "keywords": ["Premium", "Durable", "Stylish", "Customizable", "Quality"],
      "website": "www.Exportofindia.com",
      "hashtags": ["#PremiumFurniture", "#QualityCraftsmanship", "#CustomFurniture", "#DurableDesign", "#LuxuryLiving", "#IndianCraftsmanship"],
      "sampleCaptions": [
        "Premium quality that stands the test of time 💎",
        "Crafted with precision, designed for elegance 🎯",
        "Your vision, our craftsmanship - furniture that speaks quality ⭐"
      ]
    },
    {
      "id": "blissofwellness",
      "name": "Bliss of Wellness",
      "description": "Air fresheners for cars, promoting wellness",
      "industry": "Wellness & Air Fresheners",
      "tone": "Natural, Calming, Health-focused",
      "target": "Car owners, Wellness enthusiasts",
      "keywords": ["Nature", "Comfort", "Air fresheners", "Wellness", "Cars", "Freshness"],
      "website": "Blissofwellness.com",
      "hashtags": ["#CarWellness", "#NaturalFreshness", "#AirFreshener", "#WellnessJourney", "#HealthyLiving", "#CarEssentials"],
      "sampleCaptions": [
        "Breathe better, drive happier 🌿",
        "Transform your daily commute into a wellness journey 🚗💚",
        "Natural freshness that travels with you ✨"
      ]
    },
    {
      "id": "hotel_kspalace",
      "name": "Hotel KS Palace",
      "description": "Luxury boutique hotel in Srinagar",
      "industry": "Luxury Boutique Hotel (Srinagar)",
      "tone": "Luxury, Relaxing, Hospitality-focused",
      "target": "Solo, couple, family travelers",
      "keywords": ["Luxury", "Srinagar", "Boutique hotel", "Kashmir", "Hospitality"],
      "website": "",
      "hashtags": ["#LuxuryHotel", "#SrinagarStay", "#KashmirHospitality", "#BoutiqueHotel", "#LuxuryTravel", "#KashmirTourism"],
      "sampleCaptions": [
        "Where even the Wi-Fi signals relax 📶✨",
        "Luxury redefined in the heart of Srinagar 🏔️",
        "Your sanctuary in paradise awaits 🌸"
      ]
    },
    {
      "id": "houseboat_holidays_kashmir",
      "name": "Houseboat Holidays Kashmir",
      "description": "Deluxe houseboats in Srinagar",
      "industry": "Deluxe Houseboat Tourism",
      "tone": "Hospitality, Scenic, Cultural",
      "target": "Tourists, Experience seekers",
      "keywords": ["Deluxe", "Nigeen lake", "Kashmiri hospitality", "Floating paradise", "Houseboat"],
      "website": "",
      "hashtags": ["#HouseboatStay", "#KashmirTourism", "#NigeenLake", "#FloatingParadise", "#KashmirHospitality", "#UniqueStay"],
      "sampleCaptions": [
        "Float into serenity on Nigeen Lake 🚤",
        "Where water meets wanderlust - your floating paradise awaits 🌊",
        "Experience Kashmir like never before ⛵"
      ]
    },
    {
      "id": "valleyweddingcars",
      "name": "Valley Wedding Cars",
      "description": "Luxury car rentals for weddings and events",
      "industry": "Luxury Car Rentals",
      "tone": "Luxury, Celebratory, Premium service",
      "target": "Wedding couples, Event organizers",
      "keywords": ["Luxury cars", "Wedding", "Engagement", "Sightseeing", "Proposal", "Kashmir"],
      "website": "",
      "hashtags": ["#LuxuryCars", "#KashmirWeddings", "#WeddingCars", "#LuxuryRentals", "#DreamWedding", "#ValleyWeddings"],
      "sampleCaptions": [
        "Arrive in style on your special day 💍🚗",
        "Every love story deserves a luxury entrance ✨",
        "Making your dream wedding a reality, one ride at a time 👰🤵"
      ]
    }
  ],
  "trendingHashtags2025": [
    "#trending", "#viral", "#instagram", "#instagood", "#explore", "#reels", 
    "#september2025", "#autumn", "#fall", "#photography", "#photooftheday", 
    "#love", "#nature", "#travel", "#lifestyle", "#business", "#fashion", 
    "#beauty", "#fitness", "#food", "#art", "#design", "#inspiration", 
    "#motivation", "#success", "#entrepreneur", "#smallbusiness", "#local", 
    "#handmade", "#quality", "#luxury", "#premium", "#style", "#modern", 
    "#vintage", "#classic", "#unique", "#special", "#amazing", "#beautiful"
  ],
  "industryHashtags": {
    "furniture": ["#furniture", "#homedecor", "#interiordesign", "#homedesign", "#decor", "#home", "#design", "#interior", "#decoration", "#living", "#bedroom", "#kitchen", "#office", "#workspace"],
    "wellness": ["#wellness", "#health", "#natural", "#organic", "#fresh", "#clean", "#comfort", "#relax", "#breathe", "#mindfulness", "#selfcare", "#healthy"],
    "tourism": ["#travel", "#tourism", "#vacation", "#holiday", "#destination", "#explore", "#adventure", "#experience", "#journey", "#wanderlust", "#getaway", "#staycation"],
    "automotive": ["#cars", "#luxury", "#rental", "#wedding", "#event", "#celebration", "#special", "#premium", "#service", "#transportation", "#ride", "#style"]
  },
  "locationHashtags": {
    "kashmir": ["#kashmir", "#srinagar", "#kashmirtourism", "#kashmirvalley", "#paradiseonearth", "#kashmirbeuty", "#incredibleindia"],
    "india": ["#india", "#incredibleindia", "#madeinindia", "#indian", "#desi", "#bharath", "#hindustan"],
    "sydney": ["#sydney", "#australia", "#sydneyaustralia", "#sydneyharbour", "#aussie", "#downunder"]
  }
};

// Application State
let currentBrand = null;
let uploadedImage = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Caption and Hashtag Generator...');
    initializeBrandSelector();
    initializeEventListeners();
    updateGenerateButton();
});

// Initialize brand selector dropdown
function initializeBrandSelector() {
    const brandSelect = document.getElementById('brandSelect');
    if (!brandSelect) {
        console.error('Brand select element not found');
        return;
    }
    
    // Clear existing options except the first one
    while (brandSelect.children.length > 1) {
        brandSelect.removeChild(brandSelect.lastChild);
    }
    
    // Add brand options
    brandData.brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand.id;
        option.textContent = brand.name;
        brandSelect.appendChild(option);
    });
    
    console.log('Brand selector initialized with', brandData.brands.length, 'brands');
}

// Initialize all event listeners
function initializeEventListeners() {
    // Brand selector
    const brandSelect = document.getElementById('brandSelect');
    if (brandSelect) {
        brandSelect.addEventListener('change', handleBrandChange);
    }
    
    // Image upload
    const uploadZone = document.getElementById('uploadZone');
    const imageInput = document.getElementById('imageInput');
    const removeImageBtn = document.getElementById('removeImage');
    
    if (uploadZone && imageInput) {
        uploadZone.addEventListener('click', () => imageInput.click());
        uploadZone.addEventListener('dragover', handleDragOver);
        uploadZone.addEventListener('dragleave', handleDragLeave);
        uploadZone.addEventListener('drop', handleDrop);
        imageInput.addEventListener('change', handleImageSelect);
    }
    
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeImage);
    }
    
    // Text input
    const contextInput = document.getElementById('contextInput');
    if (contextInput) {
        contextInput.addEventListener('input', function() {
            handleTextInput();
            updateGenerateButton();
        });
    }
    
    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateContent);
    }
    
    console.log('Event listeners initialized');
}

// Handle brand selection change
function handleBrandChange() {
    const brandSelect = document.getElementById('brandSelect');
    const brandDescription = document.getElementById('brandDescription');
    
    if (!brandSelect || !brandDescription) {
        console.error('Brand selection elements not found');
        return;
    }
    
    const brandId = brandSelect.value;
    currentBrand = brandData.brands.find(brand => brand.id === brandId);
    
    if (currentBrand) {
        brandDescription.textContent = `${currentBrand.description} • Target: ${currentBrand.target}`;
        brandDescription.classList.remove('hidden');
        updateContextPlaceholder();
        console.log('Selected brand:', currentBrand.name);
    } else {
        brandDescription.classList.add('hidden');
        currentBrand = null;
        console.log('No brand selected');
    }
    
    updateGenerateButton();
}

// Update context input placeholder based on selected brand
function updateContextPlaceholder() {
    const contextInput = document.getElementById('contextInput');
    if (!currentBrand || !contextInput) return;
    
    const placeholders = {
        'furniturehub12': 'e.g., Modern office desk setup for productivity...',
        'asian_bazaar': 'e.g., Vintage armchair with historical charm...',
        'exportofindia': 'e.g., Premium dining table for family gatherings...',
        'blissofwellness': 'e.g., Fresh lavender scent for morning commutes...',
        'hotel_kspalace': 'e.g., Luxury suite with mountain views...',
        'houseboat_holidays_kashmir': 'e.g., Peaceful morning on Nigeen Lake...',
        'valleyweddingcars': 'e.g., Elegant wedding car for special day...'
    };
    
    contextInput.placeholder = placeholders[currentBrand.id] || 'Describe what you want to post about...';
}

// Handle drag and drop for image upload
function handleDragOver(e) {
    e.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.add('dragover');
    }
}

function handleDragLeave(e) {
    e.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.remove('dragover');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.remove('dragover');
    }
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageFile(files[0]);
    }
}

// Handle image selection from file input
function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleImageFile(file);
    }
}

// Process selected image file
function handleImageFile(file) {
    const uploadError = document.getElementById('uploadError');
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showError('uploadError', 'Please select a valid image file (JPG, PNG, or WEBP)');
        return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        showError('uploadError', 'File size must be less than 10MB');
        return;
    }
    
    hideError('uploadError');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        const previewImg = document.getElementById('previewImg');
        const uploadZone = document.getElementById('uploadZone');
        const imagePreview = document.getElementById('imagePreview');
        
        if (previewImg && uploadZone && imagePreview) {
            previewImg.src = e.target.result;
            uploadZone.classList.add('hidden');
            imagePreview.classList.remove('hidden');
            uploadedImage = file;
            updateGenerateButton();
            console.log('Image uploaded successfully');
        }
    };
    reader.readAsDataURL(file);
}

// Remove uploaded image
function removeImage() {
    const uploadZone = document.getElementById('uploadZone');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const imageInput = document.getElementById('imageInput');
    
    if (uploadZone) uploadZone.classList.remove('hidden');
    if (imagePreview) imagePreview.classList.add('hidden');
    if (previewImg) previewImg.src = '';
    if (imageInput) imageInput.value = '';
    
    uploadedImage = null;
    updateGenerateButton();
    console.log('Image removed');
}

// Handle text input changes
function handleTextInput() {
    const contextInput = document.getElementById('contextInput');
    const charCount = document.getElementById('charCount');
    
    if (!contextInput || !charCount) return;
    
    const text = contextInput.value;
    const length = text.length;
    const maxLength = 500;
    
    // Update character count
    charCount.textContent = `${length}/${maxLength}`;
    
    // Update character count styling
    charCount.classList.remove('warning', 'error');
    if (length > maxLength * 0.8) {
        charCount.classList.add('warning');
    }
    if (length >= maxLength) {
        charCount.classList.add('error');
    }
    
    // Validate minimum length
    if (length > 0 && length < 10) {
        showError('textError', 'Please provide at least 10 characters for better results');
    } else {
        hideError('textError');
    }
}

// Update generate button state
function updateGenerateButton() {
    const contextInput = document.getElementById('contextInput');
    const generateBtn = document.getElementById('generateBtn');
    
    if (!generateBtn) return;
    
    const hasValidInput = (uploadedImage || (contextInput && contextInput.value.trim().length >= 10));
    const hasBrand = currentBrand !== null;
    
    generateBtn.disabled = !(hasValidInput && hasBrand);
    
    console.log('Generate button state:', {
        hasValidInput,
        hasBrand,
        disabled: generateBtn.disabled
    });
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Generate content based on inputs
async function generateContent() {
    if (!currentBrand) {
        console.error('No brand selected');
        return;
    }
    
    console.log('Starting content generation...');
    
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    const btnText = generateBtn?.querySelector('.btn-text');
    const btnSpinner = generateBtn?.querySelector('.btn-spinner');
    
    if (btnText) btnText.classList.add('hidden');
    if (btnSpinner) btnSpinner.classList.remove('hidden');
    if (generateBtn) generateBtn.disabled = true;
    
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate captions and hashtags
        const captions = generateCaptions();
        const hashtags = generateHashtags();
        
        console.log('Generated captions:', captions.length);
        console.log('Generated hashtag sets:', hashtags.length);
        
        // Display results
        displayResults(captions, hashtags);
        
        // Show success message
        showToast('Content generated successfully!', 'success');
        
    } catch (error) {
        console.error('Generation error:', error);
        showToast('Failed to generate content. Please try again.', 'error');
    } finally {
        // Reset button state
        if (btnText) btnText.classList.remove('hidden');
        if (btnSpinner) btnSpinner.classList.add('hidden');
        if (generateBtn) generateBtn.disabled = false;
        updateGenerateButton();
    }
}

// Generate captions based on brand and input
function generateCaptions() {
    const contextInput = document.getElementById('contextInput');
    const contextText = contextInput ? contextInput.value.trim() : '';
    const hasImage = uploadedImage !== null;
    
    const captions = [];
    
    // Generate different types of captions
    const shortCaption = generateShortCaption(contextText, hasImage);
    const mediumCaption = generateMediumCaption(contextText, hasImage);
    const longCaption = generateLongCaption(contextText, hasImage);
    
    captions.push(
        { type: 'Short', text: shortCaption, length: shortCaption.length },
        { type: 'Medium', text: mediumCaption, length: mediumCaption.length },
        { type: 'Long', text: longCaption, length: longCaption.length }
    );
    
    // Add brand-specific caption if available
    if (currentBrand.sampleCaptions.length > 0) {
        const brandCaption = currentBrand.sampleCaptions[Math.floor(Math.random() * currentBrand.sampleCaptions.length)];
        captions.push({ type: 'Brand Style', text: brandCaption, length: brandCaption.length });
    }
    
    return captions;
}

// Generate short caption
function generateShortCaption(contextText, hasImage) {
    const templates = [
        `${getRandomKeyword()} meets ${getRandomKeyword().toLowerCase()} ✨`,
        `Experience ${currentBrand.keywords[0].toLowerCase()} like never before 🌟`,
        `${currentBrand.keywords[0]} redefined ${getRandomEmoji()}`,
        `Where ${currentBrand.keywords[1] ? currentBrand.keywords[1].toLowerCase() : 'quality'} comes first ${getRandomEmoji()}`
    ];
    
    if (contextText) {
        templates.push(`${contextText.split(' ').slice(0, 3).join(' ')}... ${getRandomEmoji()}`);
    }
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// Generate medium caption
function generateMediumCaption(contextText, hasImage) {
    const hook = getRandomHook();
    const value = getValueProposition();
    const cta = getCallToAction();
    
    let caption = `${hook} ${value} ${cta}`;
    
    if (contextText) {
        const contextWords = contextText.split(' ').slice(0, 6).join(' ');
        caption = `${hook} ${contextWords}. ${value} ${cta}`;
    }
    
    return caption;
}

// Generate long caption
function generateLongCaption(contextText, hasImage) {
    const hook = getRandomHook();
    const story = getBrandStory();
    const value = getValueProposition();
    const social = getSocialProof();
    const cta = getCallToAction();
    
    let caption = `${hook}\n\n${story}\n\n${value} ${social}\n\n${cta}`;
    
    if (contextText) {
        const contextStory = `${contextText}. This perfectly embodies what we're all about.`;
        caption = `${hook}\n\n${contextStory}\n\n${value} ${social}\n\n${cta}`;
    }
    
    return caption;
}

// Helper functions for caption generation
function getRandomKeyword() {
    return currentBrand.keywords[Math.floor(Math.random() * currentBrand.keywords.length)];
}

function getRandomEmoji() {
    const emojis = ['✨', '🌟', '💎', '⭐', '🎯', '🚀', '💫', '🔥', '⚡', '🎨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getRandomHook() {
    const hooks = [
        "What if we told you...",
        "Picture this:",
        "Ready for something amazing?",
        "Here's what we believe:",
        "Ever wondered why...",
        "The secret is out:"
    ];
    return hooks[Math.floor(Math.random() * hooks.length)];
}

function getValueProposition() {
    const brandValues = {
        'furniturehub12': 'Industrial design meets modern functionality.',
        'asian_bazaar': 'Timeless vintage pieces with contemporary appeal.',
        'exportofindia': 'Premium craftsmanship that lasts generations.',
        'blissofwellness': 'Natural wellness for your daily journey.',
        'hotel_kspalace': 'Luxury hospitality in the heart of Kashmir.',
        'houseboat_holidays_kashmir': 'Floating paradise on pristine waters.',
        'valleyweddingcars': 'Making your special moments unforgettable.'
    };
    return brandValues[currentBrand.id] || 'Quality that speaks for itself.';
}

function getBrandStory() {
    const stories = {
        'furniturehub12': 'We believe workspaces should inspire creativity and productivity.',
        'asian_bazaar': 'Every piece tells a story, bridging past and present beautifully.',
        'exportofindia': 'Crafted with passion, delivered with pride across borders.',
        'blissofwellness': 'Born from the belief that wellness should accompany you everywhere.',
        'hotel_kspalace': 'Nestled in Srinagar, we offer more than accommodation - we offer experiences.',
        'houseboat_holidays_kashmir': 'Experience the magic of Kashmir from our floating sanctuaries.',
        'valleyweddingcars': 'Every couple deserves to arrive in style on their most important day.'
    };
    return stories[currentBrand.id] || 'We\'re passionate about what we do.';
}

function getSocialProof() {
    const proofs = [
        'Join thousands of satisfied customers.',
        'Trusted by professionals worldwide.',
        'Rated 5 stars by our community.',
        'Award-winning quality you can trust.',
        'Preferred by industry experts.',
        'Loved by customers everywhere.'
    ];
    return proofs[Math.floor(Math.random() * proofs.length)];
}

function getCallToAction() {
    const ctas = {
        'furniturehub12': 'Transform your workspace today! 💼',
        'asian_bazaar': 'Discover your perfect piece! 🏺',
        'exportofindia': 'Experience premium quality! ⭐',
        'blissofwellness': 'Start your wellness journey! 🌿',
        'hotel_kspalace': 'Book your luxury escape! 🏔️',
        'houseboat_holidays_kashmir': 'Reserve your floating paradise! ⛵',
        'valleyweddingcars': 'Make your day special! 💍'
    };
    return ctas[currentBrand.id] || 'Get in touch with us! ✨';
}

// Generate hashtag sets
function generateHashtags() {
    const hashtagSets = [];
    
    // Brand-specific hashtags
    const brandHashtags = [...currentBrand.hashtags];
    hashtagSets.push({
        category: 'Brand Specific',
        hashtags: brandHashtags
    });
    
    // Industry hashtags
    const industryKey = getIndustryKey();
    if (industryKey && brandData.industryHashtags[industryKey]) {
        const industryHashtags = brandData.industryHashtags[industryKey].slice(0, 8);
        hashtagSets.push({
            category: 'Industry Relevant',
            hashtags: industryHashtags
        });
    }
    
    // Location hashtags (if applicable)
    const locationKey = getLocationKey();
    if (locationKey && brandData.locationHashtags[locationKey]) {
        const locationHashtags = brandData.locationHashtags[locationKey];
        hashtagSets.push({
            category: 'Location Based',
            hashtags: locationHashtags
        });
    }
    
    // Trending hashtags
    const trendingHashtags = getRandomTrendingHashtags();
    hashtagSets.push({
        category: 'Trending',
        hashtags: trendingHashtags
    });
    
    return hashtagSets;
}

// Get industry key for hashtags
function getIndustryKey() {
    const industryMap = {
        'furniturehub12': 'furniture',
        'asian_bazaar': 'furniture',
        'exportofindia': 'furniture',
        'blissofwellness': 'wellness',
        'hotel_kspalace': 'tourism',
        'houseboat_holidays_kashmir': 'tourism',
        'valleyweddingcars': 'automotive'
    };
    return industryMap[currentBrand.id];
}

// Get location key for hashtags
function getLocationKey() {
    const locationMap = {
        'hotel_kspalace': 'kashmir',
        'houseboat_holidays_kashmir': 'kashmir',
        'valleyweddingcars': 'kashmir',
        'asian_bazaar': 'sydney'
    };
    return locationMap[currentBrand.id] || 'india';
}

// Get random trending hashtags
function getRandomTrendingHashtags() {
    const trending = [...brandData.trendingHashtags2025];
    const shuffled = trending.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

// Display generated results
function displayResults(captions, hashtags) {
    const captionResults = document.getElementById('captionResults');
    const hashtagResults = document.getElementById('hashtagResults');
    const resultsContainer = document.getElementById('resultsContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (!captionResults || !hashtagResults) {
        console.error('Results containers not found');
        return;
    }
    
    // Clear previous results
    captionResults.innerHTML = '';
    hashtagResults.innerHTML = '';
    
    // Display captions
    captions.forEach((caption, index) => {
        const captionCard = createCaptionCard(caption, index);
        captionResults.appendChild(captionCard);
    });
    
    // Display hashtags
    hashtags.forEach((hashtagSet, index) => {
        const hashtagCard = createHashtagCard(hashtagSet, index);
        hashtagResults.appendChild(hashtagCard);
    });
    
    // Show results, hide empty state
    if (emptyState) emptyState.classList.add('hidden');
    if (resultsContainer) {
        resultsContainer.classList.remove('hidden');
        resultsContainer.classList.add('fade-in');
    }
    
    console.log('Results displayed successfully');
}

// Create caption card element
function createCaptionCard(caption, index) {
    const card = document.createElement('div');
    card.className = 'caption-card';
    
    card.innerHTML = `
        <div class="caption-header">
            <span class="caption-type">${caption.type}</span>
            <span class="caption-length">${caption.length} chars</span>
        </div>
        <div class="caption-text">${caption.text}</div>
        <div class="caption-footer">
            <button class="copy-btn" data-copy-text="${caption.text.replace(/"/g, '&quot;')}" onclick="copyToClipboard(this)">
                Copy
            </button>
        </div>
    `;
    
    return card;
}

// Create hashtag card element
function createHashtagCard(hashtagSet, index) {
    const card = document.createElement('div');
    card.className = 'hashtag-set';
    
    const hashtagsHtml = hashtagSet.hashtags.map((tag, tagIndex) => 
        `<span class="hashtag-item" data-copy-text="${tag}" onclick="copyToClipboard(this)">${tag}</span>`
    ).join('');
    
    const allHashtags = hashtagSet.hashtags.join(' ');
    
    card.innerHTML = `
        <div class="hashtag-set-header">
            <span class="hashtag-category">${hashtagSet.category}</span>
            <span class="hashtag-count">${hashtagSet.hashtags.length} tags</span>
        </div>
        <div class="hashtag-list">
            ${hashtagsHtml}
        </div>
        <div class="caption-footer">
            <button class="copy-btn" data-copy-text="${allHashtags}" onclick="copyToClipboard(this)">
                Copy All
            </button>
        </div>
    `;
    
    return card;
}

// Copy text to clipboard (simplified version)
async function copyToClipboard(button) {
    const text = button.getAttribute('data-copy-text');
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Update button state
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
        showToast('Copied to clipboard!', 'success');
        console.log('Text copied to clipboard');
    } catch (error) {
        console.error('Copy failed:', error);
        showToast('Failed to copy to clipboard', 'error');
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) {
        console.error('Toast elements not found');
        return;
    }
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}