# 🏥 Data Config Center - FORAGEND ⚛️

**Repositorio centralizado de configuración para [FORAGEND](https://github.com/Elmer-ing/FORAGEND)**

> Sistema web para gestión de citas médicas – desarrollado con React + Vite

---

## ⚠️ Estado del Proyecto

🛠 **EN DESARROLLO ACTIVO**
Última actualización: *(actualízala manualmente o con un script)*

---

## 🎯 Propósito

Este repositorio proporciona **configuraciones públicas** utilizadas por el frontend de FORAGEND:

* Catálogos médicos y clínicos accesibles vía proxy HTTP
* Configuraciones de UI y flags de funcionalidades
* Datos de ejemplo para desarrollo y pruebas

---

## 📂 Estructura del Repositorio

```bash
data_config_center_foragend/
├── config/
│   ├── app-config.json         # Configuración general de la app
│   ├── theme-config.json       # Colores, fuentes, layouts base
│   └── feature-flags.json      # Habilita/deshabilita módulos del frontend
│
├── resources/
│   ├── doctors/
│   │   └── medico-ejemplo.json # Base de datos simulada de médicos
│   ├── horarios/
│   │   └── config.json         # Días hábiles, feriados, turnos
│   ├── usuarios
│   │   └── usuarios-ejemplo.json # Base de datos simulada de usuarios
│   └──data-completa.json
│
└── react-hooks/
    └── useConfigLoader.js      # Hook para cargar JSON remoto (proximamente)
```

> ⚠️ **Importante**: Los datos en `/resources/` son **ficticios** y generados con fines exclusivamente técnicos.

---

## 🚀 Cómo se Integra con FORAGEND (Frontend)

### 1. Proxy vía Vite

El proyecto FORAGEND usa un proxy HTTP para consumir directamente los archivos `.json` desde este repo (hosteado en GitHub):

```js
// vite.config.js en FORAGEND
server: {
  proxy: {
    '/github-config': {
      target: 'https://raw.githubusercontent.com',
      rewrite: (path) =>
        path.replace('/github-config', '/Elmer-ing/data_config_center_foragend/main'),
    },
  },
}
```

**Ejemplo de consumo en frontend:**

```js
fetch('/github-config/resources/doctors/medico-ejemplo.json')
```

---

### 2. Caching Inteligente

El frontend aplica una **estrategia de caché en dos capas**:

1. `sessionStorage`: Lectura rápida si ya se ha consultado.
2. `Service Worker`: Respaldo offline, carga desde cache del navegador.

```js
// En ApiService.js
const cached = sessionStorage.getItem('doctors_cache');
if (cached) return JSON.parse(cached);

const res = await fetch('/github-config/resources/doctors/medico-ejemplo.json');
const data = await res.json();
sessionStorage.setItem('doctors_cache', JSON.stringify(data));
return data;
```

---

## 💡 Ejemplo de Uso en React

```jsx
// SpecialtySelector.jsx
import specialties from '/github-config/resources/medical-specialties.json';

export function SpecialtySelector() {
  return (
    <select>
      {specialties.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}
```

---

## 📦 Instalación como Módulo (opcional)

Puedes consumir directamente este repo como dependencia:

```bash
npm install github:Elmer-ing/data_config_center_foragend#main
```

```js
// Luego en tu app
import appConfig from 'data_config_center_foragend/config/app-config.json';
```

---

## 🗺 Roadmap Técnico

| Fase | Descripción                       | Estado      |
| ---- | --------------------------------- | ----------- |
| 1    | Estructura base + datos simulados | ✅ Hecho     |
| 2    | Hooks de carga dinámica (React)   | 🔄 En curso |
| 3    | CLI para validación de estructura | ⏳ Planeado  |

---

## 🤝 ¿Cómo Contribuir?

1. Clona los dos repos:

   ```bash
   git clone https://github.com/Elmer-ing/FORAGEND
   git clone https://github.com/Elmer-ing/data_config_center_foragend
   ```

2. Usa un script personalizado para sincronizar cambios:

   ```bash
   cd FORAGEND
   npm run sync-configs
   ```

---

## 🔐 Consideraciones de Seguridad

* Este repo no contiene información sensible ni privada.
* Ideal para servir como backend de configuración en aplicaciones JAMStack.

---

## 📜 Licencia

**MIT** — desarrollado por el equipo FORAGEND

