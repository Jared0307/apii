const express = require("express");
const ventasController = require("../controllers/ventasController");
const router = express.Router();

router.get("/", ventasController.listarVentas);
router.get("/:id", ventasController.listarVentasId);
router.post("/", ventasController.agregarVentas);
router.put("/:id", ventasController.actualizarVentas);
router.delete("/:id", ventasController.eliminarVentas);

module.exports = router;
