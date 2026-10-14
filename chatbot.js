/* Bluetick Media - website assistant.
   Self-contained: injects its own CSS, no external requests.
   All answers come from the content published on this site (see KB below). */
(function () {
  'use strict';
  var d = document;
  if (d.getElementById('btc-root')) return;
  var OFF_KEY = 'btc_off';
  try { if (sessionStorage.getItem(OFF_KEY) === '1') return; } catch (e) {}

  var WA = 'https://wa.me/923117420474';
  var PHONE = '+92 311 7420474', TEL = 'tel:+923117420474';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /*  Knowledge base (only facts that appear on bluetickmedia.ae pages) */
  /* ------------------------------------------------------------------ */
  var L = {
    services: ['View Services page', 'services.html'],
    audit: ['Get Free Marketing Audit', 'index.html#audit-form'],
    contact: ['Open Contact page', 'contact.html'],
    about: ['Open About Us page', 'about.html'],
    call: ['Call ' + PHONE, TEL],
    mail: ['Email support', 'mailto:support@bluetickmedia.ae']
  };
  var MENU = ['Our services', 'Free marketing audit', 'Contact details', 'Why choose Bluetick?'];

  var KB = [
    { id: 'greet', k: ['hi', 'hello', 'hey', 'salam', 'assalam', 'good morning', 'good evening', 'good afternoon', 'start', 'help', 'yes', 'ok', 'okay'],
      a: "Hi! I'm the Bluetick Media assistant. I can tell you about our services, the free marketing audit, how to reach us and more. What would you like to know?",
      c: MENU },

    { id: 'thanks', k: ['thanks', 'thank you', 'thx', 'great', 'perfect', 'awesome', 'nice'],
      a: "You're welcome! If you'd like to talk to the team directly, you can reach us any time.",
      c: ['Contact details', 'Free marketing audit'] },

    { id: 'bye', k: ['bye', 'goodbye', 'see you', 'no thanks', 'nothing else'],
      a: "Thanks for stopping by! Whenever you're ready, we're one message away.",
      l: [L.audit] },

    { id: 'bot', k: ['are you a bot', 'are you human', 'real person', 'who are you', 'your name', 'robot', 'ai'],
      a: "I'm Bluetick Media's website assistant, an automated helper that answers from the information on this site. For anything beyond that, our team is happy to talk directly.",
      c: ['Talk to a person', 'Our services'] },

    { id: 'services', k: ['services', 'service', 'what do you do', 'what do you offer', 'offer', 'offerings', 'solutions', 'provide', 'capabilities', 'digital marketing', 'what you do', 'all services'],
      a: "We're a Dubai-based digital marketing agency. Our six core services are:<ul><li>Search Engine Optimization</li><li>Social Media Marketing</li><li>Performance Marketing (Google &amp; Meta Ads)</li><li>Content Marketing</li><li>Web Development</li><li>Marketing Automation</li></ul>We also offer Website Design &amp; Development, Branding &amp; Creative Design, Analytics, Tracking &amp; Reporting, and Digital Marketing Consultation.",
      c: ['SEO', 'Social media marketing', 'Performance marketing', 'Content marketing', 'Web development', 'Marketing automation'],
      l: [L.services] },

    { id: 'seo', k: ['seo', 'search engine', 'search engine optimization', 'ranking', 'rank', 'organic', 'organic traffic', 'keyword', 'technical seo', 'on page', 'local seo', 'google maps', 'map pack', 'google business profile', 'link building', 'backlink', 'citations', 'visibility'],
      a: "<b>Search Engine Optimization</b>: we improve your search visibility, attract high-intent visitors and build sustainable organic growth.<ul><li><b>Technical SEO:</b> crawl errors, slow load speed, broken structure and mobile issues</li><li><b>On-Page &amp; Content SEO:</b> keyword-mapped titles, headers and content built around real search intent</li><li><b>Local SEO &amp; Google Maps:</b> Google Business Profile, citations and reviews to get you found in the Dubai map pack</li></ul>The full scope also includes keyword research &amp; mapping, link building &amp; authority growth, and monthly ranking &amp; traffic reports.",
      c: ['Free marketing audit', 'Other services'], l: [L.services] },

    { id: 'social', k: ['social media', 'social', 'instagram', 'facebook', 'reels', 'reel', 'content calendar', 'community', 'community management', 'engagement', 'followers', 'posting', 'smm', 'paid social', 'short form video', 'video'],
      a: "<b>Social Media Marketing</b>: strategic content, creative campaigns and audience-focused marketing across the platforms that matter.<ul><li><b>Social Media Management:</b> we plan, design and post content on your schedule and reply to comments and messages</li><li><b>Paid Social Advertising:</b> Instagram and Facebook ads built around cost-per-lead, not vanity reach</li><li><b>Content Creation &amp; Design:</b> Reels, graphics and short-form video</li></ul>You also get a content calendar &amp; copywriting, community management, and monthly engagement &amp; growth reports.",
      c: ['Free marketing audit', 'Other services'], l: [L.services] },

    { id: 'performance', k: ['performance marketing', 'performance', 'ads', 'ad', 'advertising', 'paid ads', 'ppc', 'campaign', 'campaigns', 'cost per lead', 'cpl', 'roi', 'ad spend', 'lead generation', 'leads', 'conversion', 'conversions', 'landing page', 'landing pages', 'cro', 'cost per acquisition'],
      a: "<b>Performance Marketing</b>: we turn advertising spend into measurable results with data-driven Google and Meta campaigns focused on leads, conversions and business growth.<ul><li><b>Google Ads Management:</b> Search, Shopping and YouTube campaigns, with every dirham tracked from impression to booked call</li><li><b>Meta Ads Management:</b> Instagram and Facebook campaigns with creative testing that lowers your cost-per-lead every month</li><li><b>Landing Pages &amp; CRO:</b> pages tested and refined so your traffic turns into leads</li></ul>Full scope: Google &amp; Meta campaign setup, audience research &amp; targeting, ad creative &amp; copywriting, landing page design &amp; testing, and monthly spend &amp; ROI reports.",
      c: ['Free marketing audit', 'How do you report results?'], l: [L.audit, L.services] },

    { id: 'google', k: ['google ads', 'adwords', 'search ads', 'shopping ads', 'youtube ads', 'youtube', 'google ad', 'google campaign'],
      a: "<b>Google Ads Management</b>: we plan, launch and manage Search, Shopping and YouTube campaigns around qualified leads, cost per lead and revenue growth. Every dirham is tracked from impression to booked call, and you get clear reporting at every step so you always know where your budget is going and what it is delivering.",
      c: ['Free marketing audit', 'How do you report results?'], l: [L.audit] },

    { id: 'meta', k: ['meta ads', 'meta', 'facebook ads', 'instagram ads', 'fb ads', 'meta campaign'],
      a: "<b>Meta Ads Management</b>: Instagram and Facebook campaigns targeted to the customers most likely to buy, with creative testing that lowers your cost-per-lead every month.",
      c: ['Free marketing audit', 'Performance marketing'], l: [L.audit] },

    { id: 'content', k: ['content marketing', 'content', 'blog', 'blogs', 'copywriting', 'copy', 'writing', 'articles', 'article', 'editorial', 'brand content', 'website content', 'content strategy'],
      a: "<b>Content Marketing</b>: valuable, engaging content that strengthens your brand and supports your wider digital marketing strategy.<ul><li><b>Content Strategy &amp; Planning:</b> built around your audience, goals, search intent and customer journey</li><li><b>SEO Content &amp; Blog Writing:</b> search-optimized blogs, articles and landing page copy</li><li><b>Website &amp; Brand Content:</b> homepage messaging, service pages and brand stories</li></ul>",
      c: ['Free marketing audit', 'Other services'], l: [L.services] },

    { id: 'web', k: ['web development', 'web', 'website', 'websites', 'web design', 'website design', 'ecommerce', 'e commerce', 'online store', 'online shop', 'store', 'developer', 'development', 'redesign', 'responsive', 'maintenance', 'website maintenance', 'contact form'],
      a: "<b>Web Development</b>: fast, responsive, user-focused websites that represent your brand and turn visitors into potential customers.<ul><li><b>Business Website Development:</b> professional corporate and service websites that generate enquiries</li><li><b>eCommerce Website Development:</b> scalable online stores with product management and secure payments</li><li><b>Landing Pages &amp; Conversion Pages:</b> built for marketing campaigns, lead generation and paid advertising</li></ul>Includes custom website design, responsive mobile design, on-page SEO setup, contact forms &amp; integrations, and website maintenance support.",
      c: ['Free marketing audit', 'Other services'], l: [L.services] },

    { id: 'automation', k: ['marketing automation', 'automation', 'automate', 'automated', 'crm', 'workflow', 'workflows', 'lead follow up', 'follow up', 'nurture', 'nurturing', 'lead capture', 'lead routing', 'whatsapp automation', 'whatsapp bot', 'chatbot', 'chat bot'],
      a: "<b>Marketing Automation</b>: smarter workflows to manage leads, nurture prospects and improve customer journeys.<ul><li><b>Lead Nurturing &amp; Follow-Up Automation:</b> automated follow-ups based on prospects' actions, interests, responses and stage</li><li><b>CRM &amp; Marketing Automation:</b> connect your CRM with your website, forms, WhatsApp and other platforms</li><li><b>WhatsApp Automation:</b> automate responses, follow-ups, reminders and customer interactions</li></ul>Scope also covers automation strategy and lead capture &amp; routing.",
      c: ['Free marketing audit', 'Other services'], l: [L.services] },

    { id: 'additional', k: ['branding', 'brand', 'logo', 'creative design', 'design', 'analytics', 'tracking', 'consultation', 'consulting', 'consultant', 'additional services', 'other services', 'also offer', 'more services'],
      a: "Besides our six core services, we also offer: <ul><li>Website Design &amp; Development</li><li>Branding &amp; Creative Design</li><li>Marketing Automation</li><li>Analytics, Tracking &amp; Reporting</li><li>Digital Marketing Consultation</li></ul>These are layered in once your core strategy is working, to compound results across every touchpoint.",
      c: ['Free marketing audit', 'Contact details'], l: [L.services] },

    { id: 'audit', k: ['audit', 'free audit', 'free marketing audit', 'free growth audit', 'free', 'no obligation', 'evaluate', 'review my', 'analyse', 'analyze', 'get started', 'start project', 'sign up', 'free consultation'],
      a: "The <b>Free Marketing Audit</b> is 100% free with no obligation. Just tell us a little about your business (name, email, phone and company) and we'll get back to you. You can use the form on our homepage or the Contact page.",
      c: ['Contact details', 'Our services'], l: [L.audit, L.contact] },

    { id: 'pricing', b: 3, k: ['price', 'prices', 'pricing', 'cost', 'costs', 'how much', 'quote', 'quotation', 'package', 'packages', 'budget', 'fee', 'fees', 'charges', 'charge', 'rates', 'rate', 'afford', 'cheap', 'expensive', 'plans', 'plan'],
      a: "We don't publish fixed prices on our website, because every campaign starts with your numbers, not a template. The quickest way to get a recommendation for your business is the free audit, or you can speak to the team directly.",
      c: ['Free marketing audit', 'Talk to a person'], l: [L.audit, L.call], wa: 'Hi Bluetick Media, I would like a price estimate for your services.' },

    { id: 'contact', k: ['contact', 'contact details', 'phone', 'phone number', 'call', 'call you', 'email', 'mail', 'reach', 'number', 'talk', 'get in touch', 'support', 'sales', 'speak', 'book a call', 'book', 'appointment', 'meeting', 'schedule', 'consult', 'person', 'human', 'agent', 'representative', 'talk to a person'],
      a: "You can reach Bluetick Media here:<ul><li><b>Call:</b> <a href=\"" + TEL + "\">" + PHONE + "</a> (Mon - Sat, 09am - 08pm)</li><li><b>Email:</b> hello@bluetickmedia.ae, sales@bluetickmedia.ae or support@bluetickmedia.ae</li><li><b>WhatsApp:</b> use the green button or the link below</li><li><b>Office:</b> Madina Mall, Muhaisnah - Dubai</li></ul>",
      c: ['Office address', 'Working hours', 'Social media'], l: [L.call, L.contact], wa: 'Hi Bluetick Media, I would like to speak with your team.' },

    { id: 'address', k: ['address', 'office', 'location', 'where', 'located', 'map', 'visit', 'madina mall', 'muhaisnah', 'qusais', 'directions', 'find you', 'come over', 'headquarter'],
      a: "Our main office is at <b>Madina Mall, Muhaisnah - Dubai</b> (Beirut St - Muhaisanah Fourth - Al Qusais). If you plan to visit, please call or message us first so we can arrange a time.",
      c: ['Working hours', 'Contact details'], l: [L.call, L.contact] },

    { id: 'hours', b: 2, k: ['office hours', 'hours', 'working hours', 'open', 'opening', 'timing', 'timings', 'time', 'close', 'closing', 'saturday', 'sunday', 'friday', 'weekend', 'available', 'when are you'],
      a: "Our team is available <b>Monday to Saturday, 09am - 08pm</b> (Dubai time). Outside those hours you can still send a WhatsApp message or email and we'll respond when we're back.",
      c: ['Contact details'], l: [L.call] },

    { id: 'social-links', k: ['social links', 'social accounts', 'follow', 'linkedin', 'facebook page', 'instagram page', 'handle', 'social media accounts', 'profiles'],
      a: "Follow Bluetick Media on social media:<ul><li><b>Facebook:</b> @bluetickmediauae</li><li><b>Instagram:</b> @bluetickmediauae</li><li><b>LinkedIn:</b> Bluetick Media</li></ul>The links are on our Contact page.",
      c: ['Contact details'], l: [L.contact] },

    { id: 'whatsapp', k: ['whatsapp', 'whats app', 'wa'],
      a: "You can chat with us on WhatsApp any time. Tap the green WhatsApp button on this page or use the link below and we'll reply as soon as we can.",
      c: ['Contact details'], wa: 'Hi Bluetick Media, I would like to know more about your services.' },

    { id: 'about', k: ['about', 'about us', 'company', 'agency', 'bluetick', 'bluetick media', 'who', 'founder', 'indhu', 'indhu lawrence', 'team', 'story', 'journey', 'mission', 'background', 'experience', 'years', 'established', 'how long have you', 'dubai based'],
      a: "Bluetick Media is a <b>Dubai-based digital marketing agency</b> helping businesses build stronger brands, connect with the right audiences and grow their online presence. We combine strategy, creativity, technology and data to deliver measurable growth. Our founder is <b>Indhu Lawrence</b>.<br><br>In numbers: <b>5+</b> years of expertise, <b>50+</b> happy clients, <b>2.5k</b> campaigns delivered and <b>$1M+</b> in budget handled.",
      c: ['Why choose Bluetick?', 'Our services', 'Contact details'], l: [L.about] },

    { id: 'why', k: ['why choose', 'why you', 'why bluetick', 'different', 'benefit', 'benefits', 'advantage', 'advantages', 'best', 'better', 'trust', 'reliable', 'strengths', 'unique', 'dedicated', 'media buyer', 'support team', 'kpi', 'kpis'],
      a: "Here's why businesses choose Bluetick Media:<ul><li><b>Data-backed strategy:</b> every campaign starts with research and numbers, not guesswork</li><li><b>Full transparency:</b> you see what's running, what it costs and what it's returning</li><li><b>Clear KPIs:</b> you know upfront what success looks like and how we'll prove it</li><li><b>Fast turnaround:</b> campaigns launch in days, not months</li><li><b>Dedicated media buyer</b> on your account</li><li><b>Always-on support:</b> direct access to your account team, no ticket queues</li></ul>",
      c: ['Free marketing audit', 'Client testimonials'], l: [L.about] },

    { id: 'report', k: ['report', 'reports', 'reporting', 'transparent', 'transparency', 'progress', 'update', 'updates', 'dashboard', 'results', 'measure', 'measurable', 'track results', 'monitor', 'how do you report'],
      a: "Transparency is core to how we work. You get clear reporting at every step, so you always know where your budget is going and what it is delivering. Our services include monthly reports, for example monthly spend &amp; ROI reports for ads, monthly ranking &amp; traffic reports for SEO, and monthly engagement &amp; growth reports for social media.",
      c: ['Why choose Bluetick?', 'Free marketing audit'] },

    { id: 'turnaround', k: ['how long', 'how fast', 'how soon', 'timeline', 'turnaround', 'quickly', 'launch', 'days', 'duration', 'speed', 'fast'],
      a: "We move quickly: campaigns launch in <b>days, not months</b>, so you're not waiting to see movement. For timelines on a specific service, the team can give you an estimate after a quick chat about your goals.",
      c: ['Free marketing audit', 'Talk to a person'], wa: 'Hi Bluetick Media, I would like to know the timeline for a project.' },

    { id: 'clients', k: ['clients', 'client', 'customers', 'testimonial', 'testimonials', 'reviews', 'review', 'feedback', 'what clients say', 'reference', 'references', 'who do you work with', 'startups', 'sme', 'case study', 'case studies', 'portfolio', 'projects', 'project', 'work samples', 'examples'],
      a: "We work with startups, SMEs and established UAE brands, and we've delivered <b>2.5k+ campaigns</b> for <b>50+ happy clients</b>. Here's what a few of them say:<ul><li>“Bluetick rebuilt our ad strategy from scratch and our cost-per-lead dropped within the first month.” <i>Jeniffer Smith, Business Owner</i></li><li>“The difference was communication – we always knew what was running and why.” <i>Pamela Duncan, Director</i></li><li>“Our organic traffic doubled inside a quarter.” <i>Steve Tailor, CFO</i></li></ul>For examples of work relevant to your industry, our team can walk you through it directly.",
      c: ['Why choose Bluetick?', 'Talk to a person'], l: [L.about], wa: 'Hi Bluetick Media, I would like to see examples of your work.' },

    { id: 'area', k: ['dubai', 'uae', 'emirates', 'abu dhabi', 'sharjah', 'ajman', 'international', 'country', 'serve', 'operate', 'based'],
      a: "We're based in <b>Dubai</b> and work with startups, SMEs and established UAE brands. If you're outside the UAE or have specific requirements, message the team and they'll let you know how they can help.",
      c: ['Contact details', 'Our services'], l: [L.contact] },

    { id: 'privacy', k: ['privacy', 'privacy policy', 'data', 'personal data', 'information safe', 'confidential', 'gdpr', 'cookies', 'cookie'],
      a: "We respect your privacy. The details you share are only used to contact you about your enquiry or audit. You can read the full policy on our Privacy Policy page.",
      l: [['Privacy Policy', 'privacy-policy.html']] },

    { id: 'terms', k: ['terms', 'terms and conditions', 'conditions', 'refund', 'cancellation', 'cancel', 'contract', 'agreement', 'legal', 'policy'],
      a: "Our full terms are on the Terms &amp; Conditions page. For questions about a specific agreement, please contact the team.",
      l: [['Terms & Conditions', 'terms-and-conditions.html'], L.contact] }
  ];

  /* chip text -> intent id (exact shortcut) */
  var SHORTCUT = {
    'our services': 'services', 'other services': 'services', 'seo': 'seo', 'social media marketing': 'social',
    'performance marketing': 'performance', 'content marketing': 'content', 'web development': 'web',
    'marketing automation': 'automation', 'free marketing audit': 'audit', 'contact details': 'contact',
    'why choose bluetick?': 'why', 'office address': 'address', 'working hours': 'hours', 'social media': 'social-links',
    'how do you report results?': 'report', 'client testimonials': 'clients', 'talk to a person': 'contact'
  };

  /* ------------------------------------------------------------------ */
  /*  Matching                                                           */
  /* ------------------------------------------------------------------ */
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function stem(w) {
    if (w.length > 6 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 5 && /ed$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) return w.slice(0, -1);
    return w;
  }
  function toks(s) { return norm(s).split(' ').filter(Boolean).map(stem); }
  function lev1(a, b) {
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0, j = 0, e = 0;
    while (i < la && j < lb) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++e > 1) return false;
      if (la > lb) i++; else if (lb > la) j++; else { i++; j++; }
    }
    return e + (la - i) + (lb - j) <= 1;
  }
  KB.forEach(function (it) {
    it._k = it.k.map(function (p) { var t = toks(p); return { t: t, s: ' ' + t.join(' ') + ' ' }; });
  });

  function tokEq(a, b) { return a === b || (a.length >= 5 && b.length >= 5 && lev1(a, b)); }
  function score(it, qt, qs) {
    var sc = 0;
    it._k.forEach(function (k) {
      if (qs.indexOf(k.s) !== -1) { sc += k.t.length * 2 + (k.t.length > 1 ? 1 : 0); return; }
      /* typo-tolerant match: every token equal or one edit away, in sequence */
      var n = k.t.length;
      for (var i = 0; i + n <= qt.length; i++) {
        var ok = true, fuzzy = false;
        for (var j = 0; j < n; j++) {
          if (qt[i + j] === k.t[j]) continue;
          if (tokEq(qt[i + j], k.t[j])) { fuzzy = true; continue; }
          ok = false; break;
        }
        if (ok && fuzzy) { sc += n * 2 + (n > 1 ? 1 : 0) - 0.5; return; }
      }
    });
    return sc * (it.b || 1);
  }

  function match(text) {
    var qt = toks(text), qs = ' ' + qt.join(' ') + ' ';
    var res = KB.map(function (it) { return { it: it, s: score(it, qt, qs) }; })
      .filter(function (r) { return r.s >= 2; })
      .sort(function (a, b) { return b.s - a.s; });
    if (!res.length) return [];
    var top = res[0].s;
    /* greetings / thanks only win if nothing else matched */
    var weak = { greet: 1, thanks: 1, bye: 1 };
    var strong = res.filter(function (r) { return !weak[r.it.id]; });
    if (strong.length) res = strong;
    top = res[0].s;
    var joined = /(\band\b|\balso\b|\bplus\b|&|,)/.test(text.toLowerCase());
    return res.filter(function (r, i) { return i === 0 || (i < 2 && (joined ? r.s >= 2 && r.s >= top * 0.3 : r.s >= 3 && r.s >= top * 0.45)); }).map(function (r) { return r.it; });
  }

  /* ------------------------------------------------------------------ */
  /*  Styles                                                             */
  /* ------------------------------------------------------------------ */
  var css = '' +
    '#btc-root{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.5;color:#0f172a}' +
    '#btc-root *{box-sizing:border-box}' +
    /* ---- floating robot (tune --lx/--ly/--ls/--lr to move the logo on the robot) ---- */
    '#btc-root{--rw:84px;--rb:5.25rem;--rr:.5rem;--lx:49%;--ly:71%;--ls:23%;--lr:-8deg}' +
    '.btc-robot{position:fixed;z-index:50;right:var(--rr);bottom:var(--rb);width:var(--rw);transform:translate3d(calc(100% + 2rem),0,0);visibility:hidden;transition:transform .6s cubic-bezier(.22,1,.36,1),visibility 0s linear .6s;will-change:transform}' +
    '.btc-robot.btc-rin{transform:none;visibility:visible;transition-delay:0s}' +
    '.btc-rbtn{position:relative;display:block;width:100%;padding:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '.btc-rimg{display:block;width:100%;height:auto;filter:drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.9));-webkit-user-drag:none;user-select:none;pointer-events:none}' +
    '.btc-logo{position:absolute;left:var(--lx);top:var(--ly);width:var(--ls);aspect-ratio:1;transform:translate(-50%,-50%) rotate(var(--lr));pointer-events:none;filter:drop-shadow(0 1px 1.5px rgba(10,31,92,.45))}.btc-logo svg{display:block;width:100%;height:100%}' +
    '.btc-rx,.btc-bx{position:absolute;display:grid;place-items:center;border:0;border-radius:9999px;cursor:pointer;color:#fff;background:#0a1f5c;box-shadow:0 0 0 2px #fff,0 3px 8px rgba(10,31,92,.4);padding:0}.btc-rx:hover,.btc-bx:hover{background:#1d4ed8}' +
    '.btc-rx{top:-4px;right:-2px;width:22px;height:22px;z-index:2}.btc-rx:before,.btc-bx:before{content:"";position:absolute;inset:-9px}' +
    '.btc-rx svg,.btc-bx svg{width:11px;height:11px}' +
    '.btc-bub{position:absolute;right:calc(100% + .15rem);top:8%;width:max-content;max-width:min(17rem,calc(100vw - var(--rw) - var(--rr) - 1.25rem));display:flex;align-items:flex-start;gap:.5rem;padding:.7rem .75rem .7rem .95rem;background:#fff;color:#0a1f5c;border:1px solid #bfdbfe;border-radius:1rem 1rem .25rem 1rem;box-shadow:0 14px 30px -10px rgba(10,31,92,.5);opacity:0;visibility:hidden;pointer-events:none;transform:translate3d(18px,0,0) scale(.85);transform-origin:100% 60%;transition:opacity .35s ease,transform .35s cubic-bezier(.22,1,.36,1),visibility 0s linear .35s}' +
    '.btc-bub.btc-bshow{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition-delay:0s}' +
    '.btc-bub:after{content:"";position:absolute;right:-7px;bottom:12px;width:12px;height:12px;background:#fff;border-right:1px solid #bfdbfe;border-bottom:1px solid #bfdbfe;transform:rotate(-45deg) skew(12deg,12deg)}' +
    '.btc-btxt{flex:1;min-width:0;border:0;background:none;padding:0;text-align:left;font:700 15px/1.35 inherit;color:#0a1f5c;cursor:pointer}' +
    '.btc-bx{position:static;flex:none;width:20px;height:20px;margin-top:1px;background:#e2e8f0;color:#334155;box-shadow:none}.btc-bx:hover{background:#cbd5e1}.btc-bx:before{inset:-8px}' +
    '.btc-rbtn:focus-visible,.btc-rx:focus-visible,.btc-bx:focus-visible,.btc-btxt:focus-visible,.btc-x:focus-visible,.btc-send:focus-visible,.btc-chip:focus-visible,.btc-lnk:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}' +
    '.btc-panel{position:fixed;z-index:55;left:.75rem;right:.75rem;bottom:.75rem;height:min(600px,calc(100vh - 1.5rem));height:min(600px,calc(100dvh - 1.5rem));display:flex;flex-direction:column;background:#fff;border-radius:1.25rem;overflow:hidden;box-shadow:0 25px 60px -12px rgba(10,31,92,.5);border:1px solid #dbeafe;opacity:0;transform:translateY(14px) scale(.98);visibility:hidden;pointer-events:none;transition:opacity .22s ease,transform .22s ease,visibility 0s linear .22s}' +
    '.btc-open .btc-panel{opacity:1;transform:none;visibility:visible;pointer-events:auto;transition-delay:0s}' +
    '.btc-head{display:flex;align-items:center;gap:.7rem;padding:.85rem 1rem;color:#fff;background:linear-gradient(135deg,#07164a,#0a1f5c 55%,#1d4ed8)}' +
    '.btc-av{flex:none;width:2.4rem;height:2.4rem;border-radius:.75rem;display:grid;place-items:center;background:linear-gradient(135deg,#1d4ed8,#22d3ee)}' +
    '.btc-ti{flex:1;min-width:0}.btc-ti b{display:block;font-size:15px;font-weight:700}.btc-ti span{display:flex;align-items:center;gap:.35rem;font-size:12px;color:#bfdbfe}' +
    '.btc-ti span:before{content:"";width:.5rem;height:.5rem;border-radius:9999px;background:#4ade80}' +
    '.btc-x{border:0;background:rgba(255,255,255,.14);color:#fff;width:2.1rem;height:2.1rem;border-radius:9999px;cursor:pointer;display:grid;place-items:center}.btc-x:hover{background:rgba(255,255,255,.26)}' +
    '.btc-log{flex:1;overflow-y:auto;padding:1rem;background:#f4f8ff;display:flex;flex-direction:column;gap:.65rem;overscroll-behavior:contain;scroll-behavior:smooth}' +
    '.btc-m{max-width:88%;padding:.6rem .85rem;border-radius:1rem;word-wrap:break-word;overflow-wrap:anywhere}' +
    '.btc-b{align-self:flex-start;background:#fff;border:1px solid #dbeafe;border-bottom-left-radius:.3rem;color:#1e293b}' +
    '.btc-u{align-self:flex-end;background:linear-gradient(135deg,#1d4ed8,#0a1f5c);color:#fff;border-bottom-right-radius:.3rem}' +
    '.btc-b ul{margin:.45rem 0 0;padding-left:1.1rem;list-style:disc}.btc-b li{margin:.2rem 0}.btc-b b{color:#0a1f5c}.btc-b a{color:#1d4ed8;text-decoration:underline}' +
    '.btc-act{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.6rem}' +
    '.btc-lnk{display:inline-block;text-decoration:none!important;font-weight:700;font-size:13px;padding:.4rem .8rem;border-radius:9999px;background:linear-gradient(180deg,#fde68a,#f59e0b);color:#3b2400!important}' +
    '.btc-lnk.btc-wa{background:#25D366;color:#fff!important}.btc-lnk.btc-alt{background:#eff6ff;color:#0a1f5c!important;border:1px solid #bfdbfe}' +
    '.btc-chips{display:flex;flex-wrap:wrap;gap:.4rem;align-self:flex-start;max-width:100%}' +
    '.btc-chip{border:1px solid #93c5fd;background:#fff;color:#0a1f5c;font:600 13px/1.2 inherit;padding:.4rem .75rem;border-radius:9999px;cursor:pointer;transition:background .15s,border-color .15s}.btc-chip:hover{background:#dbeafe;border-color:#3b82f6}' +
    '.btc-dots{display:inline-flex;gap:.25rem;padding:.2rem 0}.btc-dots i{width:.45rem;height:.45rem;border-radius:9999px;background:#93c5fd;animation:btcDot 1s infinite ease-in-out}.btc-dots i:nth-child(2){animation-delay:.15s}.btc-dots i:nth-child(3){animation-delay:.3s}' +
    '@keyframes btcDot{0%,80%,100%{opacity:.35;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}' +
    '.btc-form{display:flex;gap:.5rem;padding:.7rem .75rem;border-top:1px solid #e2e8f0;background:#fff}' +
    '.btc-in{flex:1;min-width:0;border:1px solid #cbd5e1;border-radius:9999px;padding:.6rem 1rem;font:inherit;font-size:16px;color:#0f172a;background:#f8fafc}.btc-in:focus{outline:2px solid #3b82f6;outline-offset:0;background:#fff}' +
    '.btc-send{flex:none;width:2.6rem;height:2.6rem;border:0;border-radius:9999px;cursor:pointer;display:grid;place-items:center;color:#3b2400;background:linear-gradient(180deg,#fde68a,#f59e0b)}.btc-send:hover{filter:brightness(1.05)}' +
    '.btc-note{padding:0 .75rem .6rem;background:#fff;text-align:center;font-size:11px;color:#64748b}' +
    '@media(min-width:640px){#btc-root{--rw:112px;--rb:6rem;--rr:1rem}.btc-rx{width:24px;height:24px}.btc-btxt{font-size:16px}' +
    '.btc-panel{left:auto;right:1.5rem;bottom:6.5rem;width:390px;height:min(560px,calc(100vh - 8.5rem));height:min(560px,calc(100dvh - 8.5rem))}}' +
    '@media(prefers-reduced-motion:reduce){.btc-panel,.btc-robot,.btc-bub{transition:none!important}.btc-log{scroll-behavior:auto}.btc-dots i{animation:none}}';

  var st = d.createElement('style');
  st.textContent = css;
  d.head.appendChild(st);

  /* ------------------------------------------------------------------ */
  /*  DOM                                                                */
  /* ------------------------------------------------------------------ */
  var root = d.createElement('div');
  root.id = 'btc-root';
  root.innerHTML =
    '<div class="btc-robot" aria-hidden="true">' +
      '<div class="btc-bub"><button class="btc-btxt" type="button">Hello! How can I assist you?</button>' +
        '<button class="btc-bx" type="button" aria-label="Dismiss message"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<button class="btc-rbtn" type="button" aria-label="Chat with Bluetick assistant" tabindex="-1"><img class="btc-rimg" alt="" width="288" height="359" decoding="async" />' +
        '<span class="btc-logo"><svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="btcg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d4ed8"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#btcg)" stroke="#fff" stroke-width="2"/><path d="M10.5 21l6.8 6.8L30 13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>' +
      '<button class="btc-rx" type="button" aria-label="Hide assistant for this visit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
    '</div>' +
    '<section class="btc-panel" id="btc-panel" role="dialog" aria-label="Bluetick Media assistant" aria-modal="false">' +
      '<div class="btc-head"><div class="btc-av" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg></div>' +
      '<div class="btc-ti"><b>Bluetick Assistant</b><span>Replies instantly</span></div>' +
      '<button class="btc-x" type="button" aria-label="Close chat"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
      '<div class="btc-log" role="log" aria-live="polite" aria-label="Chat messages"></div>' +
      '<form class="btc-form" autocomplete="off"><input class="btc-in" type="text" maxlength="300" placeholder="Type your question..." aria-label="Your question"/>' +
      '<button class="btc-send" type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg></button></form>' +
      '<div class="btc-note">Automated assistant. Answers are based on this website.</div>' +
    '</section>';
  d.body.appendChild(root);

  var robot = root.querySelector('.btc-robot'), rimg = root.querySelector('.btc-rimg'),
      rbtn = root.querySelector('.btc-rbtn'), rx = root.querySelector('.btc-rx'),
      bub = root.querySelector('.btc-bub'), btxt = root.querySelector('.btc-btxt'), bx = root.querySelector('.btc-bx'),
      panel = root.querySelector('.btc-panel'), log = root.querySelector('.btc-log'),
      form = root.querySelector('.btc-form'), input = root.querySelector('.btc-in'),
      closeBtn = root.querySelector('.btc-x');

  /* ------------------------------------------------------------------ */
  /*  State / persistence                                                */
  /* ------------------------------------------------------------------ */
  var hist = [], KEY = 'btc_h1';
  try { hist = JSON.parse(sessionStorage.getItem(KEY) || '[]') || []; } catch (e) { hist = []; }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(hist.slice(-30))); } catch (e) {} }

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function clearChips() { var c = log.querySelector('.btc-chips'); if (c) c.remove(); }

  function linkHtml(l, cls) {
    var ext = /^https?:/.test(l[1]);
    return '<a class="btc-lnk ' + (cls || '') + '" href="' + l[1] + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(l[0]) + '</a>';
  }
  function waLink(msg) { return [ 'Chat on WhatsApp', WA + '?text=' + encodeURIComponent(msg) ]; }

  function addBot(html, chips, links, wa, noStore) {
    clearChips();
    var el = d.createElement('div');
    el.className = 'btc-m btc-b';
    var inner = html;
    var acts = '';
    (links || []).forEach(function (l, i) { acts += linkHtml(l, i ? 'btc-alt' : ''); });
    if (wa) acts += linkHtml(waLink(wa), 'btc-wa');
    if (acts) inner += '<div class="btc-act">' + acts + '</div>';
    el.innerHTML = inner;
    log.appendChild(el);
    if (chips && chips.length) addChips(chips);
    scrollDown();
    if (!noStore) { hist.push({ r: 'b', h: inner, c: chips || [] }); save(); }
  }
  function addChips(chips) {
    var w = d.createElement('div');
    w.className = 'btc-chips';
    chips.forEach(function (t) {
      var b = d.createElement('button');
      b.type = 'button'; b.className = 'btc-chip'; b.textContent = t;
      b.addEventListener('click', function () { ask(t); });
      w.appendChild(b);
    });
    log.appendChild(w);
  }
  function addUser(text, noStore) {
    clearChips();
    var el = d.createElement('div');
    el.className = 'btc-m btc-u';
    el.textContent = text;
    log.appendChild(el);
    scrollDown();
    if (!noStore) { hist.push({ r: 'u', t: text }); save(); }
  }

  function reply(text) {
    var key = norm(text), found = [];
    if (SHORTCUT[key]) {
      found = KB.filter(function (k) { return k.id === SHORTCUT[key]; });
    } else {
      found = match(text);
    }
    if (!found.length) {
      var msg = "I'm not sure I have that detail. Our team can answer it directly, usually fastest on WhatsApp or by phone.";
      addBot(msg, ['Our services', 'Free marketing audit', 'Contact details'], [L.call, L.mail], 'Hi Bluetick Media, I have a question: ' + text.slice(0, 200));
      return;
    }
    if (found.length === 1) {
      var it = found[0];
      addBot(it.a, it.c, it.l, it.wa || null);
    } else {
      var html = found.map(function (f) { return f.a; }).join('<br><br>');
      var links = [], seen = {};
      found.forEach(function (f) { (f.l || []).forEach(function (l) { if (!seen[l[1]]) { seen[l[1]] = 1; links.push(l); } }); });
      addBot(html, ['Free marketing audit', 'Contact details'], links.slice(0, 2));
    }
  }

  var busy = false;
  function ask(text) {
    text = (text || '').replace(/\s+/g, ' ').trim();
    if (!text || busy) return;
    addUser(text);
    busy = true;
    var typing = d.createElement('div');
    typing.className = 'btc-m btc-b';
    typing.innerHTML = '<span class="btc-dots" aria-label="Typing"><i></i><i></i><i></i></span>';
    log.appendChild(typing);
    scrollDown();
    setTimeout(function () {
      typing.remove();
      reply(text);
      busy = false;
    }, reduce ? 0 : 550);
  }

  /* ------------------------------------------------------------------ */
  /*  Open / close                                                       */
  /* ------------------------------------------------------------------ */
  var started = false;
  function render() {
    if (started) return;
    started = true;
    if (hist.length) {
      hist.forEach(function (h, i) {
        if (h.r === 'u') addUser(h.t, true);
        else {
          var el = d.createElement('div');
          el.className = 'btc-m btc-b'; el.innerHTML = h.h;
          log.appendChild(el);
          if (i === hist.length - 1 && h.c && h.c.length) addChips(h.c);
        }
      });
      scrollDown();
    } else {
      addBot("Hi! I'm the Bluetick Media assistant. Ask me about our services, the free marketing audit or how to reach us.", MENU);
    }
  }
  /* ---------------- robot: idle / scroll logic ---------------- */
  var IDLE_MS = 3000;       /* stay still this long before the robot slides in   */
  var SLIDE_MS = reduce ? 0 : 600; /* slide-in duration (matches CSS)           */
  var BUBBLE_DELAY_MS = 1000; /* after the robot has stopped moving             */
  var BUBBLE_STAY_MS = 4500;  /* bubble stays open (4.5s = easy to read) then auto-hides */
  var tIdle = 0, tBub = 0, tHide = 0, gone = false, imgSet = false;

  function loadImg() {
    if (imgSet) return;
    imgSet = true;
    rimg.src = 'robot.png?v=1';
  }
  function clearTimers() { clearTimeout(tIdle); clearTimeout(tBub); clearTimeout(tHide); }
  function hideBubble() { bub.classList.remove('btc-bshow'); }
  function hideRobot() {
    hideBubble();
    robot.classList.remove('btc-rin');
    robot.setAttribute('aria-hidden', 'true');
    rbtn.tabIndex = -1;
  }
  function showRobot(withBubble) {
    if (gone || isOpen()) return;
    loadImg();
    robot.classList.add('btc-rin');
    robot.setAttribute('aria-hidden', 'false');
    rbtn.tabIndex = 0;
    if (withBubble) {
      /* wait until the slide has finished, then exactly 1s more */
      tBub = setTimeout(function () {
        if (gone || isOpen()) return;
        bub.classList.add('btc-bshow');
        tHide = setTimeout(hideBubble, BUBBLE_STAY_MS);
      }, SLIDE_MS + BUBBLE_DELAY_MS);
    }
  }
  function startIdle() {
    clearTimers();
    if (gone || isOpen()) return;
    tIdle = setTimeout(function () { showRobot(true); }, IDLE_MS);
  }
  function onScroll() {
    if (gone || isOpen()) return;
    clearTimers();
    hideRobot();   /* bubble hides, robot slides back out */
    startIdle();   /* 3-second timer restarts */
  }

  function setOpen(open) {
    root.classList.toggle('btc-open', open);
    if (open) {
      clearTimers(); hideRobot();
      render(); scrollDown();
      if (window.matchMedia && matchMedia('(pointer:fine)').matches) setTimeout(function () { input.focus(); }, 60);
    } else if (!gone) {
      showRobot(false);   /* robot comes back quietly after the chat is closed */
    }
  }
  function isOpen() { return root.classList.contains('btc-open'); }

  /* X on the robot: remove everything for the rest of this visit */
  function dismiss() {
    gone = true;
    clearTimers();
    try { sessionStorage.setItem(OFF_KEY, '1'); } catch (e) {}
    window.removeEventListener('scroll', onScroll);
    hideRobot();
    root.classList.remove('btc-open');
    setTimeout(function () { if (root.parentNode) root.parentNode.removeChild(root); }, 700);
  }

  rbtn.addEventListener('click', function () { setOpen(true); });
  btxt.addEventListener('click', function () { setOpen(true); });
  bx.addEventListener('click', function () { clearTimeout(tHide); hideBubble(); });
  rx.addEventListener('click', dismiss);
  closeBtn.addEventListener('click', function () { setOpen(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) setOpen(false); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    ask(v);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  startIdle(); /* a visitor who just reads without scrolling also gets the robot after 3s */

  /* preview mode: index.html?chat=preview opens the chat with a sample question */
  if (/[?&]chat=preview(&|$)/.test(location.search)) {
    setTimeout(function () { setOpen(true); if (!hist.length || hist.length <= 1) setTimeout(function () { ask('What services do you offer?'); }, 500); }, 600);
  }

  /* tiny hook for page buttons: <a data-open-chat> */
  d.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-open-chat]');
    if (t) { e.preventDefault(); setOpen(true); }
  });
})();
