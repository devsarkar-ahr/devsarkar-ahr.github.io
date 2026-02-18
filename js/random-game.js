// Random Game Button - adds a fixed "Surprise Game" button at bottom center
(function() {
  // Create button HTML
  const button = document.createElement('a');
  button.id = 'random-game-btn';
  button.className = 'n284';
  button.innerHTML = '🎲 <span>Pick Random</span>';
  button.href = '#';
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .n284 {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #ffa726 0%, #ffa726 100%);
      color: #000;
      border: solid 2px #ff3f04;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }

    .n284:hover {
      transform: translateX(-50%) translateY(-4px);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
      color: #000;
    }

    .n284:active {
      transform: translateX(-50%) translateY(-2px);
    }

    @media (max-width: 768px) {
      .n284 {
        padding: 0.65rem 1.25rem;
        font-size: 0.9rem;
        bottom: 1.5rem;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(button);
  
  // Get all game links from current page
  function getGameLinks() {
    return Array.from(document.querySelectorAll('a[data-testid^="app_icon_"]'));
  }
  
  // Handle random game selection
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const games = getGameLinks();
    
    if (games.length > 0) {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const href = randomGame.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    }
  });
})();
