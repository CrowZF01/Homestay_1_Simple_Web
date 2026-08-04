/* ==========================================================================
   JAVASCRIPT FOR GALLERY.HTML (CATEGORY CAROUSELS & LIGHTBOX CATEGORY SLIDER)
   ========================================================================== */

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

  // Category Carousel Navigation Arrows (Horizontal Page Track Scrolling)
  const catNavBtns = document.querySelectorAll('.cat-nav-btn');

  catNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const track = document.getElementById(targetId);

      if (track) {
        const scrollAmount = track.clientWidth * 0.75;
        if (btn.classList.contains('next')) {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (btn.classList.contains('prev')) {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    });
  });

  // Lightbox Modal Viewer with Category-Scoped Slider
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let categoryCards = [];
  let currentCardIndex = 0;

  function showLightboxItem(index) {
    if (categoryCards.length === 0) return;
    currentCardIndex = (index + categoryCards.length) % categoryCards.length;

    const card = categoryCards[currentCardIndex];
    const img = card.querySelector('img');

    if (img && lightboxImage) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Gallery Photo';
    }
  }

  // Attach Click Handler to all Square Cards
  const squareCards = document.querySelectorAll('.square-card');

  squareCards.forEach(card => {
    card.addEventListener('click', () => {
      const parentTrack = card.closest('.category-carousel-track');
      if (parentTrack) {
        categoryCards = Array.from(parentTrack.querySelectorAll('.square-card'));
        currentCardIndex = categoryCards.indexOf(card);
      } else {
        categoryCards = [card];
        currentCardIndex = 0;
      }

      showLightboxItem(currentCardIndex);
      if (lightboxModal) lightboxModal.classList.add('open');
    });
  });

  // Lightbox Next/Prev Navigation Buttons
  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxItem(currentCardIndex + 1);
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxItem(currentCardIndex - 1);
    });
  }

  // Close Lightbox Modal
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightboxModal) lightboxModal.classList.remove('open');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  // Keyboard Left / Right Navigation & Escape Key
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('open')) return;

    if (e.key === 'ArrowRight') {
      showLightboxItem(currentCardIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      showLightboxItem(currentCardIndex - 1);
    } else if (e.key === 'Escape') {
      lightboxModal.classList.remove('open');
    }
  });

  // Touch Swipe Gesture for Lightbox Modal (Mobile & Tablet)
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diffX = touchEndX - touchStartX;

      if (diffX < -40) {
        // Swiped Left -> Next Photo in same category
        showLightboxItem(currentCardIndex + 1);
      } else if (diffX > 40) {
        // Swiped Right -> Prev Photo in same category
        showLightboxItem(currentCardIndex - 1);
      }
    }, { passive: true });
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
