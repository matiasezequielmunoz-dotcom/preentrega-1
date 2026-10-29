# Trailerflix: catálogo de películas y series

Este proyecto permite consultar un catálogo de películas y series desde el navegador. No es una página con botones o imágenes: al abrir cada dirección, vas a ver los datos del catálogo en formato de texto.

## Cómo probar el proyecto en Windows

### 1. Descargar el proyecto

En GitHub, seleccioná **Code** y luego **Download ZIP**. Cuando termine la descarga, hacé clic derecho sobre `preentrega-1-main.zip` y elegí **Extraer todo**. Se creará una carpeta llamada `preentrega-1-main`; recordá dónde la guardaste.

### 2. Instalar Node.js

Descargá e instalá la versión **LTS** de [Node.js](https://nodejs.org/en/download). Durante la instalación, podés aceptar las opciones predeterminadas. Si ya tenés Node.js instalado, podés continuar con el siguiente paso.

### 3. Abrir CMD (Símbolo del sistema) en la carpeta del proyecto

1. Abrí el **Explorador de archivos** y entrá a la carpeta `preentrega-1-main` que se creó al extraer el ZIP.
2. Confirmá que estás en la carpeta correcta: ahí tenés que ver archivos como `package.json` y `.env.example`.
3. En esa misma ventana del Explorador, hacé clic en la barra de direcciones, donde aparece la ubicación de la carpeta. No escribas `cmd` en el menú Inicio.
4. Escribí `cmd` y presioná **Enter**. Se abrirá el Símbolo del sistema ubicado directamente en la carpeta del proyecto, listo para ejecutar los pasos siguientes.

### 4. Preparar e iniciar el proyecto

Podés hacer clic en **Copiar** en el bloque y pegar todos los comandos juntos en CMD, o ejecutarlos de a uno por vez. CMD los procesa en orden. Si los ejecutás individualmente, presioná **Enter** después de cada uno y esperá a que termine antes de seguir:

```
npm install
if not exist .env copy .env.example .env
npm start
```

La primera línea descarga los componentes necesarios. La segunda crea el archivo de configuración si todavía no existe. La tercera inicia el proyecto. Cuando aparezca un mensaje indicando que el servidor funciona en `http://localhost:3008`, ya podés probarlo. Mientras la ventana de CMD esté abierta, el servidor seguirá funcionando. Para detenerlo, cerrá esa ventana; no hace falta hacer nada más.

### 5. Consultar el catálogo

Con el servidor en funcionamiento, abrí una pestaña del navegador y copiá una de estas direcciones en la barra superior:

- [Ver el catálogo completo](http://localhost:3008/catalogo)
- [Buscar títulos que contengan “stranger”](http://localhost:3008/titulo/stranger)
- [Ver las series](http://localhost:3008/categoria/serie)
- [Buscar títulos con Claire Foy en el reparto](http://localhost:3008/reparto/claire)
- [Ver el tráiler del título con ID 2](http://localhost:3008/trailer/2)

Las búsquedas no distinguen entre mayúsculas y minúsculas. Si no hay resultados para una búsqueda, el proyecto mostrará un mensaje informativo.

> Si Windows indica que `npm` no se reconoce, cerrá la ventana de comandos, abrila de nuevo siguiendo el paso 3 y volvé a ejecutar los comandos.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/catalogo` | Devuelve todo el catálogo |
| GET | `/titulo/:title` | Busca títulos que contengan ese texto |
| GET | `/categoria/:cat` | Filtra por categoría (Película, Serie, etc.) |
| GET | `/reparto/:act` | Busca títulos donde aparece ese actor o actriz |
| GET | `/trailer/:id` | Devuelve el enlace del tráiler de un título |

## Ejemplos

Con el servidor iniciado, podés probar estas direcciones en el navegador:

```text
GET /catalogo
GET /titulo/stranger
GET /categoria/serie
GET /reparto/claire
GET /trailer/2
```

## Notas

- El catálogo está incluido en `database/trailerflix.json` y se lee una sola vez al iniciar el servidor.
- El puerto y la ruta del catálogo se configuran en `.env`. Ese archivo no se sube al repositorio; se incluye `.env.example` como modelo.

## Correcciones realizadas

- Se configuró el puerto por defecto en `3008`.
- Se ubicó el catálogo en `database/trailerflix.json` y se carga una sola vez al iniciar el servidor, dentro de la constante `TRAILERFLIX`.
- Se corrigió el filtro por categoría para que encuentre “Película” tanto con tilde como sin ella.
- Se ajustó la respuesta de `/reparto/:act` para devolver únicamente el título y el reparto, sin el ID.
- Se agregaron respuestas 404 para rutas inexistentes y datos no encontrados, incluyendo el valor buscado cuando corresponde.
- Se quitó la nota que indicaba reemplazar el JSON por el dataset del curso.
- Se actualizaron las dependencias y se verificó con `npm audit` que ya no se reportan vulnerabilidades.
- Se ampliaron las instrucciones para que cualquier persona pueda instalar y probar la API.
