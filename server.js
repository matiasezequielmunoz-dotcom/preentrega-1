import express from "express"; //intale npm install, en node_modules/express
import fs from "fs";
import dotenv from "dotenv"; //npm install

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3008;
const JSON_PATH = process.env.JSON_PATH || "./database/trailerflix.json";

//Cargar el dataset con la Filesystem API
// Se lee una sola vez al levantar el servidor y se guarda en memoria.
function cargarDatos() {
  try {
    const contenido = fs.readFileSync(JSON_PATH, "utf-8");
    const datos = JSON.parse(contenido);
    console.log(`Dataset cargado: ${datos.length} títulos`);
    return datos;
  } catch (error) {
    console.error("Error leyendo el JSON:", error.message);
    process.exit(1);
  }
}

const TRAILERFLIX = cargarDatos();

// Endpoints (Sub URL) 

// GET catalogo todo el catálogo completo
app.get("/catalogo", (req, res) => {
  res.json(TRAILERFLIX);
});

//  busca coincidencia parcial en el titulo
app.get("/titulo/:title", (req, res) => {
  const busqueda = req.params.title.toLowerCase();
  const resultado = TRAILERFLIX.filter((elemento) =>
    elemento.titulo.toLowerCase().includes(busqueda)
  );

  if (resultado.length === 0) {
    return res.status(404).json({
      mensaje: "No se encontraron títulos",
      tituloBuscado: req.params.title,
    });
  }
  res.json(resultado);
});

// filtro el catalogo por categoria (pelicula o serie).
app.get("/categoria/:cat", (req, res) => {
  const normalizar = (texto) =>
    texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const categoria = normalizar(req.params.cat);
  const resultado = TRAILERFLIX.filter(
    (elemento) => normalizar(elemento.categoria) === categoria
  );

  if (resultado.length === 0) {
    return res.status(404).json({
      mensaje: "No se encontraron resultados para esa categoría",
      categoriaBuscada: req.params.cat,
    });
  }
  res.json(resultado);
});

// busca titulos donde participa un actor
app.get("/reparto/:act", (req, res) => {
  const actor = req.params.act.toLowerCase();
  const resultado = TRAILERFLIX
    .filter((elemento) => elemento.reparto.toLowerCase().includes(actor))
    .map((elemento) => ({
          titulo: elemento.titulo,
      reparto: elemento.reparto,
    }));

  if (resultado.length === 0) {
    return res.status(404).json({
      mensaje: "No se encontraron títulos con ese actor/actriz",
      actorBuscado: req.params.act,
    });
  }
  res.json(resultado);
});

// devuelve el link del tráiler según el id
app.get("/trailer/:id", (req, res) => {
  const id = Number(req.params.id);
  const elemento = TRAILERFLIX.find((elemento) => elemento.id === id);

  if (!elemento) {
    return res.status(404).json({
      mensaje: "No se encontró un título con ese id",
      idBuscado: id,
    });
  }
  if (!elemento.trailer) {
    return res.status(404).json({
      mensaje: "Ese título no tiene trailer cargado",
      idBuscado: elemento.id,
      titulo: elemento.titulo,
    });
  }
  res.json({ id: elemento.id, titulo: elemento.titulo, trailer: elemento.trailer });
});


app.get("/", (req, res) => {
  res.send("API Trailerflix funcionando. Probá /catalogo");
});

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
