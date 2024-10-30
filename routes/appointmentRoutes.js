const express = require("express");
const {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../Controllers/appointmentController");

const router = express.Router();

router
  .route("/appointments")
  .get(getAllAppointments)
  .post(createAppointment);

router
  .route("/appointments/:id")
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
