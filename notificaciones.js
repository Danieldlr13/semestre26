class SistemaNotificaciones {
    constructor() {
        this.init();
    }

    async init() {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                await Notification.requestPermission();
            }
        }
        this.verificarExamenesCercanos();
        this.configurarRecordatorios();
    }

    verificarExamenesCercanos() {
        Object.entries(fechas).forEach(([nombre, fecha]) => {
            const tiempoRestante = fecha.getTime() - Date.now();
            const diasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
            
            // Notificar si faltan 3 días o menos
            if (diasRestantes <= 3 && diasRestantes > 0) {
                this.mostrarNotificacion(
                    'Examen Próximo!',
                    `${nombre}: ${diasRestantes} días restantes`,
                    'warning'
                );
            }
        });
    }

    mostrarNotificacion(titulo, mensaje, tipo = 'info') {
        // Notificación del navegador
        if (Notification.permission === 'granted') {
            new Notification(titulo, {
                body: mensaje,
                icon: 'favicon.ico'
            });
        }

        // Notificación visual en la página
        this.crearNotificacionVisual(titulo, mensaje, tipo);
    }

    crearNotificacionVisual(titulo, mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.innerHTML = `
            <h4>${titulo}</h4>
            <p>${mensaje}</p>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notificacion);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (notificacion.parentElement) {
                notificacion.remove();
            }
        }, 5000);
    }

    configurarRecordatorios() {
        // Verificar cada hora
        setInterval(() => {
            this.verificarExamenesCercanos();
        }, 3600000);
    }
}

// Inicializar sistema de notificaciones
document.addEventListener('DOMContentLoaded', () => {
    new SistemaNotificaciones();
});
