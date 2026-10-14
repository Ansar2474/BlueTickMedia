(function () {
  'use strict';
  var d = document;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  var btn = d.getElementById('menuBtn');
  var menu = d.getElementById('mobileMenu');
  if (btn && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('hidden', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', function () {
      setOpen(menu.classList.contains('hidden'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setOpen(false);
    });
  }

  /* ---------- Count-up ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    var fmt = function (v) { return pre + v.toFixed(dec) + suf; };
    if (reduce) { el.textContent = fmt(target); return; }
    var dur = 1600, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll reveal ---------- */
  var root = d.documentElement;
  var canReveal = root.classList.contains('js') && !reduce && 'IntersectionObserver' in window;
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));

  if (!canReveal) {
    counters.forEach(function (el) {
      el.textContent = (el.getAttribute('data-prefix') || '') +
        parseFloat(el.getAttribute('data-count')).toFixed(parseInt(el.getAttribute('data-decimals') || '0', 10)) +
        (el.getAttribute('data-suffix') || '');
    });
    root.classList.remove('js');
  } else {
    /* Auto-tag grid children / figures */
    var sections = d.querySelectorAll('main section');
    [].forEach.call(sections, function (sec, si) {
      if (si === 0) return;
      var items = sec.querySelectorAll('.grid > *, figure');
      [].forEach.call(items, function (el, i) {
        if (el.classList.contains('reveal')) return;
        if (el.closest('.reveal, #tSlider, .fade-up, form, header, footer')) return;
        var parent = el.parentElement;
        var n = parent && parent.classList.contains('grid') ? parent.children.length : 1;
        el.style.setProperty('--d', ((i % 4) * 90) + 'ms');
        el.classList.add('reveal');
        if (n === 2 && parent) {
          el.classList.add(el === parent.children[0] ? 'reveal-left' : 'reveal-right');
        } else if (n >= 3) {
          el.classList.add('reveal-zoom');
        }
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        el.classList.add('in');
        if (el.hasAttribute('data-count')) countUp(el);
        [].forEach.call(el.querySelectorAll('[data-count]'), countUp);
        setTimeout(function () {
          el.classList.remove('reveal', 'in', 'reveal-left', 'reveal-right', 'reveal-zoom');
          el.style.removeProperty('--d');
        }, 1300);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    [].forEach.call(d.querySelectorAll('.reveal'), function (el) { io.observe(el); });
    /* counters outside any .reveal */
    counters.forEach(function (el) {
      if (!el.closest('.reveal')) io.observe(el);
    });
  }

  /* ---------- Call buttons: desktop browsers often have no calling app, so tel: links look "dead".
     On desktop we show the number with Copy / WhatsApp / Open calling app. Phones dial directly. ---------- */
  (function () {
    var isPhone = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      (window.matchMedia && matchMedia('(pointer:coarse)').matches);
    var pretty = { '+923117420474': '+92 311 7420474', '+971585940640': '+971 58 594 0640' };
    var box = null, lastFocus = null;

    function css() {
      var s = d.createElement('style');
      s.textContent = '.btcall{position:fixed;inset:0;z-index:80;display:none;align-items:center;justify-content:center;padding:1rem;background:rgba(7,22,74,.55)}' +
        '.btcall.on{display:flex}' +
        '.btcall-card{position:relative;width:100%;max-width:22rem;background:#fff;border-radius:1.25rem;padding:1.6rem 1.4rem 1.4rem;text-align:center;box-shadow:0 30px 70px -15px rgba(10,31,92,.6);font-family:Inter,system-ui,sans-serif;color:#0f172a}' +
        '.btcall-card h2{margin:0;font-size:1.15rem;font-weight:800;color:#0a1f5c}' +
        '.btcall-num{display:block;margin:.55rem 0 1rem;font-size:1.65rem;font-weight:800;letter-spacing:.01em;color:#1d4ed8;font-family:"Space Grotesk",Inter,sans-serif}' +
        '.btcall-card p{margin:0;font-size:.85rem;color:#475569}' +
        '.btcall-row{display:grid;gap:.5rem;margin-top:1rem}' +
        '.btcall-b{display:block;border:0;cursor:pointer;border-radius:9999px;padding:.65rem 1rem;font:700 .9rem/1.2 inherit;text-decoration:none;text-align:center}' +
        '.btcall-gold{background:linear-gradient(180deg,#fde68a,#f59e0b);color:#3b2400}' +
        '.btcall-wa{background:#25D366;color:#fff}' +
        '.btcall-alt{background:#eff6ff;color:#0a1f5c;border:1px solid #bfdbfe}' +
        '.btcall-x{position:absolute;top:.6rem;right:.6rem;width:2rem;height:2rem;border:0;border-radius:9999px;background:#f1f5f9;color:#334155;font-size:1.2rem;line-height:1;cursor:pointer}' +
        '.btcall-b:focus-visible,.btcall-x:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}';
      d.head.appendChild(s);
    }
    function build() {
      css();
      box = d.createElement('div');
      box.className = 'btcall';
      box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Call Bluetick Media');
      box.innerHTML = '<div class="btcall-card"><button class="btcall-x" type="button" aria-label="Close">&times;</button>' +
        '<h2>Call Bluetick Media</h2><span class="btcall-num"></span>' +
        '<p>Calling works best from your phone. Copy the number, or message us on WhatsApp.</p>' +
        '<div class="btcall-row"><button class="btcall-b btcall-gold" type="button" data-act="copy">Copy number</button>' +
        '<a class="btcall-b btcall-wa" data-act="wa" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>' +
        '<a class="btcall-b btcall-alt" data-act="tel">Open calling app</a></div></div>';
      d.body.appendChild(box);
      box.addEventListener('click', function (e) {
        var t = e.target;
        if (t === box || (t.classList && t.classList.contains('btcall-x'))) return close();
        if (t.getAttribute && t.getAttribute('data-act') === 'copy') {
          var num = box.querySelector('.btcall-num').textContent;
          var done = function () { t.textContent = 'Copied!'; setTimeout(function () { t.textContent = 'Copy number'; }, 1600); };
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(num).then(done, done);
          else { var ta = d.createElement('textarea'); ta.value = num; d.body.appendChild(ta); ta.select(); try { d.execCommand('copy'); } catch (er) {} ta.remove(); done(); }
        }
      });
      d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('on')) close(); });
    }
    function open(tel) {
      if (!box) build();
      var raw = tel.replace(/^tel:/, '');
      var digits = raw.replace(/[^\d+]/g, '');
      box.querySelector('.btcall-num').textContent = pretty[digits] || raw;
      box.querySelector('[data-act="wa"]').href = 'https://wa.me/' + digits.replace(/\D/g, '');
      box.querySelector('[data-act="tel"]').href = 'tel:' + digits;
      lastFocus = d.activeElement;
      box.classList.add('on');
      box.querySelector('.btcall-gold').focus();
    }
    function close() { box.classList.remove('on'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }

    if (isPhone) return;
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="tel:"]');
      if (!a || (box && box.contains(a))) return;
      e.preventDefault();
      open(a.getAttribute('href'));
    });
  })();

  /* ---------- Scroll progress + header shadow ---------- */
  var bar = null;
  if (!reduce) {
    bar = d.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    d.body.appendChild(bar);
  }
  var header = d.querySelector('header.sticky');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || root.scrollTop;
      if (bar) {
        var h = root.scrollHeight - window.innerHeight;
        bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';
      }
      if (header) header.classList.toggle('is-scrolled', y > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
