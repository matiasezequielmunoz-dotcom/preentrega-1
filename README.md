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