document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });
  }

  // Hero Section 3-Circle Infinite Carousel (Only runs if #heroCarousel exists on the page)
  const items = document.querySelectorAll('#heroCarousel .carousel-item');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (items.length > 0) {
    let currentIndex = 0;
    const total = items.length;
    let autoSlideTimer = null;

    function updateCarousel() {
      items.forEach((item, index) => {
        item.classList.remove('active', 'prev-item', 'next-item');

        if (index === currentIndex) {
          item.classList.add('active');
        } else if (index === (currentIndex - 1 + total) % total) {
          item.classList.add('prev-item');
        } else if (index === (currentIndex + 1) % total) {
          item.classList.add('next-item');
        }
      });
    }

    function slideNext() {
      currentIndex = (currentIndex + 1) % total;
      updateCarousel();
    }

    function slidePrev() {
      currentIndex = (currentIndex - 1 + total) % total;
      updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    if (prevBtn) prevBtn.addEventListener('click', slidePrev);

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });

    function startAutoSlide() {
      autoSlideTimer = setInterval(slideNext, 4000);
    }

    function stopAutoSlide() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    const wrapper = document.querySelector('.hero-carousel-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', stopAutoSlide);
      wrapper.addEventListener('mouseleave', startAutoSlide);
    }

    updateCarousel();
    startAutoSlide();
  }

  // Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.4s ease-out forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Modal Viewer
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const tag = item.querySelector('.gallery-tag');

        if (img && lightboxImage) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt || 'Gallery Photo';
        }

        if (tag && lightboxCaption) {
          lightboxCaption.textContent = tag.textContent;
        }

        lightboxModal.classList.add('open');
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightboxModal.classList.remove('open');
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        lightboxModal.classList.remove('open');
      }
    });
  }
});
