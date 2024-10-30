const AppointmentModel = require("../models/AppointmentModel");
const appointmentValidation = require("../validations/appointmentValidation");

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const data = await AppointmentModel.find().populate(
      "userId categoryId"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Get a single appointment by ID
const getAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(
      req.params.id
    ).populate("userId categoryId");
    if (!appointment) {
      return res
        .status(404)
        .send({ status: false, message: "Appointment not found" });
    }
    res.status(200).send({ status: true, data: appointment });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { error } = appointmentValidation(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.message });
    }

    const appointment = new AppointmentModel(req.body);
    await appointment.save();
    res.status(201).send({
      status: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Update an appointment by ID
const updateAppointment = async (req, res) => {
  try {
    const { error } = appointmentValidation(req.body);
    if (error) {
      return res
        .status(400)
        .send({ status: false, message: error.message });
    }

    const appointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("userId categoryId");

    if (!appointment) {
      return res
        .status(404)
        .send({ status: false, message: "Appointment not found" });
    }

    res.status(200).send({
      status: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Delete an appointment by ID
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(
      req.params.id
    );
    if (!appointment) {
      return res
        .status(404)
        .send({ status: false, message: "Appointment not found" });
    }
    res.status(200).send({
      status: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
