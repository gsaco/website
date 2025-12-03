/* ============================================
   GABRIEL SACO ALVARADO — PORTFOLIO JS
   ============================================ */

(function() {
  'use strict';

  /* ============================================
     1. THEME TOGGLE (Dark/Light Mode)
     ============================================ */
  const THEME_KEY = 'portfolio-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    updateThemeIcons(theme);
  }

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', theme === 'dark');
    });
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }

  /* ============================================
     2. SCROLL REVEAL ANIMATIONS
     ============================================ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // Add stagger indices to children
    document.querySelectorAll('.stagger').forEach(container => {
      Array.from(container.children).forEach((child, index) => {
        child.style.setProperty('--stagger-index', index);
      });
    });
  }

  /* ============================================
     3. NAVBAR SCROLL BEHAVIOR
     ============================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (!navbar) return;

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
      });

      // Close menu when clicking a link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ============================================
     4. BACK TO TOP BUTTON
     ============================================ */
  function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     5. TAG-BASED FILTERING
     ============================================ */
  function initTagFiltering() {
    const filterContainers = document.querySelectorAll('[data-filter-container]');
    
    filterContainers.forEach(container => {
      const tags = container.querySelectorAll('[data-filter-tag]');
      const items = container.querySelectorAll('[data-filter-item]');
      
      if (!tags.length || !items.length) return;

      tags.forEach(tag => {
        tag.addEventListener('click', () => {
          const filter = tag.dataset.filterTag;
          
          // Update active tag
          tags.forEach(t => t.classList.remove('active'));
          tag.classList.add('active');
          
          // Filter items
          items.forEach(item => {
            const itemTags = item.dataset.filterItem.split(',').map(t => t.trim().toLowerCase());
            const matches = filter === 'all' || itemTags.includes(filter.toLowerCase());
            
            if (matches) {
              item.style.display = '';
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              });
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });
  }

  /* ============================================
     6. CLIENT-SIDE SEARCH (Notes/Blog)
     ============================================ */
  function initSearch() {
    const searchInput = document.querySelector('[data-search-input]');
    const searchContainer = document.querySelector('[data-search-container]');
    
    if (!searchInput || !searchContainer) return;

    const items = searchContainer.querySelectorAll('[data-search-item]');
    
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      items.forEach(item => {
        const title = item.dataset.searchItem.toLowerCase();
        const tags = item.dataset.searchTags?.toLowerCase() || '';
        const content = item.textContent.toLowerCase();
        
        const matches = !query || 
          title.includes(query) || 
          tags.includes(query) || 
          content.includes(query);
        
        item.style.display = matches ? '' : 'none';
      });
    });
  }

  /* ============================================
     7. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ============================================
     8. FORM VALIDATION & FAKE SUBMIT
     ============================================ */
  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const successMessage = document.querySelector('#form-success');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('[required]');
      
      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(err => err.remove());
      
      inputs.forEach(input => {
        const value = input.value.trim();
        let error = '';
        
        if (!value) {
          error = 'This field is required';
        } else if (input.type === 'email' && !isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        
        if (error) {
          isValid = false;
          const errorEl = document.createElement('p');
          errorEl.className = 'form-error';
          errorEl.textContent = error;
          input.parentNode.appendChild(errorEl);
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Show success message (fake submit)
        form.style.display = 'none';
        if (successMessage) {
          successMessage.style.display = 'block';
        }
      }
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ============================================
     9. ACTIVE NAV LINK HIGHLIGHTING
     ============================================ */
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.navbar-link').forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();
      
      if (linkPath === currentPath || 
          (currentPath === '' && linkPath === 'index.html') ||
          (currentPath === 'index.html' && linkPath === './')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ============================================
     10. TYPING ANIMATION (Optional Hero Effect)
     ============================================ */
  function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(el => {
      const text = el.dataset.typing;
      const speed = parseInt(el.dataset.typingSpeed) || 100;
      el.textContent = '';
      
      let i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      // Start typing when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(el);
    });
  }

  /* ============================================
     11. COPY CODE BLOCKS (for Notes page)
     ============================================ */
  function initCodeCopy() {
    document.querySelectorAll('pre code').forEach(block => {
      const pre = block.parentElement;
      
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = '📋';
      copyBtn.title = 'Copy code';
      
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(block.textContent);
          copyBtn.innerHTML = '✓';
          setTimeout(() => copyBtn.innerHTML = '📋', 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
      
      pre.style.position = 'relative';
      pre.appendChild(copyBtn);
    });
  }

  /* ============================================
     12. INITIALIZE EVERYTHING
     ============================================ */
  function init() {
    // Apply theme immediately (before DOMContentLoaded to prevent flash)
    applyTheme(getPreferredTheme());

    document.addEventListener('DOMContentLoaded', () => {
      // Theme toggle buttons
      document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
      });

      // Initialize all features
      initNavbar();
      initScrollReveal();
      initBackToTop();
      initTagFiltering();
      initSearch();
      initSmoothScroll();
      initContactForm();
      highlightActiveNavLink();
      initTypingEffect();
      initCodeCopy();

      // Log initialization
      console.log('✨ Portfolio initialized');
    });
  }

  // Run initialization
  init();

})();
