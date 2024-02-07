const asyncHandler = require("express-async-handler");
const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.getBatch = asyncHandler(async (req, res) => {
  const result = await Batch.find();
  res.status(200).json({ message: "batch fetch success", result });
});
exports.addBatch = asyncHandler(async (req, res) => {
  console.log(req.body);
  await Batch.create(req.body);
  res.status(201).json({ message: "batch add success" });
});
exports.updateBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  await Batch.findByIdAndUpdate(batchId, req.body, { runvalidators: true });
  res.status(200).json({ message: "batch update success" });
});
exports.deleteBatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  await Batch.findByIdAndDelete(batchId);
  res.status(200).json({ message: "batch delete success" });
});

//student CRUD
exports.getStudent = asyncHandler(async (req, res) => {
  const result = await Student.find();
  res.status(200).json({ message: "Student fetch success", result });
});
exports.getStudentBybatch = asyncHandler(async (req, res) => {
  const { batchId } = req.params;
  // below batchId is from Model
  const result = await Student.find({ batchId });
  res.status(200).json({ message: "Student fetch success", result });
});
exports.addStudent = asyncHandler(async (req, res) => {
  await Student.create(req.body);
  res.status(201).json({ message: "Student add success" });
});
exports.updateStudent = asyncHandler(async (req, res) => {
  const { StudentId } = req.params;
  await Student.findByIdAndUpdate(StudentId, req.body, { runvalidators: true });
  res.status(200).json({ message: "Student update success" });
});
exports.deleteStudent = asyncHandler(async (req, res) => {
  const { StudentId } = req.params;
  await Student.findByIdAndDelete(StudentId);
  res.status(200).json({ message: "Student delete success" });
});

//Attendance CRUD//
exports.getAttendance = asyncHandler(async (req, res) => {
  const { studId } = req.params;
  const result = await Attendance.find({ studId });
  res.status(200).json({ message: "Attendance fetch success", result });
});
exports.addAttendance = asyncHandler(async (req, res) => {
  const x = req.body.map((item) => {
    return { studId: item.studId, date: item.date, isPresent: item.isPresent };
  });
  const result = await Attendance.findOne({
    studId: x[0].studId,
    date: x[0].date,
  });
  if (result) {
    return res.status(404).json({ message: "Duplicate Attendance" });
  }
  await Attendance.create(x);
  res.status(201).json({ message: "Attendance add success" });
});
exports.updateAttendance = asyncHandler(async (req, res) => {
  const { AttendanceId } = req.params;
  await Attendance.findByIdAndUpdate(AttendanceId, req.body, {
    runvalidators: true,
  });
  res.status(200).json({ message: "Attendance update success" });
});
exports.deleteAttendance = asyncHandler(async (req, res) => {
  const { attendanceId } = req.params;
  await Attendance.deleteMany();
  res.status(200).json({ message: "Attendance delete success" });
});
