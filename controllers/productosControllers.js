const db = require("../models/db");

// GET /productos
exports.listarProductos = async (req, res) => {
  const sql = "SELECT * FROM productos";

  try {
    const [productos, fields] = await db.query(sql);
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error en el servidor", error: err });
  }
};

// GET /productos/:id
exports.listarProductosId = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM productos WHERE id_producto = ?";

  try {
    const [rows, fields] = await db.query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
      return;
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al buscar el producto", error: err });
  }
};

// POST /productos
exports.agregarProductos = async (req, res) => {
  const { nombre_producto, precio, descripcion, imagen, stock, id_categoria, id_marca, id_estado } = req.body;
  const sql = "INSERT INTO productos (nombre_producto, precio, descripcion, imagen, stock, id_categoria, id_marca, id_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const resultado = await db.query(sql, [nombre_producto, precio, descripcion, imagen, stock, id_categoria, id_marca, id_estado]);
    res.status(201).json({ id: resultado.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al insertar el producto", error: err });
  }
};

// PUT /productos/:id
exports.actualizarProductos = async (req, res) => {
  const id = req.params.id;
  const { nombre_producto, precio, descripcion, imagen, stock, id_categoria, id_marca, id_estado } = req.body;
  const sql = "UPDATE productos SET nombre_producto = ?, precio = ?, descripcion = ?, imagen = ?, stock = ?, id_categoria = ?, id_marca = ?, id_estado = ? WHERE id_producto = ?";

  try {
    await db.query(sql, [nombre_producto, precio, descripcion, imagen, stock, id_categoria, id_marca, id_estado, id]);
    res.status(200).json({ mensaje: "Producto actualizado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al actualizar el producto", error: err });
  }
};

// DELETE /productos/:id
exports.eliminarProductos = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM productos WHERE id_producto = ?";

  try {
    await db.query(sql, [id]);
    res.status(200).json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar el producto", error: err });
  }
};
