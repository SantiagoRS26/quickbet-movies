# QuickBet Movies - Guía de Configuración 🚀

Este documento proporciona una guía paso a paso para clonar, configurar y ejecutar el proyecto **QuickBet Movies**, un sitio web de películas creado con Next.js. 

---

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Clonación del Proyecto](#clonación-del-proyecto)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Ejecutar el Proyecto en Desarrollo](#ejecutar-el-proyecto-en-desarrollo)
5. [Compilar el Proyecto para Producción](#compilar-el-proyecto-para-producción)
6. [Errores Comunes y Soluciones](#errores-comunes-y-soluciones)

---

## Requisitos Previos

Asegúrate de tener instaladas las siguientes herramientas en tu máquina:
- **Node.js** (versión 16.8.0 o superior)  
  [Descargar Node.js](https://nodejs.org/)
- **npm** (instalado con Node.js) o **yarn**
- **Git**  
  [Descargar Git](https://git-scm.com/)

---

## Clonación del Proyecto

1. Abre una terminal o línea de comandos.
2. Clona este repositorio usando Git:
   ```bash
   git clone https://github.com/SantiagoRS26/quickbet-movies.git
   ```
3. Cambia al directorio del proyecto:
   ```bash
   cd quickbet-movies
   ```

---

## Instalación de Dependencias

Una vez en el directorio del proyecto, instala las dependencias necesarias:

```bash
npm install
```

O, si prefieres usar **yarn**:

```bash
yarn install
```

---

## Ejecutar el Proyecto en Desarrollo

Inicia el servidor de desarrollo con el siguiente comando:

```bash
npm run dev
```

O, si usas **yarn**:

```bash
yarn dev
```

Esto ejecutará el servidor de desarrollo y estará disponible en `http://localhost:3000`.

---

## Compilar el Proyecto para Producción

Para preparar el proyecto para producción, utiliza el siguiente comando:

```bash
npm run build
```

O, si usas **yarn**:

```bash
yarn build
```

Este comando generará una versión optimizada del proyecto en la carpeta `.next`.

Para previsualizar la compilación de producción, ejecuta:

```bash
npm run start
```

O, si usas **yarn**:

```bash
yarn start
```

---

## Errores Comunes y Soluciones

### Error: "Module not found"
Asegúrate de que todas las dependencias están instaladas correctamente ejecutando:
```bash
npm install
```

### Error: "Cannot find module 'next'"
Verifica que instalaste correctamente las dependencias en el directorio del proyecto.

---

¡Y eso es todo! Si tienes preguntas o problemas, no dudes en abrir un [issue en el repositorio](https://github.com/SantiagoRS26/quickbet-movies/issues). 🎉
