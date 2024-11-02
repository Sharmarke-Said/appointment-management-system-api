const AppointmentModel = require("../models/AppointmentModel");
const appointmentValidation = require("../validations/appointmentValidation");

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find().populate(
      "userId categoryId"
    );
    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findById(
      req.params.id
    ).populate("userId categoryId");
    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }
    res
      .status(200)
      .json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { error } = appointmentValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.message });

    const appointment = await AppointmentModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: { appointment },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { error } = appointmentValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.message });

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
        .json({ status: "fail", message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ status: "success", data: { appointment } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(
      req.params.id
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ status: "fail", message: "Appointment not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
