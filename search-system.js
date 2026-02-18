/**
 * Duckmath Search System - Simple Drawer Version
 */
(function () {
    console.log('🔍 Duckmath Search (sidebar mode) loading...');

    let GAMES = [];

    // Load games from JSON file
    function loadGamesJSON() {
        fetch('/data/games.json')
            .then(r => r.json())
            .then(data => {
                // Map old format (title/href/img) to new format (name/id/category/type/thumb/href)
                GAMES = data.map(g => ({
                    id: g.id || (g.href ? g.href.split('/').filter(Boolean).pop() : ''),
                    name: g.name || g.title || '',
                    href: g.href || '',
                    thumb: g.thumb || g.img || '',
                    category: g.category || '',
                    type: g.type || ''
                })).filter(g => g.name);
                console.log('✅ Loaded', GAMES.length, 'games from games.json');
            })
            .catch(e => {
                console.warn('⚠️  Could not load games.json, falling back to DOM:', e);
                GAMES = buildIndexFromDOM();
            });
    }

    // Build index from existing app icon cards on the page
    function buildIndexFromDOM() {
        const nodes = Array.from(document.querySelectorAll('a.n312'));
        return nodes.map(a => {
            const titleEl = a.querySelector('.n251') || a.querySelector('img');
            const name = titleEl ? (titleEl.textContent || titleEl.getAttribute('alt') || '').trim() : (a.textContent || '').trim();
            const href = a.getAttribute('href') || '';
            const parts = href.split('/').filter(Boolean);
            const id = parts.length ? parts[parts.length - 1] : a.id || '';
            const thumb = (a.querySelector('img') && a.querySelector('img').src) || '';
            const category = a.dataset.category || '';
            const type = a.dataset.type || '';
            return { id, name, href, thumb, category, type };
        }).filter(g => g.name);
    }

    // Try JSON first, fallback to DOM
    loadGamesJSON();

    // If there are no app-icon-card nodes yet (async render), keep the index refreshed when sidebar opens.
    function refreshIndex() { 
        if (GAMES.length === 0) {
            GAMES = buildIndexFromDOM();
        }
    }

    // Find the existing sidebar element that the site uses
    const sidebar = document.querySelector('[data-testid="left-sidebar"], .n339');
    const TRIGGER_SELECTORS = '[data-testid="search-icon-button"], .n273, [data-testid="search-icon"]';

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('n119');
        
        // Wait for GAMES to load, then render
        const doRender = () => {
            if (GAMES.length === 0) {
                GAMES = buildIndexFromDOM();
            }
            renderResults('', 'all', 'all');
            const inp = sidebar.querySelector('[data-testid="search-input"], .n322, input[type=text]');
            if (inp) setTimeout(() => inp.focus(), 80);
        };
        
        if (GAMES.length > 0) {
            doRender();
        } else {
            setTimeout(doRender, 300);
        }
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('n119');
    }

     

    function bindTrigger(el) {
        if (!el) return;
        try { el.style.cursor = 'pointer'; } catch (e) {}
        el.addEventListener('click', (e) => { try { e.preventDefault && e.preventDefault(); } catch (er) {} openSidebar(); });
    }

    let trigger = document.querySelector(TRIGGER_SELECTORS);
    if (trigger) bindTrigger(trigger);
    else {
        // poll briefly for the site's trigger (it may be injected by React)
        let attempts = 0; const maxAttempts = 12;
        const poll = setInterval(() => {
            attempts += 1;
            const found = document.querySelector(TRIGGER_SELECTORS);
            if (found) { clearInterval(poll); trigger = found; bindTrigger(trigger); }
            else if (attempts >= maxAttempts) { clearInterval(poll); trigger = createFloatingTrigger(); bindTrigger(trigger); }
        }, 200);
    }

    // Close button inside sidebar
    if (sidebar) {
        const back = sidebar.querySelector('.n340');
        if (back) back.addEventListener('click', () => closeSidebar());
    }

    // ╔════════════════════════════════════════════════════════════════════╗
    // ║ TOP GAMES CONFIGURATION - EDIT THIS ARRAY TO CUSTOMIZE TOP GAMES  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    // Add game IDs (slugs) here. These should match the 'id' field in games.json
    // Example: ['cookie-clicker', 'minecraft', 'basketball-legends', ...]
    const TOP_GAMES_IDS = [
    'eagle-craft',
    'race-survival-arena-king', 
    'gun-spin',
    'golf-orbit',
    'cookie-clicker',
    'among-us'
    ];

    // Render results into the sidebar's apps list
    function renderResults(q, category = 'all', type = 'all') {
        if (!sidebar) return;
        const listRoot = sidebar.querySelector('.n401');
        const headerEl = sidebar.querySelector('.n390');
        const containerEl = sidebar.querySelector('.n408');
        if (!listRoot) return;
        
        const query = (q || '').toLowerCase();
        const hasFilters = query || (category && category !== 'all') || (type && type !== 'all');
        
        let res;
        if (!hasFilters) {
            // Show top 6 games when no search/filters
            res = GAMES.filter(g => TOP_GAMES_IDS.includes(g.id)).slice(0, 6);
            if (headerEl) headerEl.textContent = 'Top Games';
        } else {
            // Show filtered results - handle category as array or string
            res = GAMES.filter(g => {
                // Check category filter (handle as array or string)
                if (category && category !== 'all') {
                    const gameCats = Array.isArray(g.category) ? g.category : (g.category ? [g.category] : []);
                    if (!gameCats.includes(category)) return false;
                }
                // Check type filter
                if (type && type !== 'all' && g.type && g.type !== type) return false;
                // Check search query
                if (!query) return true;
                return g.name.toLowerCase().includes(query) || (g.id && g.id.toLowerCase().includes(query));
            });
            if (headerEl) headerEl.textContent = res.length + ' Game' + (res.length !== 1 ? 's' : '');
        }
        
        listRoot.innerHTML = '';
        if (res.length === 0) { listRoot.innerHTML = '<li style="padding:14px;text-align:center;color:#666;grid-column:1/-1">No results found</li>'; return; }
        
        // Add grid layout CSS to container if it exists
        if (containerEl) {
            containerEl.style.overflowX = 'hidden';
            containerEl.style.overflowY = 'auto';
            containerEl.style.scrollBehavior = 'smooth';
        }
        
        // Add grid styling to list (2 columns on mobile, responsive)
        listRoot.style.display = 'grid';
        listRoot.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
        listRoot.style.gap = '12px';
        listRoot.style.padding = '8px 0';
        
        res.forEach(g => {
            const li = document.createElement('li');
            li.style.listStyle = 'none';
            
            const a = document.createElement('a');
            a.href = g.href || ('/class/' + g.id + '/');
            a.className = 'n312';
            a.setAttribute('data-testid', 'app_icon_' + (g.id || '').replace(/[^a-z0-9\-]/gi, ''));
            a.id = g.id || '';
            a.style.width = '100%';
            a.style.height = '100px';
            a.style.display = 'block';
            a.style.textDecoration = 'none';
            a.style.position = 'relative';
            a.style.cursor = 'pointer';
            
            const container = document.createElement('div'); 
            container.className = 'n323';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.position = 'relative';
            
            const imgWrap = document.createElement('div'); 
            imgWrap.className = 'n346';
            imgWrap.style.width = '100%';
            imgWrap.style.height = '100%';
            imgWrap.style.overflow = 'hidden';
            
            if (g.thumb) {
                const img = document.createElement('img'); 
                img.loading = 'lazy'; 
                img.src = g.thumb; 
                img.alt = g.name; 
                img.className = 'n335';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '8px';
                imgWrap.appendChild(img);
            }
            
            const overlay = document.createElement('div'); 
            overlay.className = 'n357';
            overlay.style.position = 'absolute';
            overlay.style.bottom = '0';
            overlay.style.left = '0';
            overlay.style.right = '0';
            overlay.style.background = 'linear-gradient(180deg, transparent, rgba(0,0,0,0.7))';
            overlay.style.padding = '8px 6px';
            overlay.style.borderRadius = '0 0 8px 8px';
            overlay.style.minHeight = '40px';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'flex-end';
            
            const h3 = document.createElement('h3'); 
            h3.className = 'n251'; 
            h3.textContent = g.name;
            h3.style.margin = '0';
            h3.style.fontSize = '11px';
            h3.style.color = '#fff';
            h3.style.whiteSpace = 'normal';
            h3.style.overflow = 'hidden';
            h3.style.textOverflow = 'ellipsis';
            h3.style.display = '-webkit-box';
            h3.style.webkitLineClamp = '2';
            h3.style.webkitBoxOrient = 'vertical';
            h3.style.lineHeight = '1.2';
            
            overlay.appendChild(h3);
            
            container.appendChild(imgWrap); 
            container.appendChild(overlay);
            a.appendChild(container); 
            li.appendChild(a); 
            listRoot.appendChild(li);
        });
    }

    // Wire search input and filter buttons inside sidebar
    if (sidebar) {
        const input = sidebar.querySelector('[data-testid="search-input"], .n322, input[type=text]');
        const allCatBtns = Array.from(sidebar.querySelectorAll('.n435'));
        const clearBtn = sidebar.querySelector('[onclick*="clear"], .n320, [data-testid="clear-filters"]');
        
        // Separate category and type buttons
        const catBtns = allCatBtns.filter(b => !/desktop|mobile|tablet/i.test((b.textContent || '').trim()));
        const typeBtns = allCatBtns.filter(b => /desktop|mobile|tablet/i.test((b.textContent || '').trim()));
        
        let currentCategory = 'all'; 
        let currentType = 'all';
        
        // Search input listener
        if (input) {
            input.addEventListener('input', (e) => { 
                renderResults(e.target.value, currentCategory, currentType); 
            });
        }
        
        // Category filter buttons
        catBtns.forEach(b => {
            b.addEventListener('click', (ev) => {
                const btnText = (b.textContent || '').trim().toLowerCase();
                const isCurrentlyActive = b.classList.contains('active');
                
                // Remove active from all category buttons
                catBtns.forEach(x => x.classList.remove('active'));
                
                // If the button wasn't active, make it active; if it was, go back to 'all'
                if (isCurrentlyActive) {
                    currentCategory = 'all';
                } else {
                    b.classList.add('active');
                    currentCategory = btnText;
                }
                
                // Re-render with new category
                renderResults(input ? input.value : '', currentCategory, currentType);
            });
        });
        
        // Type filter buttons (Desktop/Mobile/Tablet)
        typeBtns.forEach(b => {
            b.addEventListener('click', (ev) => {
                const btnText = (b.textContent || '').trim().toLowerCase();
                const isCurrentlyActive = b.classList.contains('active');
                
                // Remove active from all type buttons
                typeBtns.forEach(x => x.classList.remove('active'));
                
                // Toggle type
                if (isCurrentlyActive) {
                    currentType = 'all';
                } else {
                    b.classList.add('active');
                    currentType = btnText;
                }
                
                // Re-render with new type
                renderResults(input ? input.value : '', currentCategory, currentType);
            });
        });
        
        // Clear filters button
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                currentCategory = 'all';
                currentType = 'all';
                if (input) input.value = '';
                catBtns.forEach(x => x.classList.remove('active'));
                typeBtns.forEach(x => x.classList.remove('active'));
                renderResults('', 'all', 'all');
            });
        }
    }

    // Global escape to close
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSidebar(); });

    // Initial ready state
    console.log('✅ Duckmath Search (sidebar mode) ready');
})();
