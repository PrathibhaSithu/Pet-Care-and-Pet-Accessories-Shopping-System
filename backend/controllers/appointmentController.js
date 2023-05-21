const Appointment = require('../models/appointmentModel')

// Fetch all appointments
const getAppointments = (req, res) => {

    Appointment.find()
    .then((appointments) => res.status(200).json(appointments))
    .catch((err) => res.status(400).json("Error: " + err));
    
}

// Fetch a single appointment
const getAppointmentById = (req, res) => {

    Appointment.findById(req.params.id)
    .then((appointment) => res.status(200).json(appointment))
    .catch((err) => res.status(400).json("Error: " + err));

}

// Create an appointment
const createAppointment = (req, res) => {

    const { ownerName, ownerContact, petName, petAge, petSpecies, petGender, reason, date, additionalNote } = req.body;
  
    const newAppointment = new Appointment({ ownerName, ownerContact, petName, petAge, petSpecies, petGender, reason, date, additionalNote });

    newAppointment
    .save()
    .then(() => res.status(200).json("Appointment Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
}


// Update an appointment
const updateAppointment = (req, res) => {

    Appointment.findById(req.params.id)
    .then((appointment) => {

        appointment.ownerName = req.body.ownerName;
        appointment.ownerContact  = req.body.ownerContact ;
        appointment.petName = req.body.petName;
        appointment.petAge = req.body.petAge;
        appointment.petSpecies = req.body.petSpecies;
        appointment.petGender = req.body.petGender;
        appointment.reason = req.body.reason;
        appointment.date = req.body.date;
        appointment.additionalNote = req.body.additionalNote;
        appointment.status = req.body.status; 
        appointment.vet = req.body.vet;       

        appointment.save()
            .then(() => res.status(200).json("Appointment updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}


// Delete an appointment
const deleteAppointment = (req, res) => {

    Appointment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Appointment deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));

}

module.exports = {getAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment}