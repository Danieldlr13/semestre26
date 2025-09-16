class SeguimientoProgreso {
    constructor() {
        this.materias = [
            'requisitos', 'bases', 'redes', 'optimizacion', 
            'metodos', 'simulacion', 'apun'
        ];
        this.init();
    }

    init() {
        this.cargarProgreso();
        this.crearWidgetProgreso();
        this.configurarEventos();
    }

    cargarProgreso() {
        this.progreso = JSON.parse(localStorage.getItem('progresoMaterias') || '{}');
        
        // Inicializar materias si no existen
        this.materias.forEach(materia => {
            if (!this.progreso[materia]) {
                this.progreso[materia] = {
                    examenes: 0,
                    examenesTotal: 0,
                    tareas: 0,
                    tareasTotal: 0,
                    asistencia: 0,
                    asistenciaTotal: 0
                };
            }
        });
    }

    guardarProgreso() {
        localStorage.setItem('progresoMaterias', JSON.stringify(this.progreso));
    }

    crearWidgetProgreso() {
        const widget = document.createElement('div');
        widget.id = 'widget-progreso';
        widget.innerHTML = `
            <h3>📊 Progreso General</h3>
            <div id="resumen-progreso"></div>
            <button id="btn-detalles">Ver Detalles</button>
        `;
        
        // Insertar después del header
        const header = document.querySelector('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(widget, header.nextSibling);
        }
        
        this.actualizarWidget();
    }

    actualizarWidget() {
        const resumen = document.getElementById('resumen-progreso');
        if (!resumen) return;

        let totalCompletado = 0;
        let totalItems = 0;

        this.materias.forEach(materia => {
            const p = this.progreso[materia];
            totalCompletado += p.examenes + p.tareas + p.asistencia;
            totalItems += p.examenesTotal + p.tareasTotal + p.asistenciaTotal;
        });

        const porcentaje = totalItems > 0 ? Math.round((totalCompletado / totalItems) * 100) : 0;
        
        resumen.innerHTML = `
            <div class="barra-progreso">
                <div class="progreso-fill" style="width: ${porcentaje}%"></div>
            </div>
            <p>${porcentaje}% Completado (${totalCompletado}/${totalItems})</p>
        `;
    }

    configurarEventos() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'btn-detalles') {
                this.mostrarDetallesProgreso();
            }
        });
    }

    mostrarDetallesProgreso() {
        const modal = document.createElement('div');
        modal.className = 'modal-progreso';
        modal.innerHTML = `
            <div class="modal-contenido">
                <h3>Detalles de Progreso</h3>
                <div id="detalles-materias"></div>
                <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
            </div>
        `;
        
        const detalles = modal.querySelector('#detalles-materias');
        this.materias.forEach(materia => {
            const p = this.progreso[materia];
            const div = document.createElement('div');
            div.innerHTML = `
                <h4>${materia.toUpperCase()}</h4>
                <p>Exámenes: ${p.examenes}/${p.examenesTotal}</p>
                <p>Tareas: ${p.tareas}/${p.tareasTotal}</p>
                <p>Asistencia: ${p.asistencia}/${p.asistenciaTotal}</p>
            `;
            detalles.appendChild(div);
        });
        
        document.body.appendChild(modal);
    }
}

// Inicializar seguimiento
document.addEventListener('DOMContentLoaded', () => {
    new SeguimientoProgreso();
});
