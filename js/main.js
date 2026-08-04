/* ==========================================================================
   JAVASCRIPT FOR INDEX.HTML (HOME PAGE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        mobileToggle.classList.remove('active');
      }
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

  // Scroll Reveal Fade-In Observer (Lightweight & 60fps Native Performance)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});

