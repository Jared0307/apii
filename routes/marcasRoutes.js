const express = require("express");
const marcasController = require("../controllers/marcasController");
const router = express.Router();

router.get("/", marcasController.listarMarcas);
router.get("/:id", marcasController.listarMarcasId);
router.post("/", marcasController.agregarMarcas);
router.put("/:id", marcasController.actualizarMarcas);
router.delete("/:id", marcasController.eliminarMarcas);

module.exports = router;
