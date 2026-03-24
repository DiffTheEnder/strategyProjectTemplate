// Shared utilities for all dashboard pages

const DATA_DIR = 'data/';

async function loadJSON(filename) {
  const resp = await fetch(DATA_DIR + filename);
  if (!resp.ok) throw new Error(`Failed to load ${filename}: ${resp.status}`);
  return resp.json();
}

// Dark mode
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  const html = document.documentElement;
  const stored = localStorage.getItem('dark-mode');
  if (stored === 'true' || (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('dark-mode', html.classList.contains('dark'));
    });
  }
}

// Mobile sidebar toggle
function initSidebar() {
  const btn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !btn.contains(e.target)) sidebar.classList.remove('open');
    });
  }
}

// Highlight active nav
function initNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
}

// Kill condition status to CSS class
function kcStatusClass(status) {
  const s = (status || '').toUpperCase().trim();
  if (s.includes('UNTESTED')) return 'kc-untested';
  if (s.includes('EARLY SIGNAL')) return 'kc-early-signal';
  if (s.includes('BUILDING')) return 'kc-building';
  if (s.includes('WEAKENING')) return 'kc-weakening';
  if (s.includes('PASSED')) return 'kc-passed';
  if (s.includes('FAILED')) return 'kc-failed';
  return 'kc-untested';
}
