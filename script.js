// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ADD TO CART BUTTON
function addToCart() {
    alert("Item added to cart 🌸");
}


// SMOOTH SCROLL (Shop Now)
document.querySelector('a[href="#products"]').addEventListener("click", function(e) {
    e.preventDefault();

    document.querySelector("#products").scrollIntoView({
        behavior: "smooth"
    });
});
/* ============================================================
   FLOWER. — products.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Category Filter ── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.product-card');
  const emptyState  = document.getElementById('emptyState');
  const grid        = document.getElementById('productsGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      // Show empty state if nothing matches
      emptyState.style.display = visible === 0 ? 'block' : 'none';
      grid.style.display       = visible === 0 ? 'none'  : 'grid';
    });
  });


  /* ── Wishlist Toggle on Cards ── */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    });
  });

});


/* ── Add to Cart (global so onclick="" works) ── */
let cartItems = 0;

function addToCart(btn) {
  cartItems++;

  // Update cart count badge in navbar
  const cartCount = document.getElementById('cartCount');
  if (cartCount) cartCount.textContent = cartItems;

  // Button feedback — flash green then reset
  btn.classList.add('added');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';

  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = original;
  }, 1500);
}
/* ============================================================
   FLOWER. — script.js
   Covers all pages: index, about, products
   ============================================================

   TABLE OF CONTENTS
   1.  Hamburger Menu Toggle
   2.  Active Nav Link on Scroll
   3.  Sticky Header Shadow on Scroll
   4.  Scroll-to-Top Button
   5.  Scroll Reveal Animations
   6.  Wishlist Heart Toggle (navbar icon)
   7.  Cart Count (shared across pages)
   8.  Smooth Scroll for anchor links
   9.  Stats Counter Animation (about page)
   10. Preloader
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ── 1. Hamburger Menu Toggle ──────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
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


  /* ── 2. Active Nav Link on Scroll ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4, rootMargin: `-72px 0px 0px 0px` });

    sections.forEach(s => sectionObserver.observe(s));
  }


  /* ── 3. Sticky Header Shadow on Scroll ─────────────────── */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.10)';
      } else {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
      }
    });
  }


  /* ── 4. Scroll-to-Top Button ───────────────────────────── */

  // Create the button in JavaScript — no HTML needed
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.id = 'scrollTopBtn';

  // Style it directly
  Object.assign(scrollBtn.style, {
    position:    'fixed',
    bottom:      '28px',
    right:       '28px',
    width:       '46px',
    height:      '46px',
    borderRadius:'50%',
    background:  '#e91e8c',
    color:       '#fff',
    border:      'none',
    fontSize:    '1rem',
    cursor:      'pointer',
    boxShadow:   '0 4px 16px rgba(233,30,140,0.35)',
    display:     'flex',
    alignItems:  'center',
    justifyContent: 'center',
    opacity:     '0',
    transform:   'translateY(20px)',
    transition:  'opacity 0.3s ease, transform 0.3s ease',
    zIndex:      '999',
  });

  document.body.appendChild(scrollBtn);

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity   = '1';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity   = '0';
      scrollBtn.style.transform = 'translateY(20px)';
    }
  });

  // Scroll back to top when clicked
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── 5. Scroll Reveal Animations ───────────────────────── */
  // Adds a visible class when elements enter the viewport
  const revealEls = document.querySelectorAll(
    '.offer-card, .product-card, .why-list li, .stat-item, .highlight'
  );

  if (revealEls.length > 0) {
    // Set initial hidden state
    revealEls.forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target); // animate once only
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

      // Small bounce animation
      this.style.transform = 'scale(1.3)';
      setTimeout(() => { this.style.transform = ''; }, 200);
    });
  }


  /* ── 7. Cart Count (shared across pages via sessionStorage) */
  const cartCountEl = document.getElementById('cartCount');

  // Load saved count from sessionStorage on page load
  if (cartCountEl) {
    const saved = sessionStorage.getItem('flowerCartCount');
    if (saved) cartCountEl.textContent = saved;
  }


  /* ── 8. Smooth Scroll for anchor links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── 9. Stats Counter Animation (about page) ───────────── */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0) {
    const animateCounter = (el) => {
      // Extract just the number part (ignore +, %, h)
      const text    = el.textContent;
      const suffix  = el.querySelector('.stat-plus');
      const suffixText = suffix ? suffix.textContent : '';
      const target  = parseInt(text.replace(/\D/g, ''), 10);
      const duration = 1800; // ms
      const stepTime = 20;
      const steps   = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        // Update number but keep the suffix element untouched
        el.childNodes[0].textContent = Math.floor(current);
      }, stepTime);
    };

    // Only start counting when the stats strip enters the viewport
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(animateCounter);
          statsObserver.disconnect(); // run once
        }
      });
    }, { threshold: 0.5 });

    const statsStrip = document.querySelector('.stats-strip');
    if (statsStrip) statsObserver.observe(statsStrip);
  }


  /* ── 10. Preloader ─────────────────────────────────────── */
  // Creates a simple preloader that fades out when page is ready
  const preloader = document.createElement('div');
  preloader.id = 'preloader';

  Object.assign(preloader.style, {
    position:        'fixed',
    inset:           '0',
    background:      '#fdf2f8',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          '9999',
    transition:      'opacity 0.5s ease',
  });

  preloader.innerHTML = `
    <div style="text-align:center;">
      <div style="
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        font-weight: 700;
        color: #1a1a1a;
        letter-spacing: -0.5px;
        animation: pulse 1s ease infinite alternate;
      ">Flower<span style="color:#e91e8c;">.</span></div>
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

  // Fade out and remove preloader once page fully loads
  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  });

}); // end DOMContentLoaded


/* ── Global: Add to Cart (used by products.html onclick) ── */
function addToCart(btn) {
  // Get current count from sessionStorage
  let count = parseInt(sessionStorage.getItem('flowerCartCount') || '0', 10);
  count++;

  // Save updated count
  sessionStorage.setItem('flowerCartCount', count);

  // Update all cart badges on the page
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
  });

  // Button feedback — flash green then reset
  const original = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = original;
    btn.disabled  = false;
  }, 1500);
}
/* ============================================================
   FLOWER. — review.js
   Handles: star rating picker, character count, form submit
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Star Rating Picker ── */
  const stars    = document.querySelectorAll('#starPicker i');
  const starLabel = document.getElementById('starLabel');
  let selectedRating = 0;

  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

  stars.forEach(star => {
    // Hover — highlight up to hovered star
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.value);
      stars.forEach(s => {
        const v = parseInt(s.dataset.value);
        s.classList.toggle('fa-solid',  v <= val);
        s.classList.toggle('fa-regular', v > val);
        s.classList.toggle('selected',  v <= val);
      });
      starLabel.textContent = labels[val];
    });

    // Mouse leave — go back to selected rating
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => {
        const v = parseInt(s.dataset.value);
        s.classList.toggle('fa-solid',  v <= selectedRating);
        s.classList.toggle('fa-regular', v > selectedRating);
        s.classList.toggle('selected',  v <= selectedRating);
      });
      starLabel.textContent = selectedRating > 0
        ? labels[selectedRating]
        : 'Click to rate';
    });

    // Click — lock in rating
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.value);
      starLabel.textContent = labels[selectedRating];
    });
  });


  /* ── Character Count for Textarea ── */
  const reviewText = document.getElementById('reviewText');
  const charCount  = document.getElementById('charCount');
  const maxChars   = 300;

  if (reviewText && charCount) {
    reviewText.addEventListener('input', () => {
      const len = reviewText.value.length;

      // Limit to maxChars
      if (len > maxChars) {
        reviewText.value = reviewText.value.substring(0, maxChars);
      }

      const current = reviewText.value.length;
      charCount.textContent = `${current} / ${maxChars}`;

      // Turn red when close to limit
      charCount.style.color = current >= maxChars * 0.9 ? '#e91e8c' : '';
    });
  }

});


/* ── Form Submission ── */
function submitReview() {
  const name     = document.getElementById('reviewName').value.trim();
  const product  = document.getElementById('reviewProduct').value;
  const text     = document.getElementById('reviewText').value.trim();
  const btn      = document.getElementById('submitReview');
  const successMsg = document.getElementById('successMsg');

  /* ── Validation ── */
  if (!name) {
    shakeField('reviewName');
    return alert('Please enter your name.');
  }
  if (!product) {
    shakeField('reviewProduct');
    return alert('Please select a product or service.');
  }
  if (selectedRating === 0) {
    return alert('Please select a star rating.');
  }
  if (text.length < 10) {
    shakeField('reviewText');
    return alert('Please write at least 10 characters in your review.');
  }

  /* ── Submit ── */
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

  // Simulate a short delay (replace with real API call if needed)
  setTimeout(() => {
    btn.style.display = 'none';
    successMsg.classList.add('show');

    // Reset form fields
    document.getElementById('reviewName').value     = '';
    document.getElementById('reviewLocation').value = '';
    document.getElementById('reviewProduct').value  = '';
    document.getElementById('reviewText').value     = '';
    document.getElementById('charCount').textContent = '0 / 300';
    document.getElementById('starLabel').textContent = 'Click to rate';

    // Reset stars
    document.querySelectorAll('#starPicker i').forEach(s => {
      s.classList.remove('fa-solid', 'selected');
      s.classList.add('fa-regular');
    });

    selectedRating = 0;

    // After 5 seconds, hide success and re-show button
    setTimeout(() => {
      successMsg.classList.remove('show');
      btn.style.display = '';
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Review';
    }, 5000);

  }, 1200);
}


/* ── Shake animation for invalid fields ── */
function shakeField(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transition = 'transform 0.1s ease';
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