const Attendance = require("../model/Attendance");
const express = require("express");

const router = express.Router()
const {markAtt, getUserAttSummary, getAllAttendanceSummary} = require("../controller/AttController")

router.post("/markAtt", markAtt)
router.get("/attSummary/:userId", getUserAttSummary)
router.get("/all", getAllAttendanceSummary )


module.exports = router