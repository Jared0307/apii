const db = require("../models/db");
const { param } = require("../routes/estadosRoutes");

// GET /estados

exports.listarEstados = async (req, res) => {
  const sql = "SELECT * FROM estados";

  try {
    const [estados, fields] = await db.query(sql);
    res.status(200).json(estados);
  } catch (err) {
    res.status(500).send({ mensaje: "Error en el servidor" }, { error: err });
  }
};

exports.listarEstadosId = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM estados WHERE id_estado = ?";
  //console.log(id);

  try {
    const [rows, fields] = await db.query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).send({ mensaje: "Estado no encontrado" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al buscar el Estado" }, { error: err });
  }
};

exports.agregarEstados = async (req, res) => {
  const { nombre_estado } = req.body;
  const sql = "INSERT INTO estados (nombre_estado) VALUE (?)";

  try {
    const resultado = await db.query(sql, [nombre_estado]);
    res.status(200).send({ id: resultado.idInsertado, ...req.body });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al insertar el estado" }, { error: err });
  }
};

exports.actualizarEstados = async (req, res) => {
  const id = req.params.id;
  const { nombre_estado } = req.body;

  const sql =
    "UPDATE estados SET nombre_estado = ? WHERE id_estado = ?";

  try {
    await db.query(sql, [nombre_estado, id]);
    res.status(200).send({ mensaje: "Estado actualizado" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al actualizar el estado" }, { error: err });
  }
};

exports.eliminarEstados = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM estados WHERE id_estado = ?";

  try {
    await db.query(sql, [id]);
    res.status(200).send({ mensaje: "estado eliminado" });
  } catch (err) {
    res
      .status(500)
      .send({ mensaje: "Error al eliminar el estado" }, { error: err });
  }
};
