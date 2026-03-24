// Overview page logic

document.addEventListener('DOMContentLoaded', async () => {
  initDarkMode();
  initSidebar();
  initNav();

  try {
    const data = await loadJSON('overview.json');

    // Status blurb
    const blurbEl = document.getElementById('status-blurb');
    if (blurbEl && data.statusBlurb) {
      blurbEl.textContent = data.statusBlurb;
    } else if (blurbEl) {
      blurbEl.textContent = 'No status blurb yet. Update docs/output/status-blurb.md and rebuild.';
      blurbEl.classList.add('text-warmgray-400', 'italic');
    }

    // Build time
    const buildTimeEl = document.getElementById('build-time');
    if (buildTimeEl && data.buildTime) {
      const d = new Date(data.buildTime);
      buildTimeEl.textContent = `Last built: ${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    }

    // Kill conditions
    const kcGrid = document.getElementById('kc-grid');
    if (kcGrid && data.killConditions && data.killConditions.length > 0) {
      data.killConditions.forEach(kc => {
        const card = document.createElement('div');
        card.className = 'kc-card';
        card.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <span class="font-syne text-xs font-bold uppercase tracking-wider text-warmgray-400">KC${kc.id}</span>
            <span class="kc-badge ${kcStatusClass(kc.status)}">${kc.status}</span>
          </div>
          <p class="text-sm leading-relaxed">${kc.condition}</p>
          ${kc.evidence ? `<p class="text-xs text-warmgray-400 mt-2">${kc.evidence}</p>` : ''}
        `;
        kcGrid.appendChild(card);
      });
    } else if (kcGrid) {
      kcGrid.innerHTML = '<p class="text-warmgray-400 italic col-span-3">No kill conditions defined yet. Add them to docs/executive-summary.md and rebuild.</p>';
    }

  } catch (e) {
    console.warn('Could not load overview data:', e.message);
  }
});
