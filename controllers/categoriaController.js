const db = require("../models/db");
const { param } = require("../routes/categoriaRoutes");

// GET /categorias

exports.listarCategorias = async (req, res) => {
  const sql = "SELECT * FROM categorias";

  try {
    const [categorias, fields] = await db.query(sql);
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).send({ mensaje: "Error en el servidor" }, { error: err });
  }
};

exports.listarCategoriasId = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
  //console.log(id);

  try {
    const [rows, fields] = await db.query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).send({ mensaje: "Categoria no encontrada" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al buscar el categoria" }, { error: err });
  }
};

exports.agregarCategoria = async (req, res) => {
  const { nombre_categoria } = req.body;
  const sql = "INSERT INTO categorias (nombre_categoria) VALUE (?)";

  try {
    const resultado = await db.query(sql, [nombre_categoria]);
    res.status(200).send({ id: resultado.idInsertado, ...req.body });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al insertar la categoria" }, { error: err });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const id = req.params.id;
  const { nombre_categoria } = req.body;

  const sql =
    "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";

  try {
    await db.query(sql, [nombre_categoria, id]);
    res.status(200).send({ mensaje: "Categoria actualizada" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al actualizar la categoria" }, { error: err });
  }
};

exports.eliminarCategoria = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM categorias WHERE id_categoria = ?";

  try {
    await db.query(sql, [id]);
    res.status(200).send({ mensaje: "Categoria eliminada" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al eliminar la categoria" }, { error: err });
  }
};
