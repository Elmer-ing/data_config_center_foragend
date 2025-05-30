const fs = require('fs');
const path = require('path');

// Configuración
const NUM_DOCTORES = 100;
const OUTPUT_FILE = path.join(__dirname, '../resources/doctors/medico-ejemplo.json');

// Datos para generación realista
const DATA = {
  nombres: {
    femeninos: ['Ana', 'Laura', 'María', 'Sofía', 'Valeria', 'Camila', 'Isabel', 'Patricia', 'Gabriela', 'Daniela'],
    masculinos: ['Carlos', 'Luis', 'José', 'Juan', 'Miguel', 'Roberto', 'Fernando', 'Diego', 'Andrés', 'Javier']
  },
  apellidos: ['García', 'López', 'Martínez', 'González', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores'],
  especialidades: [
    { 
      nombre: "Cardiología", 
      subespecialidades: ["Ecocardiografía", "Hemodinamia", "Arritmias"] 
    },
    { 
      nombre: "Pediatría", 
      subespecialidades: ["Neonatología", "Cardiología Pediátrica", "Neurología Pediátrica"] 
    },
    // ... Añade más especialidades
  ],
  horarios: [
    { dias: ["Lunes", "Miércoles", "Viernes"], horas: ["08:00-12:00", "14:00-18:00"] },
    { dias: ["Martes", "Jueves"], horas: ["07:30-13:00"] },
    { dias: ["Lunes", "Miércoles"], horas: ["15:00-20:00"] }
  ],
  hospitales: [
    "Clínica San Carlos", 
    "Hospital Central", 
    "Centro Médico Los Andes",
    "Instituto Cardiológico"
  ]
};

// Generar datos aleatorios
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generarDoctor(id) {
  const genero = Math.random() > 0.5 ? 'femeninos' : 'masculinos';
  const nombre = randomItem(DATA.nombres[genero]);
  const apellido1 = randomItem(DATA.apellidos);
  const apellido2 = randomItem(DATA.apellidos);
  const especialidad = randomItem(DATA.especialidades);
  const horario = randomItem(DATA.horarios);
  const tieneSubespecialidad = Math.random() > 0.7;

  return {
    id_publico: `DOC-${id.toString().padStart(3, '0')}`,
    nombre_completo: `${genero === 'femeninos' ? 'Dra.' : 'Dr.'} ${nombre} ${apellido1} ${apellido2}`,
    especialidad_principal: especialidad.nombre,
    ...(tieneSubespecialidad && {
      subespecialidad: randomItem(especialidad.subespecialidades)
    }),
    hospital: randomItem(DATA.hospitales),
    horario: `${horario.dias.join("/")} ${horario.horas.join(" y ")}`,
    contacto: {
      telefono: `+51 ${Math.floor(900000000 + Math.random() * 100000000)}`,
      email: `${nombre.toLowerCase()}.${apellido1.toLowerCase()}@${randomItem(["clinic.org", "medicenter.pe"])}`
    },
    metadata: {
      generado_el: new Date().toISOString(),
      ultima_actualizacion: null
    }
  };
}

// Generar el archivo JSON
const doctores = {
  meta: {
    total: NUM_DOCTORES,
    version: "2.0.0",
    fecha_generacion: new Date().toISOString()
  },
  doctores: Array.from({ length: NUM_DOCTORES }, (_, i) => generarDoctor(i + 1))
};

// Guardar archivo
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(doctores, null, 2));
console.log(`✅ ${NUM_DOCTORES} doctores generados en ${OUTPUT_FILE}`);

// Opcional: Generar CSV para Excel
const csvHeader = "ID,Nombre,Especialidad,Hospital,Horario,Email";
const csvContent = doctores.doctores.map(d => 
  `"${d.id_publico}","${d.nombre_completo}","${d.especialidad_principal}","${d.hospital}","${d.horario}","${d.contacto.email}"`
).join('\n');

fs.writeFileSync(OUTPUT_FILE.replace('.json', '.csv'), `${csvHeader}\n${csvContent}`);
console.log(`📊 CSV generado en ${OUTPUT_FILE.replace('.json', '.csv')}`);
