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

  // ── HERO SLIDER ────────────────────────────────────────────────
  (function initSlider() {
    const track  = document.querySelector('.slider-track');
    if (!track) return;

    const slides = track.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.slider-dots .dot');
    const total  = slides.length;
    let current  = 0;
    let timer;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      clearInterval(timer);
      timer = setInterval(next, 4500);
    }

    document.querySelector('.slider-next')?.addEventListener('click', () => { next(); startAutoplay(); });
    document.querySelector('.slider-prev')?.addEventListener('click', () => { prev(); startAutoplay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAutoplay(); }));

    // Swipe touch
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); startAutoplay(); }
    });

    // Pausa ao hover
    track.closest('.hero-slider').addEventListener('mouseenter', () => clearInterval(timer));
    track.closest('.hero-slider').addEventListener('mouseleave', startAutoplay);

    startAutoplay();
  })();

  // ── SCROLL SUAVE ───────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
