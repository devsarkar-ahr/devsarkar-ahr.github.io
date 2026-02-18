(function () {
  'use strict';

  const ACCOUNT_ITEMS = [
    {
      label: 'Profile',
      href: '/profile',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      color: '#3fb683'
    },
    {
      label: 'Streak',
      href: '/streak',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
      color: '#ffa726'
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>',
      color: '#ffb300'
    },
    {
      label: 'Links',
      href: '/links',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
      color: '#d84d0dff'
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      color: '#9caf9c'
    },
    {
      label: 'The Duck Pond',
      href: '#',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg>',
      color: '#5865F2'
    }
  ];

  const accountBtn = document.querySelector('.n271');
  const searchBtn = document.querySelector('.n273, [data-testid="search-icon-button"]');
  const sidebar = document.querySelector('[data-testid="left-sidebar"]');

  if (!accountBtn || !sidebar) {
    console.warn('Account sidebar: Missing elements');
    return;
  }

  const sidebarTitle = sidebar.querySelector('.n344');
  const sidebarContent = sidebar.querySelector('.n342');
  const searchSidebar = sidebar.querySelector('[data-testid="search-sidebar"]');
  const backBtn = sidebar.querySelector('.n340');

  if (!sidebarTitle || !sidebarContent || !searchSidebar) {
    console.warn('Account sidebar: Sidebar structure not found');
    return;
  }

  let isAccountMode = false;
  let accountPanel = null;

  function buildAccountPanel() {
    const panel = document.createElement('div');
    panel.className = 'n85';
    panel.innerHTML = `
      <div class="n97">
        ${ACCOUNT_ITEMS.map(item => `
          <a class="n37" href="${item.href}" data-discover="true" style="--item-color: ${item.color};">
            <div class="n61">
              ${item.icon}
            </div>
            <span class="n73">${item.label}</span>
            <div class="n49">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>
            </div>
          </a>
        `).join('')}
      </div>
    `;
    return panel;
  }

  function restoreSearchSidebar() {
    if (!isAccountMode) return;

    isAccountMode = false;
    sidebarTitle.textContent = 'Search';
    searchSidebar.style.display = '';

    if (accountPanel && accountPanel.parentNode === sidebarContent) {
      sidebarContent.removeChild(accountPanel);
    }
  }

  function openAccountSidebar() {
    if (isAccountMode && sidebar.classList.contains('n119')) {
      sidebar.classList.remove('n119');
      restoreSearchSidebar();
      return;
    }

    if (!accountPanel) {
      accountPanel = buildAccountPanel();
    }

    searchSidebar.style.display = 'none';
    if (accountPanel.parentNode !== sidebarContent) {
      sidebarContent.appendChild(accountPanel);
    }

    sidebarTitle.textContent = 'Account';
    isAccountMode = true;
    sidebar.classList.add('n119');
  }

  function closeSidebar() {
    restoreSearchSidebar();
    sidebar.classList.remove('n119');
  }

  function restoreBeforeSearchOpen() {
    if (isAccountMode) {
      restoreSearchSidebar();
    }
  }

  accountBtn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    openAccountSidebar();
  });

  accountBtn.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    openAccountSidebar();
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', restoreBeforeSearchOpen, true);
    searchBtn.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      restoreBeforeSearchOpen();
    }, true);
  }

  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      if (!isAccountMode) return;
      e.preventDefault();
      e.stopPropagation();
      closeSidebar();
    }, true);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isAccountMode) {
      restoreSearchSidebar();
    }
  }, true);

  console.log('Account sidebar initialized');
})();
