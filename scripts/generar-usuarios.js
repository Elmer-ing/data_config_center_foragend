const fs = require('fs');
const path = require('path');

// Configuración
const TOTAL_USUARIOS = 120;
const DOMINIOS = [
  '@foragend.com',
  '@foragend.net',
  '@medicoforagend.com',
  '@doctorforagend.com'
];
const RUTA_SALIDA = path.join(__dirname, '../resources/usuarios/usuarios-ejemplo.json');

// Datos para nombres y apellidos en español
const NOMBRES = [
  'Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Laura', 'Pedro', 'Sofía', 
  'Javier', 'Isabel', 'Miguel', 'Elena', 'David', 'Carmen', 'José', 'Lucía',
  'Daniel', 'Paula', 'Francisco', 'Martina', 'Alejandro', 'Valeria', 'Manuel', 'Adriana'
];

const APELLIDOS = [
  'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez',
  'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno',
  'Álvarez', 'Muñoz', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez'
];

// Función para obtener un elemento aleatorio de un array
function aleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Función para generar nombre de usuario semi-realista
function generarUsername(nombre, apellido) {
  const estrategias = [
    `${nombre.toLowerCase()}${apellido.toLowerCase()}`,
    `${nombre.toLowerCase()}.${apellido.toLowerCase()}`,
    `${nombre.charAt(0).toLowerCase()}${apellido.toLowerCase()}`,
    `${nombre.toLowerCase()}${Math.floor(Math.random() * 90) + 10}`,
    `${nombre.toLowerCase()}_${apellido.toLowerCase()}`,
    `${nombre.toLowerCase()}${apellido.charAt(0).toLowerCase()}${Math.floor(Math.random() * 90) + 10}`
  ];
  
  return aleatorio(estrategias);
}

// Función para generar un usuario
function generarUsuario(id) {
  const nombre = aleatorio(NOMBRES);
  const apellido = aleatorio(APELLIDOS);
  const username = generarUsername(nombre, apellido);
  const dominio = aleatorio(DOMINIOS);
  const email = `${username}${dominio}`;
  
  return {
    id,
    nombre,
    apellido,
    username,
    email
  };
}

// Función principal
function main() {
  console.log(`Generando ${TOTAL_USUARIOS} usuarios...`);
  
  // Crear directorio si no existe
  const directorio = path.dirname(RUTA_SALIDA);
  if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio, { recursive: true });
    console.log(`Directorio creado: ${directorio}`);
  }
  
  // Generar usuarios
  const usuarios = [];
  for (let i = 1; i <= TOTAL_USUARIOS; i++) {
    usuarios.push(generarUsuario(i));
    process.stdout.write(`\rGenerados: ${i}/${TOTAL_USUARIOS} usuarios`);
  }
  
  // Escribir archivo JSON
  fs.writeFileSync(RUTA_SALIDA, JSON.stringify(usuarios, null, 2), 'utf-8');
  
  console.log(`\n\nArchivo generado con éxito: ${RUTA_SALIDA}`);
  console.log(`Total de usuarios: ${TOTAL_USUARIOS}`);
}

// Ejecutar
main();
