const express = require("express");
const estadosController = require("../controllers/estadosController");
const router = express.Router();

router.get("/", estadosController.listarEstados);
router.get("/:id", estadosController.listarEstadosId);
router.post("/", estadosController.agregarEstados);
router.put("/:id", estadosController.actualizarEstados);
router.delete("/:id", estadosController.eliminarEstados);

module.exports = router;
