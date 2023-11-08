const db = require("../models/db");
const { param } = require("../routes/ventasRoutes");

// GET /ventas
exports.listarVentas = async (req, res) => {
  const sql = "SELECT * FROM ventas";

  try {
    const [ventas, fields] = await db.query(sql);
    res.status(200).json(ventas);
  } catch (err) {
    res.status(500).send({ mensaje: "Error en el servidor", error: err });
  }
};

exports.listarVentasId = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM ventas WHERE id_venta = ?";

  try {
    const [rows, fields] = await db.query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).send({ mensaje: "Venta no encontrado" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).send({ mensaje: "Error al buscar la venta", error: err });
  }
};

exports.agregarVentas = async (req, res) => {
  const { id_usuario, id_producto, cantidad, fecha_venta } = req.body;
  const sql = "INSERT INTO ventas (id_usuario, id_producto, cantidad, fecha_venta) VALUES (?,?,?,?)";

  try {
    const resultado = await db.query(sql, [id_usuario, id_producto, cantidad, fecha_venta]);
    res.status(200).send({ id_venta: resultado.insertId, ...req.body });
  } catch (err) {
    res.status(500).send({ mensaje: "Error al insertar la venta", error: err });
  }
};

exports.actualizarVentas = async (req, res) => {
  const id = req.params.id;
  const { id_usuario, id_producto, cantidad, fecha_venta } = req.body;

  const sql = "UPDATE ventas SET id_usuario = ?, id_producto = ?, cantidad = ?, fecha_venta = ? WHERE id_venta = ?";

  try {
    await db.query(sql, [id_usuario, id_producto, cantidad, fecha_venta, id]);
    res.status(200).send({ mensaje: "Venta actualizada" });
  } catch (err) {
    res.status(500).send({ mensaje: "Error al actualizar la venta", error: err });
  }
};

exports.eliminarVentas = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM ventas WHERE id_venta = ?";

  try {
    await db.query(sql, [id]);
    res.status(200).send({ mensaje: "Venta eliminada" });
  } catch (err) {
    res.status(500).send({ mensaje: "Error al eliminar la venta", error: err });
  }
};
