const express = require('express');
const router = express.Router();
const authenticatePatient = require("../middleware/AuthenticatePatient")
const authenticateHospital = require("../middleware/AuthenticateHospital")

router.get("/test",(req,res) => {
    res.send("Api Running");
})

router.use("/api/hospital",require("./HospitalRoute"));
router.use("/api/patient",require("./PatientRoute"));
router.use("/api/staff",require("./StaffRoute"));
router.use("/api/appointment",require("./appointmentRoute"));

// router.use("/api/about",authenticatPatient,(req,res) => {
//     res.json(req.PatientDetail);
// })
// router.use("/api/about",authenticatHospital,(req,res) => {
//     res.json(req.HospitalDetail);
// })
module.exports = router;