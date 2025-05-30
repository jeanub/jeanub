/* === JAVASCRIPT - PARTE 1 DE 10: SELECCIÓN DE ELEMENTOS DEL DOM Y CONFIGURACIÓN INICIAL === */

document.addEventListener('DOMContentLoaded', () => {
    // Al inicio de tu bloque DOMContentLoaded, o en la Parte 1 de JS:
const contactForm = document.getElementById('contact-form');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
// const asuntoInput = document.getElementById('asunto'); // Si necesitaras validarlo
const mensajeTextarea = document.getElementById('mensaje');
const formStatus = document.getElementById('form-status'); // El div para mostrar mensajes
const submitButton = contactForm ? contactForm.querySelector('.submit-button') : null; // El botón de envío

    console.log("DOM completamente cargado y parseado. Iniciando script...");

    // --- 1. Selección de Elementos para Cambio de Tema ---
    const htmlElement = document.documentElement; // Para cambiar data-theme y data-lang
    const themeToggleButton = document.getElementById('theme-toggle');
    // El ícono dentro del botón de tema (ej. <i class="fas fa-moon"></i>)
    // Lo seleccionaremos dentro de la función de cambio de tema si es necesario cambiar su clase.

    // --- 2. Selección de Elementos para Cambio de Idioma ---
    const languageToggleButton = document.getElementById('language-toggle');
    // El span que muestra el idioma actual (ej. <span class="lang-label-icon">ES</span>)
    // Lo seleccionaremos dentro de la función de cambio de idioma.

    // --- 3. Selección de Elementos para el Menú Desplegable de Configuración (Navbar) ---
    const settingsTriggerButton = document.querySelector('.settings-trigger-button');
    const settingsDropdownMenu = document.querySelector('.settings-dropdown-menu');

    // --- 4. Selección de Elementos para el Menú de Navegación Móvil (Hamburguesa) ---
    const menuToggleButton = document.querySelector('.menu-toggle');
    const navLinksList = document.getElementById('nav-links-list'); // El <ul> de los enlaces

    // --- 5. Selección de Elementos para Funcionalidades Adicionales ---
    const backToTopButton = document.querySelector('.back-to-top');
    const currentYearSpan = document.getElementById('current-year');

    // --- 6. Selección de Elementos para Animaciones (Scroll y Barras de Progreso) ---
    // Estos los usaremos en partes posteriores, pero es bueno tenerlos identificados.
    const animatedElementsOnScroll = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    const skillLevelBars = document.querySelectorAll('.level-bar'); // Las barras de progreso

    // --- Comprobación Inicial (Opcional, para depuración) ---
    // Es una buena práctica verificar si los elementos críticos fueron seleccionados.
    if (!themeToggleButton) console.error("Error: Botón de tema no encontrado.");
    if (!languageToggleButton) console.error("Error: Botón de idioma no encontrado.");
    if (!menuToggleButton) console.error("Error: Botón de menú móvil no encontrado.");
    if (!navLinksList) console.error("Error: Lista de enlaces de navegación móvil no encontrada.");

    // --- Variables de Estado Inicial (si son necesarias globalmente en este script) ---
    // Por ejemplo, podríamos querer leer el tema o idioma iniciales desde el HTML
    // let currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    // let currentLang = htmlElement.getAttribute('data-lang') || 'es';

    // En las siguientes partes, empezaremos a añadir los event listeners y funciones
    // a estos elementos seleccionados.

    console.log("Elementos del DOM seleccionados. Listo para las siguientes partes.");

 /* === JAVASCRIPT - PARTE 2 DE 10: FUNCIONALIDAD DE CAMBIO DE TEMA === */

    if (themeToggleButton) {
        const themeToggleIcon = themeToggleButton.querySelector('i'); // Selecciona el ícono <i> dentro del botón
        const K_THEME_STORAGE_KEY = 'portfolio-theme-preference';

        // 1. Función para aplicar el tema y actualizar el ícono
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                htmlElement.setAttribute('data-theme', 'dark');
                if (themeToggleIcon) {
                    themeToggleIcon.classList.remove('fa-moon');
                    themeToggleIcon.classList.add('fa-sun');
                }
                themeToggleButton.setAttribute('aria-label', 'Cambiar a tema claro');
                themeToggleButton.setAttribute('title', 'Cambiar a tema claro');
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                if (themeToggleIcon) {
                    themeToggleIcon.classList.remove('fa-sun');
                    themeToggleIcon.classList.add('fa-moon');
                }
                themeToggleButton.setAttribute('aria-label', 'Cambiar a tema oscuro');
                themeToggleButton.setAttribute('title', 'Cambiar a tema oscuro');
            }
        };

        // 2. Obtener la preferencia de tema guardada o usar el valor por defecto del HTML
        const storedTheme = localStorage.getItem(K_THEME_STORAGE_KEY);
        const initialTheme = storedTheme ? storedTheme : (htmlElement.getAttribute('data-theme') || 'light');

        // 3. Aplicar el tema inicial al cargar la página
        applyTheme(initialTheme);
        console.log(`Tema inicial aplicado: ${initialTheme}`);

        // 4. Event Listener para el botón de cambio de tema
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            applyTheme(newTheme); // Aplicar el nuevo tema y actualizar el ícono
            localStorage.setItem(K_THEME_STORAGE_KEY, newTheme); // Guardar la preferencia

            console.log(`Tema cambiado a: ${newTheme}`);
        });

    } else {
        console.warn("El botón de cambio de tema (#theme-toggle) no fue encontrado en el DOM.");
    }

    // --- Fin del código de la Parte 2 ---

/* === JAVASCRIPT - PARTE 3 DE 10: FUNCIONALIDAD DE CAMBIO DE IDIOMA === */

    if (languageToggleButton) {
        const langLabelIcon = languageToggleButton.querySelector('.lang-label-icon'); // El "ES" o "EN"
        const langDropdownText = languageToggleButton.querySelector('.dropdown-text'); // El texto "Idioma" o "Language"
        const K_LANG_STORAGE_KEY = 'portfolio-language-preference';

        // 1. Objeto de Traducciones (DEBES EXPANDIR ESTO SIGNIFICATIVAMENTE)
        // Necesitarás añadir selectores o IDs a tus elementos HTML para poder actualizarlos fácilmente.
        // O usar atributos "data-translate-key" en tus elementos HTML.
        const translations = {
            es: {
                // Para el botón de idioma en el desplegable
                langToggleText: "ES",
                langDropdownLabel: "Idioma",
                langToggleButtonAria: "Cambiar a Inglés",
                // Para el botón de tema en el desplegable
                themeDropdownLabel: "Tema",
                // Título de la página
                pageTitle: "Jean Uribe | Portafolio de Analista de Datos",
                // Navbar (ejemplos, necesitarás selectores o data-attributes)
                navHome: "Inicio",
                navAbout: "Sobre Mí",
                navProjects: "Proyectos",
                navCV: "CV",
                // Hero Section (ejemplos)
                heroTitle: "Jean Uribe", // Los nombres propios usualmente no cambian
                heroSubtitle: "Analista de Datos & Desarrollador",
                heroDescription: "Transformo datos complejos en insights accionables y soluciones data-driven, combinando análisis riguroso con una presentación clara y efectiva.",
                heroBtnProjects: "Ver Mis Proyectos",
                heroBtnContact: "Contactarme",
                // ... y así sucesivamente para CADA texto en CADA sección ...
                // Section Titles
                aboutSectionTitle: "Sobre <span class=\"highlight\">Mí</span>",
                projectsSectionTitle: "Proyectos <span class=\"highlight\">Destacados</span>",
                experienceSectionTitle: "Experiencia <span class=\"highlight\">Profesional</span>",
                skillsSectionTitle: "Mis <span class=\"highlight\">Habilidades</span>",
                contactSectionTitle: "Contáct<span class=\"highlight\">ame</span>",

            },
            en: {
                // Para el botón de idioma en el desplegable
                langToggleText: "EN",
                langDropdownLabel: "Language",
                langToggleButtonAria: "Switch to Spanish",
                // Para el botón de tema en el desplegable
                themeDropdownLabel: "Theme",
                // Título de la página
                pageTitle: "Jean Uribe | Data Analyst Portfolio",
                // Navbar
                navHome: "Home",
                navAbout: "About Me",
                navProjects: "Projects",
                navCV: "Resume",
                // Hero Section
                heroTitle: "Jean Uribe",
                heroSubtitle: "Data Analyst & Developer",
                heroDescription: "I transform complex data into actionable insights and data-driven solutions, combining rigorous analysis with clear and effective presentation.",
                heroBtnProjects: "View My Projects",
                heroBtnContact: "Contact Me",
                // ...
                // Section Titles
                aboutSectionTitle: "About <span class=\"highlight\">Me</span>",
                projectsSectionTitle: "Featured <span class=\"highlight\">Projects</span>",
                experienceSectionTitle: "Professional <span class=\"highlight\">Experience</span>",
                skillsSectionTitle: "My <span class=\"highlight\">Skills</span>",
                contactSectionTitle: "Contact <span class=\"highlight\">Me</span>",
            }
        };

        // 2. Función para aplicar el idioma y actualizar los textos
        const applyLanguage = (lang) => {
            if (!translations[lang]) {
                console.error(`Idioma ${lang} no encontrado en las traducciones.`);
                return;
            }

            htmlElement.setAttribute('lang', lang); // Actualiza el atributo lang del HTML
            htmlElement.setAttribute('data-lang', lang); // Actualiza nuestro atributo data-lang

            // Actualizar el botón de idioma
            if (langLabelIcon) langLabelIcon.textContent = translations[lang].langToggleText;
            if (langDropdownText) langDropdownText.textContent = translations[lang].langDropdownLabel;
            languageToggleButton.setAttribute('aria-label', translations[lang].langToggleButtonAria);
            languageToggleButton.setAttribute('title', translations[lang].langToggleButtonAria);

            // Actualizar el texto del botón de tema en el desplegable (si existe y tiene la clase)
            const themeDropdownTextEl = themeToggleButton ? themeToggleButton.querySelector('.dropdown-text') : null;
            if (themeDropdownTextEl && translations[lang].themeDropdownLabel) {
                themeDropdownTextEl.textContent = translations[lang].themeDropdownLabel;
            }
            
            // Actualizar título de la página
            document.title = translations[lang].pageTitle;

            // Actualizar textos específicos usando selectores (DEBES PERSONALIZAR ESTO)
            // Es más robusto usar atributos data-translate-key en el HTML.
            // Ejemplo con selectores directos (menos mantenible para muchos textos):
            const updateText = (selector, textKey, isHTML = false) => {
                const element = document.querySelector(selector);
                if (element && translations[lang][textKey] !== undefined) {
                    if (isHTML) {
                        element.innerHTML = translations[lang][textKey];
                    } else {
                        element.textContent = translations[lang][textKey];
                    }
                } else if (element === null && (selector.startsWith('.') || selector.startsWith('#'))) {
                    // console.warn(`Elemento no encontrado para traducción: ${selector}`);
                }
            };
            
            // Navbar
            updateText('.nav-links .nav-item:nth-child(1) .nav-link', 'navHome');
            updateText('.nav-links .nav-item:nth-child(2) .nav-link', 'navAbout');
            updateText('.nav-links .nav-item:nth-child(3) .nav-link', 'navProjects');
            updateText('.nav-links .nav-link.cv-link', 'navCV');
            // Hero
            updateText('.hero-title', 'heroTitle');
            updateText('.hero-subtitle', 'heroSubtitle');
            updateText('.hero-description', 'heroDescription');
            updateText('.hero-buttons a:nth-child(1)', 'heroBtnProjects'); // Asume orden
            updateText('.hero-buttons a:nth-child(2)', 'heroBtnContact');  // Asume orden

            // Section Titles (usando innerHTML por el <span>)
            updateText('#sobre-mi .section-title', 'aboutSectionTitle', true);
            updateText('#proyectos .section-title', 'projectsSectionTitle', true);
            updateText('#experiencia .section-title', 'experienceSectionTitle', true);
            updateText('#habilidades .section-title', 'skillsSectionTitle', true);
            updateText('#contacto .section-title', 'contactSectionTitle', true);


            // TODO: Añade aquí llamadas a updateText para TODOS los demás elementos textuales
            // que necesiten traducción, usando selectores CSS precisos o, idealmente,
            // implementando un sistema con atributos `data-translate-key`.
            // Por ejemplo:
            // document.querySelectorAll('[data-translate-key]').forEach(el => {
            //    const key = el.dataset.translateKey;
            //    if (translations[lang][key]) {
            //        el.textContent = translations[lang][key];
            //    }
            // });
            // Y en tu HTML: <h1 data-translate-key="heroTitle">Jean Uribe</h1>

            console.log(`Idioma aplicado: ${lang}`);
        };

        // 3. Obtener la preferencia de idioma guardada o usar el valor por defecto del HTML
        const storedLang = localStorage.getItem(K_LANG_STORAGE_KEY);
        const initialLang = storedLang ? storedLang : (htmlElement.getAttribute('data-lang') || 'es');

        // 4. Aplicar el idioma inicial al cargar la página
        applyLanguage(initialLang);

        // 5. Event Listener para el botón de cambio de idioma
        languageToggleButton.addEventListener('click', () => {
            const currentLang = htmlElement.getAttribute('data-lang');
            const newLang = currentLang === 'es' ? 'en' : 'es';

            applyLanguage(newLang); // Aplicar el nuevo idioma y actualizar textos
            localStorage.setItem(K_LANG_STORAGE_KEY, newLang); // Guardar la preferencia
        });

    } else {
        console.warn("El botón de cambio de idioma (#language-toggle) no fue encontrado en el DOM.");
    }

    // --- Fin del código de la Parte 3 ---

    /* === JAVASCRIPT - PARTE 4 DE 10: MENÚ DE NAVEGACIÓN MÓVIL === */

// Asegúrate de que este código esté dentro del addEventListener('DOMContentLoaded', () => { ... });
// y que las variables menuToggleButton y navLinksList ya estén definidas como en la Parte 1.

// Ejemplo de cómo estaría estructurado:
// document.addEventListener('DOMContentLoaded', () => {
//     // ...selectores de la Parte 1...
//     const menuToggleButton = document.querySelector('.menu-toggle');
//     const navLinksList = document.getElementById('nav-links-list');
//     // ...código de la Parte 2 (Tema)...
//     // ...código de la Parte 3 (Idioma)...

    // --- Inicio del código de la Parte 4 ---

    if (menuToggleButton && navLinksList) {
        const toggleMobileMenu = () => {
            const isMenuOpen = menuToggleButton.classList.contains('open');

            menuToggleButton.classList.toggle('open');
            navLinksList.classList.toggle('open');

            if (!isMenuOpen) { // Si se está abriendo el menú
                menuToggleButton.setAttribute('aria-expanded', 'true');
                // Opcional: Atrapar el foco dentro del menú (más avanzado)
                // navLinksList.querySelector('a').focus(); // Poner foco en el primer enlace
            } else { // Si se está cerrando el menú
                menuToggleButton.setAttribute('aria-expanded', 'false');
                // Opcional: Devolver el foco al botón de hamburguesa
                // menuToggleButton.focus();
            }
        };

        // 1. Event Listener para el botón de hamburguesa
        menuToggleButton.addEventListener('click', () => {
            toggleMobileMenu();
            console.log("Menú móvil alternado.");
        });

        // 2. Cerrar el menú móvil al hacer clic en un enlace de navegación
        // Esto es útil para SPAs o páginas con navegación a secciones (#)
        const navLinksInMenu = navLinksList.querySelectorAll('a.nav-link'); // Seleccionar solo los enlaces de navegación principales
        
        navLinksInMenu.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cerrar si el menú está efectivamente abierto (visible en móvil)
                if (navLinksList.classList.contains('open')) {
                    toggleMobileMenu();
                    console.log("Menú móvil cerrado por clic en enlace.");
                }
            });
        });

        // 3. (Opcional pero recomendado) Cerrar el menú móvil al presionar la tecla "Escape"
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinksList.classList.contains('open')) {
                toggleMobileMenu();
                console.log("Menú móvil cerrado con tecla Escape.");
            }
        });

        // 4. (Opcional pero recomendado) Cerrar el menú al hacer clic fuera de él
        // Esto es un poco más complejo porque hay que evitar que se cierre si se hace clic en el propio botón de toggle
        document.addEventListener('click', (event) => {
            // Verificar que el menú esté abierto y que el clic no sea en el menú ni en el botón que lo abre
            if (navLinksList.classList.contains('open') && 
                !navLinksList.contains(event.target) && 
                !menuToggleButton.contains(event.target)) {
                
                // Asegurarse de no interferir si se hace clic en el botón de tema/idioma si está visible y fuera del navLinksList
                // (esto depende de cómo se implemente la visibilidad de esos botones en móvil)
                // Para la estructura actual donde el settings-dropdown está en la navbar, este no sería un problema.
                
                // toggleMobileMenu(); // Comentado por ahora para evitar complejidad, pero es una buena mejora UX.
                // console.log("Menú móvil cerrado por clic fuera.");
            }
        });


    } else {
        if (!menuToggleButton) console.warn("El botón de menú móvil (.menu-toggle) no fue encontrado.");
        if (!navLinksList) console.warn("La lista de enlaces de navegación (#nav-links-list) no fue encontrada.");
    }

    // --- Fin del código de la Parte 4 ---



    /* === JAVASCRIPT - PARTE 5 DE 10: MENÚ DESPLEGABLE DE CONFIGURACIÓN EN NAVBAR === */

// Asegúrate de que este código esté dentro del addEventListener('DOMContentLoaded', () => { ... });
// y que las variables settingsTriggerButton y settingsDropdownMenu ya estén definidas
// como en la Parte 1 de JS.
// También las variables themeToggleButton y languageToggleButton (para cerrar el menú al hacer clic en ellas).

// Ejemplo de cómo estaría estructurado:
// document.addEventListener('DOMContentLoaded', () => {
//     // ...selectores de la Parte 1...
//     const settingsTriggerButton = document.querySelector('.settings-trigger-button');
//     const settingsDropdownMenu = document.querySelector('.settings-dropdown-menu');
//     const themeToggleButton = document.getElementById('theme-toggle'); // Ya seleccionado
//     const languageToggleButton = document.getElementById('language-toggle'); // Ya seleccionado
//     // ...código de la Parte 2 (Tema)...
//     // ...código de la Parte 3 (Idioma)...
//     // ...código de la Parte 4 (Menú Móvil)...

    // --- Inicio del código de la Parte 5 ---

    if (settingsTriggerButton && settingsDropdownMenu) {
        const toggleSettingsDropdown = (forceOpen = null) => {
            const isOpen = forceOpen !== null ? forceOpen : settingsTriggerButton.getAttribute('aria-expanded') === 'false';
            
            settingsTriggerButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            // El CSS ya maneja la visibilidad del dropdown basado en aria-expanded y hover.
            // Si quisiéramos una clase adicional para JS:
            // settingsDropdownMenu.classList.toggle('open', isOpen);

            if (isOpen) {
                // Opcional: Mover el foco al primer elemento del menú
                const firstItemInDropdown = settingsDropdownMenu.querySelector('button, a');
                if (firstItemInDropdown) {
                    // Pequeño delay para asegurar que el menú sea visible antes de enfocar
                    setTimeout(() => firstItemInDropdown.focus(), 0);
                }
                console.log("Menú de configuración abierto.");
            } else {
                console.log("Menú de configuración cerrado.");
            }
        };

        // 1. Event Listener para el botón que dispara el menú (engranaje)
        settingsTriggerButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevenir que el clic se propague al listener del 'document' (para cerrar al clic fuera)
            toggleSettingsDropdown();
        });

        // 2. Cerrar el menú desplegable si se hace clic en una de sus opciones
        const closeDropdownOnOptionClick = () => {
            if (settingsTriggerButton.getAttribute('aria-expanded') === 'true') {
                toggleSettingsDropdown(false); // Forzar cierre
                settingsTriggerButton.focus(); // Devolver el foco al botón que lo abrió
            }
        };

        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', closeDropdownOnOptionClick);
        }
        if (languageToggleButton) {
            languageToggleButton.addEventListener('click', closeDropdownOnOptionClick);
        }

        // 3. Cerrar el menú desplegable al presionar la tecla "Escape"
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && settingsTriggerButton.getAttribute('aria-expanded') === 'true') {
                toggleSettingsDropdown(false); // Forzar cierre
                settingsTriggerButton.focus(); // Devolver el foco
                console.log("Menú de configuración cerrado con tecla Escape.");
            }
        });

        // 4. Cerrar el menú desplegable al hacer clic fuera de él
        document.addEventListener('click', (event) => {
            if (settingsTriggerButton.getAttribute('aria-expanded') === 'true' &&
                !settingsDropdownMenu.contains(event.target) &&
                !settingsTriggerButton.contains(event.target)) {
                toggleSettingsDropdown(false); // Forzar cierre
                // No es necesario devolver el foco aquí, ya que el usuario hizo clic en otro lugar
                console.log("Menú de configuración cerrado por clic fuera.");
            }
        });

        // Prevenir que clics dentro del dropdown lo cierren (si el listener del document es muy general)
        settingsDropdownMenu.addEventListener('click', (event) => {
            event.stopPropagation();
        });


    } else {
        if (!settingsTriggerButton) console.warn("El botón disparador del menú de configuración (.settings-trigger-button) no fue encontrado.");
        if (!settingsDropdownMenu) console.warn("El menú desplegable de configuración (.settings-dropdown-menu) no fue encontrado.");
    }

    // --- Fin del código de la Parte 5 ---



    /* === JAVASCRIPT - PARTE 6 DE 10: FUNCIONALIDAD BOTÓN "VOLVER ARRIBA" === */

    // --- Inicio del código de la Parte 6 ---

    if (backToTopButton) {
        // 1. Función para mostrar/ocultar el botón basado en el scroll
        const toggleBackToTopButton = () => {
            // Puedes ajustar el valor '200' (píxeles) según cuánto scroll quieres
            // antes de que aparezca el botón.
            if (window.scrollY > 200) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        // 2. Event Listener para el evento de scroll en la ventana
        window.addEventListener('scroll', toggleBackToTopButton);

        // 3. Event Listener para el clic en el botón "Volver Arriba"
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevenir comportamiento por defecto si fuera un <a>

            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Desplazamiento suave
            });
            console.log("Botón 'Volver Arriba' clickeado, scroll hacia arriba.");
        });

        // Llamar una vez al cargar para establecer el estado inicial correcto
        // (en caso de que la página se cargue ya con scroll)
        toggleBackToTopButton();

    } else {
        console.warn("El botón 'Volver Arriba' (.back-to-top) no fue encontrado en el DOM.");
    }

    // --- Fin del código de la Parte 6 ---



/* === JAVASCRIPT - PARTE 7 DE 10: COPYRIGHT DINÁMICO Y ANIMACIONES AL SCROLL === */

// Asegúrate de que este código esté dentro del addEventListener('DOMContentLoaded', () => { ... });
// y que las variables currentYearSpan, animatedElementsOnScroll, y skillLevelBars
// ya estén definidas como en la Parte 1.

// Ejemplo de cómo estaría estructurado:
// document.addEventListener('DOMContentLoaded', () => {
//     // ...selectores de la Parte 1...
//     const currentYearSpan = document.getElementById('current-year');
//     const animatedElementsOnScroll = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
//     const skillLevelBars = document.querySelectorAll('.level-bar'); // Barras internas
//     // Necesitaremos los contenedores de las barras para observar:
//     const skillLevelContainers = document.querySelectorAll('.skill-level-container');

//     // ...código de las Partes 2, 3, 4, 5, 6...

    // --- Inicio del código de la Parte 7 ---

    // 1. Actualización Dinámica del Año en el Copyright
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
        console.log(`Año del copyright actualizado a: ${currentYearSpan.textContent}`);
    } else {
        console.warn("Elemento para el año del copyright (#current-year) no encontrado.");
    }

    // 2. Animación de Barras de Habilidad al Entrar en Viewport
    // Seleccionamos los CONTENEDORES de las barras, ya que tienen el data-level
    const skillLevelContainers = document.querySelectorAll('.skill-level-container');

    if (skillLevelContainers.length > 0) {
        const skillBarObserverOptions = {
            root: null, // Observa la intersección con el viewport
            rootMargin: '0px',
            threshold: 0.5 // Activar cuando al menos el 50% del elemento sea visible
        };

        const skillBarObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillContainer = entry.target;
                    const levelBar = skillContainer.querySelector('.level-bar');
                    const targetLevel = skillContainer.dataset.level; // Obtener de data-level

                    if (levelBar && targetLevel) {
                        levelBar.style.width = `${targetLevel}%`;
                        skillContainer.setAttribute('aria-valuenow', targetLevel); // Actualizar ARIA
                        console.log(`Animando barra de habilidad para ${skillContainer.getAttribute('aria-labelledby')} al ${targetLevel}%`);
                        observer.unobserve(skillContainer); // Dejar de observar una vez animado
                    }
                }
            });
        };

        const skillBarObserver = new IntersectionObserver(skillBarObserverCallback, skillBarObserverOptions);
        skillLevelContainers.forEach(container => skillBarObserver.observe(container));
        console.log(`${skillLevelContainers.length} contenedores de barras de habilidad están siendo observados.`);
    } else {
        console.warn("No se encontraron contenedores de barras de habilidad (.skill-level-container).");
    }


    // 3. Animaciones Genéricas "Fade-In-*" al Entrar en Viewport
    // (Usamos la variable animatedElementsOnScroll de la Parte 1)
    if (animatedElementsOnScroll.length > 0) {
        const genericFadeInObserverOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Activar un poco antes de que esté completamente visible desde abajo
            threshold: 0.1 // Activar cuando un 10% sea visible
        };

        const genericFadeInObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Aplicar el delay de la transición desde el data-attribute si existe,
                    // el CSS ya tiene .in-view[data-animation-delay]
                    // No es necesario hacer nada especial aquí para el delay si el CSS está bien configurado.
                    element.classList.add('in-view');
                    console.log("Elemento fade-in ahora visible:", element.classList);
                    observer.unobserve(element); // Dejar de observar una vez animado
                }
            });
        };

        const genericFadeInObserver = new IntersectionObserver(genericFadeInObserverCallback, genericFadeInObserverOptions);
        animatedElementsOnScroll.forEach(element => genericFadeInObserver.observe(element));
        console.log(`${animatedElementsOnScroll.length} elementos con animación fade-in están siendo observados.`);
    } else {
        console.warn("No se encontraron elementos para animación fade-in.");
    }

    // --- Fin del código de la Parte 7 ---


    /* === JAVASCRIPT - PARTE 8 DE 10: VALIDACIÓN FORMULARIO DE CONTACTO Y MENSAJES === */

// Asegúrate de que este código esté dentro del addEventListener('DOMContentLoaded', () => { ... });
// y que las variables del formulario (contactForm, nombreInput, etc.) estén definidas.

// Ejemplo de cómo estaría estructurado:
// document.addEventListener('DOMContentLoaded', () => {
//     // ...selectores de la Parte 1...
//     const contactForm = document.getElementById('contact-form');
//     const nombreInput = document.getElementById('nombre');
//     const emailInput = document.getElementById('email');
//     const mensajeTextarea = document.getElementById('mensaje');
//     const formStatus = document.getElementById('form-status');
//     const submitButton = contactForm ? contactForm.querySelector('.submit-button') : null;
//     // ...código de las Partes 2 a 7...

    // --- Inicio del código de la Parte 8 ---

    if (contactForm && nombreInput && emailInput && mensajeTextarea && formStatus && submitButton) {

        // 1. Función para mostrar mensajes de estado del formulario
        const showFormStatus = (message, type = 'error') => { // 'error' o 'success'
            formStatus.textContent = message;
            formStatus.className = 'form-status'; // Resetear clases
            formStatus.classList.add(type); // Añadir 'success' o 'error'
            formStatus.style.display = 'block'; // Asegurar que sea visible

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                formStatus.style.display = 'none';
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000); // 5 segundos
        };

        // 2. Función para validar un campo individual y aplicar/quitar clases de error/éxito
        const validateField = (field, isValid) => {
            if (isValid) {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            } else {
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            }
        };

        // 3. Función para validar el email con una expresión regular simple
        const isValidEmail = (email) => {
            // Expresión regular simple para validación básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(String(email).toLowerCase());
        };

        // 4. Función principal de validación del formulario
        const validateContactForm = () => {
            let isValid = true;

            // Validar Nombre
            const nombreValue = nombreInput.value.trim();
            if (nombreValue === '' || nombreValue.length < 2) {
                validateField(nombreInput, false);
                isValid = false;
            } else {
                validateField(nombreInput, true);
            }

            // Validar Email
            const emailValue = emailInput.value.trim();
            if (emailValue === '' || !isValidEmail(emailValue)) {
                validateField(emailInput, false);
                isValid = false;
            } else {
                validateField(emailInput, true);
            }

            // Validar Mensaje
            const mensajeValue = mensajeTextarea.value.trim();
            if (mensajeValue === '' || mensajeValue.length < 10) {
                validateField(mensajeTextarea, false);
                isValid = false;
            } else {
                validateField(mensajeTextarea, true);
            }

            return isValid;
        };

        // 5. Event Listener para el envío del formulario
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevenir el envío real del formulario

            // Deshabilitar botón temporalmente para evitar múltiples envíos
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';


            if (validateContactForm()) {
                // Simulación de envío exitoso
                setTimeout(() => {
                    showFormStatus('¡Mensaje enviado con éxito! (Simulación)', 'success');
                    contactForm.reset(); // Limpiar el formulario
                    // Quitar clases de validación de los campos
                    [nombreInput, emailInput, mensajeTextarea].forEach(field => {
                        field.classList.remove('is-valid', 'is-invalid');
                    });
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    console.log("Formulario validado y 'enviado' (simulación).");
                }, 1500); // Simular un pequeño delay de red
            } else {
                showFormStatus('Por favor, corrige los errores resaltados en el formulario.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                console.log("Validación del formulario fallida.");
                // Opcional: poner el foco en el primer campo inválido
                const firstInvalidField = contactForm.querySelector('.is-invalid');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
            }
        });

        // Opcional: Limpiar clases de validación al empezar a escribir de nuevo (on input)
        [nombreInput, emailInput, mensajeTextarea].forEach(field => {
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    // Podrías re-validar en tiempo real o simplemente quitar la clase de error
                    // Para simplificar, solo quitamos la clase hasta el próximo submit
                    field.classList.remove('is-invalid');
                    // field.classList.remove('is-valid'); // También quitar la de válido
                }
                // Quitar el mensaje de estado general si el usuario empieza a corregir
                if (formStatus.style.display === 'block') {
                    formStatus.style.display = 'none';
                }
            });
        });


    } else {
        console.warn("Uno o más elementos del formulario de contacto no fueron encontrados.");
    }

    // --- Fin del código de la Parte 8 ---

// }); // Fin del DOMContentLoaded (de la Parte 1)


}); // Fin del DOMContentLoaded

/* === FIN DE JAVASCRIPT - PARTE 1 === */








