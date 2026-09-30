const prisma = require("../prisma/client");

const getInsuranceClaims = async (req, res) => {
    try {
        const claims = await prisma.insuranceClaim.findMany();

        res.json(claims);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getInsuranceClaimById = async (req, res) => {
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
        res.status(500).json({
            error: error.message
        });
    }
};

const createInsuranceClaim = async (req, res) => {
    try {
        const claim = await prisma.insuranceClaim.create({
            data: req.body
        });

        res.status(201).json(claim);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateInsuranceClaim = async (req, res) => {
    try {
        const claim = await prisma.insuranceClaim.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json(claim);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteInsuranceClaim = async (req, res) => {
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
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getInsuranceClaims,
    getInsuranceClaimById,
    createInsuranceClaim,
    updateInsuranceClaim,
    deleteInsuranceClaim
};