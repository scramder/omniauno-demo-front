/**
 * Login - Simulación de autenticación e i18n
 */

let translations = {};
let currentLang = localStorage.getItem('demo_lang') || 'es';

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

    // Guardar idioma seleccionado
    currentLang = lang;
    localStorage.setItem('demo_lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const languageSelect = document.getElementById('language');

    // Cargar traducciones
    loadTranslations();

    // Establecer idioma guardado en el selector
    languageSelect.value = currentLang;

    // Cambio de idioma
    languageSelect.addEventListener('change', (e) => {
        applyTranslations(e.target.value);
    });

    // Submit del formulario
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulación: cualquier usuario/contraseña funciona
        if (username && password) {
            // Guardar sesión simulada
            sessionStorage.setItem('demo_logged_in', 'true');
            sessionStorage.setItem('demo_username', username);

            // Redireccionar al dashboard
            window.location.href = 'index.html';
        }
    });

    console.log('Login inicializado');
});
