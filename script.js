// Script para mejorar la interactividad de la página
document.addEventListener('DOMContentLoaded', function() {
    // Añadir efecto de transición suave a los enlaces
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo aplica a enlaces internos
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Añadir una clase activa al elemento de menú actual basado en la URL
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('main div ul li a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.parentElement.classList.add('active');
        }
    });
});