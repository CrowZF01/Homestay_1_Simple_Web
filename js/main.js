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

  // Hero Section 3-Circle Infinite Carousel
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

    // Click Listeners
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

    // Auto-slide loop
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

    // Initialize
    updateCarousel();
    startAutoSlide();
  }
});
