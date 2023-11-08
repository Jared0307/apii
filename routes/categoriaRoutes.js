const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const router = express.Router();

router.get("/", categoriaController.listarCategorias);
router.get("/:id", categoriaController.listarCategoriasId);
router.post("/", categoriaController.agregarCategoria);
router.put("/:id", categoriaController.actualizarCategoria);
router.delete("/:id", categoriaController.eliminarCategoria);

module.exports = router;
