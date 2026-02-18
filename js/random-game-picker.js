(function() {
  'use strict';



  // Create and inject styles
  const styles = `
    .n98 {
      position: fixed;
      right: 2rem;
      top: 90%;
      transform: translateY(-50%);
      z-index: 999;
      width: 190px;
      height: 40px;
      border-radius: 50px;
      background: linear-gradient(135deg, #ffa726 0%, #ffa726 100%);
      border: solid 2px #ff3f04;
      color: #000;
      font-size: 19px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      animation: pulse-picker 2s infinite;
    }

    .n98:hover {
      transform: translateY(-50%) scale(1.15);
      box-shadow: 0 6px 20px rgba(245, 87, 108, 0.6);
    }

    .n98:active {
      transform: translateY(-50%) scale(0.95);
    }

    .n99 {
      position: absolute;
      right: 80px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .n98:hover .n99 {
      opacity: 1;
    }

    @keyframes pulse-picker {
      0%, 100% {
        box-shadow: 0 4px 15px rgba(245, 87, 108, 0.4);
      }
      50% {
        box-shadow: 0 4px 25px rgba(245, 87, 108, 0.7);
      }
    }

    @media (max-width: 768px) {
      .n98 {
        right: 1rem;
        width: 50px;
        height: 50px;
        font-size: 24px;
      }

      .n99 {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .n98 {
        display: none;
      }
    }
  `;

  // Inject styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Fetch and parse games data
  async function loadGamesData() {
    try {
      const response = await fetch('/data/games.json');
      if (!response.ok) throw new Error('Failed to load games');
      return await response.json();
    } catch (error) {
      console.error('Error loading games.json:', error);
      return null;
    }
  }

  // Create the button
  function createPickerButton(games) {
    if (!games || games.length === 0) {
      console.warn('No games available');
      return;
    }

    const button = document.createElement('button');
    button.className = 'n98';
    button.setAttribute('aria-label', 'Random Game');
    button.textContent = '\uD83C\uDFB2 Pick Random';

    button.addEventListener('click', function(e) {
      e.preventDefault();
      const randomGame = games[Math.floor(Math.random() * games.length)];
      if (randomGame && randomGame.href) {
        window.location.href = randomGame.href;
      }
    });

    document.body.appendChild(button);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async function() {
      const games = await loadGamesData();
      createPickerButton(games);
    });
  } else {
    loadGamesData().then(function(games) {
      createPickerButton(games);
    });
  }
})();
