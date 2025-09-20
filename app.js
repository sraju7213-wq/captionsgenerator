// Brand data and configuration (loaded from external JSON file)
let brandData = null;

// Application State
let currentBrand = null;
let uploadedImage = null;
let uploadedImageDataUrl = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Initializing Caption and Hashtag Generator...');
    await loadBrandData();
    initializeEventListeners();
    updateGenerateButton();
});

// Fetch brand data from the backend
async function loadBrandData() {
    try {
        const response = await fetch('brandData.json', { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to load brand data: ${response.status}`);
        }

        brandData = await response.json();
        console.log('Brand data loaded with', brandData.brands?.length || 0, 'entries');
        initializeBrandSelector();
    } catch (error) {
        console.error('Error loading brand data:', error);
        showToast('Unable to load brand information. Please refresh the page.', 'error');
    }
}

// Initialize brand selector dropdown
function initializeBrandSelector() {
    const brandSelect = document.getElementById('brandSelect');
    if (!brandSelect) {
        console.error('Brand select element not found');
        return;
    }

    if (!brandData || !Array.isArray(brandData.brands)) {
        console.warn('Brand data not available yet');
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

    if (!brandData || !Array.isArray(brandData.brands)) {
        console.warn('Brand data not ready when handling selection');
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
            uploadedImageDataUrl = e.target.result;
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
    uploadedImageDataUrl = null;
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
        const contextInput = document.getElementById('contextInput');
        const contextText = contextInput ? contextInput.value.trim() : '';

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brandId: currentBrand.id,
                context: contextText,
                imageDataUrl: uploadedImageDataUrl
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message = errorData.error || `Generation failed with status ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        const captions = (result.captions || []).map(caption => ({
            ...caption,
            length: caption.text ? caption.text.length : 0
        }));
        const hashtags = Array.isArray(result.hashtags) ? result.hashtags : [];

        console.log('Generated captions via AI:', captions.length);
        console.log('Generated hashtag sets via AI:', hashtags.length);

        displayResults(captions, hashtags, result.metadata || null);
        showToast('Content generated successfully!', 'success');

    } catch (error) {
        console.error('Generation error:', error);
        showToast(error.message || 'Failed to generate content. Please try again.', 'error');
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
    if (!brandData) {
        return [];
    }

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
    if (!brandData || !Array.isArray(brandData.trendingHashtags2025)) {
        return [];
    }

    const trending = [...brandData.trendingHashtags2025];
    const shuffled = trending.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

// Display generated results
function displayResults(captions, hashtags, metadata = null) {
    const captionResults = document.getElementById('captionResults');
    const hashtagResults = document.getElementById('hashtagResults');
    const resultsContainer = document.getElementById('resultsContainer');
    const emptyState = document.getElementById('emptyState');
    const aiInsightsCard = document.getElementById('aiInsightsCard');
    const aiNotes = document.getElementById('aiNotes');
    const aiUsage = document.getElementById('aiUsage');

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

    if (aiInsightsCard && aiNotes && aiUsage) {
        if (metadata && (metadata.notes || metadata.usage)) {
            aiInsightsCard.classList.remove('hidden');

            if (metadata.notes) {
                aiNotes.textContent = metadata.notes;
                aiNotes.classList.remove('hidden');
            } else {
                aiNotes.textContent = '';
                aiNotes.classList.add('hidden');
            }

            const usage = metadata.usage;
            if (usage && (usage.promptTokenCount !== undefined || usage.candidatesTokenCount !== undefined || usage.totalTokenCount !== undefined)) {
                const usageParts = [];
                if (usage.promptTokenCount !== undefined) usageParts.push(`Prompt tokens: ${usage.promptTokenCount}`);
                if (usage.candidatesTokenCount !== undefined) usageParts.push(`Response tokens: ${usage.candidatesTokenCount}`);
                if (usage.totalTokenCount !== undefined) usageParts.push(`Total tokens: ${usage.totalTokenCount}`);

                aiUsage.textContent = usageParts.join(' • ');
                aiUsage.classList.remove('hidden');
            } else {
                aiUsage.textContent = '';
                aiUsage.classList.add('hidden');
            }
        } else {
            aiInsightsCard.classList.add('hidden');
            aiNotes.textContent = '';
            aiNotes.classList.add('hidden');
            aiUsage.textContent = '';
            aiUsage.classList.add('hidden');
        }
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