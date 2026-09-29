const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const insuranceClaimRoutes = require("./routes/insuranceClaimRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/insurance-claims", insuranceClaimRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Hospital Management System API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});