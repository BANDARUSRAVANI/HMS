const prisma = require("../prisma/client");

const getMedicalRecords = async (req, res) => {
    try {
        const records = await prisma.medicalRecord.findMany();

        res.json(records);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const getMedicalRecordById = async (req, res) => {
    try {
        const record = await prisma.medicalRecord.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        if (!record) {
            return res.status(404).json({
                message: "Medical record not found"
            });
        }

        res.json(record);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const createMedicalRecord = async (req, res) => {
    try {
        const record = await prisma.medicalRecord.create({
            data: req.body
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const updateMedicalRecord = async (req, res) => {
    try {
        const record = await prisma.medicalRecord.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.json(record);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const deleteMedicalRecord = async (req, res) => {
    try {
        await prisma.medicalRecord.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.json({
            message: "Medical record deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getMedicalRecords,
    getMedicalRecordById,
    createMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord
};