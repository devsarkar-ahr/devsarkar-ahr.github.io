// Sidebar toggle logic for Account and Search
// Assumes sidebar, .sidebar-title, and .sidebar-content exist in DOM

document.addEventListener('DOMContentLoaded', function () {
    const accountBtn = document.getElementById('account-btn');
    const searchBtn = document.getElementById('search-btn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarTitle = document.querySelector('.sidebar-title');
    const sidebarContent = document.querySelector('.sidebar-content');
    const searchSidebar = document.querySelector('[data-testid="search-sidebar"]');
    let currentSidebar = null;

    // Store the original search sidebar HTML for restoration
    let originalSearchSidebarHTML = '';
    if (searchSidebar) {
        originalSearchSidebarHTML = searchSidebar.outerHTML;
    }

    function openSidebar(type) {
        sidebar.classList.add('open');
        if (type === 'account') {
            sidebarTitle.textContent = 'Account';
            sidebarContent.innerHTML = '<div class="account-sidebar">Account content here</div>';
            currentSidebar = 'account';
        } else if (type === 'search') {
            sidebarTitle.textContent = 'Search';
            if (originalSearchSidebarHTML) {
                sidebarContent.innerHTML = originalSearchSidebarHTML;
            } else {
                sidebarContent.innerHTML = '<div>Search sidebar not found</div>';
            }
            currentSidebar = 'search';
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        currentSidebar = null;
    }

    if (accountBtn) {
        accountBtn.addEventListener('click', function () {
            if (currentSidebar === 'account') {
                closeSidebar();
            } else {
                openSidebar('account');
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            if (currentSidebar === 'search') {
                closeSidebar();
            } else {
                openSidebar('search');
            }
        });
    }

    // Optional: close sidebar on ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSidebar();
    });
});
