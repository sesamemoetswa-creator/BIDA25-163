/* ============================================================
   Sesame Flower Shop — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Hamburger Menu Toggle ──────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }


  /* ── 2. Sticky Header Shadow on Scroll ─────────────────── */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.10)'
        : '0 2px 12px rgba(0,0,0,0.06)';
    });
  }


  /* ── 3. Scroll-to-Top Button ───────────────────────────── */
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.id = 'scrollTopBtn';

  Object.assign(scrollBtn.style, {
    position:       'fixed',
    bottom:         '28px',
    right:          '28px',
    width:          '46px',
    height:         '46px',
    borderRadius:   '50%',
    background:     '#e91e8c',
    color:          '#fff',
    border:         'none',
    fontSize:       '1rem',
    cursor:         'pointer',
    boxShadow:      '0 4px 16px rgba(233,30,140,0.35)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    opacity:        '0',
    transform:      'translateY(20px)',
    transition:     'opacity 0.3s ease, transform 0.3s ease',
    zIndex:         '999',
  });

  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity   = '1';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity   = '0';
      scrollBtn.style.transform = 'translateY(20px)';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── 4. Smooth Scroll for anchor links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 5. Scroll Reveal Animations ───────────────────────── */
  const revealEls = document.querySelectorAll(
    '.offer-card, .product-card, .why-list li, .stat-item, .highlight'
  );

  if (revealEls.length > 0) {
    revealEls.forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(28px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }


  /* ── 6. Wishlist Heart Toggle (navbar icon) ─────────────── */
  const wishlistNavBtn = document.querySelector('.icon-btn[aria-label="Wishlist"]');

  if (wishlistNavBtn) {
    wishlistNavBtn.addEventListener('click', function () {
      const icon = this.querySelector('i');
      const isActive = icon.classList.contains('fa-solid');
      icon.classList.toggle('fa-solid',  !isActive);
      icon.classList.toggle('fa-regular', isActive);
      this.style.color = !isActive ? '#e91e8c' : '';
      this.style.transform = 'scale(1.3)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  }


  /* ── 7. Cart Count (sessionStorage) ───────────────────── */
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    const saved = sessionStorage.getItem('flowerCartCount');
    if (saved) cartCountEl.textContent = saved;
  }


  /* ── 8. Stats Counter Animation (about page) ───────────── */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      const target    = parseInt(el.textContent.replace(/\D/g, ''), 10);
      const steps     = 90;
      const increment = target / steps;
      let current     = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (el.childNodes[0]) el.childNodes[0].textContent = Math.floor(current);
      }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(animateCounter);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) statsObserver.observe(statsStrip);
  }


  /* ── 9. Star Rating Picker (review page) ───────────────── */
  const stars     = document.querySelectorAll('#starPicker i');
  const starLabel = document.getElementById('starLabel');
  let selectedRating = 0;
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

  if (stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.value);
        stars.forEach(s => {
          const v = parseInt(s.dataset.value);
          s.classList.toggle('fa-solid',  v <= val);
          s.classList.toggle('fa-regular', v > val);
          s.classList.toggle('selected',  v <= val);
        });
        if (starLabel) starLabel.textContent = labels[val];
      });

      star.addEventListener('mouseleave', () => {
        stars.forEach(s => {
          const v = parseInt(s.dataset.value);
          s.classList.toggle('fa-solid',  v <= selectedRating);
          s.classList.toggle('fa-regular', v > selectedRating);
          s.classList.toggle('selected',  v <= selectedRating);
        });
        if (starLabel) starLabel.textContent = selectedRating > 0 ? labels[selectedRating] : 'Click to rate';
      });

      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        if (starLabel) starLabel.textContent = labels[selectedRating];
      });
    });
  }


  /* ── 10. Character Count for Textarea ──────────────────── */
  const reviewText = document.getElementById('reviewText');
  const charCount  = document.getElementById('charCount');
  const maxChars   = 300;

  if (reviewText && charCount) {
    reviewText.addEventListener('input', () => {
      if (reviewText.value.length > maxChars) {
        reviewText.value = reviewText.value.substring(0, maxChars);
      }
      const current = reviewText.value.length;
      charCount.textContent = `${current} / ${maxChars}`;
      charCount.style.color = current >= maxChars * 0.9 ? '#e91e8c' : '';
    });
  }


  /* ── 11. Preloader ─────────────────────────────────────── */
  const preloader = document.createElement('div');
  preloader.id = 'preloader';

  Object.assign(preloader.style, {
    position:       'fixed',
    inset:          '0',
    background:     '#fdf2f8',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    zIndex:         '9999',
    transition:     'opacity 0.5s ease',
  });

  preloader.innerHTML = `
    <div style="text-align:center;">
      <div style="
        font-family: 'Playfair Display', serif;
        font-size: 1.8rem;
        font-weight: 700;
        color: #1a1a1a;
        letter-spacing: -0.5px;
        animation: pulse 1s ease infinite alternate;
      ">Sesame Flower <span style="color:#e91e8c;">Shop</span></div>
      <div style="
        margin-top: 16px;
        width: 40px;
        height: 3px;
        background: #e91e8c;
        border-radius: 2px;
        margin-left: auto;
        margin-right: auto;
        animation: loading 1s ease infinite;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        from { opacity: 0.5; }
        to   { opacity: 1; }
      }
      @keyframes loading {
        0%   { transform: scaleX(0.3); opacity: 0.4; }
        50%  { transform: scaleX(1);   opacity: 1;   }
        100% { transform: scaleX(0.3); opacity: 0.4; }
      }
    </style>
  `;

  document.body.prepend(preloader);

  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  });

}); // end DOMContentLoaded


/* ── Global: Add to Cart ───────────────────────────────── */
function addToCart(btn) {
  let count = parseInt(sessionStorage.getItem('flowerCartCount') || '0', 10);
  count++;
  sessionStorage.setItem('flowerCartCount', count);

  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
  });

  const original = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
  btn.disabled  = true;

  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = original;
    btn.disabled  = false;
  }, 1500);
}


/* ── Global: Submit Review ─────────────────────────────── */
function submitReview() {
  const name       = document.getElementById('reviewName').value.trim();
  const product    = document.getElementById('reviewProduct').value;
  const text       = document.getElementById('reviewText').value.trim();
  const btn        = document.getElementById('submitReview');
  const successMsg = document.getElementById('successMsg');
  const stars      = document.querySelectorAll('#starPicker i');
  let selectedRating = 0;

  stars.forEach(s => {
    if (s.classList.contains('fa-solid')) {
      selectedRating = parseInt(s.dataset.value);
    }
  });

  if (!name)              return alert('Please enter your name.');
  if (!product)           return alert('Please select a product or service.');
  if (!selectedRating)    return alert('Please select a star rating.');
  if (text.length < 10)   return alert('Please write at least 10 characters.');

  btn.disabled  = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

  setTimeout(() => {
    btn.style.display = 'none';
    successMsg.classList.add('show');

    document.getElementById('reviewName').value     = '';
    document.getElementById('reviewLocation').value = '';
    document.getElementById('reviewProduct').value  = '';
    document.getElementById('reviewText').value     = '';
    document.getElementById('charCount').textContent = '0 / 300';
    document.getElementById('starLabel').textContent = 'Click to rate';

    stars.forEach(s => {
      s.classList.remove('fa-solid', 'selected');
      s.classList.add('fa-regular');
    });

    setTimeout(() => {
      successMsg.classList.remove('show');
      btn.style.display = '';
      btn.disabled      = false;
      btn.innerHTML     = '<i class="fa-solid fa-paper-plane"></i> Submit Review';
    }, 5000);
  }, 1200);
}


/* ── Global: Shake animation for invalid fields ────────── */
function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  const shake = setInterval(() => {
    el.style.transform = count % 2 === 0 ? 'translateX(-6px)' : 'translateX(6px)';
    count++;
    if (count > 5) {
      clearInterval(shake);
      el.style.transform = '';
    }
  }, 80);
}
