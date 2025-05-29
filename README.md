# Data Config Center - FORAGEND 🏥⚛️

**Repositorio centralizado de configuración para FORAGEND**  
*(Sistema de gestión de citas médicas en desarrollo con React + Vite)*

## 🌟 Estado Actual
`EN DESARROLLO ACTIVO` - None  
Última actualización repositorio: 

## 📌 Propósito
Este repositorio alimenta al proyecto principal [FORK - FORAGEND](https://github.com/Elmer-ing/FORAGEND) con:
- Configuraciones públicas para el frontend React
- Catálogos médicos consumidos via API
- Estructuras para i18n (internacionalización)

## 🛠 Compatibilidad
| Componente       | Versión  |
|------------------|----------|
| React            | ^18.2.0  |
| Vite             | ^4.4.0   |
| Node.js          | ^18.x    |

## 🗂 Estructura del Repositorio
```
data_config_center_foragend/
├── config/
│   ├── frontend-config.json  # Opciones UI para React
│   ├── theme-config.json    # ThemeProvider (Tailwind/Chakra)
│   └── feature-flags.json   # Funcionalidades en desarrollo
│
├── resources/
│   ├── medical-specialties.json 
│   └── clinics.json         # Usado en <LocationSearch>
│
└── react-hooks/            # (Próxima versión)
    └── useConfigLoader.js  # Hook para cargar configs
```

## 💡 Ejemplo de Uso en React
```jsx
// En tu componente React + Vite
import medicalData from '../config/medical-specialties.json';

function SpecialtySelector() {
  return (
    <select>
      {medicalData.map(specialty => (
        <option key={specialty.id} value={specialty.id}>
          {specialty.name}
        </option>
      ))}
    </select>
  );
}
```

## 🚀 Integración con Vite
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/config': {
        target: 'https://raw.githubusercontent.com/Elmer-ing/data_config_center_foragend/main',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/config/, '')
      }
    }
  }
});
```

## 📦 Instalación como Módulo
1. Añade como dependencia:
```bash
npm install github:tu-usuario/data_config_center_foragend#main
```

2. Importa configs en tu app:
```javascript
import appConfig from 'data_config_center_foragend/config/app-config.json';
```

## 🛠 Roadmap Técnico
- [x] Fase 1: Estructura base (Q2 2024)
- [ ] Fase 2: Hooks para React (Q3 2024)
- [ ] Fase 3: CLI para validación (Q4 2024)

## 🤝 ¿Cómo Contribuir?
1. Clona ambos repos:
```bash
git clone https://github.com/Elmer-ing/FORAGEND
https://github.com/Elmer-ing/data_config_center_foragend/
```

2. Sincroniza cambios:
```bash
cd foragend
npm run sync-configs  # Script personalizado para actualizar
```

## 📜 Licencia
MIT - Equipo FORAGEND
