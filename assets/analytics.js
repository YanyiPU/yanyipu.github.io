(() => {
  'use strict';

  const measurementId = document.currentScript.dataset.measurementId || '';
  const banner = document.getElementById('analytics-consent');
  const settings = document.querySelectorAll('[data-analytics-settings]');
  if (!/^G-[A-Z0-9]+$/.test(measurementId) || !banner) return;

  const key = 'yanyi-analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const disableKey = `ga-disable-${measurementId}`;
  const status = document.getElementById('analytics-choice-status');
  let loaded = false;
  let opener = null;
  let choice = readChoice();

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved && ['accepted', 'rejected'].includes(saved.choice) &&
          Number.isFinite(saved.expires) && saved.expires > Date.now() &&
          saved.expires <= Date.now() + lifetime) return saved.choice;
    } catch (_) { /* Storage may be unavailable; analytics stays off by default. */ }
    return null;
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach((entry) => {
      const name = entry.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      ['', '; Domain=yanyipu.github.io', '; Domain=.yanyipu.github.io'].forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax; Secure`;
      });
    });
  }

  function cleanReferrer() {
    try {
      const url = new URL(document.referrer);
      return /^https?:$/.test(url.protocol) ? url.origin + url.pathname : '';
    } catch (_) { return ''; }
  }

  function enableAnalytics() {
    if (loaded || location.hostname !== 'yanyipu.github.io' || location.protocol !== 'https:') return;
    loaded = true;
    window[disableKey] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: lifetime / 1000,
      cookie_update: false,
      page_location: location.origin + location.pathname,
      page_referrer: cleanReferrer()
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(tag);
  }

  function updateStatus() {
    if (status) status.textContent = choice === 'accepted'
      ? 'Your choice: analytics allowed.'
      : choice === 'rejected' ? 'Your choice: analytics declined.' : 'Analytics is off until you choose to allow it.';
  }

  function showSettings(event) {
    opener = event.currentTarget;
    banner.hidden = false;
    banner.querySelector('[data-analytics-choice]').focus();
  }

  function applyChoice(next, persist) {
    const wasLoaded = loaded;
    choice = next;
    if (persist) {
      try { localStorage.setItem(key, JSON.stringify({ choice, expires: Date.now() + lifetime })); }
      catch (_) { /* The choice still applies to this page when storage is blocked. */ }
    }
    if (choice === 'accepted') {
      enableAnalytics();
    } else {
      window[disableKey] = true;
      clearAnalyticsCookies();
    }
    banner.hidden = choice !== null;
    updateStatus();
    if (opener && banner.hidden) { opener.focus(); opener = null; }
    // Unload the Google library after withdrawal, including its event listeners.
    if (wasLoaded && choice !== 'accepted') location.reload();
  }

  settings.forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', showSettings);
  });
  banner.querySelectorAll('[data-analytics-choice]').forEach((button) => {
    button.addEventListener('click', () => applyChoice(button.dataset.analyticsChoice, true));
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) applyChoice(readChoice(), false);
  });
  // Re-check consent when a background tab becomes active or returns from history.
  const refreshChoice = () => {
    const saved = readChoice();
    if (saved !== choice) applyChoice(saved, false);
  };
  window.addEventListener('pageshow', refreshChoice);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshChoice();
  });
  applyChoice(choice, false);
})();
