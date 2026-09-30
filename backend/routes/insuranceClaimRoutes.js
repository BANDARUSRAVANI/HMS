const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res) => {
    try {
        const claims = await prisma.insuranceClaim.findMany();
        res.json(claims);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const claim = await prisma.insuranceClaim.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!claim) {
            return res.status(404).json({
                message: "Insurance claim not found"
            });
        }

        res.json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const claim = await prisma.insuranceClaim.create({
            data: req.body
        });

        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const claim = await prisma.insuranceClaim.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json(claim);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await prisma.insuranceClaim.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "Insurance claim deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;