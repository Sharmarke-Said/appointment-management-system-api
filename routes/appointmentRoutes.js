const express = require("express");
const appointmentController = require("../Controllers/appointmentController");

const router = express.Router();

router
  .route("/")
  .get(appointmentController.getAllAppointments)
  .post(appointmentController.createAppointment);

router
  .route("/:id")
  .get(appointmentController.getAppointment)
  .put(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;
