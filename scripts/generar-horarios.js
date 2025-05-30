const fs = require('fs');
const path = require('path');

// Configuración
const OUTPUT_DIR = path.join(__dirname, '../resources/horarios');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'config.json');
const DIAS_DESCANSO = ['Domingo']; // ¡Configura esto! Ej: ['Domingo', 'Lunes']
const HORARIO_BASE = {
  apertura: '08:00',
  cierre: '18:00',
  duracion_cita: 30 // minutos
};

// Crear directorio si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generar horarios realistas
function generarHorarios() {
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const horarios = [];

  diasSemana.forEach(dia => {
    if (!DIAS_DESCANSO.includes(dia)) {
      // Horario estándar
      horarios.push({
        dia,
        tipo: 'horario_normal',
        bloques: [
          {
            inicio: HORARIO_BASE.apertura,
            fin: '12:00',
            tipo: 'mañana'
          },
          {
            inicio: '14:00',
            fin: HORARIO_BASE.cierre,
            tipo: 'tarde'
          }
        ],
        citas_por_bloque: Math.floor(240 / HORARIO_BASE.duracion_cita) // 4 horas / duración
      });
    } else {
      // Día de descanso
      horarios.push({
        dia,
        tipo: 'descanso',
        observacion: 'Cerrado por día de descanso programado'
      });
    }
  });

  return {
    configuracion: {
      dias_descanso: DIAS_DESCANSO,
      ...HORARIO_BASE,
      ultima_actualizacion: new Date().toISOString()
    },
    horarios
  };
}

// Guardar archivo
const data = generarHorarios();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`✅ Horarios generados en: ${OUTPUT_FILE}`);
console.log(`📅 Días de descanso: ${DIAS_DESCANSO.join(', ')}`);
