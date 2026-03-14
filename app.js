/* ============================================================
   DMS Fancy Shop – Main JavaScript
   ============================================================ */

/* ===== DEFAULT PRODUCTS ===== */
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Kajte San Skin Whitening Soap",
    category: "soaps",
    price: 1600,
    badge: "Best Seller",
    image: "",
    features: ["Glutathione Formula", "Brightening Care", "Smooth & Fresh Skin"],
    description: "Classic skin lightening soap with Pigment Light formula. Whitens and brightens for a radiant, smooth complexion."
  },
  {
    id: 2,
    name: "Glupa Glutathione Soap",
    category: "soaps",
    price: 2600,
    badge: "Dermatologist Tested",
    image: "",
    features: ["Papaya Extract", "Brightening Care", "Dermatologist Tested"],
    description: "Glutathione + Papaya formula – 135g cucumber melon scent skin whitening soap. Tested and trusted."
  },
  {
    id: 3,
    name: "Olifair Radiant Effect Cream",
    category: "creams",
    price: 6000,
    badge: "Premium",
    image: "",
    features: ["Radiant Skin Glow", "Pearl Extract", "Saffron Formula", "Smooth & Bright"],
    description: "Pearls + Saffron skin brightening formula. Luxurious cream for a radiant glow and smooth, bright skin."
  },
  {
    id: 4,
    name: "Gluta Collagen Pink",
    category: "supplements",
    price: 4200,
    badge: "New Arrival",
    image: "",
    features: ["Collagen Support", "L-Glutathione", "Beauty & Skin Glow"],
    description: "Dietary supplement with Acerola Cherry, Collagen, and L-Glutathione for beauty and skin glow."
  },
  {
    id: 5,
    name: "L'Oréal Elvive Shampoo",
    category: "haircare",
    price: 3500,
    badge: "Top Brand",
    image: "",
    features: ["Hair Strengthening", "Color Protection", "Smooth & Healthy"],
    description: "Maxi Format 400ml professional shampoo. Choose Full Resist or Color Vive for stronger, healthier hair."
  }
];

/* ===== PRODUCT STORE ===== */
function getProducts() {
  const stored = localStorage.getItem('dms_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch(e) {}
  }
  localStorage.setItem('dms_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}
function saveProducts(products) {
  localStorage.setItem('dms_products', JSON.stringify(products));
}

/* ===== WHATSAPP ORDER LINK ===== */
function makeWALink(product) {
  const msg = encodeURIComponent(
    `Hello DMS Fancy Shop! 🌿✨\nI would like to order:\n\n🛍️ *${product.name}*\n💰 Price: LKR ${product.price.toLocaleString()}\n\nPlease confirm availability and delivery. Thank you!`
  );
  return `https://wa.me/94712150911?text=${msg}`;
}

/* ===== CATEGORY ICONS ===== */
const CATEGORY_ICONS = {
  skincare: '🌿', soaps: '🧼', creams: '✨', haircare: '💇', supplements: '💊', all: '🌟'
};

/* ===== RENDER PRODUCT CARD ===== */
function renderProductCard(p, index) {
  const icon = CATEGORY_ICONS[p.category] || '💫';
  const featureTags = (p.features || []).map(f => `<span class="feature-tag">${f}</span>`).join('');
  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="product-img-placeholder">${icon}</div>`;

  return `
  <div class="product-card" style="animation-delay:${index * 0.08}s">
    ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
    <div class="product-img-wrap">${imgContent}</div>
    <div class="product-info">
      <p class="product-category">${p.category.replace(/([A-Z])/g,' $1').toUpperCase()}</p>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-features">${featureTags}</div>
      <div class="product-price">
        <span class="price-label">Price</span>
        <span class="price-amount"><span class="price-currency">LKR</span>${p.price.toLocaleString()}</span>
      </div>
      <div class="product-order-btns">
        <a href="${makeWALink(p)}" target="_blank" class="btn-order-wa">
          <i class="fab fa-whatsapp"></i> Order Now
        </a>
        <a href="tel:+94712150911" class="btn-order-call">
          <i class="fas fa-phone"></i>
        </a>
      </div>
    </div>
  </div>`;
}

/* ===== HERO 3D PARTICLE CANVAS ===== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 2.5 + 0.5;
      this.speed = Math.random() * 0.4 + 0.1;
      this.angle = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.5 ? '#c9a84c' : '#1e4c26';
      this.twinkle = Math.random() * 0.02 + 0.005;
      this.phase = Math.random() * Math.PI * 2;
    }
    update(t) {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed - 0.2;
      this.opacity = 0.2 + 0.5 * Math.abs(Math.sin(t * this.twinkle + this.phase));
      if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function loop(t) {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.1;
          ctx.strokeStyle = '#c9a84c';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    particles.forEach(p => { p.update(t * 0.001); p.draw(); });
    animId = requestAnimationFrame(loop);
  }
  animId = requestAnimationFrame(loop);
}

/* ===== LOADING SCREEN ===== */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  const particles = document.getElementById('loaderParticles');
  if (!screen) return;

  // Generate floating particles
  if (particles) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        position:absolute; border-radius:50%;
        width:${size}px; height:${size}px;
        background:${Math.random()>0.5?'#c9a84c':'#1e4c26'};
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        opacity:${Math.random()*0.6+0.1};
        animation:loaderParticleFloat ${3+Math.random()*4}s ease-in-out infinite ${Math.random()*3}s;
      `;
      particles.appendChild(p);
    }
  }

  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
  }, 2800);

  const style = document.createElement('style');
  style.textContent = `@keyframes loaderParticleFloat {
    0%,100%{transform:translateY(0) scale(1);}
    50%{transform:translateY(-30px) scale(1.2);}
  }`;
  document.head.appendChild(style);
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}

/* ===== SCROLL ANIMATIONS (simple IntersectionObserver) ===== */
function initScrollAnimations() {
  const els = document.querySelectorAll('.why-card, .product-card, .testimonial-card');
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
}

/* ===== TESTIMONIALS ===== */
let testimonialIdx = 0;
let testimonialTimer;
function goToTestimonial(idx) {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.t-dot');
  if (!cards.length) return;
  cards.forEach(c => c.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  testimonialIdx = (idx + cards.length) % cards.length;
  cards[testimonialIdx].classList.add('active');
  if (dots[testimonialIdx]) dots[testimonialIdx].classList.add('active');
}
function initTestimonials() {
  testimonialTimer = setInterval(() => goToTestimonial(testimonialIdx + 1), 5000);
}
window.goToTestimonial = goToTestimonial;

/* ===== HOME: RENDER FEATURED PRODUCTS ===== */
function initHomeFeatured() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const products = getProducts().slice(0, 6);
  grid.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');
}

/* ===== PRODUCTS PAGE ===== */
function initProductsPage() {
  const grid = document.getElementById('allProductsGrid');
  if (!grid) return;
  let currentFilter = 'all';

  function renderAll(filter) {
    const products = getProducts();
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    if (filtered.length === 0) {
      grid.innerHTML = `<div style="text-align:center;color:var(--text-muted);padding:4rem;grid-column:1/-1;">
        <div style="font-size:3rem;margin-bottom:1rem">🌿</div>
        <p>No products in this category yet.</p>
      </div>`;
    } else {
      grid.innerHTML = filtered.map((p, i) => renderProductCard(p, i)).join('');
    }
  }

  renderAll('all');

  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.cat;
      renderAll(currentFilter);
    });
  });

  // Search
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      if (!q) { renderAll(currentFilter); return; }
      const products = getProducts();
      const results = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.features || []).some(f => f.toLowerCase().includes(q))
      );
      grid.innerHTML = results.length
        ? results.map((p, i) => renderProductCard(p, i)).join('')
        : `<div style="text-align:center;color:var(--text-muted);padding:4rem;grid-column:1/-1;">
            <div style="font-size:3rem;margin-bottom:1rem">🔍</div>
            <p>No products found for "<strong>${q}</strong>"</p>
          </div>`;
    });
  }
}

/* ===== ADMIN PAGE ===== */
function initAdminPage() {
  const form = document.getElementById('addProductForm');
  const list = document.getElementById('adminProductList');
  const successMsg = document.getElementById('successMsg');
  const imgInput = document.getElementById('productImage');
  const imgPreview = document.getElementById('imgPreview');

  if (!form) return;

  // Image preview
  if (imgInput && imgPreview) {
    imgInput.addEventListener('change', function() {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        imgPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderAdminList() {
    if (!list) return;
    const products = getProducts();
    if (!products.length) {
      list.innerHTML = `<p style="color:var(--text-muted);text-align:center">No products yet.</p>`;
      return;
    }
    list.innerHTML = products.map(p => {
      const icon = CATEGORY_ICONS[p.category] || '💫';
      const imgEl = p.image
        ? `<img src="${p.image}" alt="${p.name}" style="width:60px;height:60px;border-radius:10px;object-fit:cover">`
        : `<div style="font-size:1.8rem;width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:var(--green-accent);border-radius:10px">${icon}</div>`;
      return `
      <div class="admin-product-row">
        ${imgEl}
        <div class="admin-product-info">
          <h4>${p.name}</h4>
          <span>${p.category} ${p.badge ? '· ' + p.badge : ''}</span>
        </div>
        <span class="admin-product-price">LKR ${p.price.toLocaleString()}</span>
        <div class="admin-product-actions">
          <button class="btn-delete" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>`;
    }).join('');
  }

  renderAdminList();

  window.deleteProduct = function(id) {
    if (!confirm('Delete this product?')) return;
    const products = getProducts().filter(p => p.id !== id);
    saveProducts(products);
    renderAdminList();
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const products = getProducts();
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const badge = document.getElementById('productBadge').value.trim();
    const features = document.getElementById('productFeatures').value.trim()
      .split(',').map(f => f.trim()).filter(Boolean);
    const description = document.getElementById('productDesc').value.trim();

    // Handle image
    const imgFile = imgInput && imgInput.files[0];
    if (imgFile) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        const newProduct = {
          id: Date.now(), name, category, price, badge, features, description,
          image: ev.target.result
        };
        products.push(newProduct);
        saveProducts(products);
        form.reset();
        if (imgPreview) imgPreview.innerHTML = `<div class="image-upload-placeholder"><i class="fas fa-cloud-upload-alt" style="font-size:2rem;color:var(--border-gold);display:block;margin-bottom:0.5rem"></i>Click to upload product image</div>`;
        renderAdminList();
        if (successMsg) { successMsg.classList.add('show'); setTimeout(() => successMsg.classList.remove('show'), 3000); }
      };
      reader.readAsDataURL(imgFile);
    } else {
      const newProduct = { id: Date.now(), name, category, price, badge, features, description, image: '' };
      products.push(newProduct);
      saveProducts(products);
      form.reset();
      renderAdminList();
      if (successMsg) { successMsg.classList.add('show'); setTimeout(() => successMsg.classList.remove('show'), 3000); }
    }
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const message = document.getElementById('cMessage').value;
    const product = document.getElementById('cProduct') ? document.getElementById('cProduct').value : '';
    const waMsg = encodeURIComponent(`Hello DMS Fancy Shop! 🌿\n\nMy name is *${name}*.\n${product ? 'Interested in: *' + product + '*\n' : ''}\n${message}`);
    window.open(`https://wa.me/94712150911?text=${waMsg}`, '_blank');
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  initLoadingScreen();
  initNavbar();
  initScrollAnimations();
  initTestimonials();
  initHeroCanvas();
  initHomeFeatured();
  initProductsPage();
  initAdminPage();
  initContactForm();
});
