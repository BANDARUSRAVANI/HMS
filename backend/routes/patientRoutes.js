const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const patient = await prisma.patient.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const patient = await prisma.patient.create({
            data: req.body
        });

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const patient = await prisma.patient.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await prisma.patient.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "Patient deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;