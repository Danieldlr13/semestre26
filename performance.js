// Optimizaciones de rendimiento

// Lazy loading para imágenes
function implementarLazyLoading() {
    const imagenes = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        imagenes.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin soporte
        imagenes.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Debounce para eventos que se ejecutan frecuentemente
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimizar eventos de resize
const optimizedResize = debounce(() => {
    // Cualquier lógica de resize aquí
    console.log('Resize optimizado');
}, 250);

// Precargar recursos críticos
function precargarRecursos() {
    const linkPreload = document.createElement('link');
    linkPreload.rel = 'preload';
    linkPreload.href = 'headfooter.css';
    linkPreload.as = 'style';
    document.head.appendChild(linkPreload);
}

// Optimizar scrolling
let ticking = false;
function optimizarScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Lógica de scroll aquí
            ticking = false;
        });
        ticking = true;
    }
}

// Inicializar optimizaciones
document.addEventListener('DOMContentLoaded', () => {
    implementarLazyLoading();
    precargarRecursos();
    
    // Eventos optimizados
    window.addEventListener('resize', optimizedResize);
    window.addEventListener('scroll', optimizarScroll, { passive: true });
});
