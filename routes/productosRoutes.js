const express = require("express");
const productosController = require("../controllers/productosControllers");
const router = express.Router();

router.get("/", productosController.listarProductos);
router.get("/:id", productosController.listarProductosId);
router.post("/", productosController.agregarProductos);
router.put("/:id", productosController.actualizarProductos);
router.delete("/:id", productosController.eliminarProductos);

module.exports = router;
