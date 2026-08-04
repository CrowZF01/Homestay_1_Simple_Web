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

  // Space Documentation Single Photo Switcher
  const spaceMainImage = document.getElementById('spaceMainImage');
  const spaceActiveBadge = document.getElementById('spaceActiveBadge');
  const spaceTabBtns = document.querySelectorAll('.space-tab-btn');

  if (spaceMainImage && spaceTabBtns.length > 0) {
    spaceTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        spaceTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const newSrc = btn.getAttribute('data-img');
        const newLabel = btn.getAttribute('data-label');

        spaceMainImage.style.opacity = '0.3';
        setTimeout(() => {
          spaceMainImage.src = newSrc;
          if (spaceActiveBadge) spaceActiveBadge.textContent = newLabel;
          spaceMainImage.style.opacity = '1';
        }, 150);
      });
    });
  }

  // ========================================================================
  // SUPABASE DYNAMIC REVIEWS
  // ========================================================================

  const trackSingle = document.getElementById('reviewsTrackSingle');

  if (trackSingle) {
    fetchAndRenderReviews();
  }

  // Fallback reviews data (used when Supabase is blocked by ad-blockers like Brave Shield)
  const FALLBACK_REVIEWS = [
    {
      guest_name: 'Andi', guest_subtitle: 'Airbnb Guest', platform: 'airbnb',
      platform_label: 'Airbnb 5.0 ★', avatar_initial: 'A',
      review_short: '"Andre was a really great host and very responsive, the place is very near to malioboro street, 5 mins walking distance, the place was easy to find..."',
      review_full: '"Andre was a really great host and very responsive, the place is very near to malioboro street, 5 mins walking distance, the place was easy to find and the house is really clean and they even provide lots of amenities, 10/10 would go here again!"'
    },
    {
      guest_name: 'Allam', guest_subtitle: 'Indonesia', platform: 'booking',
      platform_label: 'Booking.com 10/10', avatar_initial: 'A',
      review_short: '"Good place. The owner prepare everything you expect in the house. Spacious & clean. Additional cost for public parking."',
      review_full: '"Good place. The owner prepare everything you expect in the house. Spacious & clean. Additional cost for public parking."'
    },
    {
      guest_name: 'Kevin Arif', guest_subtitle: 'Local Guide • 18 reviews', platform: 'google',
      platform_label: 'Google 5.0 ★', avatar_initial: 'K',
      review_short: '"I highly recommend staying at this homestay. The owner is communicative, the place is clean, and it is close to the city center..."',
      review_full: '"I highly recommend staying at this homestay. The owner is communicative, the place is clean, and it is close to the city center yet quiet at night; it is also easily accessible by vehicle. I will definitely stay here again if I return to Jogja."'
    }
  ];

  async function fetchAndRenderReviews() {
    let reviews = FALLBACK_REVIEWS;

    try {
      if (typeof supabaseClient !== 'undefined') {
        const { data, error } = await supabaseClient
          .from('reviews')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          reviews = data;
        }
      }
    } catch (err) {
      console.warn('Supabase unavailable, using fallback reviews:', err.message);
    }

    renderReviewCards(reviews);
    initReviewCarousel();
    initReadMoreToggle();
  }

  function renderReviewCards(reviews) {
    const totalReviews = reviews.length;

    const cardsHTML = reviews.map((review, index) => {
      const needsReadMore = review.review_short !== review.review_full;

      return `
        <div class="review-card-single">
          <div class="review-card-header">
            <div class="review-user-info">
              <div class="review-avatar avatar-${review.platform}">${review.avatar_initial}</div>
              <div class="review-user-details">
                <h4 class="review-user-name">${review.guest_name}</h4>
                <span class="review-user-sub">${review.guest_subtitle}</span>
              </div>
            </div>
            <span class="platform-badge badge-${review.platform}">
              ${review.platform_label}
            </span>
          </div>

          <div class="review-body">
            <p class="review-text-short">
              ${review.review_short}
              ${needsReadMore ? '<button class="read-more-btn">Read more</button>' : ''}
            </p>
            <p class="review-text-full hidden">
              ${review.review_full}
              ${needsReadMore ? '<button class="read-less-btn">Read less</button>' : ''}
            </p>
          </div>

          <div class="review-card-footer">
            <div class="review-single-dots"></div>
            <div class="review-ctrl-arrows">
              <button class="review-ctrl-btn prev reviewSinglePrev" aria-label="Previous review">‹</button>
              <button class="review-ctrl-btn next reviewSingleNext" aria-label="Next review">›</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    trackSingle.innerHTML = cardsHTML;
  }

  function initReviewCarousel() {
    const cardsSingle = document.querySelectorAll('.review-card-single');
    if (cardsSingle.length === 0) return;

    let currentSingleIndex = 0;

    function createSingleDots() {
      cardsSingle.forEach(card => {
        const dotsContainer = card.querySelector('.review-single-dots');
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        cardsSingle.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.classList.add('review-dot');
          if (idx === currentSingleIndex) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentSingleIndex = idx;
            updateSlider();
          });
          dotsContainer.appendChild(dot);
        });
      });
    }

    function updateSlider() {
      if (currentSingleIndex >= cardsSingle.length) currentSingleIndex = 0;
      if (currentSingleIndex < 0) currentSingleIndex = cardsSingle.length - 1;

      trackSingle.style.transform = `translateX(-${currentSingleIndex * 100}%)`;

      cardsSingle.forEach(card => {
        const dotsContainer = card.querySelector('.review-single-dots');
        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.review-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSingleIndex);
          });
        }
      });
    }

    document.querySelectorAll('.reviewSingleNext').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSingleIndex = (currentSingleIndex + 1) % cardsSingle.length;
        updateSlider();
      });
    });

    document.querySelectorAll('.reviewSinglePrev').forEach(btn => {
      btn.addEventListener('click', () => {
        currentSingleIndex = (currentSingleIndex - 1 + cardsSingle.length) % cardsSingle.length;
        updateSlider();
      });
    });

    // Touch Swipe Support
    let startX = 0;
    let isDragging = false;

    trackSingle.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    trackSingle.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 35) {
        if (diffX > 0) {
          currentSingleIndex = (currentSingleIndex + 1) % cardsSingle.length;
        } else {
          currentSingleIndex = (currentSingleIndex - 1 + cardsSingle.length) % cardsSingle.length;
        }
        updateSlider();
      }
    }, { passive: true });

    createSingleDots();
    updateSlider();
  }

  function initReadMoreToggle() {
    document.querySelectorAll('.review-body').forEach(body => {
      const readMoreBtn = body.querySelector('.read-more-btn');
      const readLessBtn = body.querySelector('.read-less-btn');
      const shortText = body.querySelector('.review-text-short');
      const fullText = body.querySelector('.review-text-full');

      if (readMoreBtn && shortText && fullText) {
        readMoreBtn.addEventListener('click', () => {
          shortText.classList.add('hidden');
          fullText.classList.remove('hidden');
        });
      }

      if (readLessBtn && shortText && fullText) {
        readLessBtn.addEventListener('click', () => {
          fullText.classList.add('hidden');
          shortText.classList.remove('hidden');
        });
      }
    });
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

