/**
 * App.js - Carga de módulos HTML e i18n
 */

let translations = {};
let currentLang = localStorage.getItem('demo_lang') || 'es';

// Mapeo de secciones a archivos HTML
const modules = {
    'home': 'modules/home.html',
    'works': 'modules/works.html',
    'clients': 'modules/clients.html',
    'appointments': 'modules/appointments.html',
    'orders': 'modules/orders.html',
    'messenges': 'modules/messages.html',
    'users': 'modules/users.html',
    'subscriptions': 'modules/subscriptions.html',
    'profile': 'modules/profile.html'
};

// Cargar traducciones
async function loadTranslations() {
    try {
        const response = await fetch('assets/i18n/translations.json');
        translations = await response.json();
        applyTranslations(currentLang);
    } catch (error) {
        console.error('Error cargando traducciones:', error);
    }
}

// Aplicar traducciones
function applyTranslations(lang) {
    if (!translations[lang]) return;

    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Traducir títulos
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[lang][key]) {
            element.title = translations[lang][key];
        }
    });

    currentLang = lang;
    localStorage.setItem('demo_lang', lang);
}

// Cargar módulo HTML
async function loadModule(section) {
    const container = document.getElementById('main-content-container');
    const modulePath = modules[section];
    
    if (!modulePath) {
        console.warn('Módulo no encontrado:', section);
        return;
    }

    try {
        const response = await fetch(modulePath);
        const html = await response.text();
        container.innerHTML = html;
        
        // Aplicar traducciones al módulo cargado
        applyTranslations(currentLang);
        
        // Inicializar funcionalidad específica del módulo
        initModuleFeatures(section);
    } catch (error) {
        console.error('Error cargando módulo:', error);
        container.innerHTML = '<div class="error-message">Error cargando el módulo</div>';
    }
}

// Inicializar características específicas de cada módulo
function initModuleFeatures(section) {
    if (section === 'subscriptions') {
        initSubscriptionTabs();
    }
}

// Tabs de suscripción
function initSubscriptionTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Activar el seleccionado
            btn.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Navegación entre secciones
function navigateToSection(section) {
    // Remover clase active de todos los items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Agregar clase active al item seleccionado
    const activeItem = document.querySelector(`.sidebar-item[data-section="${section}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
    
    // Cargar módulo
    loadModule(section);
}

// Verificar autenticación
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('demo_logged_in');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Inicializar
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar si está logueado
    if (!checkAuth()) return;
    
    console.log('Omnia Uno Demo - Inicializado');
    
    // Cargar traducciones
    await loadTranslations();
    
    // Cargar home por defecto
    loadModule('home');
    
    // Event listeners para sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            if (section === 'logout') {
                handleLogout();
                return;
            }
            
            navigateToSection(section);
        });
    });
});

// Manejar logout
function handleLogout() {
    if (confirm('¿Cerrar sesión?')) {
        sessionStorage.removeItem('demo_logged_in');
        sessionStorage.removeItem('demo_username');
        window.location.href = 'login.html';
    }
}

// Exportar para uso global
window.navigateToSection = navigateToSection;
