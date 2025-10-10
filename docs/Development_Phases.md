# ZappCash Landing Page - Plan de Desarrollo Completo

## 📋 Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Fase 0: Setup Inicial](#fase-0-setup-inicial)
4. [Fase 0.5: Design System Completo](#fase-05-design-system-completo)
5. [Fase 1: Componentes Base Reutilizables](#fase-1-componentes-base-reutilizables)
6. [Fase 2: Navbar Sticky](#fase-2-navbar-sticky)
7. [Fase 3: Hero Section Estilo Exodus](#fase-3-hero-section-estilo-exodus)
8. [Fase 4: Problem Statement con Globe 3D](#fase-4-problem-statement-con-globe-3d)
9. [Fase 5: Globe 3D - Conexiones Animadas](#fase-5-globe-3d---conexiones-animadas)
10. [Fase 6: Globe 3D - Transaction Cards](#fase-6-globe-3d---transaction-cards)
11. [Fase 7: Features Section - Parte 1](#fase-7-features-section---parte-1)
12. [Fase 8: Features Section - Parte 2](#fase-8-features-section---parte-2)
13. [Fase 9: How It Works](#fase-9-how-it-works)
14. [Fase 10: Waitlist Section](#fase-10-waitlist-section)
15. [Fase 11: FAQ Section](#fase-11-faq-section)
16. [Fase 12: Footer](#fase-12-footer)
17. [Fase 13: Scroll Animations Estilo Apple](#fase-13-scroll-animations-estilo-apple)
18. [Fase 14: Performance & Optimizations](#fase-14-performance--optimizations)
19. [Fase 15: Testing Cross-Browser](#fase-15-testing-cross-browser)
20. [Fase 16: Deploy](#fase-16-deploy)
21. [Resumen de Fases](#resumen-de-fases)

---

## Resumen del Proyecto

Crear una landing page moderna y de alto rendimiento para **ZappCash** - una aplicación fintech descentralizada que reemplaza los pagos tradicionales de SINPE Móvil en Costa Rica. 

### Características Principales:
- **Hero estilo Exodus**: Fondo degradado morado/negro, título grande centrado, mockups de dispositivos
- **Scroll inmersivo estilo Apple**: Animaciones fluidas, parallax, elementos que aparecen/desaparecen según scroll
- **Globe 3D interactivo**: En la sección "Why ZappCash", no en el hero
- **Features con mockups reales**: Screenshots de la aplicación mostrando cada funcionalidad
- **Diseño verde/negro**: Gradientes modernos, glassmorphism, efectos glow

---

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **Animations**: Framer Motion
- **TypeScript**: Strict mode enabled
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

---

## Fase 0: Setup Inicial del Proyecto

**Objetivo**: Configurar el entorno base de Next.js con todas las dependencias

### Tareas

1. **Crear proyecto Next.js 14+ con TypeScript**
```bash
npx create-next-app@latest zappcash-landing --typescript --tailwind --app --eslint
cd zappcash-landing
```

2. **Instalar dependencias principales**
```bash
# Three.js y React Three Fiber
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three

# Animaciones
npm install framer-motion

# Forms
npm install react-hook-form zod @hookform/resolvers

# Icons y utilidades
npm install lucide-react clsx tailwind-merge
```

3. **Crear estructura de carpetas**
```
zappcash-landing/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── sections/     # Secciones de la landing
│   └── Globe3D.tsx
├── lib/
│   ├── utils.ts
│   ├── animations.ts
│   └── globe-utils.ts
├── hooks/
│   └── useScrollAnimation.ts
└── public/
    └── mockups/      # Screenshots de la app
```

4. **Crear `lib/utils.ts`**
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Entregables
- ✅ Proyecto Next.js inicializado
- ✅ Todas las dependencias instaladas
- ✅ Estructura de carpetas creada
- ✅ Servidor de desarrollo corriendo
- ✅ No hay errores en consola

**Duración estimada**: 30 minutos

---

## Fase 0.5: Design System Completo - Colores Verde y Negro

**Objetivo**: Establecer el sistema de diseño visual completo con paleta verde/negro

### Configuración de Colores

**Paleta Principal**:
- **Verde Primary**: `#00FF88` (bright accent green)
- **Verde Secondary**: `#00D4FF` (cyan-green)
- **Blacks**: `#0a0a0a`, `#111111`, `#1a1a1a` (capas de negro)
- **Grays**: Para textos (`#FFFFFF`, `#A0A0A0`, `#666666`)

**Gradientes**:
- Primary: `linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)`
- Hero Background: Inspirado en Exodus (morado oscuro a negro)
- Radial glows: Para efectos de fondo

### Tareas

1. **Configurar `tailwind.config.ts`**
   - Agregar colores personalizados (primary, secondary, dark.900/800/700, gray.100-500)
   - Configurar gradientes en `backgroundImage`
   - Agregar box-shadows con glow verde (`shadow-glow-sm/md/lg/xl`)
   - Configurar animaciones (`glow-pulse`, `float`, `shimmer`)
   - Agregar keyframes personalizados

2. **Crear `app/globals.css`**
   - Variables CSS globales
   - Estilos base (reset, smooth scroll, body background)
   - **Utility classes con @layer**:
     - `.glass` y `.glass-strong` (glassmorphism)
     - `.glass-card` (card con blur)
     - `.gradient-text` (texto con gradiente verde)
     - `.btn-primary`, `.btn-secondary`, `.btn-ghost`
     - `.feature-card` (con hover shine effect)
     - `.stat-card`
     - `.grid-pattern`, `.dot-pattern`
     - `.border-glow`
   - Scrollbar personalizado (verde)
   - Selection personalizada (verde)
   - Animaciones CSS personalizadas
   - Reduced motion support para accesibilidad
   - Focus indicators verdes

3. **Crear `lib/styles.ts`**
   - Exportar objetos con presets de estilos:
     - `gradients`: diferentes tipos de gradientes
     - `shadows`: variantes de glow
     - `glass`: efectos de glassmorphism
     - `colors`: clases de colores organizadas

4. **Crear página de validación `app/design-system/page.tsx`**
   - Mostrar paleta de colores
   - Demostrar gradientes
   - Mostrar variantes de botones
   - Cards con glassmorphism
   - Ejemplos de tipografía con gradientes
   - Efectos de glow y animaciones
   - Backgrounds patterns

### Entregables
- ✅ `tailwind.config.ts` con sistema de colores verde/negro completo
- ✅ `globals.css` con todas las utility classes
- ✅ Gradientes verde a cyan funcionando
- ✅ Glassmorphism visible y efectivo
- ✅ Botones con glow effect verde
- ✅ Texto con gradiente animado
- ✅ Scrollbar personalizado verde
- ✅ Página `/design-system` mostrando todos los estilos
- ✅ Animaciones funcionando (pulse, float, shimmer)
- ✅ Responsive en todos los tamaños

**Duración estimada**: 1-2 horas

---

## Fase 1: Componentes Base Reutilizables

**Objetivo**: Crear componentes React reutilizables fundamentales

### Tareas

1. **Crear `lib/animations.ts`**
   - Definir variantes de Framer Motion:
     - `fadeInUp`: fade desde abajo
     - `fadeInLeft`: fade desde izquierda
     - `fadeInRight`: fade desde derecha
     - `fadeInDown`: fade desde arriba
     - `scaleIn`: zoom in
     - `staggerContainer`: para animar hijos secuencialmente
   - Todas con timing y easing apropiados

2. **Crear `hooks/useInViewAnimation.ts`**
   - Hook personalizado usando `useInView` de Framer Motion
   - Retorna `ref` y `isInView`
   - Por defecto: trigger once, amount 0.3

3. **Crear `components/ui/Button.tsx`**
   - Props: `variant` (primary/secondary/ghost), `size` (sm/md/lg)
   - Usar clases del design system (`.btn-primary`, etc.)
   - TypeScript con tipos apropiados
   - forwardRef para flexibilidad

4. **Crear `components/ui/GlassCard.tsx`**
   - Props: `variant` (default/strong)
   - Aplicar `.glass-card` o `.glass-card-strong`
   - Wrapper genérico para contenido

5. **Crear `components/ui/GradientText.tsx`**
   - Props: `animated` (boolean)
   - Aplica `.gradient-text` o `.gradient-text-animated`
   - Para títulos y texto destacado

6. **Crear `components/ui/Section.tsx`**
   - Wrapper de sección con padding consistente
   - Props: `fullHeight` (para min-h-screen)
   - Padding responsive

### Entregables
- ✅ Archivo `lib/animations.ts` con 6+ variantes
- ✅ Hook `useInViewAnimation` funcional
- ✅ Componente `Button` con 3 variantes y 3 tamaños
- ✅ Componente `GlassCard` con glassmorphism
- ✅ Componente `GradientText` con animación opcional
- ✅ Componente `Section` wrapper
- ✅ Todos los componentes fully typed con TypeScript
- ✅ Componentes probados en `/design-system`

**Duración estimada**: 1-2 horas

---

## Fase 2: Navbar Sticky

**Objetivo**: Navbar que cambia de transparente a sólido al hacer scroll

### Referencia
Ver ejemplo de Exodus: navbar con logo, links, botón CTA

### Tareas

1. **Crear `components/Navbar.tsx`**
   - Estado `isScrolled` usando `useEffect` + `window.scrollY`
   - Transición de `bg-transparent` a `bg-dark-900/90 backdrop-blur-lg`
   - **Logo**: 
     - Usar div con `bg-gradient-primary` o crear logo ZappCash simple
     - Texto "ZappCash" con `.gradient-text`
   - **Navigation links**: Features, Why ZappCash, Roadmap, FAQ
     - Desktop: horizontal con hover verde
     - Mobile: menú hamburguesa
   - **CTA Button**: "Join Waitlist" usando componente `Button` variant="primary"
   - Fixed position, z-50
   - Border bottom sutil cuando scrolled

2. **Actualizar `app/layout.tsx`**
   - Importar y renderizar `<Navbar />`
   - Agregar padding-top al `<main>` para compensar navbar fixed
   - Configurar metadata SEO

3. **Menú Mobile**
   - Botón hamburguesa (iconos de lucide-react: `Menu`, `X`)
   - Dropdown con backdrop blur
   - Links verticales
   - Cerrar al hacer click en link

### Entregables
- ✅ Navbar fixed en top
- ✅ Transición transparente → sólido al scroll
- ✅ Logo con gradiente verde
- ✅ Links de navegación funcionales (anchors)
- ✅ CTA button con estilo correcto
- ✅ Menú hamburguesa responsive
- ✅ Backdrop blur effect cuando scrolled
- ✅ Smooth transitions

**Duración estimada**: 1 hora

---

## Fase 3: Hero Section Estilo Exodus

**Objetivo**: Hero centrado con fondo degradado morado/negro, título grande y mockups de dispositivos

### Referencia Visual
Imagen 1 proporcionada (Exodus): 
- Fondo degradado morado oscuro con glow sutil
- Título grande centrado "Bitcoin and crypto wallet"
- Subtítulo debajo
- Botón de descarga grande centrado
- Mockups de laptop y móvil en la parte inferior

### Tareas

1. **Crear `components/sections/Hero.tsx`**
   
   **Estructura**:
   - Full viewport height (`min-h-screen`)
   - Flex container centrado (vertical y horizontal)
   - Padding para contenido
   
   **Background**:
   - Degradado de morado oscuro (#1a0033 o similar) a negro (#0a0a0a)
   - Agregar orbs animados (`.orb-green`, `.orb-cyan`) con blur y float animation
   - Opcional: dot pattern sutil
   
   **Contenido (centrado)**:
   - **Eyebrow text**: "The Future of Payments" (pequeño, verde, uppercase)
   - **Headline principal**: "Seamless payments, proven reliability" 
     - Tamaño: text-6xl md:text-7xl lg:text-8xl
     - Font weight: black (900)
     - Centrado
     - Parte del texto con `<GradientText>`
   - **Subheadline**: "Decentralized payments without limits. Send and receive money instantly with ultra-low fees of just 0.02%."
     - Color: text-gray-300
     - Tamaño: text-xl
     - Max width: max-w-2xl
     - Centrado
   - **CTA Button**: "Join Waitlist" (grande, centrado)
     - Usar componente `Button` size="lg"
   - **Texto secundario**: "Available on other devices" (pequeño, link underline)
   
   **Mockups** (parte inferior del hero):
   - Contenedor con images de laptop y móvil (usar next/image)
   - Posicionar devices con perspective/3D effect
   - Laptop a la izquierda, móvil a la derecha (superpuestos)
   - Agregar subtle glow alrededor de los devices
   
   **Animaciones**:
   - Todo el contenido usa `staggerContainer` con Framer Motion
   - Headline: `fadeInUp` con delay
   - Subheadline: `fadeInUp` con más delay
   - Button: `scaleIn`
   - Mockups: `fadeInUp` desde abajo con delay mayor
   - Orbs en background: float animation continua

2. **Crear o colocar mockups**
   - Agregar imágenes placeholder en `public/mockups/`
   - Laptop showing ZappCash dashboard
   - Mobile showing ZappCash app
   - Formato: PNG con transparencia preferiblemente

3. **Efectos de fondo**
   - 2-3 orbs animados (`.orb-green`, `.orb-cyan`)
   - Positioned absolute con blur(60px)
   - Animación float con diferentes duraciones

### Entregables
- ✅ Hero section full viewport height
- ✅ Background con degradado morado/negro
- ✅ Contenido centrado verticalmente y horizontalmente
- ✅ Título grande con texto gradient
- ✅ Subtítulo descriptivo
- ✅ CTA button prominente
- ✅ Mockups de laptop y móvil en parte inferior
- ✅ Orbs animados en background
- ✅ Todas las animaciones funcionando (stagger effect)
- ✅ Responsive: stack vertical en mobile, contenido centrado
- ✅ Images optimizadas con next/image

**Duración estimada**: 2-3 horas

---

## Fase 4: Problem Statement con Globe 3D

**Objetivo**: Sección "Why ZappCash" con tabla comparativa y Globe 3D interactivo

### Estructura de la Sección

**Layout**: Dos columnas en desktop
- **Izquierda**: Tabla comparativa SINPE vs ZappCash
- **Derecha**: Globe 3D con transacciones

### Tareas

1. **Crear `components/sections/WhyZappCash.tsx`**
   
   **Contenido Left Side**:
   - Section tag: "The Problem" (pequeño, verde)
   - Headline: "Why ZappCash?" (grande, gradient text)
   - **Tabla comparativa**:
     - 3 columnas: Feature | SINPE Móvil | ZappCash
     - Rows:
       - Daily Limit: ~$200 | Unlimited ✓
       - Monthly Limit: $4,000 | Unlimited ✓
       - Fees after limit: Up to $3 + 0.25% | 0.02% flat ✓
       - UX: Fragmented | Modern & unified ✓
       - Self-custody: No | Yes ✓
       - DeFi Rewards: No | Yes ✓
     - Usar `GlassCard` para cada row
     - SINPE: X rojo, ZappCash: ✓ verde
   
   **Animaciones tabla**:
   - Rows aparecen secuencialmente (stagger)
   - Checkmarks con scale + rotate animation
   - Trigger cuando entra al viewport (useInViewAnimation)

2. **Crear Globe 3D placeholder (derecha)**
   - Por ahora: div con mensaje "Globe will be here"
   - Mismo height que la tabla
   - Glass card como container

3. **Background effects**
   - Grid pattern sutil
   - Orb animado verde en el fondo

### Entregables
- ✅ Sección con dos columnas (desktop)
- ✅ Tabla comparativa clara y legible
- ✅ Glassmorphism en tabla
- ✅ Checkmarks verdes animados
- ✅ X rojos para SINPE
- ✅ Animación secuencial de rows
- ✅ Placeholder para Globe 3D
- ✅ Responsive: stack vertical en mobile
- ✅ Trigger animation al entrar viewport

**Duración estimada**: 2 horas

---

## Fase 5: Globe 3D - Conexiones Animadas

**Objetivo**: Implementar Globe 3D con arcos de conexión entre países

### Tareas

1. **Crear `lib/globe-utils.ts`**
   - Función `latLongToVector3`: convierte lat/long a coordenadas 3D
   - Función `generateArc`: crea arco curvo entre dos puntos usando QuadraticBezierCurve3
   - Constante `locations`: objeto con coordenadas de países
     - Costa Rica: `{ lat: 9.7489, lon: -83.7534 }`
     - Mexico: `{ lat: 19.4326, lon: -99.1332 }`
     - New York: `{ lat: 40.7128, lon: -74.0060 }`
     - London: `{ lat: 51.5074, lon: -0.1278 }`
     - Madrid: `{ lat: 40.4168, lon: -3.7038 }`
   - Array `connections`: define qué ciudades conectar

2. **Crear `components/Globe3D.tsx`**
   
   **Componente Globe (Three.js)**:
   - Sphere principal con material oscuro (similar al design system)
   - Wireframe overlay verde semitransparente
   - Arcos de conexión entre ubicaciones:
     - Usar QuadraticBezierCurve3 para cada conexión
     - Color verde (#00FF88)
     - Animación de opacidad (pulsing)
   - Puntos luminosos en cada ubicación:
     - Pequeñas esferas con material emissive verde
     - PointLight en cada ubicación
     - Animación de scale (pulsing)
   
   **Iluminación**:
   - AmbientLight para luz general
   - PointLight verde en posiciones estratégicas
   - PointLight cyan para contraste
   
   **Controls**:
   - OrbitControls con autoRotate (lento)
   - Disable zoom y pan
   
   **Canvas setup**:
   - Antialias enabled
   - Alpha/transparent background
   - Camera position: [0, 0, 5]

3. **Integrar Globe en `WhyZappCash.tsx`**
   - Importar usando `dynamic` de Next.js (client-only)
   - Agregar loading fallback
   - Reemplazar placeholder con Globe3D component

4. **Optimización mobile**
   - Reducir segment count del sphere en mobile
   - Considerar disable autoRotate en mobile si hay performance issues

### Entregables
- ✅ Globe 3D renderiza sin errores
- ✅ Esfera oscura con wireframe verde
- ✅ Arcos de conexión entre ubicaciones
- ✅ Arcos animados (pulsing opacity)
- ✅ Puntos luminosos en ciudades
- ✅ Puntos con animación de pulsación
- ✅ Auto-rotación suave
- ✅ Iluminación verde/cyan
- ✅ Client-only rendering (no SSR errors)
- ✅ Performance >30fps en desktop

**Duración estimada**: 3-4 horas

---

## Fase 6: Globe 3D - Transaction Cards

**Objetivo**: Agregar tarjetas flotantes mostrando transacciones alrededor del globe

### Referencia
Tarjetas con info de transacciones (nombre, monto, origen-destino)

### Tareas

1. **Crear `components/TransactionCard.tsx`**
   - Props: `name`, `amount`, `location`
   - Usar `GlassCard` como base
   - Layout compacto:
     - Avatar placeholder o ícono
     - Nombre de usuario
     - Monto (grande, con gradiente)
     - Ubicación (pequeño, gris)
   - Animación `float`

2. **Data de transacciones**
   ```typescript
   const transactions = [
     { name: "Lucia", amount: "5,000 CRC", location: "Spain → Mexico" },
     { name: "Ledgerly", amount: "28,612,000 MXN", location: "Sent to 1,000 employees" },
     { name: "Nexora", amount: "8,882,105 USD", location: "Costa Rica → USA HQ" },
   ];
   ```

3. **Posicionamiento en Globe**
   - Usar HTML overlay o posicionamiento absoluto con CSS
   - 3-4 cards posicionadas alrededor del globe
   - Cada card con diferentes `animation-delay` para float
   - Z-index apropiado (delante del globe en algunas, detrás en otras para profundidad)

4. **Animaciones**
   - Fade in con delay staggered
   - Float animation continua
   - Hover: subtle scale up

### Entregables
- ✅ Cards visibles alrededor del globe
- ✅ Glassmorphism effect en cards
- ✅ Información legible (nombre, monto, ubicación)
- ✅ Float animation en cada card
- ✅ Diferentes delays para efecto natural
- ✅ No afecta performance significativamente
- ✅ Responsive: reducir cantidad o esconder en mobile

**Duración estimada**: 2 horas

---

## Fase 7: Features Section - Parte 1

**Objetivo**: Implementar primeras 3 features con mockups y scroll animations

### Referencia Visual
Imagen 2 proporcionada (Exodus Swaps): Layout alternante con mockup a un lado y contenido al otro

### Estructura General de Features

Cada feature debe tener:
- **Layout alternante**: Odd features (mockup left), Even features (mockup right)
- **Full viewport height** o casi (min-h-screen o similar)
- **Mockup de la app** mostrando esa funcionalidad
- **Contenido**: ícono, título, descripción, lista de beneficios
- **Scroll-triggered animations**: contenido y mockup entran desde lados opuestos

### Tareas

1. **Crear componente base `components/sections/FeatureSection.tsx`**
   - Props: `title`, `description`, `icon`, `benefits[]`, `mockupSrc`, `reverse` (boolean)
   - Layout de dos columnas con condicional reverse
   - Glassmorphism en content card
   - useInViewAnimation para trigger

2. **Feature 1: Pagos Recurrentes**
   - **Título**: "Pagos Recurrentes"
   - **Ícono**: Calendar con símbolo repeat (lucide-react)
   - **Descripción**: "Set up automatic recurring payments for subscriptions, salaries, or regular expenses. Never miss a payment again."
   - **Benefits**:
     - Schedule daily, weekly, or monthly payments
     - Automatic execution
     - Edit or cancel anytime
   - **Mockup**: Screenshot mostrando schedule de pagos recurrentes
   - **Layout**: Mockup left, content right
   - **Animation**: mockup slide from left, content slide from right

3. **Feature 2: Sobres (Envelopes)**
   - **Título**: "Sobres & Sobres Compartidos"
   - **Ícono**: Envelope (lucide-react)
   - **Descripción**: "Organize your money with digital envelopes. Share envelopes with family or teams for collaborative savings and group expenses."
   - **Use cases**:
     - Savings goals
     - Shared household budgets
     - Group trips
   - **Mockup**: Screenshot de interfaz de sobres
   - **Layout**: Content left, mockup right (reverse)
   - **Animation**: content slide from left, mockup slide from right

4. **Feature 3: Red Social de Pagos**
   - **Título**: "Red Social de Pagos"
   - **Ícono**: Users network (lucide-react)
   - **Descripción**: "Find friends by username and send money instantly. See your payment history and build your financial network."
   - **Features**:
     - Username search
     - Payment history with friends
     - Social profiles
   - **Mockup**: Social feed de transacciones
   - **Layout**: Mockup left, content right
   - **Animation**: fade + scale con stagger

5. **Crear mockups placeholder**
   - Agregar imágenes en `public/mockups/`
   - Por ahora pueden ser placeholders o screenshots reales
   - Formato recomendado: PNG con transparencia
   - Aplicar subtle shadow/glow alrededor del device frame

### Entregables
- ✅ Componente `FeatureSection` reutilizable
- ✅ 3 features implementadas
- ✅ Layout alternante (left/right)
- ✅ Mockups de app en cada feature
- ✅ Iconos apropiados de lucide-react
- ✅ Content cards con glassmorphism
- ✅ Animaciones al scroll (slide in desde lados)
- ✅ Responsive: stack vertical en mobile
- ✅ Each section ~100vh height
- ✅ Benefits con checkmarks verdes

**Duración estimada**: 3-4 horas

---

## Fase 8: Features Section - Parte 2

**Objetivo**: Completar las features restantes con efectos especiales

### Tareas

1. **Feature 4: QR Payments**
   - **Título**: "Escanea y Paga"
   - **Ícono**: QR code (lucide-react)
   - **Descripción**: "Every user gets a unique scannable ZappCode. Display it at your store, checkout, or send it digitally for instant payments."
   - **Benefits**:
     - No typing needed
     - Instant verification
     - Works offline
   - **Mockup**: QR code grande con animación
   - **Efecto especial**: QR code pulsa con glow verde (`.pulse-glow`)
   - **Layout**: Content left, QR mockup right

2. **Feature 5: Tarjeta Digital**
   - **Título**: "Tarjeta Digital ZappCash"
   - **Ícono**: Credit card (lucide-react)
   - **Descripción**: "Virtual card for online purchases. Full control, instant creation, freeze/unfreeze anytime."
   - **Features**:
     - Virtual card numbers
     - Spending controls
     - Transaction notifications
   - **Mockup**: 3D card con glassmorphism effect
   - **Efecto especial**: Card rota en 3D al hacer scroll
     - Usar CSS transform o Framer Motion
     - Efecto de perspectiva
   - **Layout**: Card centrada, content debajo o alrededor

3. **Feature 6: Enterprise Solutions**
   - **Título**: "Soluciones Empresariales"
   - **Ícono**: Building/briefcase (lucide-react)
   - **Descripción**: "Advanced dashboard with payment analytics, transaction reports, team management, and API integration for your business."
   - **Stats displayed**:
     - Transaction volume
     - Active users
     - Monthly growth
   - **Mockup**: Dashboard UI mostrando analytics
   - **Layout**: Full width, dashboard como fondo con overlay de texto
   - **Animation**: Dashboard elements fade in con stagger

4. **Efectos especiales**
   - QR code: implementar pulse animation custom
   - 3D Card: rotación en CSS 3D o Three.js simple
   - Dashboard: parallax effect subtle en elementos

### Entregables
- ✅ 3 features adicionales completadas
- ✅ QR code con pulse glow animation
- ✅ 3D card con rotation effect
- ✅ Dashboard enterprise con stats
- ✅ Todas con mockups apropiados
- ✅ Layout variado (no todas iguales)
- ✅ Animaciones únicas por feature
- ✅ Total: 6 features completas

**Duración estimada**: 3-4 horas

---

## Fase 9: How It Works

**Objetivo**: Sección explicando el proceso en 3 pasos con animación secuencial

### Estructura

**3 pasos horizontales** (desktop) / verticales (mobile):
1. Deposita Dinero
2. Convierte a Stablecoins
3. Envía sin Límites

### Tareas

1. **Crear `components/sections/HowItWorks.tsx`**
   
   **Layout**:
   - Section title: "How It Works" (centrado, gradient text)
   - Grid de 3 columnas (desktop) / 1 columna (mobile)
   - Líneas conectoras entre steps (animated)
   
   **Step 1: Deposita Dinero**:
   - Ícono: Bank building (lucide-react)
   - Título: "Deposita Dinero"
   - Descripción: "Transfer colones via SINPE or bank transfer"
   - Visual: Arrow pointing down, icon CRC → stablecoin

   **Step 2: Convierte a Stablecoins**:
   - Ícono: Exchange/swap (lucide-react)
   - Título: "Convierte a Stablecoins"
   - Descripción: "ZappCash converts your CRC to USDC/USDT automatically"
   - Visual: Animated icon transformation CRC → USDC

   **Step 3: Envía sin Límites**:
   - Ícono: Lightning bolt (lucide-react)
   - Título: "Envía sin Límites"
   - Descripción: "Send and receive payments instantly with no limits"
   - Visual: Phone mockup con notification

2. **Animación secuencial**
   - Steps revelan uno por uno (stagger delay)
   - Líneas conectoras se "dibujan" con draw animation
   - Iconos hacen bounce/scale al aparecer
   - Trigger cuando sección entra al viewport

3. **Líneas conectoras**
   - SVG path entre steps
   - Animación de `stroke-dashoffset` (draw effect)
   - Color verde con glow

### Entregables
- ✅ Sección de 3 pasos clara
- ✅ Cada step con ícono, título, descripción
- ✅ Visuales representando cada paso
- ✅ Líneas conectoras animadas
- ✅ Animación secuencial (steps aparecen uno por uno)
- ✅ Responsive: vertical en mobile
- ✅ Iconos con bounce effect

**Duración estimada**: 2 horas

---

## Fase 10: Waitlist Section

**Objetivo**: Formulario funcional para capturar emails de waitlist

### Tareas

1. **Crear `components/sections/Waitlist.tsx`**
   
   **Layout**:
   - Full screen section centrada
   - Background con orbs animados (verde/cyan)
   - Form en el centro con glassmorphism
   
   **Contenido**:
   - Headline: "Join the Waitlist" (gradient text, muy grande)
   - Subheadline: "Be among the first to experience the future of payments in Costa Rica"
   - **Form**:
     - Input de email (grande, placeholder "tu@email.com")
     - Submit button (verde, gradiente)
     - Validación con react-hook-form + zod
   - Social proof: "Join 1,000+ early adopters" (pequeño)
   - Privacy note: "We respect your privacy. No spam, ever."

2. **Validación y estados**
   - Email validation (regex)
   - Estados: idle, loading, success, error
   - Success: checkmark animation + mensaje
   - Error: shake animation + mensaje de error
   - Loading: spinner en button

3. **API Route** (opcional para esta fase)
   - Crear `app/api/waitlist/route.ts`
   - POST endpoint
   - Validación server-side
   - Por ahora: solo console.log (implementar storage después)
   - Honeypot field para spam protection

4. **Animaciones**
   - Form slide up + fade in
   - Background orbs con movimiento lento
   - Submit button: hover glow effect
   - Success: confetti effect o checkmark scale animation

5. **Background effects**
   - 2-3 orbs grandes con blur
   - Gradient orbs en diferentes posiciones
   - Float animation lenta

### Entregables
- ✅ Waitlist section full screen
- ✅ Form centrado con glassmorphism
- ✅ Email input grande y destacado
- ✅ Submit button con gradiente verde
- ✅ Validación funcionando (client-side)
- ✅ Estados: idle, loading, success, error
- ✅ Animación de success (checkmark)
- ✅ Mensajes de error claros
- ✅ Background con orbs animados
- ✅ Social proof text
- ✅ Privacy note
- ✅ Responsive

**Duración estimada**: 2-3 horas

---

## Fase 11: FAQ Section

**Objetivo**: Sección de preguntas frecuentes con accordions

### Tareas

1. **Crear `components/sections/FAQ.tsx`**
   
   **Layout**:
   - Section title: "Frequently Asked Questions" (centrado)
   - Grid de 2 columnas (desktop) / 1 columna (mobile)
   - Cada pregunta es un accordion
   
   **Preguntas** (mínimo 8):
   1. ¿Qué es ZappCash?
   2. ¿Cómo deposito dinero?
   3. ¿Cuáles son las comisiones?
   4. ¿Es seguro? ¿Quién tiene mis fondos?
   5. ¿Cómo retiro mi dinero?
   6. ¿Qué son las stablecoins?
   7. ¿Necesito saber sobre blockchain?
   8. ¿Cuándo estará disponible?

2. **Crear componente `Accordion.tsx`**
   - Props: `question`, `answer`
   - Estado: `isOpen`
   - Animación de expand/collapse suave
   - Línea verde a la izquierda cuando activo
   - Ícono chevron rotando
   - Solo uno abierto a la vez (controlled state en parent)

3. **Contenido de respuestas**
   - Redactar respuestas claras en español
   - Tone: friendly, helpful, informative
   - Párrafos cortos y legibles
   - Links a whitepaper/docs donde relevante

4. **Estilos**
   - Preguntas: font-semibold, hover verde
   - Respuestas: text-gray-300
   - Glass card para cada item
   - Border verde en active question
   - Smooth height transition

### Entregables
- ✅ FAQ section con 8 preguntas
- ✅ Accordion funcionando correctamente
- ✅ Solo un accordion abierto a la vez
- ✅ Expand/collapse animation suave
- ✅ Línea verde en pregunta activa
- ✅ Ícono chevron rotando
- ✅ Grid responsive (2 col → 1 col)
- ✅ Contenido claro y útil en español
- ✅ Glass effect en cada item

**Duración estimada**: 2 horas

---

## Fase 12: Footer

**Objetivo**: Footer completo con links y disclaimer legal

### Tareas

1. **Crear `components/Footer.tsx`**
   
   **Layout**:
   - Multi-column grid (4 columnas en desktop)
   - Gradient border top (verde)
   - Background: dark-900
   - Padding generoso
   
   **Columnas**:
   
   1. **Logo & Description**:
      - Logo ZappCash (mismo del navbar)
      - Tagline: "The decentralized future of payments"
      - Social links: Twitter, Discord, GitHub, LinkedIn
        - Iconos de lucide-react
        - Hover: verde
   
   2. **Product**:
      - Features
      - Roadmap
      - Whitepaper (link a PDF)
      - Security
   
   3. **Resources**:
      - FAQ
      - Blog
      - Documentation
      - Support
   
   4. **Legal**:
      - Privacy Policy
      - Terms of Service
      - Trademarks

2. **Bottom Bar**:
   - Copyright: "Copyright © 2025 ZappCash. All rights reserved."
   - **Disclaimer** (estilo Exodus):
     - Texto largo sobre blockchain risks
     - Font pequeño (text-xs)
     - Color gris muted
     - Max width para legibilidad
   - Separado del resto con border-top

3. **Disclaimer text**:
   ```
   "ZappCash is a software platform ONLY and does not conduct any independent 
   diligence on or substantive review of any blockchain asset, digital currency, 
   cryptocurrency or associated funds. You are fully and solely responsible for 
   evaluating your investments, for determining whether you will swap blockchain 
   assets based on your own, and for all your decisions as to whether to swap 
   blockchain assets with the ZappCash in app swap feature. In many cases, 
   blockchain assets you swap on the basis of your research may not increase 
   in value, and may decrease in value. Similarly, blockchain assets you swap 
   on the basis of your research may increase in value after your swap."
   ```

4. **Estilos**:
   - Links: text-gray-400, hover text-primary
   - Subtle borders entre secciones
   - Social icons: circular background on hover
   - Responsive: stack vertical en mobile

### Entregables
- ✅ Footer con 4 columnas
- ✅ Logo y description
- ✅ Social media links funcionales (pueden ser # temporalmente)
- ✅ Product, Resources, Legal links organizados
- ✅ Copyright y disclaimer en bottom bar
- ✅ Disclaimer legal completo
- ✅ Gradient border top (verde)
- ✅ Hover effects verdes en links
- ✅ Responsive: stack en mobile
- ✅ Spacing y padding apropiados

**Duración estimada**: 1-2 horas

---

## Fase 13: Scroll Animations Estilo Apple

**Objetivo**: Implementar animaciones inmersivas al hacer scroll

### Referencia
Apple.com, Linear.app: elementos que aparecen/desaparecen, parallax, pin/unpin sections

### Scroll Effects a Implementar

1. **Parallax en backgrounds**
   - Orbs se mueven a diferente velocidad que foreground
   - Background patterns con movimiento sutil

2. **Fade in/out basado en scroll**
   - Elementos opacos al entrar viewport
   - Se desvanecen gradualmente al salir

3. **Scale transformations**
   - Globe 3D: scale up al entrar, scale down al salir
   - Features mockups: subtle scale en hover

4. **Sticky sections**
   - Algunas features se "pegan" mientras scrolleas
   - Content cambia mientras mockup permanece fijo

5. **Progress indicators**
   - Barra de progreso de scroll (opcional)
   - Section indicators en sidebar (opcional)

### Tareas

1. **Crear `hooks/useScrollAnimation.ts`**
   - Usar `useScroll` y `useTransform` de Framer Motion
   - Retornar valores transformados (y, scale, opacity, etc.)
   - Basado en scroll progress de sección específica

2. **Aplicar a Hero**
   - Mockups con parallax (se mueven más lento)
   - Orbs con parallax invertido
   - Headline con subtle fade out al scroll down

3. **Aplicar a Why ZappCash**
   - Globe con scroll-responsive scale
   - Globe rotation basada en scroll
   - Tabla con stagger más pronounced

4. **Aplicar a Features**
   - Mockups con parallax
   - Content fade in cuando mockup llega a center
   - Alternating slide directions

5. **Smooth scroll behavior**
   - Scroll snap en secciones importantes (opcional)
   - Easing natural
   - No jittery animations

6. **Performance**
   - Usar `will-change` CSS property
   - Throttle/debounce scroll listeners si es necesario
   - Transform y opacity (propiedades baratas para animar)

### Entregables
- ✅ Parallax en backgrounds (orbs, patterns)
- ✅ Elements fade basado en viewport position
- ✅ Globe responde al scroll (scale + rotation)
- ✅ Mockups con parallax sutil
- ✅ Smooth scroll behavior
- ✅ Sticky sections (al menos 1-2)
- ✅ No jank, smooth 60fps animations
- ✅ Reduced motion support funciona
- ✅ Todo responsive y funcional en mobile

**Duración estimada**: 3-4 horas

---

## Fase 14: Performance & Optimizations

**Objetivo**: Optimizar para carga rápida y performance

### Tareas

1. **Loading Screen**
   - Crear `components/LoadingScreen.tsx`
   - Logo animation al cargar página
   - Fade out cuando contenido listo
   - Usar Framer Motion AnimatePresence

2. **Image Optimization**
   - Todas las images usando `next/image`
   - Lazy loading para images below fold
   - Formatos optimizados (WebP)
   - Sizes attribute apropiado para responsive
   - Priority en hero images

3. **Code Splitting**
   - Dynamic imports para Globe3D (ya hecho)
   - Dynamic imports para otras librerías pesadas
   - Lazy load features components
   - Split por routes si es necesario

4. **Reducing Bundle Size**
   - Tree-shaking
   - Verificar bundle analyzer
   - Remover dependencies no usadas
   - Optimize Framer Motion imports (import específico)

5. **CSS Optimizations**
   - Purge unused Tailwind classes
   - Critical CSS inline
   - Defer non-critical CSS

6. **Performance Monitoring**
   - Lighthouse score >90
   - Core Web Vitals:
     - LCP < 2.5s
     - FID < 100ms
     - CLS < 0.1

7. **Optimizaciones Globe 3D**
   - Reducir polycount si es necesario
   - Frustum culling
   - Dispose geometries cuando unmount

### Entregables
- ✅ Loading screen funcional
- ✅ Todas las images optimizadas
- ✅ Code splitting implementado
- ✅ Bundle size razonable (<500kb JS)
- ✅ Lighthouse score >90
- ✅ No memory leaks
- ✅ Fast TTI (Time to Interactive)
- ✅ Smooth animations sin drops

**Duración estimada**: 2-3 horas

---

## Fase 15: Testing Cross-Browser

**Objetivo**: Validar funcionalidad en múltiples browsers y dispositivos

### Tareas

1. **Browser Testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)
   - Safari iOS
   - Chrome Android

2. **Responsive Testing**
   - Mobile: 375px (iPhone SE)
   - Mobile: 390px (iPhone 12/13/14)
   - Tablet: 768px (iPad)
   - Laptop: 1024px
   - Desktop: 1440px
   - Large: 1920px

3. **Feature Testing**
   - Navbar sticky funciona en todos
   - Animations funcionan suavemente
   - Globe 3D renderiza correctamente
   - Forms validan apropiadamente
   - Accordion expand/collapse
   - Scroll animations no causan jank
   - Touch interactions en mobile

4. **Accessibility Testing**
   - Keyboard navigation completa
   - Screen reader friendly
   - Focus indicators visibles
   - Color contrast sufficient (WCAG AA)
   - Alt text en images
   - ARIA labels donde necesario

5. **Bug Fixes**
   - Documentar bugs encontrados
   - Priorizar por severidad
   - Fix critical bugs
   - Create issues para nice-to-haves

### Entregables
- ✅ Testing matrix completada
- ✅ Sin errores en consola en ningún browser
- ✅ Funciona en todos los browsers target
- ✅ Responsive en todos los tamaños
- ✅ Touch friendly en mobile
- ✅ Accesible con keyboard
- ✅ Screen reader compatible
- ✅ Critical bugs fixed

**Duración estimada**: 3-4 horas

---

## Fase 16: Deploy

**Objetivo**: Preparar y deployar a producción

### Tareas

1. **README.md**
   - Project description
   - Setup instructions
   - Available scripts
   - Environment variables
   - Project structure
   - Technologies used
   - Deployment instructions

2. **Environment Variables**
   - `.env.example` file
   - Document todas las env vars necesarias
   - Setup para producción (Vercel)

3. **Build Test**
   - `npm run build` exitoso
   - No warnings críticos
   - Verificar output size
   - Test production build locally

4. **Deploy a Vercel**
   - Conectar repo a Vercel
   - Configure build settings
   - Setup environment variables
   - Deploy preview
   - Test preview deployment

5. **Domain & DNS**
   - Setup custom domain (si aplica)
   - Configure DNS records
   - SSL certificate

6. **Post-Deploy Testing**
   - Test en producción
   - Verificar todas las features
   - Check analytics setup
   - Monitor performance

7. **Documentation**
   - Deployment guide
   - Troubleshooting common issues
   - Maintenance notes

### Entregables
- ✅ README completo y claro
- ✅ `.env.example` documentado
- ✅ Build exitoso sin warnings
- ✅ Deploy en Vercel funcionando
- ✅ Preview URL accesible
- ✅ Performance buena en producción
- ✅ No errores en production
- ✅ Analytics configurado (si aplica)

**Duración estimada**: 1-2 horas

---

## Resumen de Fases

| Fase | Nombre | Duración | Prioridad |
|------|--------|----------|-----------|
| 0 | Setup Inicial | 30 min | Alta |
| 0.5 | Design System Verde/Negro | 1-2 hrs | Alta |
| 1 | Componentes Base | 1-2 hrs | Alta |
| 2 | Navbar Sticky | 1 hr | Alta |
| 3 | Hero Estilo Exodus | 2-3 hrs | Alta |
| 4 | Why ZappCash + Globe Básico | 2 hrs | Alta |
| 5 | Globe Conexiones | 3-4 hrs | Media |
| 6 | Globe Transaction Cards | 2 hrs | Media |
| 7 | Features Parte 1 (3 features) | 3-4 hrs | Alta |
| 8 | Features Parte 2 (3 features) | 3-4 hrs | Alta |
| 9 | How It Works | 2 hrs | Media |
| 10 | Waitlist Section | 2-3 hrs | Alta |
| 11 | FAQ Section | 2 hrs | Media |
| 12 | Footer | 1-2 hrs | Media |
| 13 | Scroll Animations Apple-style | 3-4 hrs | Alta |
| 14 | Performance & Optimizations | 2-3 hrs | Alta |
| 15 | Testing Cross-Browser | 3-4 hrs | Alta |
| 16 | Deploy | 1-2 hrs | Alta |

**Tiempo total estimado: 35-50 horas**

---

## Principios de Diseño Clave

### 1. Color Scheme
- **Dominante**: Negro (#0a0a0a, #111111, #1a1a1a)
- **Accent**: Verde brillante (#00FF88) y cyan (#00D4FF)
- **Gradientes**: Verde a cyan en elementos destacados
- **Glassmorphism**: Omnipresente en cards y overlays

### 2. Animaciones
- **Scroll-driven**: La mayoría de animaciones triggereadas por scroll
- **Smooth & Purposeful**: Cada animación tiene un propósito (no decorativas)
- **Performance First**: 60fps en desktop, 30fps+ en mobile
- **Reduced Motion**: Soporte para usuarios con preferencia de movimiento reducido

### 3. Typography
- **Headlines**: Muy grandes (text-6xl a text-8xl), font-black
- **Gradient Text**: En headlines principales y CTAs
- **Hierarchy**: Clara distinción entre niveles
- **Legibility**: Suficiente contraste, line-height apropiado

### 4. Spacing
- **Generous**: Mucho whitespace entre secciones
- **Consistent**: Sistema de spacing basado en Tailwind (4px increments)
- **Responsive**: Padding se reduce proporcionalmente en mobile

### 5. Imagery
- **Mockups Reales**: Screenshots actuales de la app (o placeholders realistas)
- **Device Frames**: Mockups con frames de dispositivos
- **Optimized**: WebP, lazy loading, next/image

---

## Assets Necesarios

### Mockups de la App
1. **Hero**: Laptop + móvil mostrando dashboard
2. **Pagos Recurrentes**: Screenshot de schedule
3. **Sobres**: Interfaz de envelopes
4. **Red Social**: Feed de transacciones
5. **QR Payments**: QR code grande
6. **Tarjeta Digital**: Card 3D visual
7. **Enterprise**: Dashboard analytics

### Iconos
- Todos de lucide-react
- Calendar, Envelope, Users, QR, CreditCard, Building, Bank, Lightning, etc.

### Logo
- Texto "ZappCash" con gradiente verde
- Opcional: ícono/símbolo representando lightning/zapeo

---

## Checklist Final

### Design
- [ ] Color scheme verde/negro implementado
- [ ] Glassmorphism en todos los cards
- [ ] Gradientes en CTAs y headlines
- [ ] Glow effects verdes
- [ ] Typography hierarchy clara

### Funcionalidad
- [ ] Navbar sticky funcional
- [ ] Hero con mockups
- [ ] Globe 3D renderiza correctamente
- [ ] 6 features con mockups y animaciones
- [ ] Waitlist form funcional
- [ ] FAQ accordion funciona
- [ ] Footer completo

### Animaciones
- [ ] Hero animations (stagger)
- [ ] Scroll-triggered animations en features
- [ ] Globe rotation y scale
- [ ] Parallax en backgrounds
- [ ] Smooth scroll behavior

### Performance
- [ ] Lighthouse >90
- [ ] Images optimizadas
- [ ] Code splitting
- [ ] No memory leaks
- [ ] Fast load time (<3s)

### Responsive
- [ ] Mobile layout funcional
- [ ] Tablet layout funcional
- [ ] Desktop optimizado
- [ ] Touch interactions
- [ ] Hamburger menu en mobile

### Accesibilidad
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Color contrast WCAG AA
- [ ] Focus indicators
- [ ] Reduced motion support

### Deploy
- [ ] Build exitoso
- [ ] Deploy en Vercel
- [ ] Custom domain (opcional)
- [ ] Analytics setup
- [ ] README completo

---

## Notas Importantes

1. **Claude Code**: No necesitas escribir todo el código, solo seguir las instrucciones de cada fase
2. **Iterativo**: Valida cada fase antes de continuar a la siguiente
3. **Mockups**: Usa placeholders inicialmente, reemplaza con assets reales cuando estén listos
4. **Performance**: Monitorea constantemente, especialmente el Globe 3D
5. **Mobile First**: Desarrolla pensando en mobile desde el inicio
6. **Git Commits**: Commit al final de cada fase
7. **Testing**: Prueba en browser real, no solo dev tools
8. **Feedback**: Ajusta según veas necesario, este plan es una guía

---

## Recursos de Referencia

- **Exodus Wallet**: https://www.exodus.com (referencia de diseño)
- **Apple.com**: Scroll animations
- **Linear.app**: Modern animations
- **Framer Motion Docs**: https://www.framer.com/motion/
- **React Three Fiber Docs**: https://docs.pmnd.rs/react-three-fiber
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

---

**¡Buena suerte con el desarrollo! 🚀**