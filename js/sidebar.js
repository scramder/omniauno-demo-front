/**
 * Sidebar - Manejo de colapso y responsive
 */

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('dashboardSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    let isMobile = window.innerWidth <= 768;

    // Aplicar estado inicial
    if (isCollapsed && !isMobile) {
        sidebar.classList.add('collapsed');
    }

    // Toggle sidebar
    function toggleSidebar() {
        if (isMobile) {
            sidebar.classList.toggle('open');
            toggleOverlay();
        } else {
            isCollapsed = !isCollapsed;
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        }
    }

    // Overlay para móvil
    function toggleOverlay() {
        let overlay = document.querySelector('.sidebar-overlay');
        
        if (sidebar.classList.contains('open')) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay active';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                });
            } else {
                overlay.classList.add('active');
            }
        } else if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSidebar();
        });
    }

    // Cerrar sidebar en móvil al hacer click en un item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            if (isMobile && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    // Responsive
    function handleResponsive() {
        isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            sidebar.classList.remove('open');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) overlay.classList.remove('active');
        } else {
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
            } else {
                sidebar.classList.remove('collapsed');
            }
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();

    console.log('Sidebar inicializado');
});
