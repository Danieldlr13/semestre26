class SistemaNotas {
    constructor() {
        this.notas = JSON.parse(localStorage.getItem('notasEstudiante') || '[]');
        this.init();
    }

    init() {
        this.crearBotonNotas();
        this.configurarEventos();
    }

    crearBotonNotas() {
        const boton = document.createElement('button');
        boton.id = 'btn-notas';
        boton.innerHTML = '📝 Notas';
        boton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background:rgb(33, 142, 129);
            color: white;
            border: none;
            border-radius: 50px;
            margin-top:10px;
            // padding: 15px 20px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(boton);
    }

    configurarEventos() {
        document.addEventListener('click', (e) => {
            if (e.target.id === 'btn-notas') {
                this.abrirVentanaNotas();
            }
        });
    }

    abrirVentanaNotas() {
        const modal = document.createElement('div');
        modal.className = 'modal-notas';
        modal.innerHTML = `
            <div class="ventana-notas">
                <div class="header-notas">
                    <h3>📝 Mis Notas</h3>
                    <button id="cerrar-notas">×</button>
                </div>
                <div class="contenido-notas">
                    <div class="nueva-nota">
                        <input type="text" id="titulo-nota" placeholder="Título de la nota...">
                        <textarea id="contenido-nota" placeholder="Escribe tu nota aquí..."></textarea>
                        <div class="acciones-nota">
                            <select id="categoria-nota">
                                <option value="general">General</option>
                                <option value="examen">Parcial</option>
                                <option value="tarea">Trabajo</option>
                                <option value="recordatorio">Recordatorio</option>
                            </select>
                            <button id="guardar-nota">Guardar</button>
                        </div>
                    </div>
                    <div class="lista-notas" id="lista-notas"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.cargarNotas();
        this.configurarEventosModal(modal);
    }

    cargarNotas() {
        const lista = document.getElementById('lista-notas');
        if (!lista) return;

        lista.innerHTML = '';
        
        this.notas.forEach((nota, index) => {
            const div = document.createElement('div');
            div.className = `nota nota-${nota.categoria}`;
            div.innerHTML = `
                <div class="nota-header">
                    <h4>${nota.titulo}</h4>
                    <span class="fecha">${new Date(nota.fecha).toLocaleDateString()}</span>
                    <button class="btn-eliminar" data-index="${index}">🗑️</button>
                </div>
                <p>${nota.contenido}</p>
                <span class="categoria">${nota.categoria}</span>
            `;
            lista.appendChild(div);
        });
    }

    configurarEventosModal(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'cerrar-notas' || e.target.classList.contains('modal-notas')) {
                modal.remove();
            }
            
            if (e.target.id === 'guardar-nota') {
                this.guardarNota();
            }
            
            // Manejar eliminación de notas
            if (e.target.classList.contains('btn-eliminar')) {
                const index = parseInt(e.target.dataset.index);
                this.eliminarNota(index);
            }
        });
    }

    guardarNota() {
        const titulo = document.getElementById('titulo-nota').value.trim();
        const contenido = document.getElementById('contenido-nota').value.trim();
        const categoria = document.getElementById('categoria-nota').value;

        if (!titulo || !contenido) {
            alert('Por favor completa todos los campos');
            return;
        }

        const nota = {
            titulo,
            contenido,
            categoria,
            fecha: new Date().toISOString()
        };

        this.notas.unshift(nota);
        localStorage.setItem('notasEstudiante', JSON.stringify(this.notas));
        
        // Limpiar formulario
        document.getElementById('titulo-nota').value = '';
        document.getElementById('contenido-nota').value = '';
        
        this.cargarNotas();
    }

    eliminarNota(index) {
        if (confirm('¿Estás seguro de eliminar esta nota?')) {
            this.notas.splice(index, 1);
            localStorage.setItem('notasEstudiante', JSON.stringify(this.notas));
            this.cargarNotas();
        }
    }
}

// Inicializar sistema de notas
document.addEventListener('DOMContentLoaded', () => {
    new SistemaNotas();
});
