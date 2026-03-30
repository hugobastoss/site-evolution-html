  // ── CONTATOS WHATSAPP ──────────────────────────────────────────
  // Para alterar número ou mensagem, edite apenas aqui.
  const WA = {
    servicos: 'https://wa.me/5592991404018?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20servi%C3%A7o.',
    produtos: 'https://wa.me/5592991404018?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20produtos%20dispon%C3%ADveis.',
    loja:     'https://wa.me/5592991046810?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20produtos%20da%20loja.',
    float:    'https://wa.me/5592991404018',
  };
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = WA[a.dataset.wa] || '#'; });

  // ── MENU MOBILE ────────────────────────────────────────────────
  // Links gerados automaticamente a partir do menu desktop.
  function toggleMenu() {
    const isOpen = document.getElementById('navMobile').classList.toggle('open');
    document.getElementById('menuBtn').classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  (function buildMobileMenu() {
    const mobileNav = document.getElementById('navMobile');
    document.querySelectorAll('.nav-links a').forEach(link => {
      const a = link.cloneNode(true);
      a.addEventListener('click', toggleMenu);
      mobileNav.appendChild(a);
    });
  })();

  // ── SCROLL REVEAL ──────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ── FILTRO DE CATEGORIAS ───────────────────────────────────────
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      let visible = 0;
      document.querySelectorAll('.product-card').forEach(card => {
        const show = cat === 'todos' || card.getAttribute('data-cat') === cat;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      document.getElementById('productsEmpty').style.display = visible === 0 ? '' : 'none';
    });
  });

  // ── SCROLL SUAVE ───────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
