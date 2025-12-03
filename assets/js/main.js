// main.js — small helper for theme toggling and basic UI behaviors

(function(){
  const THEME_KEY = 'site-theme';

  function applyTheme(theme){
    if(theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  function getPreferredTheme(){
    const stored = localStorage.getItem(THEME_KEY);
    if(stored) return stored;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches ? 'dark' : 'light';
  }

  function toggleTheme(){
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    updateToggleButtons(next);
  }

  function updateToggleButtons(theme){
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    const initial = getPreferredTheme();
    applyTheme(initial);
    updateToggleButtons(initial);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        toggleTheme();
      });
    });
  });
})();
