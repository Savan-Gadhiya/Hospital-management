const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    // patientName: String,
    patientId: {
        type: String,
        require: true
    },
    patientName: String,
    patientEmail: String,
    patientPhone: String,
    
    hospitalName: String,
    hospitalEmail:String,
    hospitalPhone: String,

    hospitalId: {
        type: String,
        require: true
    },
    appointmentTime: {
        type: Date,
        require: true
    },
    staffName: String,
    staffId: String,
    appointmentStatus: {
        type: String,
        default: "open"
    },
    remarks: String,
    medicalStatus: String,
    medicine: [{
        type: String,
    }],
    bookingTime: {
        type: Date,
        default: Date.now,
    }
});


const Appointment = mongoose.model("Appointment",AppointmentSchema);

module.exports = Appointment;