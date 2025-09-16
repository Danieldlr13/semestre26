// Cache de elementos DOM para evitar consultas repetitivas
const elementosContador = {};
let intervalosActivos = [];

// Fechas de los parciales
const fechas = {
    // Requisitos
    parcial3: new Date(new Date().getFullYear(), 5, 17, 0, 0, 0), // 17 de junio
    parcial4: new Date(new Date().getFullYear(), 6, 8, 0, 0, 0),  // 8 de julio
    parcial5: new Date(new Date().getFullYear(), 6, 22, 0, 0, 0), // 22 de julio
    
    // Métodos numéricos
    metodosPractico1: new Date(new Date().getFullYear(), 5, 5, 22, 0, 0), // 5 Junio 22:00
    metodosTeorico2: new Date(new Date().getFullYear(), 5, 16, 0, 0, 0),  // 16 de Junio
    metodosPractico2: new Date(new Date().getFullYear(), 5, 22, 0, 0, 0), // 22 Junio
    metodosTeorico3: new Date(new Date().getFullYear(), 6, 19, 0, 0, 0),  // 19 de Julio
    metodosPractico3: new Date(new Date().getFullYear(), 6, 24, 0, 0, 0), // 24 Julio
    
    // Redes y telecomunicaciones
    redesTaller1: new Date(new Date().getFullYear(), 5, 19, 0, 0, 0),     // 19 de junio
    redesTaller2: new Date(new Date().getFullYear(), 6, 17, 0, 0, 0),     // 17 de julio
    redesExpo: new Date(new Date().getFullYear(), 6, 24, 0, 0, 0),        // 24 de julio
    
    // Optimización heurística
    optimizacionTaller1: new Date(new Date().getFullYear(), 5, 4, 0, 0, 0),  // 4 de Junio
    optimizacionTaller2: new Date(new Date().getFullYear(), 5, 9, 0, 0, 0),  // 9 de Junio
    
    // Simulación de sistemas
    simulacionParcial2: new Date(new Date().getFullYear(), 6, 8, 0, 0, 0),   // 8 JULIO
    simulacionTrabajo: new Date(new Date().getFullYear(), 6, 18, 0, 0, 0)    // 18 DE JULIO
};

// Función optimizada para calcular tiempo restante
function calcularTiempoRestante(fechaObjetivo) {
    const ahora = Date.now(); // Más eficiente que new Date()
    const diferencia = fechaObjetivo.getTime() - ahora;
    
    if (diferencia <= 0) {
        return { texto: "¡Ya llegó!", urgente: false };
    }
    
    const dias = Math.floor(diferencia / 86400000); // 1000 * 60 * 60 * 24
    const horas = Math.floor((diferencia % 86400000) / 3600000); // 1000 * 60 * 60
    const minutos = Math.floor((diferencia % 3600000) / 60000); // 1000 * 60
    
    const texto = `Faltan ${dias} días, ${horas} horas, ${minutos} minutos`;
    const urgente = dias < 2;
    
    return { texto, urgente };
}

// Cache elementos DOM al cargar la página
function inicializarElementos() {
    const ids = [
        'contador-parcial3', 'contador-parcial4', 'contador-parcial5',
        'contador-metodos-practico1', 'contador-metodos-teorico2', 'contador-metodos-practico2',
        'contador-metodos-teorico3', 'contador-metodos-practico3',
        'contador-redes-taller1', 'contador-redes-taller2', 'contador-redes-expo',
        'contador-optimizacion-taller1', 'contador-optimizacion-taller2',
        'contador-simulacion-parcial2', 'contador-simulacion-trabajo'
    ];
    
    ids.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elementosContador[id] = elemento;
        }
    });
}

// Función optimizada para actualizar contadores
function actualizarContador(elementoId, fecha) {
    const elemento = elementosContador[elementoId];
    if (!elemento) return;
    
    const resultado = calcularTiempoRestante(fecha);
    
    // Solo actualizar si el contenido cambió
    if (elemento.textContent !== resultado.texto) {
        elemento.textContent = resultado.texto;
    }
    
    // Solo cambiar color si es necesario
    const colorActual = elemento.style.color;
    const colorNuevo = resultado.urgente ? '#c70a0a' : '';
    if (colorActual !== colorNuevo) {
        elemento.style.color = colorNuevo;
    }
}

function actualizarContadores() {
    // Mapeo optimizado de elementos y fechas
    const contadores = [
        ['contador-parcial3', fechas.parcial3],
        ['contador-parcial4', fechas.parcial4],
        ['contador-parcial5', fechas.parcial5],
        ['contador-metodos-practico1', fechas.metodosPractico1],
        ['contador-metodos-teorico2', fechas.metodosTeorico2],
        ['contador-metodos-practico2', fechas.metodosPractico2],
        ['contador-metodos-teorico3', fechas.metodosTeorico3],
        ['contador-metodos-practico3', fechas.metodosPractico3],
        ['contador-redes-taller1', fechas.redesTaller1],
        ['contador-redes-taller2', fechas.redesTaller2],
        ['contador-redes-expo', fechas.redesExpo],
        ['contador-optimizacion-taller1', fechas.optimizacionTaller1],
        ['contador-optimizacion-taller2', fechas.optimizacionTaller2],
        ['contador-simulacion-parcial2', fechas.simulacionParcial2],
        ['contador-simulacion-trabajo', fechas.simulacionTrabajo]
    ];
    
    // Usar requestAnimationFrame para mejor rendimiento
    requestAnimationFrame(() => {
        contadores.forEach(([elementoId, fecha]) => {
            actualizarContador(elementoId, fecha);
        });
    });
}

// Limpiar intervalos anteriores al cambiar de página
function limpiarIntervalos() {
    intervalosActivos.forEach(intervalo => clearInterval(intervalo));
    intervalosActivos = [];
}

// Inicializar contadores cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarElementos();
    actualizarContadores();
    
    // Limpiar intervalos anteriores
    limpiarIntervalos();
    
    // Crear nuevo intervalo y guardarlo
    const intervalo = setInterval(actualizarContadores, 60000);
    intervalosActivos.push(intervalo);
});

// Limpiar al cambiar de página
window.addEventListener('beforeunload', limpiarIntervalos);
