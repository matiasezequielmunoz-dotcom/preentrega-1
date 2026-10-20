# Preentrega 1 · API REST Trailerflix (Express)

## Cómo correrlo

```bash
npm install
cp .env.example .env
npm start
```

Por defecto queda en `http://localhost:3008`.

## Endpoints

| Método | Ruta                | Descripción                                      |
|--------|---------------------|---------------------------------------------------|
| GET    | `/catalogo`         | Devuelve todo el catálogo                          |
| GET    | `/titulo/:title`    | Busca títulos que contengan ese texto              |
| GET    | `/categoria/:cat`   | Filtra por categoría (Película, Serie, etc.)       |
| GET    | `/reparto/:act`     | Busca títulos donde aparece ese actor/actriz       |
| GET    | `/trailer/:id`      | Devuelve el link del tráiler de un id              |

## Ejemplos

```
GET /catalogo
GET /titulo/stranger
GET /categoria/serie
GET /reparto/pacino
GET /trailer/2
```

## Notas

- El JSON se lee una sola vez al arrancar el servidor (Filesystem API, `fs.readFileSync`).
- Puerto y ruta del dataset se configuran en `.env` (no se sube al repo, solo `.env.example`).

## Correcciones realizadas 

- Se configuró el puerto por defecto en `3008`.
- Se ubicó el dataset en `database/trailerflix.json` y se carga una sola vez al iniciar el servidor, dentro de la constante `TRAILERFLIX`.
- Se corrigió el filtro por categoría para que encuentre “Película” tanto con tilde como sin ella.
- Se ajustó la respuesta de `/reparto/:act` para devolver únicamente el título y el reparto, sin el ID.
- Se agregaron respuestas 404 para rutas inexistentes y datos no encontrados, incluyendo el valor buscado cuando corresponde.
- Se quitó la nota que indicaba reemplazar el JSON por el dataset del curso.