# Product Requirements Document (PRD)

## Pace - Página Web Romántica

**Versión del documento:** 1.0  
**Fecha de creación:** 2026-02-28  
**Estado:** Activo  
**Propiedad:** Proyecto Personal  

---

## 1. Resumen Ejecutivo

### 1.1 Propósito del Documento

Este Documento de Requisitos del Producto (PRD) establece los requisitos completos para el desarrollo de "Pace", una página web romántica dedicada a celebrar y documentar una relación de pareja. El documento sirve como fuente de verdad para el equipo de desarrollo y stakeholders, definiendo funcionalidades, características técnicas y criterios de aceptación.

### 1.2 Visión del Producto

Pace es una página web minimalista y elegante que funciona como un espacio digital íntimo para almacenar y compartir momentos especiales en pareja. El proyecto prioriza la privacidad del usuario mediante almacenamiento local, eliminando la necesidad de servidores externos o registros. La experiencia está diseñada para ser emotiva, interactiva y visualmente refinada.

### 1.3 Problema que Resuelve

Las soluciones existentes para crear regalos románticos digitales presentan limitaciones significativas: son genéricas y poco personalizables, requieren cuentas o aplicaciones, tienen costos mensuales, o comprometen la privacidad del usuario. Pace resuelve estos problemas ofreciendo una solución gratuita, completamente personalizable, sin necesidad de registro, donde todos los datos permanecen en el dispositivo del usuario.

### 1.4 Propuesta de Valor

- **Para el usuario principal:** Un espacio completamente personalizado y privado para dedicar a su pareja
- **Para la pareja receptora:** Una experiencia emotiva e interactiva que celebra momentos juntos
- **Diferenciador principal:** Simplicidad elegante con almacenamiento local privado (sin servidor externo)

---

## 2. Alcance del Producto

### 2.1 Funcionalidades Incluidas (MVP)

| Módulo | Funcionalidad | Prioridad |
|--------|---------------|-----------|
| Contador de Tiempo | Tiempo juntos en días/horas/minutos/segundos | Alta |
| Mensajes de Amor | Crear, editar, eliminar y favoritar mensajes | Alta |
| Galería de Fotos | Subir, visualizar y organizar fotografías | Alta |
| Fechas Especiales | Lista de fechas importantes con cuenta regresiva | Media |
| Wishlist Compartida | Lista de deseos y metas en pareja | Media |
| Música de Fondo | Reproductor de audio discreto | Baja |

### 2.2 Funcionalidades Excluidas

- Cloud sync o almacenamiento en servidor externo
- Cuentas de usuario y autenticación
- Acceso multiusuario simultáneo
- Monetización o publicidad
- Aplicaciones móviles nativas

### 2.3 Supuestos

- El usuario tiene conocimientos técnicos básicos para configurar la fecha de inicio
- Las imágenes proporcionadas son de alta calidad y apropiadas para uso web
- El dispositivo del usuario tiene al menos 100MB de almacenamiento disponible
- El navegador del usuario soporta HTML5, CSS3 y LocalStorage API

---

## 3. Descripción de Usuarios

### 3.1 Perfil de Usuario Primario

**Usuario: Creador del contenido**

- **Demografía:** Adultos entre 18-45 años
- **Conocimiento técnico:** Básico-intermedio; puede usar un editor de texto y understands conceptos básicos de archivos web
- **Motivación:** Crear un regalo romántico único y significativo para su pareja
- **Frustraciones previas:** Soluciones genéricas, costos ocultos, falta de privacidad, complejidad de uso
- **Dispositivos típicos:** Computadora de escritorio o laptop (configuración inicial), móvil (visualización)

### 3.2 Perfil de Usuario Secundario

**Usuario: Receptor del contenido**

- **Demografía:** Adultos entre 18-45 años
- **Conocimiento técnico:** Básico; navegación web estándar
- **Motivación:** Recibir y disfrutar de un regalo emotivo y personalizado
- **Expectativas:** Experiencia visual atractiva, carga rápida, facilidad de navegación
- **Dispositivo típico:** Móvil o tablet (uso principal)

### 3.3 Mapa de Experiencia de Usuario

```
[Descubrimiento] → [Configuración] → [Primera Visualización] → [Interacción Regular]
     ↓                   ↓                    ↓                      ↓
  Recomendación    Personalización      Sorpresa            Actualización
  de conocidos     básica requerida     emotiva             de contenido
```

---

## 4. Requisitos Funcionales

### 4.1 Contador de Tiempo Juntos

#### RF-001: Visualización del Contador
El sistema debe mostrar el tiempo transcurrido desde la fecha de inicio de la relación en formato legible: "X días, Y horas, Z minutos, W segundos".

**Criterios de aceptación:**
- [ ] El contador se actualiza cada segundo en tiempo real
- [ ] La fecha de inicio es configurable mediante variable en código
- [ ] El formato de visualización es claro y comprensible
- [ ] El contador muestra valores correctos para cualquier fecha de inicio

#### RF-002: Modo Avanzado
El sistema debe ofrecer opción de mostrar también meses y años acumulados.

**Criterios de aceptación:**
- [ ] El usuario puede activar/desactivar la visualización extendida
- [ ] Los cálculos de mes/año son precisos considerando meses variables

#### RF-003: Celebración de Aniversarios
El sistema debe mostrar celebración visual automática en fechas de aniversario (100 días, 1 año, 2 años, etc.).

**Criterios de aceptación:**
- [ ] Se detecta automáticamente cuando se alcanza un hito
- [ ] Se muestra animación de celebración (confeti o similar)
- [ ] La animación no es intrusiva para el usuario

#### RF-004: Cuenta Regresiva
El sistema debe mostrar cuenta regresiva hasta la próxima fecha especial configurada.

**Criterios de aceptación:**
- [ ] Se calcula el tiempo restante hasta la próxima fecha especial
- [ ] Se actualiza en tiempo real
- [ ] Se indica claramente qué fecha especial se acerca

### 4.2 Sistema de Mensajes

#### RF-005: Crear Mensajes
El sistema debe permitir crear nuevos mensajes de amor con fecha automática.

**Criterios de aceptación:**
- [ ] El usuario puede escribir un nuevo mensaje en un campo de texto
- [ ] Cada mensaje recibe automáticamente la fecha de creación
- [ ] El mensaje se guarda en LocalStorage al crear
- [ ] Se muestra retroalimentación visual de confirmación

#### RF-006: Editor de Texto
El sistema debe ofrecer formato básico de texto (negrita, cursiva) y opción de agregar emojis.

**Criterios de aceptación:**
- [ ] El usuario puede aplicar negrita al texto seleccionado
- [ ] El usuario puede aplicar cursiva al texto seleccionado
- [ ] El usuario puede insertar el emoji ❤️ u otros emojis
- [ ] El formato se guarda junto con el mensaje

#### RF-007: Favoritos
El sistema debe permitir marcar mensajes como favoritos y filtrar por favoritos.

**Criterios de aceptación:**
- [ ] El usuario puede marcar/desmarcar un mensaje como favorito
- [ ] Los mensajes favoritos se identifican visualmente
- [ ] El usuario puede filtrar para ver solo favoritos

#### RF-008: Gestión de Mensajes
El sistema debe permitir editar, eliminar y buscar mensajes.

**Criterios de aceptación:**
- [ ] El usuario puede editar un mensaje existente
- [ ] El usuario puede eliminar un mensaje con confirmación previa
- [ ] El usuario puede buscar mensajes por contenido
- [ ] Los mensajes se pueden ordenar por fecha (recientes/antiguos)

### 4.3 Galería de Fotos

#### RF-009: Subir Fotos
El sistema debe permitir agregar nuevas fotografías a la galería.

**Criterios de aceptación:**
- [ ] El usuario puede seleccionar archivos de imagen del dispositivo
- [ ] El usuario puede arrastrar y soltar imágenes (drag & drop)
- [ ] Se valida que solo se acepten archivos de imagen
- [ ] Las imágenes se comprimen antes de guardar (máx 800KB)
- [ ] Se muestra progreso durante la carga

#### RF-010: Visualización en Grid
El sistema debe mostrar las fotos en formato de cuadrícula (grid).

**Criterios de aceptación:**
- [ ] Las miniaturas se muestran en layout de grid responsive
- [ ] El grid se adapta a diferentes tamaños de pantalla
- [ ] Las imágenes mantienen proporción adecuada

#### RF-011: Lightbox
El sistema debe permitir visualizar fotos en tamaño completo mediante lightbox.

**Criterios de aceptación:**
- [ ] Al hacer clic en una miniatura, se abre en tamaño completo
- [ ] El usuario puede navegar entre fotos en el lightbox
- [ ] El usuario puede cerrar el lightbox
- [ ] Las transiciones entre fotos son suaves

#### RF-012: Información de Fotos
El sistema debe permitir agregar fecha y descripción opcional a cada foto.

**Criterios de aceptación:**
- [ ] Cada foto muestra la fecha de creación/upload
- [ ] El usuario puede agregar descripción opcional
- [ ] La información se guarda con la foto

### 4.4 Fechas Especiales

#### RF-013: Lista de Fechas
El sistema debe permitir gestionar una lista de fechas importantes.

**Criterios de aceptación:**
- [ ] El usuario puede agregar nuevas fechas con título y descripción
- [ ] Las fechas se muestran en orden cronológico
- [ ] Las fechas recurrentes (anuales) se calculan correctamente
- [ ] El usuario puede editar y eliminar fechas

#### RF-014: Cuenta Regresiva
El sistema debe mostrar cuenta regresiva para la próxima fecha especial.

**Criterios de aceptación:**
- [ ] Se identifica automáticamente la próxima fecha especial
- [ ] Se muestra el tiempo restante en formato claro
- [ ] La cuenta regresiva se actualiza en tiempo real

### 4.5 Wishlist Compartida

#### RF-015: Gestión de Wishlist
El sistema debe permitir crear y gestionar una lista de deseos compartidos.

**Criterios de aceptación:**
- [ ] El usuario puede agregar nuevos elementos a la wishlist
- [ ] Cada elemento tiene título y descripción opcional
- [ ] El usuario puede marcar elementos como realizados
- [ ] El usuario puede eliminar elementos

### 4.6 Reproductor de Música

#### RF-016: Reproducción de Audio
El sistema debe permitir reproducir música de fondo de forma discreta.

**Criterios de aceptación:**
- [ ] El usuario puede subir un archivo de audio o usar URL
- [ ] Los controles incluyen play, pause y volumen
- [ ] El reproductor es discreto visualmente
- [ ] El estado de reproducción persiste al navegar

---

## 5. Requisitos No Funcionales

### 5.1 Requisitos de Rendimiento

| Métrica | Objetivo | Condición |
|---------|----------|-----------|
| First Contentful Paint (FCP) | < 1.5 segundos | En conexión 4G estándar |
| Time to Interactive (TTI) | < 3 segundos | En conexión 4G estándar |
| Lighthouse Score | > 90 puntos | Evaluación general |
| Peso total de página | < 2 MB | Sin contar imágenes de usuario |

**Estrategias de optimización:**
- Lazy loading de imágenes
- Minificación de CSS y JavaScript en producción
- Compresión de imágenes antes de guardar
- Uso de animaciones CSS eficientes (transform, opacity)
- Código asíncrono para operaciones no críticas

### 5.2 Requisitos de Compatibilidad

**Navegadores soportados:**

| Navegador | Versión Mínima | Soporte Completo |
|-----------|----------------|------------------|
| Chrome | 80+ | Sí |
| Firefox | 75+ | Sí |
| Safari | 13+ | Sí |
| Edge | 80+ | Sí |
| Mobile Chrome | 80+ | Sí |
| Mobile Safari | 13+ | Sí |

### 5.3 Requisitos de Almacenamiento

**Límites de LocalStorage:**
- Capacidad aproximada: 5-10 MB (varía por navegador)
- Límite por imagen: 800 KB máximo (comprimida)
- Estrategia de mitigación: Limpieza de datos antiguos cuando se alcance el 80% de capacidad

**Estructura de datos requerida:**
```javascript
{
  "pace_messages": [...],
  "pace_photos": [...],
  "pace_dates": [...],
  "pace_wishlist": [...],
  "pace_config": {...}
}
```

### 5.4 Requisitos de Seguridad

- Sanitización de entrada de usuario para prevenir XSS
- Validación de tipos de archivo (solo imágenes para uploads)
- Validación de tamaño de archivos subidos
- No almacenar información sensible (contraseñas, datos financieros)
- No transmitir datos a servidores externos

### 5.5 Requisitos de Accesibilidad (WCAG 2.1 AA)

- Contraste de colores mínimo 4.5:1 para texto
- Navegación por teclado completa
- Textos alternativos para imágenes
- ARIA labels donde sea necesario
- Estados de focus visibles
- Sin contenido parpadeante (> 3 veces por segundo)

### 5.6 Requisitos de Diseño Visual

**Paleta de colores:**

| Tipo | Color | Código |
|------|-------|--------|
| Primario | Blanco | #FFFFFF |
| Primario | Rosa pálido | #FFE4E1 |
| Primario | Rojo sutil | #E8A0A0 |
| Secundario | Dorado suave | #D4AF37 |
| Secundario | Gris claro | #F5F5F5 |
| Texto | Gris oscuro | #333333 |
| Texto inverso | Blanco | #FFFFFF |

**Tipografía:**
- Títulos: Playfair Display o Cormorant Garamond
- Cuerpo: Lato o Open Sans
- Espacios en blanco generosos
- Bordes redondeados suaves (8px-16px)

**Responsive Design:**

| Dispositivo | Ancho | Comportamiento |
|-------------|-------|----------------|
| Mobile | < 768px | Single column, menú hamburguesa |
| Tablet | 768px - 1024px | Two columns, navegación visible |
| Desktop | > 1024px | Full layout, efectos completos |

---

## 6. Diseño UI/UX

### 6.1 Estructura de Página

```
┌─────────────────────────────────────────┐
│              HEADER                      │
│  [Logo: "Pace"]     [Navegación]         │
├─────────────────────────────────────────┤
│              HERO SECTION                │
│  [Imagen Principal] + [Contador]         │
├─────────────────────────────────────────┤
│           MENSAJES DE AMOR               │
│  [Lista de Mensajes] + [Formulario]     │
├─────────────────────────────────────────┤
│              GALERÍA                     │
│  [Grid de Fotos] + [Lightbox]            │
├─────────────────────────────────────────┤
│           FECHAS ESPECIALES              │
│  [Próxima fecha] + [Lista de fechas]     │
├─────────────────────────────────────────┤
│             WISHLIST                     │
│  [Lista de deseos] + [Agregar]           │
├─────────────────────────────────────────┤
│              FOOTER                      │
│  [Créditos discretos]                     │
└─────────────────────────────────────────┘
```

### 6.2 Flujos de Usuario

#### Flujo 1: Primera Carga
1. Usuario abre la página
2. Se muestra el Hero con imagen principal y contador
3. Se cargan mensajes y fotos desde LocalStorage
4. Usuario puede navegar entre secciones

#### Flujo 2: Agregar Mensaje
1. Usuario hace clic en "Nuevo Mensaje"
2. Se abre formulario de entrada
3. Usuario escribe mensaje (opcional: aplica formato)
4. Usuario hace clic en "Guardar"
5. Mensaje aparece en la lista con fecha

#### Flujo 3: Subir Foto
1. Usuario hace clic en "Agregar Foto"
2. Selecciona archivo o arrastra imagen
3. Sistema valida y comprime imagen
4. Imagen aparece en galería

### 6.3 Componentes UI

| Componente | Descripción | Estados |
|------------|-------------|---------|
| Botón primario | Acciones principales | Default, Hover, Active, Disabled |
| Botón secundario | Acciones secundarias | Default, Hover, Active, Disabled |
| Input de texto | Entrada de texto | Default, Disabled, Focus, Error |
| Tarjeta de mensaje | Contenedor de mensaje | Default, Favorito, Hover |
| Miniatura de foto | Preview de imagen | Default, Hover, Selected |
| Contador | Display de tiempo | Default, Celebración |
| Modal | Overlay de confirmación | Open, Closing |

---

## 7. Especificaciones Técnicas

### 7.1 Stack Tecnológico

| Tecnología | Propósito | Versión |
|------------|-----------|---------|
| HTML5 | Estructura semántica | - |
| CSS3 | Estilos y animaciones | - |
| JavaScript ES6+ | Lógica e interactividad | ES2015+ |
| LocalStorage | Almacenamiento persistente | - |

### 7.2 Arquitectura de Archivos

```
proyecto-pace/
├── index.html          # Estructura principal
├── css/
│   └── styles.css      # Todos los estilos
├── js/
│   ├── main.js         # Inicialización y eventos globales
│   ├── counter.js     # Lógica del contador
│   ├── messages.js    # Gestión de mensajes
│   ├── gallery.js     # Gestión de galería
│   ├── dates.js       # Fechas especiales
│   ├── wishlist.js    # Gestión de wishlist
│   ├── audio.js       # Reproductor de música
│   └── storage.js     # Utilidades de LocalStorage
├── assets/
│   ├── images/        # Imágenes del proyecto
│   └── audio/         # Archivos de audio
└── README.md          # Documentación
```

### 7.3 APIs y Dependencias

**APIs nativas utilizadas:**
- LocalStorage API
- FileReader API
- HTML5 Audio API
- Intersection Observer API (lazy loading)

**Libraries opcionales:**
- Animaciones: CSS Animations / Vanilla JavaScript
- Icons: Font Awesome o SVG inline

---

## 8. Plan de Implementación

### 8.1 Fases de Desarrollo

#### Fase 1: MVP Core (Semana 1)
**Objetivo:** Funcionalidades básicas funcionales

| Tarea | Entregable |
|-------|------------|
| Estructura HTML base | index.html completo |
| Estilos CSS fundamentales | styles.css base |
| Contador de tiempo funcional | counter.js working |
| Sistema de mensajes básicos | messages.js working |
| Galería de fotos básica | gallery.js working |

**Definition of Done:**
- Página carga sin errores
- Contador muestra tiempo preciso
- Mensajes se guardan y recuperan
- Fotos se muestran y permiten agregar nuevas

#### Fase 2: Funcionalidades Extras (Semana 2)
**Objetivo:** Características avanzadas

| Tarea | Entregable |
|-------|------------|
| Lightbox para galería | gallery.js completo |
| Sistema de fechas especiales | dates.js working |
| Wishlist | wishlist.js working |
| Reproductor de audio | audio.js working |
| Mejoras de UI/UX | styles.css actualizado |
| Animaciones suaves | CSS animations |

**Definition of Done:**
- Lightbox funcional con navegación
- Fechas especiales con cuenta regresiva
- Wishlist permite agregar y marcar elementos
- Reproductor de audio funciona

#### Fase 3: Optimización (Semana 3)
**Objetivo:** Performance y compatibilidad

| Tarea | Entregable |
|-------|------------|
| Responsive design completo | CSS responsive |
| Optimización de rendimiento | Lighthouse > 90 |
| Pruebas en múltiples dispositivos | Reporte de testing |
| Accesibilidad | WCAG 2.1 AA compliant |

**Definition of Done:**
- Funciona en móvil, tablet y desktop
- Lighthouse score > 90
- Navegación por teclado completa
- Contraste de colores aprobado

#### Fase 4: Polishing (Semana 4)
**Objetivo:** Lanzamiento

| Tarea | Entregable |
|-------|------------|
| Bug fixes | Issues resueltos |
| Documentación | README.md completo |
| Testing de usuario | Feedback implementado |
| Deployment | Sitio publicado |

**Definition of Done:**
- Sin errores críticos
- Documentación completa
- Usuario satisfecho con el resultado

### 8.2 Criterios de Éxito del Proyecto

| # | Criterio | Método de verificación |
|---|----------|-------------------------|
| 1 | Página carga correctamente en Chrome, Firefox, Safari | Testing multi-navegador |
| 2 | Contador muestra tiempo preciso desde fecha configurada | Comparación con calculadora |
| 3 | Mensajes se guardan y recuperan correctamente | Recarga de página |
| 4 | Fotos se muestran y permiten agregar nuevas | Upload y visualización |
| 5 | Diseño responsive funciona en móvil y desktop | Testing en dispositivos |
| 6 | Accesibilidad básica (navegación por teclado) | Prueba manual |
| 7 | Rendimiento aceptable (< 3s carga) | Lighthouse |

---

## 9. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| LocalStorage lleno | Media | Alto | Compresión de imágenes, limpieza de datos antiguos |
| Compatibilidad de navegador | Baja | Medio | Autoprefixes, fallbacks CSS |
| Pérdida de datos | Baja | Alto | Exportación/importación JSON |
| Rendimiento lento | Media | Medio | Lazy loading, optimización de código |
| Imágenes de gran tamaño | Alta | Medio | Compresión automática forzada |

---

## 10. Métricas de Éxito (KPIs)

### 10.1 KPIs Técnicos

| Métrica | Objetivo | Método de medición |
|---------|----------|-------------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Lighthouse Score | > 90 | Lighthouse |
| Tasa de rebote | < 40% | Google Analytics (si aplica) |
| Tiempo en página | > 3 min | Google Analytics (si aplica) |

### 10.2 KPIs de Usuario

| Métrica | Objetivo | Método de medición |
|---------|----------|-------------------|
| Mensajes creados | > 5 promedio | Conteo LocalStorage |
| Fotos subidas | > 10 promedio | Conteo LocalStorage |
| Retorno al sitio | > 30% | Tracking (si aplica) |

---

## 11. Roadmap de Producto

### 11.1 Versión 1.0 (Actual)
- Contador de tiempo insieme
- Sistema de mensajes
- Galería de fotos
- Fechas especiales
- Wishlist
- Reproductor de audio

### 11.2 Versión 2.0 (Futuro)
- Cloud sync (con registro opcional)
- Contraseña de acceso
- Temas/plantillas múltiples
- Exportar a PDF

### 11.3 Versión 3.0 (Futuro)
- Invitar a pareja (cuenta compartida)
- Notificaciones de aniversario
- Widget para escritorio
- App móvil (PWA)

---

## 12. Glosario

| Término | Definición |
|---------|------------|
| LocalStorage | API del navegador para almacenar datos localmente sin servidor |
| Lightbox | Modal o overlay para visualizar imágenes en tamaño completo |
| Responsive | Diseño que se adapta a diferentes tamaños de pantalla |
| MVP | Minimum Viable Product (Producto Mínimo Viable) |
| WCAG | Web Content Accessibility Guidelines |
| XSS | Cross-Site Scripting, tipo de vulnerabilidad de seguridad |
| PWA | Progressive Web App |
| Lazy Loading | Técnica de carga diferida de recursos |

---

## 13. Referencias

- [MDN Web Docs - LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [CSS Tricks - Responsive Design](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
- [Google Web Fundamentals - Performance](https://developers.google.com/web/fundamentals/performance)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 14. Aprobaciones

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| Producto | - | - | - |
| Desarrollo | - | - | - |
| QA | - | - | - |

---

*Documento generado automáticamente basado en mvp-ampliado.md*
