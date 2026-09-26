import express from "express"; //intale npm install, en node_modules/express
import fs from "fs";
import dotenv from "dotenv"; //npm install

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JSON_PATH = process.env.JSON_PATH || "./data/trailerflix.json";

//Cargar el dataset con la Filesystem API
// Se lee una sola vez al levantar el servidor y se guarda en memoria.
let catalogo = [];

function cargarDatos() {
  try {
    const contenido = fs.readFileSync(JSON_PATH, "utf-8");
    catalogo = JSON.parse(contenido);
    console.log(`Dataset cargado: ${catalogo.length} títulos`);
  } catch (error) {
    console.error("Error leyendo el JSON:", error.message);
    process.exit(1);
  }
}

cargarDatos();

// Endpoints (Sub URL) 

// GET catalogo todo el catálogo completo
app.get("/catalogo", (req, res) => {
  res.json(catalogo);
});

//  busca coincidencia parcial en el titulo
app.get("/titulo/:title", (req, res) => {
  const busqueda = req.params.title.toLowerCase();
  const resultado = catalogo.filter((elemento) =>
    elemento.titulo.toLowerCase().includes(busqueda)
  );

  if (resultado.length === 0) {
    return res.status(404).json({ mensaje: "No se encontraron títulos" });
  }
  res.json(resultado);
});

// filtro el catalogo por categoria (pelicula o serie).
app.get("/categoria/:cat", (req, res) => {
  const categoria = req.params.cat.toLowerCase();
  const resultado = catalogo.filter(
    (elemento) => elemento.categoria.toLowerCase() === categoria
  );

  if (resultado.length === 0) {
    return res.status(404).json({ mensaje: "No se encontraron resultados para esa categoría" });
  }
  res.json(resultado);
});

// busca titulos donde participa un actor
app.get("/reparto/:act", (req, res) => {
  const actor = req.params.act.toLowerCase();
  const resultado = catalogo
    .filter((elemento) => elemento.reparto.toLowerCase().includes(actor))
    .map((elemento) => ({
      id: elemento.id,
      titulo: elemento.titulo,
      reparto: elemento.reparto,
    }));

  if (resultado.length === 0) {
    return res.status(404).json({ mensaje: "No se encontraron títulos con ese actor/actriz" });
  }
  res.json(resultado);
});

// devuelve el link del tráiler según el id
app.get("/trailer/:id", (req, res) => {
  const id = Number(req.params.id);
  const elemento = catalogo.find((elemento) => elemento.id === id);

  if (!elemento) {
    return res.status(404).json({ mensaje: "No se encontró un título con ese id" });
  }
  if (!elemento.trailer) {
    return res.status(404).json({ mensaje: "Ese título no tiene trailer cargado" });
  }
  res.json({ id: elemento.id, titulo: elemento.titulo, trailer: elemento.trailer });
});


app.get("/", (req, res) => {
  res.send("API Trailerflix funcionando. Probá /catalogo");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
