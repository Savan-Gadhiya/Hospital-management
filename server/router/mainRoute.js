const express = require('express');
const router = express.Router();



router.get("/test",(req,res) => {
    res.send("Api Running");
})

router.use("/api/hospital",require("./HospitalRoute"));
router.use("/api/patient",require("./PatientRoute"));
router.use("/api/staff",require("./EmployeeRoute"));


module.exports = router;