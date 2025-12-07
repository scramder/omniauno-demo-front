# Omnia Uno - Demo Frontend

Demo simplificado del sistema Omnia Uno para portfolio profesional.

**Omnia Uno** es una marca registrada. © 2025 Cristhian Muriel - Todos los derechos reservados.

🔗 **GitHub**: https://github.com/scramder/omniauno-demo-front

## Características

- **Login simulado**: Cualquier usuario/contraseña funciona
- **Sistema de traducciones (i18n)**: Español, Inglés y Portugués
- **HTML estático**: Datos hardcodeados en cada módulo
- **Navegación SPA**: Carga módulos HTML dinámicamente
- **Responsive**: Sidebar colapsable y adaptable a móvil
- **Sin backend**: Todo funciona en el frontend

## Estructura

```
├── login.html              # Página de login con selector de idioma
├── index.html              # Layout principal (header, sidebar, footer)
├── modules/                # Módulos HTML separados
│   ├── home.html          # Página de inicio con info del proyecto
│   ├── works.html         # Gestión de trabajos
│   ├── clients.html       # Gestión de clientes
│   ├── users.html         # Gestión de usuarios
│   ├── appointments.html  # Gestión de visitas
│   ├── orders.html        # Gestión de pedidos
│   ├── messages.html      # Bandeja de entrada
│   ├── subscriptions.html # Dashboard de suscripción
│   ├── profile.html       # Perfil de usuario
│   └── ...
├── js/
│   ├── login.js           # Autenticación simulada + i18n
│   ├── app.js             # Carga de módulos, navegación e i18n
│   └── sidebar.js         # Manejo del sidebar
├── assets/
│   ├── css/               # Estilos del sistema
│   └── i18n/
│       └── translations.json  # Traducciones ES/EN/PT
```

## Sistema de Traducciones

El demo incluye un sistema completo de internacionalización (i18n):

- **3 idiomas**: Español, Inglés (English), Portugués (Português)
- **Selección en login**: El usuario elige su idioma preferido al iniciar sesión
- **Persistencia**: El idioma se guarda en localStorage
- **Cobertura completa**: Todos los módulos están traducidos
- **Implementación**: Usando atributos `data-i18n` en HTML

### Archivos traducidos:
- Login (título, campos, botones)
- Header (búsqueda, notificaciones, rol)
- Sidebar (todos los menús)
- Footer (copyright, links)
- Módulos: Home, Works, Clients, Users, Appointments, Orders, Messages, Subscriptions

## Uso

Abre `login.html` en un navegador o sirve con cualquier servidor HTTP:

```bash
# Python
python -m http.server 8000

# Node
npx serve

# PHP
php -S localhost:8000
```

Luego:
1. Selecciona tu idioma preferido (ES/EN/PT)
2. Ingresa cualquier usuario y contraseña
3. Explora los diferentes módulos del sistema

## Módulos Implementados

- ✅ **Trabajos**: Tabla con gestión de trabajos técnicos
- ✅ **Clientes**: Gestión de clientes con notas y objetos
- ✅ **Usuarios**: Administración de usuarios del sistema
- ✅ **Visitas**: Gestión de turnos y visitas técnicas
- ✅ **Pedidos**: Bandeja de pedidos con filtros
- ✅ **Mensajes**: Bandeja de entrada estilo chat
- ✅ **Suscripción**: Dashboard con información del cliente
- 🚧 **Perfil**: En desarrollo

## Tecnologías

- HTML5 semántico
- CSS3 con variables y grid/flexbox
- JavaScript vanilla (ES6+)
- Font Awesome para iconos
- Sin frameworks ni librerías externas

## Notas

Este es un demo visual con datos estáticos para mostrar el diseño y experiencia de usuario del sistema real Omnia Uno. No incluye funcionalidad backend ni persistencia de datos.
