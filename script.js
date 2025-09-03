// Store only the SHA-256 hash of the secret, not the plaintext
    const storedHash = '7a00071b440d9ce67972d047d0d2593b22bac2f9746d0f991e8f3ac97756b46d';

    // Hash a string to hex using Web Crypto API
    async function hashString(message) {
      if (!(window.crypto && window.crypto.subtle)) {
        throw new Error('Secure hashing is not supported in this context.');
      }
      const enc = new TextEncoder();
      const data = enc.encode(message);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      const bytes = Array.from(new Uint8Array(digest));
      return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
    }

  function showToast(message, type = 'info', timeout = 2000) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const el = document.createElement('div');
      el.className = `toast ${type}`;
      el.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${type === 'success' ? '<polyline points="20 6 9 17 4 12" />' : type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />' : '<circle cx="12" cy="12" r="10" />'}
        </svg>
        <span>${message}</span>`;
      container.appendChild(el);
      setTimeout(() => { el.classList.add('hide'); el.addEventListener('transitionend', () => el.remove(), { once: true }); }, timeout);
    }

    // Password show/hide toggle
    const togglePwBtn = document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('togglePw');
      const input = document.getElementById('codeInput');
      if (!btn || !input) return;
      let shown = false;
      btn.addEventListener('click', () => {
        shown = !shown;
        input.type = shown ? 'text' : 'password';
        btn.setAttribute('aria-label', shown ? 'Hide password' : 'Show password');
      });
    });

    async function checkCode() {
      const input = document.getElementById('codeInput').value.trim();
      const content = document.getElementById('lockedContent');
      try {
        const inputHash = await hashString(input);
        if (inputHash === storedHash) {
          content.style.display = 'block';
          document.querySelector('.lock-container').style.display = 'none';
          document.body.classList.remove('locked');
          document.body.insertAdjacentHTML('beforeend', '<div class="unlock-effect"></div>');
          setTimeout(() => document.querySelector('.unlock-effect')?.remove(), 2000);
          showToast('Unlocked ✨ Welcome to our starlit story!', 'success');
        } else {
          showToast('The stars haven’t aligned yet. Try again ✨', 'error');
        }
      } catch (e) {
        console.error(e);
  showToast('Secure verification not supported in this browser/context.', 'error', 2000);
      }
    }

    const style = document.createElement('style');
    style.innerHTML = `
      .unlock-effect {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 111, 145, 0.5), transparent);
        animation: burst 2s forwards;
        z-index: 1000;
        pointer-events: none;
      }
      @keyframes burst {
        0% { opacity: 1; transform: scale(0); }
        100% { opacity: 0; transform: scale(2); }
      }
    `;
    document.head.appendChild(style);

    // Adjust SVG paths dynamically for responsiveness
    function updateSVGPaths() {
        const svg = document.querySelector('svg');
        const arrow1 = document.getElementById('arrow1');
        const arrow2 = document.getElementById('arrow2');
        const container = document.querySelector('.diagram-container');
        const lockedContent = document.getElementById('lockedContent');

      if (screen.width  <= 768){
            arrow1.setAttribute('d', `M 320 72 C 220 170, 400 150, 400 220`);
            arrow2.setAttribute('d', `M 470 72 C 600 170, 400 150, 400 220`);
        } 
    }

    window.addEventListener('resize', updateSVGPaths);
    window.addEventListener('load', updateSVGPaths);