  // ── CONTATOS WHATSAPP ──────────────────────────────────────────
  // URLs geradas dinamicamente a partir de CONFIG (assets/js/config.js)
  function buildWaUrl(tipo) {
    const tel = CONFIG.telefones[tipo] || CONFIG.telefones.servicos;
    const msg = CONFIG.waMensagens[tipo] || '';
    return msg
      ? `https://wa.me/${tel.numero}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/${tel.numero}`;
  }
  const WA = {
    servicos: buildWaUrl('servicos'),
    produtos:  buildWaUrl('produtos'),
    loja:      buildWaUrl('loja'),
    float:    `https://wa.me/${CONFIG.telefones.servicos.numero}`,
  };
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = WA[a.dataset.wa] || '#'; });

  // ── DADOS DE CONTATO (CONFIG → DOM) ───────────────────────────
  // Telefones: <a data-config-tel="servicos">
  document.querySelectorAll('[data-config-tel]').forEach(el => {
    const tipo = el.dataset.configTel;
    const tel  = CONFIG.telefones[tipo];
    if (!tel) return;
    el.href        = `tel:+${tel.numero}`;
    el.textContent = tel.exibicao;
  });

  // Endereço: <div data-config="endereco">
  const endDiv = document.querySelector('[data-config="endereco"]');
  if (endDiv) {
    const e = CONFIG.endereco;
    endDiv.innerHTML = `${e.rua}<br>${e.complemento}<br>${e.bairro}, ${e.cidade} - ${e.estado}<br>CEP ${e.cep}`;
  }

  // Horários: <div data-config="horarios"> (pode aparecer mais de uma vez)
  document.querySelectorAll('[data-config="horarios"]').forEach(el => {
    el.innerHTML = CONFIG.horarios
      .map(h => `<div>${h.dias}: ${h.abre} – ${h.fecha}</div>`)
      .join('');
  });

  // Rodapé — endereço resumido
  const footerAddr = document.querySelector('[data-config="footer-address"]');
  if (footerAddr) {
    const e = CONFIG.endereco;
    footerAddr.textContent = `${e.rua} — ${e.bairro}, ${e.cidade} - ${e.estado} · CEP ${e.cep}`;
  }

  // Rodapé — copyright
  const copyEl = document.querySelector('[data-config="copyright"]');
  if (copyEl) {
    const host = CONFIG.site.replace(/^https?:\/\//, '');
    copyEl.textContent = `© ${CONFIG.ano} Evolution Refrigeração & Climatização — CNPJ ${CONFIG.cnpj} — ${host}`;
  }

  // ── REDES SOCIAIS ──────────────────────────────────────────────
  // Aplica URLs de CONFIG.redes e oculta botões sem link configurado
  document.querySelectorAll('[data-social]').forEach(a => {
    const rede = a.dataset.social;
    const url  = CONFIG.redes[rede];
    if (url) {
      a.href = url;
    } else {
      a.style.display = 'none';
    }
  });

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

  // ── FILTRO DE CATEGORIAS + GRADE COLAPSADA (2 linhas) ───────────
  (function initProductsGrid() {
    const ROWS_COLLAPSED = 2;
    const cards = document.querySelectorAll('.product-card');
    const productsEmpty = document.getElementById('productsEmpty');
    const moreBtn = document.getElementById('productsMoreBtn');
    if (!cards.length) return;

    let expanded = false;

    function getCols() {
      return window.matchMedia('(min-width: 1025px)').matches ? 4 : 2;
    }

    function applyVisibility() {
      const activeCat = document.querySelector('.cat-pill.active')?.getAttribute('data-cat') || 'todos';
      const isAll = activeCat === 'todos';
      // O recolhimento em 2 linhas + botão "Ver mais" só existe na aba "Todos"
      const limit = (isAll && !expanded) ? getCols() * ROWS_COLLAPSED : Infinity;
      let matchCount = 0;
      cards.forEach(card => {
        const isMatch = isAll || card.getAttribute('data-cat') === activeCat;
        if (!isMatch) { card.style.display = 'none'; return; }
        matchCount++;
        card.style.display = matchCount <= limit ? '' : 'none';
      });
      if (productsEmpty) productsEmpty.style.display = matchCount === 0 ? '' : 'none';
      if (moreBtn) moreBtn.style.display = (isAll && !expanded && matchCount > limit) ? '' : 'none';
    }

    document.querySelectorAll('.cat-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        expanded = false;
        applyVisibility();
      });
    });

    moreBtn?.addEventListener('click', () => {
      expanded = true;
      applyVisibility();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyVisibility, 200);
    });

    applyVisibility();
  })();

  // ── HERO SLIDER ────────────────────────────────────────────────
  (function initSlider() {
    const track  = document.querySelector('.slider-track');
    if (!track) return;

    const slides = track.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.slider-dots .dot');
    const pauseBtn = document.getElementById('sliderPause');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const total  = slides.length;
    let current  = 0;
    let timer;
    let userPaused = reduceMotionQuery.matches;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function setPauseUI(paused) {
      if (!pauseBtn) return;
      pauseBtn.querySelector('.material-symbols-outlined').textContent = paused ? 'play_arrow' : 'pause';
      pauseBtn.setAttribute('aria-label', paused ? 'Retomar apresentação automática' : 'Pausar apresentação automática');
      pauseBtn.setAttribute('aria-pressed', String(paused));
    }

    function startAutoplay() {
      clearInterval(timer);
      if (userPaused || reduceMotionQuery.matches) return;
      timer = setInterval(next, 4500);
    }

    setPauseUI(userPaused);

    document.querySelector('.slider-next')?.addEventListener('click', () => { next(); startAutoplay(); });
    document.querySelector('.slider-prev')?.addEventListener('click', () => { prev(); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

    pauseBtn?.addEventListener('click', () => {
      userPaused = !userPaused;
      setPauseUI(userPaused);
      if (userPaused) { clearInterval(timer); } else { startAutoplay(); }
    });

    // Swipe touch
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); startAutoplay(); }
    });

    // Pausa ao passar o mouse ou ao navegar com teclado (foco) pelos controles
    const heroSlider = track.closest('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(timer));
    heroSlider.addEventListener('mouseleave', startAutoplay);
    heroSlider.addEventListener('focusin', () => clearInterval(timer));
    heroSlider.addEventListener('focusout', () => startAutoplay());

    startAutoplay();
  })();

  // ── SCROLL SUAVE ───────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
