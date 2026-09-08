/**
 * QUILL LABS — HYBRID CMS CLIENT ENGINE
 * Integrates Supabase Database with zero-friction LocalStorage caching and real-time DOM hydration.
 * Controls:
 * 1. Business Branding & Dynamic Accent Color (--cta-gold)
 * 2. Website Copy & Section Text
 * 3. Products & Pricing Foundations
 * 4. Work Cards & Case Studies (with track filters)
 * 5. Customer Leads & Inquiries
 */

(function (window, document) {
  'use strict';

  const STORAGE_KEYS = {
    CONTENT: 'quill_cms_content_v2',
    PRODUCTS: 'quill_cms_products_v2',
    WORK_CARDS: 'quill_cms_work_cards_v2',
    LEADS: 'quill_cms_leads_v2',
    CONFIG: 'quill_cms_supabase_config_v2',
  };

  // --- SEED DEFAULTS ---
  const DEFAULT_CONTENT = {
    brand_name: 'Quill Labs',
    brand_tagline: 'Business Systems Studio',
    brand_logo: './main quill.png',
    brand_wordmark: './wordmark.png',
    brand_circular: './circular logo.png',
    brand_color: '#D89032',
    hero_kicker: 'A Business Systems Studio',
    hero_title: "We don't build websites. We build business systems that connect attention to revenue.",
    hero_sub: 'Connect the Value. Capture the Sale.',
    hero_note: 'Static assets sitting there. We turn them into a system that actually sells — without you needing to become a tech expert to run it.',
    primary_cta_text: 'Book a strategy call',
    secondary_cta_text: 'Explore the services',
    pull_quote_headline: "A website that only looks good isn't a system.",
    pull_quote_sub: "It doesn't capture, connect, or close — and customers can feel it the moment they land.",
    contact_email: 'buildbyquill@gmail.com',
  };

  const DEFAULT_PRODUCTS = [
    {
      id: 'prod_1',
      title: 'Motion Website',
      price: '₹5,999',
      price_prefix: 'Starting from',
      timeline: '7–10 Days',
      best_for: 'Modern businesses · Agencies',
      description: 'Purposeful animations that improve engagement without sacrificing speed.',
      num: '01',
      sort_order: 1,
    },
    {
      id: 'prod_2',
      title: 'Editorial Website',
      price: '₹9,999',
      price_prefix: 'Starting from',
      timeline: '10–14 Days',
      best_for: 'Premium brands · Creators',
      description: 'Editorial storytelling that positions expertise and communicates quality.',
      num: '02',
      sort_order: 2,
    },
    {
      id: 'prod_3',
      title: 'Scroll Storytelling Website',
      price: '₹24,999',
      price_prefix: 'Starting from',
      timeline: '2–4 Weeks',
      best_for: 'High-ticket services · Enterprise',
      description: 'Deep narrative experience that guides prospective buyers through every objection.',
      num: '03',
      sort_order: 3,
    },
    {
      id: 'prod_4',
      title: 'Custom CMS & Lead CRM',
      price: '₹15,000',
      price_prefix: 'Starting from',
      timeline: '1–2 Weeks',
      best_for: 'Growing local businesses',
      description: 'Self-service admin dashboard, dynamic content, and automated lead capture.',
      num: '04',
      sort_order: 4,
    },
  ];

  const DEFAULT_WORK_CARDS = [
    {
      id: 'work_1',
      title: 'Destiny Laboratories',
      track: 'business',
      system_type: 'Motion Website + WhatsApp',
      image_url: './v1home_files/Screenshot 2026-09-03 170422.png',
      badge: 'Client project',
      problem: 'A trust-led pharmaceutical brand needing a modern digital presence and direct customer channel.',
      outcome: 'A modern digital presence with useful WhatsApp integration.',
      client_review: 'Really happy with the website developed by QUILL LABS. The final website was exactly what we needed.',
      client_name: 'Amit Rajan, Owner — Destiny Laboratories',
      link_url: 'https://destinylaboratories.com/',
      sort_order: 1,
    },
    {
      id: 'work_2',
      title: 'Dental Clinic',
      track: 'business',
      system_type: 'Lead Generation System',
      image_url: './v1home_files/398-960x600.jpg',
      badge: 'Concept work',
      problem: 'A stable clinic with a brochure website and enquiries scattered across WhatsApp — no way to measure or manage demand.',
      outcome: 'Qualified bookings without manual chasing.',
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 2,
    },
    {
      id: 'work_3',
      title: 'Neighborhood Restaurant',
      track: 'business',
      system_type: 'Online Ordering System',
      image_url: './v1home_files/511-960x600.jpg',
      badge: 'Concept work',
      problem: 'Loyal regulars and no online ordering — every order depends on a phone call during service hours.',
      outcome: "Orders keep coming in when the phone isn't.",
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 3,
    },
    {
      id: 'work_4',
      title: 'Auto Dealership',
      track: 'business',
      system_type: 'Inventory + Lead Capture',
      image_url: './v1home_files/516-960x600.jpg',
      badge: 'Concept work',
      problem: "Full inventory but only a brochure website — customers can't see stock or enquire without a visit.",
      outcome: 'Walk-ins turn into booked test drives.',
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 4,
    },
    {
      id: 'work_5',
      title: 'Knowledge Creator',
      track: 'creator',
      system_type: 'Creator Business System',
      image_url: './v1 ourprocess_files/918-960x600.jpg',
      badge: 'Concept work',
      problem: 'Thousands of followers and a Linktree — attention converts nowhere, and revenue depends on DMs.',
      outcome: 'The audience finally has a place to buy.',
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 5,
    },
    {
      id: 'work_6',
      title: 'Course Creator',
      track: 'creator',
      system_type: 'Product Ecosystem',
      image_url: './v1 ourprocess_files/160-960x600.jpg',
      badge: 'Concept work',
      problem: 'A great course sold manually through social media — no sales page, no checkout, no follow-up.',
      outcome: 'Course sales on autopilot after the launch.',
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 6,
    },
    {
      id: 'work_7',
      title: 'Coach / Consultant',
      track: 'creator',
      system_type: 'Customer Journey System',
      image_url: './v1 ourprocess_files/309-960x600.jpg',
      badge: 'Concept work',
      problem: 'Bookings handled by email, questions repeated on every call, no structured path after payment.',
      outcome: 'From first contact to delivered result without friction.',
      client_review: '',
      client_name: '',
      link_url: 'v1 contact.html',
      sort_order: 7,
    },
  ];

  class QuillCMS {
    constructor() {
      this.supabase = null;
      this.listeners = [];
      this.initStorage();
      this.initSupabase();
    }

    // Initialize LocalStorage with seed data if empty
    initStorage() {
      if (!localStorage.getItem(STORAGE_KEYS.CONTENT)) {
        localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(DEFAULT_CONTENT));
      }
      if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.WORK_CARDS)) {
        localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(DEFAULT_WORK_CARDS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([]));
      }
    }

    // Initialize Supabase Client if credentials are provided
    initSupabase() {
      try {
        const config = this.getSupabaseConfig();
        if (config.url && config.anonKey && window.supabase && typeof window.supabase.createClient === 'function') {
          this.supabase = window.supabase.createClient(config.url, config.anonKey);
          this.syncFromSupabase();
        }
      } catch (err) {
        console.warn('Supabase initialization failed, running in local mode:', err);
      }
    }

    getSupabaseConfig() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
        return raw ? JSON.parse(raw) : { url: '', anonKey: '' };
      } catch (e) {
        return { url: '', anonKey: '' };
      }
    }

    setSupabaseConfig(url, anonKey) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify({ url: (url || '').trim(), anonKey: (anonKey || '').trim() }));
      this.initSupabase();
    }

    async testConnection(url, anonKey) {
      if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        return { success: false, error: 'Supabase JS library not loaded.' };
      }
      try {
        const testClient = window.supabase.createClient((url || '').trim(), (anonKey || '').trim());
        const { data, error } = await testClient.from('site_content').select('id').limit(1);
        if (error) throw error;
        return { success: true, count: data ? data.length : 0 };
      } catch (err) {
        return { success: false, error: err.message || String(err) };
      }
    }

    // Sync from Supabase into LocalStorage if available
    async syncFromSupabase() {
      if (!this.supabase) return;
      try {
        // 1. Content
        const { data: contentData } = await this.supabase.from('site_content').select('*');
        if (contentData && contentData.length > 0) {
          const current = this.getContent();
          contentData.forEach((item) => {
            current[item.id] = item.value;
          });
          localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(current));
        }

        // 2. Products
        const { data: productsData } = await this.supabase.from('site_products').select('*').order('sort_order', { ascending: true });
        if (productsData && productsData.length > 0) {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsData));
        }

        // 3. Work Cards
        const { data: workData } = await this.supabase.from('site_work_cards').select('*').order('sort_order', { ascending: true });
        if (workData && workData.length > 0) {
          localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(workData));
        }

        // 4. Leads
        const { data: leadsData } = await this.supabase.from('site_leads').select('*').order('created_at', { ascending: false });
        if (leadsData) {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leadsData));
        }

        this.notifyListeners('sync');
        this.hydrate();
      } catch (err) {
        console.warn('Sync from Supabase encounter an error:', err);
      }
    }

    // --- PUB/SUB NOTIFICATIONS ---
    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter((cb) => cb !== callback);
      };
    }

    notifyListeners(action, payload) {
      this.listeners.forEach((cb) => {
        try {
          cb(action, payload);
        } catch (e) {
          console.error(e);
        }
      });
      window.dispatchEvent(new CustomEvent('quill_cms_updated', { detail: { action, payload } }));
    }

    // --- CONTENT & BRANDING API ---
    getContent() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
        return raw ? { ...DEFAULT_CONTENT, ...JSON.parse(raw) } : { ...DEFAULT_CONTENT };
      } catch (e) {
        return { ...DEFAULT_CONTENT };
      }
    }

    async saveContent(key, value) {
      const content = this.getContent();
      content[key] = value;
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));

      if (this.supabase) {
        try {
          await this.supabase.from('site_content').upsert([{ id: key, value: String(value) }]);
        } catch (e) {
          console.warn('Supabase upsert failed:', e);
        }
      }

      this.notifyListeners('content_update', { key, value });
      this.hydrate();
      return content;
    }

    async saveBatchContent(items) {
      const content = this.getContent();
      const supabaseItems = [];

      Object.entries(items).forEach(([key, val]) => {
        content[key] = val;
        supabaseItems.push({ id: key, value: String(val) });
      });

      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));

      if (this.supabase && supabaseItems.length > 0) {
        try {
          for (const item of supabaseItems) {
            await this.supabase.from('site_content').upsert([item]);
          }
        } catch (e) {
          console.warn('Supabase batch upsert failed:', e);
        }
      }

      this.notifyListeners('batch_content_update', items);
      this.hydrate();
      return content;
    }

    // --- PRODUCTS API ---
    getProducts() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        return raw ? JSON.parse(raw) : DEFAULT_PRODUCTS;
      } catch (e) {
        return DEFAULT_PRODUCTS;
      }
    }

    async saveProduct(product) {
      const products = this.getProducts();
      let updated;
      const id = product.id || 'prod_' + Date.now();
      const item = { ...product, id };

      const index = products.findIndex((p) => p.id === id);
      if (index >= 0) {
        products[index] = item;
      } else {
        item.sort_order = products.length + 1;
        products.push(item);
      }

      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

      if (this.supabase) {
        try {
          await this.supabase.from('site_products').upsert([item]);
        } catch (e) {
          console.warn('Supabase product upsert failed:', e);
        }
      }

      this.notifyListeners('products_update', products);
      this.hydrate();
      return products;
    }

    async deleteProduct(id) {
      let products = this.getProducts();
      products = products.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

      if (this.supabase) {
        try {
          await this.supabase.from('site_products').delete().eq('id', id);
        } catch (e) {
          console.warn('Supabase product delete failed:', e);
        }
      }

      this.notifyListeners('products_update', products);
      this.hydrate();
      return products;
    }

    // --- WORK CARDS API ---
    getWorkCards() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.WORK_CARDS);
        return raw ? JSON.parse(raw) : DEFAULT_WORK_CARDS;
      } catch (e) {
        return DEFAULT_WORK_CARDS;
      }
    }

    async saveWorkCard(card) {
      const cards = this.getWorkCards();
      const id = card.id || 'work_' + Date.now();
      const item = { ...card, id };

      const index = cards.findIndex((c) => c.id === id);
      if (index >= 0) {
        cards[index] = item;
      } else {
        item.sort_order = cards.length + 1;
        cards.push(item);
      }

      localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(cards));

      if (this.supabase) {
        try {
          await this.supabase.from('site_work_cards').upsert([item]);
        } catch (e) {
          console.warn('Supabase work card upsert failed:', e);
        }
      }

      this.notifyListeners('work_cards_update', cards);
      this.hydrate();
      return cards;
    }

    async deleteWorkCard(id) {
      let cards = this.getWorkCards();
      cards = cards.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(cards));

      if (this.supabase) {
        try {
          await this.supabase.from('site_work_cards').delete().eq('id', id);
        } catch (e) {
          console.warn('Supabase work card delete failed:', e);
        }
      }

      this.notifyListeners('work_cards_update', cards);
      this.hydrate();
      return cards;
    }

    async reorderWorkCards(orderedIds) {
      const cards = this.getWorkCards();
      const cardMap = Object.fromEntries(cards.map((c) => [c.id, c]));
      const newCards = orderedIds.map((id, index) => ({
        ...cardMap[id],
        sort_order: index + 1,
      }));

      localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(newCards));

      if (this.supabase) {
        try {
          for (const c of newCards) {
            await this.supabase.from('site_work_cards').upsert([c]);
          }
        } catch (e) {
          console.warn('Supabase work cards reorder failed:', e);
        }
      }

      this.notifyListeners('work_cards_update', newCards);
      this.hydrate();
      return newCards;
    }

    // --- LEADS / INQUIRIES API ---
    getLeads() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    async submitLead(leadData) {
      const leads = this.getLeads();
      const newLead = {
        id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: leadData.name || '',
        email: leadData.email || '',
        track: leadData.track || 'Local Business Launch',
        budget: leadData.budget || 'Not stated',
        message: leadData.message || leadData.gap || '',
        status: 'new',
        created_at: new Date().toISOString(),
      };

      leads.unshift(newLead);
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

      if (this.supabase) {
        try {
          await this.supabase.from('site_leads').insert([
            {
              name: newLead.name,
              email: newLead.email,
              track: newLead.track,
              budget: newLead.budget,
              message: newLead.message,
            },
          ]);
        } catch (e) {
          console.warn('Supabase lead insertion failed:', e);
        }
      }

      this.notifyListeners('leads_update', leads);
      return newLead;
    }

    async deleteLead(id) {
      let leads = this.getLeads();
      leads = leads.filter((l) => l.id !== id);
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));

      if (this.supabase) {
        try {
          await this.supabase.from('site_leads').delete().eq('id', id);
        } catch (e) {
          console.warn('Supabase lead delete failed:', e);
        }
      }

      this.notifyListeners('leads_update', leads);
      return leads;
    }

    exportLeadsCSV() {
      const leads = this.getLeads();
      if (!leads.length) return null;

      const headers = ['ID', 'Date', 'Name', 'Email', 'Track', 'Budget', 'Message'];
      const rows = leads.map((l) => [
        `"${l.id || ''}"`,
        `"${new Date(l.created_at).toLocaleString()}"`,
        `"${(l.name || '').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${(l.track || '').replace(/"/g, '""')}"`,
        `"${(l.budget || '').replace(/"/g, '""')}"`,
        `"${(l.message || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `quill_labs_leads_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    // --- BACKUP & RESTORE ---
    exportAllJSON() {
      const bundle = {
        exportedAt: new Date().toISOString(),
        content: this.getContent(),
        products: this.getProducts(),
        workCards: this.getWorkCards(),
        leads: this.getLeads(),
      };
      const jsonStr = JSON.stringify(bundle, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quill_labs_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return bundle;
    }

    async importAllJSON(jsonString) {
      try {
        const bundle = JSON.parse(jsonString);
        if (bundle.content) {
          localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(bundle.content));
        }
        if (bundle.products) {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(bundle.products));
        }
        if (bundle.workCards) {
          localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(bundle.workCards));
        }
        if (bundle.leads) {
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(bundle.leads));
        }
        this.notifyListeners('import_complete');
        this.hydrate();
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    resetToDefaults() {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(DEFAULT_CONTENT));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(STORAGE_KEYS.WORK_CARDS, JSON.stringify(DEFAULT_WORK_CARDS));
      this.notifyListeners('reset');
      this.hydrate();
    }

    // --- DOM HYDRATION ENGINE ---
    hydrate() {
      const content = this.getContent();

      // 1. Dynamic Accent Color injection into CSS variables
      if (content.brand_color) {
        document.documentElement.style.setProperty('--cta-gold', content.brand_color);
        document.documentElement.style.setProperty('--amber', content.brand_color);
        document.documentElement.style.setProperty('--amber-ink', content.brand_color);
      }

      // 2. Hydrate text bindings [data-cms="key"]
      document.querySelectorAll('[data-cms]').forEach((el) => {
        const key = el.dataset.cms;
        if (content[key] !== undefined) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.value = content[key];
          } else if (el.dataset.cmsHtml === 'true') {
            el.innerHTML = content[key];
          } else {
            el.textContent = content[key];
          }
        }
      });

      // 3. Hydrate images [data-cms-src="key"]
      document.querySelectorAll('[data-cms-src]').forEach((el) => {
        const key = el.dataset.cmsSrc;
        if (content[key]) {
          el.src = content[key];
        }
      });

      // 4. Hydrate links [data-cms-href="key"]
      document.querySelectorAll('[data-cms-href]').forEach((el) => {
        const key = el.dataset.cmsHref;
        if (content[key]) {
          el.href = content[key];
        }
      });

      // 5. Render Dynamic Work Cards [data-cms-work-cards]
      this.renderWorkCardsContainers();

      // 6. Render Dynamic Products [data-cms-products]
      this.renderProductsContainers();

      // 7. Attach Contact Form Interceptor
      this.attachContactFormInterceptor();
    }

    renderWorkCardsContainers() {
      const containers = document.querySelectorAll('[data-cms-work-cards]');
      if (!containers.length) return;

      const cards = this.getWorkCards();

      containers.forEach((container) => {
        const filterTrack = container.dataset.track || 'all';
        const isShowAll = container.dataset.showAll === 'true';

        // Filter cards if a track is specified and not 'all'
        let displayCards = cards;
        if (!isShowAll && filterTrack !== 'all') {
          displayCards = cards.filter((c) => c.track === filterTrack);
        }

        // Limit homepage if requested
        const limit = parseInt(container.dataset.limit || '0', 10);
        if (limit > 0) {
          displayCards = displayCards.slice(0, limit);
        }

        container.innerHTML = displayCards
          .map((card, index) => {
            const trackLabel = card.track === 'creator' ? 'Creator Launch' : 'Local Business Launch';
            const badgeClass = card.badge === 'Client project' ? 'tag--business' : 'tag--concept';
            const isFeatured = card.badge === 'Client project' || index === 0;

            let reviewMarkup = '';
            if (card.client_review) {
              reviewMarkup = `
                <figure class="client-review reveal is-inview" data-delay="1" style="margin-top: 1rem;">
                  <div class="client-review__stars" aria-label="5 out of 5 stars" style="color: var(--cta-gold); font-size: 0.9rem;">★★★★★</div>
                  <blockquote style="font-size: 0.95rem; margin-top: 0.35rem; color: var(--text-primary); font-style: italic;">“${this.escapeHTML(card.client_review)}”</blockquote>
                  ${card.client_name ? `<figcaption style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;"><strong>${this.escapeHTML(card.client_name)}</strong></figcaption>` : ''}
                </figure>
              `;
            }

            return `
              <div class="reveal is-inview" data-delay="${index % 3}" data-track="${this.escapeHTML(card.track || 'business')}">
                <article class="work-card ${isFeatured ? 'work-card--featured' : ''}" style="height: 100%;">
                  <a class="work-card__thumb" href="${this.escapeHTML(card.link_url || 'v1 contact.html')}" ${card.link_url && card.link_url.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="Enquire about ${this.escapeHTML(card.title)}">
                    <img src="${this.escapeHTML(card.image_url)}" alt="${this.escapeHTML(card.title)}" width="960" height="600" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;">
                    <span class="tag ${badgeClass} work-card__badge">${this.escapeHTML(card.badge || 'Concept work')}</span>
                  </a>
                  <div class="work-card__body">
                    <div class="work-card__meta">
                      <span class="tag ${card.track === 'creator' ? 'tag--creator' : 'tag--business'}">${trackLabel}</span>
                      <span class="mono-label">${this.escapeHTML(card.system_type || 'Business System')}</span>
                    </div>
                    <h3>${this.escapeHTML(card.title)}</h3>
                    <p>${this.escapeHTML(card.problem || '')}</p>
                    ${card.outcome ? `<p class="outcome"><span style="color: var(--cta-gold);">→</span> ${this.escapeHTML(card.outcome)}</p>` : ''}
                    ${reviewMarkup}
                  </div>
                </article>
              </div>
            `;
          })
          .join('');
      });
    }

    renderProductsContainers() {
      const containers = document.querySelectorAll('[data-cms-products]');
      if (!containers.length) return;

      const products = this.getProducts();

      containers.forEach((container) => {
        container.innerHTML = products
          .map((prod, index) => {
            const num = prod.num || String(index + 1).padStart(2, '0');
            return `
              <div class="pricing-card reveal is-inview" data-delay="${index % 3}">
                <span class="feat-card__num">${num} — Website Foundation</span>
                <h3>${this.escapeHTML(prod.title)}</h3>
                <p class="pricing-card__price">
                  <span class="pricing-card__from">${this.escapeHTML(prod.price_prefix || 'Starting from')}</span>
                  <span style="color: var(--cta-gold); font-weight: 700;">${this.escapeHTML(prod.price)}</span>
                </p>
                <div class="pricing-card__meta">
                  <span class="tier-problem-label">Timeline</span>
                  <span class="pricing-card__meta-value">${this.escapeHTML(prod.timeline || '7–10 Days')}</span>
                </div>
                <div class="pricing-card__meta">
                  <span class="tier-problem-label">Best for</span>
                  <span class="pricing-card__meta-value">${this.escapeHTML(prod.best_for || 'Modern businesses')}</span>
                </div>
                <p class="pricing-card__desc">${this.escapeHTML(prod.description || '')}</p>
                <div class="pricing-card__cta" style="margin-top: auto; padding-top: 1.25rem;">
                  <a class="btn btn--primary" href="v1 contact.html" style="width: 100%; text-align: center;">Book Strategy Call</a>
                </div>
              </div>
            `;
          })
          .join('');
      });
    }

    attachContactFormInterceptor() {
      const forms = document.querySelectorAll('[data-contact-form], [data-cms-lead-form]');
      forms.forEach((form) => {
        if (form.dataset.cmsBound === 'true') return;
        form.dataset.cmsBound = 'true';

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const submitBtn = form.querySelector('[type="submit"]');
          const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Sending...';
          }

          const formData = new FormData(form);
          const leadData = {
            name: (formData.get('name') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            track: (formData.get('track') || 'Local Business Launch').toString().trim(),
            budget: (formData.get('budget') || 'Not stated').toString().trim(),
            message: (formData.get('gap') || formData.get('message') || '').toString().trim(),
          };

          if (!leadData.name || !leadData.email || !leadData.message) {
            alert('Please fill out your Name, Email, and Gap description.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
            return;
          }

          try {
            await this.submitLead(leadData);

            // Show Sleek In-Page Success Message
            let note = form.querySelector('[data-form-note]');
            if (!note) {
              note = document.createElement('div');
              note.className = 'form-success-banner';
              note.style.cssText = 'background: rgba(16, 185, 129, 0.12); border: 1px solid #10B981; color: #10B981; padding: 1rem 1.25rem; border-radius: 6px; margin-top: 1.25rem; font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.5;';
              form.appendChild(note);
            }

            note.hidden = false;
            note.innerHTML = `
              <strong>✓ Enquiry Received & Logged to CMS!</strong><br>
              Thank you ${this.escapeHTML(leadData.name)}. We have saved your project details into our studio system. We will reply to <strong>${this.escapeHTML(leadData.email)}</strong> within 1 business day.
            `;

            form.reset();

            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = 'Enquiry Sent ✓';
              setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
              }, 4000);
            }
          } catch (err) {
            alert('Failed to submit enquiry: ' + err.message);
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnText;
            }
          }
        });
      });
    }

    escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  // Instantiate singleton
  const cms = new QuillCMS();
  window.quillCMS = cms;

  // Auto-hydrate on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => cms.hydrate());
  } else {
    cms.hydrate();
  }
})(window, document);
