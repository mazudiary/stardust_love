# Stardust Love Unlocked

A beautiful, interactive family story page with animated starry background, password-protected unlock, and responsive SVG diagram.

## Features
- **Animated Starry Background:** Inline SVG with twinkling stars.
- **Password Unlock:** Enter the secret date to reveal the story. Password is securely checked using SHA-256 hashing (client-side).
- **Show/Hide Password:** Eye button toggles password visibility.
- **Custom Toast Notifications:** Elegant popups for success/error.
- **Responsive Design:** Looks great on desktop, tablet, and mobile.
- **SVG Family Diagram:** Curved arrows connect parents to daughter.
- **Locked/Unlocked States:** Compact layout before unlock, full story after.

## Usage
1. Open `index.html` in your browser.
2. Enter the secret date (format: `dd-mm-yyyy`) in the password field.
3. Click the unlock button. If correct, the story and diagram are revealed.

## Customization
- Change the secret date by updating the hash in the JS (`storedHash`).
- Edit names, meanings, and connections in the HTML as needed.
- Adjust colors, gradients, and layout in `style.css` or the `<style>` block in `index.html`.

## File Structure
- `index.html` — Main page with all logic and styles.
- `style.css` — (Optional) External styles if used.
- `README.md` — This documentation.

## Credits
- Icons: [Feather Icons](https://feathericons.com/) (eye/eye-off)
- Fonts: Playfair Display (Google Fonts)
- SVG/JS/CSS: Custom

---
Enjoy your cosmic family story! ✨
