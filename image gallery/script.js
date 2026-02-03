// script.js
const galleryItems = document.querySelectorAll('.gallery-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentIndex = 0;
let visibleImages = [...galleryItems]; // Tracks currently filtered images

// 1. Filtering Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        // Update visible images for navigation
        visibleImages = [...galleryItems].filter(item => item.style.display !== 'none');
    });
});

// 2. Lightbox Logic
visibleImages.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = visibleImages.indexOf(item);
        showImage(currentIndex);
    });
});

function showImage(index) {
    const imgSrc = visibleImages[index].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
}

// 3. Navigation
nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage(currentIndex);
};

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(currentIndex);
};

closeBtn.onclick = () => lightbox.style.display = 'none';


// Updates the Lightbox view based on the current visible set
function showImage(index) {
    if (index >= 0 && index < visibleImages.length) {
        currentIndex = index;
        const img = visibleImages[currentIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    }
}

// Attach click events to current visible items
function updateClickEvents() {
    visibleImages.forEach((item, index) => {
        item.onclick = () => showImage(index);
    });
}

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Switch Active Class
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');
        
        // Show/Hide Items
        galleryItems.forEach(item => {
            const cat = item.getAttribute('data-category');
            item.style.display = (filter === 'all' || cat === filter) ? 'block' : 'none';
        });

        // Re-sync visible images array for the Lightbox
        visibleImages = Array.from(galleryItems).filter(i => i.style.display !== 'none');
        updateClickEvents(); 
    });
});

// Initial call
updateClickEvents();

// Navigation Controls
document.querySelector('.next-btn').onclick = () => {
    currentIndex = (currentIndex + 1) % visibleImages.length;
    showImage(currentIndex);
};

document.querySelector('.prev-btn').onclick = () => {
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    showImage(currentIndex);
};

document.querySelector('.close-btn').onclick = () => lightbox.style.display = 'none';