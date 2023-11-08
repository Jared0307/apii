const express = require("express");
const rolesController = require("../controllers/rolesController");
const router = express.Router();

router.get("/", rolesController.listarRoles);
router.get("/:id", rolesController.listarRolesId);
router.post("/", rolesController.agregarRoles);
router.put("/:id", rolesController.actualizarRoles);
router.delete("/:id", rolesController.eliminarRoles);

module.exports = router;
