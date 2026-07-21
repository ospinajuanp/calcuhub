# Agent Handoff — CalcuHub

## Proyecto
**CalcuHub** es una aplicación web de calculadoras online gratuitas construida como **SSG (Static Site Generation)** con **Next.js 16 (App Router)** y **React 19**. Reúne 33 calculadoras distribuidas en 4 categorías (`health`, `finance`, `date`, `utilities`) orientadas a SEO internacional (es/en/pt). Las calculadoras corren **100% del lado del cliente** (cálculo determinístico, sin backend, sin base de datos, sin telemetría). El catálogo (`calculatorsConfig`) y las traducciones (`dictionaries/{es,en,pt}.ts`) son la única fuente de verdad. Todas las páginas de calculadora y categoría se prerendizan en build-time vía `generateStaticParams` y `generateMetadata`. El SEO se refuerza con JSON-LD propio (`Application`, `CollectionPage`, `BreadcrumbList`, `WebSite`). El estado de UI (idioma + tema) se persiste en `localStorage` y se aplica vía `document.documentElement.dataset.theme`. Licencia: **PolyForm Noncommercial 1.0.0** (`LICENSE.md`).

## Repositorio
- **GitHub / URL:** `https://github.com/ospinajuanp/calcuhub` (origin: `git@github.com:ospinajuanp/calcuhub.git`)
- **Rama (Branch):** `main` (sincronizada con `origin/main`)
- **Estado del árbol de trabajo (Working Tree):** **Pendiente de commit**. 16 archivos modificados + 13 directorios/archivos nuevos sin trackear (todas las calculadoras añadidas tras el commit `7a4b014` y los nuevos JSON-LD). No hay `git stash` ni cambios sin guardar adicionales.

## Convenciones Clave
- **Enrutamiento y Estado:**
  - **Enrutamiento basado en App Router** con `params: Promise<{ slug: string }>` (Next.js 15+ idiom). Página server (`page.tsx`) → render client (`XClient.tsx`).
  - **Estado global mínimo** vía dos Contexts propios: `LanguageProvider` (`src/core/i18n/LanguageContext.tsx`) y `ThemeProvider` (`src/core/themes/ThemeContext.tsx`). Ambos son `'use client'`.
  - **Single source of truth** del catálogo: `src/core/config/calculator.ts` (lista tipada `CalculatorConfig[]` con `id`, `slug`, `categoryId`, `iconId`, `i18nKey`, `featured`). Helper `getCalculatorBySlug(slug)`.
  - **Single source of truth** de iconos: `src/core/ui/iconRegistry.ts` (`Record<AppIconId, LucideIcon>`).
  - **Single source of truth** de traducciones: `src/core/i18n/dictionaries/{es,en,pt}.ts` consumidas vía `useTranslation()` hook.
- **Datos y Persistencia:**
  - **Sin backend, sin DB, sin APIs externas.** Datos hardcodeados en TS.
  - Estado persistente del cliente: `localStorage` (claves: `calcuhub-locale`, `qch-theme`).
  - Tasas de cambio de moneda (`EXCHANGE_RATES` en `src/features/calculators/finance/currency/currency.utils.ts`) **hardcodeadas** — no hay integración con una API FX en tiempo real.
  - `metadataBase` apunta a `process.env.NEXT_PUBLIC_SITE_URL` con fallback `https://calcuhub-lovat.vercel.app`.
- **Estilos de Código y Reglas:**
  - **TypeScript `strict: true`**, target `ES2017`, `moduleResolution: "bundler"`.
  - **Alias de import:** `@/*` → `./src/*`.
  - **Linter:** `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`. Comando: `npm run lint` (alias de `eslint`).
  - **React Compiler activado** (`reactCompiler: true` en `next.config.ts`) — `babel-plugin-react-compiler@1.0.0`. No usar memoización manual con `useMemo`/`useCallback` salvo que sea estrictamente necesario (el compiler lo infiere).
  - **Estilos:** CSS plano global modularizado en `src/styles/{base,layout,themes,tokens,ui}.css`, importados desde `src/app/globals.css`. **Tema activo** se aplica vía CSS variables según `[data-theme="…"]` en `themes.css`. **No hay Tailwind, no hay CSS-in-JS.**
  - **Patrón obligatorio en cada calculadora:** componente `'use client'` con `useState<number | null>` o `useState<string>` por input, helper de validación al inicio de `handleCalculate`, y `useTranslation` para todas las etiquetas visibles. Inputs llevan `id` y `<label htmlFor>`.
  - **Patrón en diccionarios:** las claves de cálculo (`categories.{id}`, `calculators.{id}`) son discriminadas por `CalculatorId`/`CategoryId`. Las cadenas españolas y portuguesas terminan con `.` — el código lo elimina con `.replace('.', '')` en los puntos críticos.
- **Variables de Entorno:**
  - **`NEXT_PUBLIC_SITE_URL`** (cliente/servidor): URL absoluta usada en `metadataBase`, `robots`, `sitemap`, `JsonLd`, `BreadcrumbJsonLd`. Default: `https://calcuhub-lovat.vercel.app`. **No existe `.env.example`.**

## Gotchas Importantes (CRÍTICO)
- **`useTranslation()` lanza si se usa fuera de `LanguageProvider`**: `LanguageContext` expone `undefined` por defecto y `useLanguage()` ejecuta `throw new Error('useLanguage debe usarse dentro de LanguageProvider')`. Cualquier componente que renderice dentro de `RootLayoutContent` está cubierto; pero si se reordena el árbol (p. ej. para usar la calculadora dentro de una ruta propia con nuevo layout) se rompe.
- **Orden de Providers en `layout.tsx` (`src/app/layout.tsx:91-106`)**: el orden actual es **`<ThemeProvider>` → `<LanguageProvider>` → contenido**. `ThemeSwitcher` consume `useTheme()` (de `ThemeProvider`) y `useTranslation()` (de `LanguageProvider`); ambos providers deben envolver al `Header`. **Invertir el orden** rompe el `ThemeSwitcher` o el `LanguageSwitcher`.
- **`CalculatorClient` fuerza remontaje con `key={version}` (`src/app/calculator/[slug]/CalculatorClient.tsx:57`)**: el botón `btn-reload` (icono `Trash` de `lucide-react`) incrementa `version` → React desmonta y vuelve a montar la calculadora. Esto **reinicia todos los inputs a sus `useState` iniciales**. Útil cuando se quiere "limpiar" pero **no se debe asumir** que el estado interno sobrevive.
- **Validación con `parseNumber` permite `NaN`**: `parseFloat('')` retorna `NaN`, no `null`. Varios `handleCalculate` usan `!weightValue` para detectar `NaN`/`0`/`undefined`. Esto es seguro para entradas vacías, **pero un input con valor válido `0`** (p. ej. porcentaje = 0) cae en el mismo branch de invalidación. Donde `0` es válido (p. ej. `SpeedCalculator:28` y `PercentageCalculator:24`), se usa `!val && val !== 0`. Mantén esta convención.
- **`parseNumber` (`src/features/calculators/utils.ts:1-4`)** retorna `number`, no `number | null`. Su tipo declarado es `parseNumber(number: string)` → `parseFloat(number)`. Si se le pasa `null`, devuelve `NaN`.
- **Filtrado redundante en `HomeClient` (`src/app/HomeClient.tsx:12-33`)**: hay un doble `featured`: primero `calculatorsConfig.filter(c => c.featured)` y luego un `if (!calc.featured) return null` muerto dentro del `.map`. Inofensivo, pero ruido. Cualquier refactor que toque este archivo debería eliminar uno.
- **Peligro de hidratación por `localStorage`**: `LanguageContext` y `ThemeContext` leen `localStorage` **dentro del `useState` initializer** (`getInitialTheme()`, `setLocale` inicial). Esto difiere el render del servidor vs cliente. Mitigado globalmente con `<html lang={DEFAULT_LOCALE} suppressHydrationWarning>` en `layout.tsx:116`. **No eliminar el `suppressHydrationWarning`**: provocarías mismatch warning en consola en cada carga.
- **Claves compuestas peligrosas en `AreaCalculator` (`src/features/calculators/utilities/area/AreaCalculator.tsx:50-90`)**: múltiples inputs usan `id="area-p1"`, `id="area-p2"`, `id="area-p3"`. No rompe runtime, pero rompe la regla de `id` único en el DOM y la asociación `<label htmlFor>` (varias labels apuntan al mismo id). **Corregir si se quiere accesibilidad estricta.**
- **`HeartRateCalculator` y `DogAgeCalculator` y `BodyFatCalculator` usan clave dinámica por template string** (`t[\`zone${N}Name\` as keyof typeof t]`, `t[\`dogAge${…}Stage\``], `t[\`bodyFat${…}\``]). Si una traducción renombra la clave, **TypeScript no se entera** (es un `as keyof typeof t` que pasa porque la inferencia es estructural). Riesgo alto de regresiones silenciosas en i18n.
- **`BloodPressureCalculator` tiene rama muerta**: `classifyBloodPressure` (`src/features/calculators/health/bloodPressure/bloodPressure.utils.ts:27-30`) deja la rama `crisis` como `else` final, inalcanzable porque las comparaciones previas cubren `[140+ | 90+, 130+ | 80+ ...]`. Devuelve siempre `crisis` solo si algo numéricamente raro entra. Cosmético, no urgente.
- **Eliminación frágil del punto final en cadenas i18n**: `CalculatorClient`, `CategoryClient`, `HomeClient` usan `.replace('.', '')` que **solo elimina la PRIMERA coincidencia**. Cualquier traducción que contenga otro `.` intermedio (p. ej. `'Cat. Utilidades.'`) quedará con basura visible. Convención vigente: terminar la cadena traducida con **un único `.`** al final.
- **`CalculatorJsonLd` y `CategoryJsonLd` ahora son Server Components** (sin `'use client'`), pero `BreadcrumbJsonLd` también. **Si se les pasa `category` con el literal del idioma activo** no se renderiza traducido (se calcula en server con `DEFAULT_LOCALE`). Aceptable para crawlers, pero los strings JSON-LD siempre se sirven en inglés — no en el idioma del usuario.
- **`CalculatorClient` recibe `calculator` ya resuelto en server** (`src/app/calculator/[slug]/page.tsx`). Si se añade una calculadora al array `calculatorsConfig` **pero se olvida importarla en `calculatorRegistry.ts`**, la ruta se genera igual pero el render muestra `"This calculator is not yet implemented. Please check back later."` (ver `CalculatorClient.tsx:60`).
- **`src/app/headers.ts` está huérfano**: define `middleware` y `config.matcher`, pero **no se nombra `middleware.ts`** en la raíz → Next.js **NO** lo registra como middleware. Es código muerto. Renombrar a `src/middleware.ts` si se quiere aplicar las cabeceras `X-Frame-Options`, `Referrer-Policy`, etc.
- **`NEXT_PUBLIC_SITE_URL` por defecto en todos los componentes individuales**: `JsonLd`, `BreadcrumbJsonLd`, `CalculatorJsonLd`, `CategoryJsonLd`, `layout.tsx`, `robots.ts`, `sitemap.ts` **redefinen `BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://calcuhub-lovat.vercel.app'`**. Cambiar el dominio requiere editar 8+ archivos. Considerar centralizar.
- **`reactCompiler: true` + React 19**: cualquier mutación durante render o side-effect sin `useEffect` será reportada por el compiler. No introducir lógica imperativa dentro del cuerpo de los componentes.
- **`HeartRateCalculator` muta `result` directo con número** (`result.maxHr = 220 - age` en `heartRate.utils.ts:11`). No usa `Math.round` en zonas superiores (zona5 llega hasta `maxHr` crudo). No romper contrato.
- **`currency.utils.ts` devuelve tasa calculada, no API real** (`src/features/calculators/finance/currency/currency.utils.ts:6-14`). Las tasas son estáticas desde fecha desconocida. Documentar si se va a presentar como "live".
- **`CalculatorClient` no limpia `resultCalculate` al resetear inputs** (`CompoundInterest.tsx:30-32`): `setAmount(null)` + `setResultCalculate(tCommon.badInput)`. Esto imprime el mensaje de error en lugar de quedar en blanco al forzar remonte por `key={version}`. Esto se considera aceptable pero tener presente.

## Arquitectura y Archivos Relevantes
- `package.json:13-17` — Dependencias runtime: `next@16.0.7`, `react@19.2.0`, `react-dom@19.2.0`, `lucide-react@^0.553.0`.
- `next.config.ts:4` — **Activa `reactCompiler: true`** (React Compiler). Configuración de `images` con AVIF/WebP y `deviceSizes`.
- `tsconfig.json:21-23` — Alias `@/*` → `./src/*`; `strict: true`.
- `eslint.config.mjs` — Config flat con `eslint-config-next/core-web-vitals + typescript`.
- `src/app/layout.tsx:89-122` — **Providers order** y `metadataBase`. **Punto crítico.**
- `src/app/page.tsx` + `src/app/HomeClient.tsx` — Landing: lista calculadoras `featured` y todas las categorías.
- `src/app/calculator/[slug]/page.tsx` — Server route con `generateStaticParams` (todas las calculadoras) y `generateMetadata` (SEO + OG + Twitter). Delega a `CalculatorClient`.
- `src/app/calculator/[slug]/CalculatorClient.tsx` — Resuelve la calculadora por `calculator.id` desde `calculatorRegistry`, renderiza JSON-LD (`CalculatorJsonLd` + `BreadcrumbJsonLd`) y expone botón reset (`btn-reload` con `key={version}`).
- `src/app/category/[slug]/page.tsx` — Server route con `generateStaticParams` + `generateMetadata`. Filtra `calculatorsConfig` por `categoryId`.
- `src/app/category/[slug]/CategoryClient.tsx` — Renderiza grid de calculadoras por categoría + JSON-LD de `CollectionPage` + breadcrumb.
- `src/app/not-found.tsx` — Página 404 con CTA al home.
- `src/app/robots.ts` — `MetadataRoute.Robots` con `disallow: ['/private/', '/api/']`.
- `src/app/sitemap.ts` — `MetadataRoute.Sitemap`: `/`, las 4 categorías y las 33 calculadoras.
- `src/app/headers.ts` — **Archivo huérfano** que define middleware. **No está siendo cargado por Next.js.**
- `src/core/config/calculator.ts` — Lista tipada de las **33** calculadoras (`CalculatorId`, `CalculatorConfig`).
- `src/core/config/categories.ts` — 4 categorías: `health`, `finance`, `date`, `utilities`.
- `src/core/i18n/LanguageContext.tsx` — Provider con persistencia en `localStorage` (`calcuhub-locale`).
- `src/core/i18n/useTranslation.ts` — Hook que desempaca `common` / `categories` / `calculators` desde el diccionario activo.
- `src/core/i18n/dictionaries/{es,en,pt}.ts` — Diccionarios estáticos con claves por calculadora. Deben mantenerse sincronizados (los 3 archivos); las entradas nuevas requieren ir en los 3.
- `src/core/i18n/locales.ts` — Tipos `Locale = 'es' | 'en' | 'pt'` y `DEFAULT_LOCALE = 'en'` (ojo: a pesar de los `locale: 'es_ES'` en metadata).
- `src/core/themes/ThemeContext.tsx` — Themes: `light`, `dark`, `retro`, `carton`, `cartoon`. Persistencia en `localStorage` (`qch-theme`).
- `src/core/ui/iconRegistry.ts` — Mapeo `AppIconId → LucideIcon`. Tipado estricto; cualquier nuevo icono requiere añadir tanto el literal al union como el mapping.
- `src/components/layout/{Header,Footer,LanguageSwitcher,ThemeSwitcher}.tsx` — Layout shell.
- `src/components/ui/BtnBack.tsx` — Botón flotante "volver", oculto en `/`.
- `src/components/seo/JsonLd.tsx`, `CalculatorJsonLd.tsx`, `CategoryJsonLd.tsx`, `BreadcrumbJsonLd.tsx` — Fragmentos JSON-LD para SEO. **Sin `'use client'`** (server components) — importante para evitar hydration issues con `dangerouslySetInnerHTML`.
- `src/features/calculators/calculatorRegistry.ts` — Mapa `id → Component`. **Aumentar este archivo al añadir nuevas calculadoras** (`import + entry`).
- `src/features/calculators/utils.ts` — Helpers globales: `parseNumber`, `percentage`, `roundTwo`, **`formatNumber`** (locale `es-ES`, 2 decimales máx).
- `src/features/calculators/<cat>/<nombre>/<Calculator>.tsx` + `.utils.ts` — Par obligatorio por calculadora. Algunos tienen `.config.ts` y `.tips.md` vacíos (placeholders legacy).
- `src/styles/{tokens,themes,base,layout,ui}.css` — Sistema de tokens + temas (CSS variables).
- `public/favicon.ico` + `public/google216b68ec8ae3fe88.html` — Verificación de Google Search Console.

## Modelos de Datos y Esquemas
```ts
// src/core/config/categories.ts
type CategoryId = 'health' | 'finance' | 'date' | 'utilities';
interface CategoryConfig { id, slug, iconId: AppIconId, i18nKey }

// src/core/config/calculator.ts
type CalculatorId =
  | 'imc' | 'tmb' | 'waterIntake' | 'tdee' | 'ovulation' | 'sleep' | 'childBmi'
  | 'bloodPressure' | 'heartRate' | 'bodyFat' | 'dueDate'
  | 'compoundInterest' | 'loanPayments' | 'tax' | 'mortgage' | 'tips'
  | 'discount' | 'savings' | 'currency' | 'roi' | 'profitMargin' | 'amortization' | 'investment'
  | 'exactAge' | 'dateDiff'
  | 'units' | 'percentage' | 'speed' | 'grades' | 'temperature' | 'dogAge' | 'area' | 'time';
interface CalculatorConfig {
  id: CalculatorId; slug: string; categoryId: CategoryId;
  iconId: AppIconId; i18nKey: `calculators.${CalculatorId}`; featured?: boolean;
}

// src/core/ui/iconRegistry.ts
type AppIconId =
  | 'calculator' | 'health' | 'finance' | 'date' | 'utilities'
  | 'imc' | 'tmb' | 'waterIntake' | 'compoundInterest' | 'loanPayments' | 'tax'
  | 'exactAge' | 'mortgage' | 'tips' | 'discount' | 'tdee' | 'ovulation' | 'sleep'
  | 'childBmi' | 'savings' | 'currency' | 'dateDiff' | 'units' | 'percentage'
  | 'speed' | 'grades' | 'roi' | 'profitMargin' | 'bloodPressure' | 'heartRate'
  | 'temperature' | 'dogAge' | 'area' | 'dueDate' | 'bodyFat' | 'time'
  | 'amortization' | 'investment'
  | 'socialLinkedin' | 'socialGithub' | 'socialPortfolio';
Record<AppIconId, LucideIcon>

// src/core/i18n/locales.ts
type Locale = 'es' | 'en' | 'pt';
const DEFAULT_LOCALE: Locale = 'en';
const SUPPORTED_LOCALES: Locale[] = ['es', 'en', 'pt'];

// src/core/themes/ThemeContext.tsx
type ThemeName = 'light' | 'dark' | 'retro' | 'carton' | 'cartoon';

// src/core/i18n/dictionaries/index.ts
type Dictionary = typeof esDictionary;  // un mismo tipo único para los 3 idiomas
```

**Forma canónica del diccionario** (claves en singular para cada calculadora):
```ts
common: { siteName, tagline, categoriesTitle, categoriesDescription, calculatorsTitle,
          calculatorsDescription, madeIn, badInput, theme: { light, dark, retro, cardboard, cartoon } }
categories: { health: { name, description }, finance: {…}, date: {…}, utilities: {…} }
calculators: {
  imc: { name, shortDescription, calculatorExplanation, bmiTitle, bmiWeightLabel, … },
  …  // 33 entradas
}
```

**Resultados típicos de utils** (cada calculadora define los suyos):
- `ImcCategoryKey = 'underweight' | 'normal' | 'overweight' | 'obesity'`
- `MortgageResult`, `RoiResult`, `InvestmentResult`, `AmortizationResult`, `HeartRateZonesResult`, `BloodPressureResult`, `BodyFatResult`, `SleepResult`, `OvulationResult`, `DogAgeResult`, `CurrencyResult`, `PercentageResult`, `ExactAgeResult`, `DateDiffResult`, `SavingsResult`, etc.

## Compilación y Scripts (Build & Scripts)
- **`npm run dev`** → `next dev` (puerto 3000 por defecto).
- **`npm run build`** → `next build`. Prerrenderiza las 33 calculadoras + 4 categorías + home. **El primer build sin commit puede fallar si existen referencias nuevas sin tipado.**
- **`npm run start`** → `next start` (requiere build previo).
- **`npm run lint`** → `eslint` (flat config).
- **Sin scripts de migración, tests, ni package.json extra.** No hay Jest/Vitest/Playwright configurados.
- **Generación estática**: `generateStaticParams` exporta todos los `slug`s en build-time, así que el sitio es totalmente prerenderizable (compatible con `output: 'export'` salvo por el uso de `Image` con assets locales).
- **React Compiler** está activo: evita `useMemo`/`useCallback` redundantes y rechaza mutaciones durante render.

## Estado Actual y Funcionalidades
- **33 calculadoras funcionales** (todas con `useState`, validación, i18n en 3 idiomas y SEO):
  - **Salud (11):** `imc`, `tmb`, `waterIntake`, `tdee`, `ovulation`, `sleep`, `childBmi`, `bloodPressure`, `heartRate`, `bodyFat`, `dueDate`.
  - **Finanzas (10):** `compoundInterest`, `loanPayments`, `tax`, `mortgage`, `tips`, `discount`, `savings`, `currency`, `roi`, `profitMargin`, `amortization`, `investment`.
  - **Fecha (2):** `exactAge`, `dateDiff`.
  - **Utilidades (8):** `units`, `percentage`, `speed`, `grades`, `temperature`, `dogAge`, `area`, `time`.
- **i18n completa** en `es`, `en`, `pt` para todas las calculadoras (incluyendo las añadidas: `time`, `area`, `temperature`, `bloodPressure`, `heartRate`, `bodyFat`, `dueDate`, `dogAge`, `profitMargin`, `roi`, `amortization`, `investment`).
- **Modo claro/oscuro + 3 temas extra** (`retro`, `carton`, `cartoon`) — persistencia local.
- **JSON-LD completo** en home (`WebSite`), categoría (`CollectionPage`) y calculadora (`WebApplication` + `BreadcrumbList`).
- **Sitemap y robots** generadas automáticamente.
- **Página 404 personalizada** y `theme-color: #337BFF` para chrome mobile.
- **Botón "Back"** flotante en todas las páginas excepto `/`.
- **Header con logo local** (`Image next/image` con `logo.png` desde `src/assets`).
- **`category-grid` responsive** (`repeat(2, 1fr) → 1fr`).

## Registro de Cambios Recientes (Session Commit Log)
- **`7a4b014` (2026-07-16) — `docs: license under Polyform Noncommercial 1.0.0`** — Licencia cambiada; copyright a Juan Pablo Ospina Restrepo.
- **`98b9ca7` (feat: add 14 new calculators and fix critical bugs, 2026-06-19)** — Añadió TDEE, Ovulation, Sleep, Child BMI, Mortgage, Tips, Discount, Savings, Currency, Date Diff, Units, Percentage, Speed, Grades. Introdujo la categoría `utilities`. Bugfixes: eliminado `alert()` debug en `WaterIntake`, validación que se ejecutaba en render en `LoanPayments`/`Tax`, mensaje de error hardcodeado en español en IMC, traducciones portuguesas faltantes en TMB, renombrado `interestRage → interestRate`, fix del ciclo de `useEffect` en `ThemeContext`, persistencia de locale en `localStorage`, accesibilidad (`id`/`htmlFor`/`aria-label`, `theme-color`, contraste). Predecesor de la base actual.
- **`1566ef0` (refactory seo)** — Movió JSON-LD inline a componentes reutilizables y separó `BreadcrumbJsonLd`.
- **`cba44cb` — Añadido el módulo de calculadora `tax` (IVA/impuesto).**
- **`3ff821c` — Extrajo `loanPayments.utils.ts` + global `utils.ts` (`parseNumber`, `percentage`, `roundTwo`).**
- **`11c854f` — Botón de reiniciar calculadora con icono `Trash` (estado `version` que actúa como `key`).**
- **`40fca8d` — Ajustes finales i18n y refuerzo del botón reset.**
- **`e489b0b` — Calculadora de interés compuesto con número de capitalizaciones.**
- **`ae713d4` — Añadidas traducciones ES y PT.**
- **`bf3a1bf` — Metadata enriquecida + logo en header y JSON-LD.**
- **`a460d3b`, `19707fc`, `946273d`** — Iteraciones de bug-fix de iconos, duplicación de claves en diccionarios y estilos.

Tras `7a4b014` (HEAD), **el working tree tiene cambios sin commitear** que representan la 2ª hornada de calculadoras (12 nuevas: `roi`, `profitMargin`, `bloodPressure`, `heartRate`, `temperature`, `dogAge`, `area`, `dueDate`, `bodyFat`, `time`, `amortization`, `investment`) + refactor de los JSON-LD (ahora server components, con URL prefijada y agregado `aggregateRating`/`abstract`/`SearchAction`), refactor del `BASE_URL` y limpieza del `CategoryClient`.

## Tareas Pendientes / En Pausa (Open / Parked Tasks)
- **Commitear las 12 nuevas calculadoras (`amortization`, `investment`, `roi`, `profitMargin`, `bloodPressure`, `heartRate`, `temperature`, `dogAge`, `area`, `dueDate`, `bodyFat`, `time`) y el refactor de SEO** que están en working tree sin trackear.
- **Centralizar `BASE_URL`** en un solo módulo (hoy está duplicado en `layout.tsx`, `robots.ts`, `sitemap.ts`, `JsonLd.tsx`, `CalculatorJsonLd.tsx`, `CategoryJsonLd.tsx`, `BreadcrumbJsonLd.tsx`).
- **Decidir sobre `src/app/headers.ts`**: renombrarlo a `src/middleware.ts` para activar las cabeceras de seguridad (`X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `X-DNS-Prefetch-Control`) **o eliminarlo**.
- **Añadir `og-image.png` y `apple-touch-icon.png`** en `public/` (referenciados en `layout.tsx:56,82` pero no existen — actualmente 404 silencioso en redes sociales).
- **Refactor `HomeClient.tsx:12-33`**: eliminar el doble `featured` (`.filter(...).map(...).filter(() => false)`) — código muerto.
- **Refactor `AreaCalculator.tsx:50-90`**: asignar `id`s únicos por input (`area-side`, `area-width`, `area-base1`, etc.) para cumplir WCAG y asociar `<label htmlFor>` correctamente.
- **Eliminar rama muerta** en `classifyBloodPressure` (`bloodPressure.utils.ts:27-30`) o documentar su propósito.
- **Tests**: 0% de cobertura. No hay framework instalado. Considerar añadir **Vitest + React Testing Library** como mínimo para los `utils.ts` puros (`imc.utils`, `compoundInterest.utils`, `currency.utils`, `mortgage.utils`, `dateDiff.utils`, `heartRate.utils`, `bodyFat.utils`, `investment.utils`, etc.).
- **i18n**: revisar que los placeholders `{{bmi}}`, `{{tmb}}`, `{{min}}`, `{{max}}`, `{{loan}}`, `{{paid}}`, `{{time}}`, `{{amount}}`, `{{tax}}`, `{{payment}}` siguen vigentes. **Renombrar las claves dinámicas** en `HeartRateCalculator`, `BodyFatCalculator` y `DogAgeCalculator` a referencias tipadas (evita regresiones silenciosas).
- **Mejora de `parseNumber`**: convertirlo a `(s: string) => number | null` y propagar el tipo para fortalecer las validaciones (hoy retorna `NaN` que se confunde con `0` válido).
- **Accesibilidad**: añadir `aria-live="polite"` en las regiones `.calculator-result-card` para anunciar resultados a lectores de pantalla.
- **`<svg>` sized icons**: hoy `icon` tiene `min-width: 48px` que puede no ser deseado en cards pequeñas. Considerar variantes responsive.
- **Datos reales del conversor de moneda**: integrar una API FX (exchangerate.host, frankfurter.app) si se quiere presentar como live.
- **Verificar el listado en `robots.txt` y la metadata `og-image`**: la URL hardcodeada `https://calcuhub-lovat.vercel.app/og-image.png` apunta a `next.config.ts:17`. Si se cambia de host, ajustar todo en sincronía.
