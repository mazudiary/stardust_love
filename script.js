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

// Popup API
let popupTimer;
function showPopup({ title = 'Notification', message = '', autoHide = true, timeout = 2000 } = {}) {
  const overlay = document.getElementById('popupOverlay');
  const popup = document.getElementById('popup');
  const titleEl = document.getElementById('popupTitle');
  const msgEl = document.getElementById('popupMessage');
  const closeBtn = document.getElementById('popupClose');
  if (!overlay || !popup || !titleEl || !msgEl || !closeBtn) return;
  titleEl.textContent = title;
  msgEl.textContent = message;
  overlay.classList.add('show');
  popup.hidden = false;
  requestAnimationFrame(() => popup.classList.add('show'));
  const hide = () => hidePopup();
  overlay.onclick = hide;
  closeBtn.onclick = hide;
  if (popupTimer) clearTimeout(popupTimer);
  if (autoHide) popupTimer = setTimeout(hide, timeout);
}

function hidePopup() {
  const overlay = document.getElementById('popupOverlay');
  const popup = document.getElementById('popup');
  if (!overlay || !popup) return;
  overlay.classList.remove('show');
  popup.classList.remove('show');
  setTimeout(() => { popup.hidden = true; }, 220);
}

const togglePwBtn = document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('togglePw');
  const input = document.getElementById('codeInput');
  const icon = document.getElementById('togglePwIcon');
  if (!btn || !input) return;
  let shown = false;
  btn.addEventListener('click', () => {
    shown = !shown;
    input.type = shown ? 'text' : 'password';
    btn.setAttribute('aria-label', shown ? 'Hide password' : 'Show password');
    if (icon) {
      icon.src = shown ? 'assets/eye-off.svg' : 'assets/eye.svg';
      icon.alt = shown ? 'Hide password' : 'Show password';
    }
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
      showPopup({ title: 'Unlocked ✨', message: 'Welcome to our starlit story!', autoHide: true, timeout: 2000 });
    } 
    else {
      showPopup({ title: 'Try again ✨', message: 'The stars haven’t aligned yet.', autoHide: true, timeout: 2000 });
    }
  } 
  catch (e) {
    console.error(e);
    showPopup({ title: 'Unsupported', message: 'Secure verification not supported in this browser/context.', autoHide: true, timeout: 2000 });
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

// Adjust diagram for responsiveness (supports old arrows, no-op for constellation)
function updateSVGPaths() {
  const arrow1 = document.getElementById('arrow1');
  const arrow2 = document.getElementById('arrow2');
  const isMobile = window.innerWidth <= 768;

  if (arrow1 && arrow2) {
    if (isMobile) {
      arrow1.setAttribute('d', 'M 320 72 C 220 170, 400 150, 400 220');
      arrow2.setAttribute('d', 'M 470 72 C 600 170, 400 150, 400 220');
    } else {
      // Optional: reset to default desktop curves to ensure consistency
      arrow1.setAttribute('d', 'M 200 50 C 200 120, 400 120, 400 200');
      arrow2.setAttribute('d', 'M 600 50 C 600 120, 400 120, 400 200');
    }
  }
  // If using constellation SVG, nothing needed here for now.
}

window.addEventListener('resize', updateSVGPaths);
window.addEventListener('load', updateSVGPaths);
