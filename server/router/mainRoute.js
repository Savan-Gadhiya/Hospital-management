const express = require('express');
const router = express.Router();
const authenticatPatient = require("../middleware/AuthenticatePatient")
const authenticatHospital = require("../middleware/AuthenticatHospital")

router.get("/test",(req,res) => {
    res.send("Api Running");
})

router.use("/api/hospital",require("./HospitalRoute"));
router.use("/api/patient",require("./PatientRoute"));
router.use("/api/staff",require("./EmployeeRoute"));

// router.use("/api/about",authenticatPatient,(req,res) => {
//     res.json(req.PatientDetail);
// })
router.use("/api/about",authenticatHospital,(req,res) => {
    res.json(req.HospitalDetail);
})
module.exports = router;