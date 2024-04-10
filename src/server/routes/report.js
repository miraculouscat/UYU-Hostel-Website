const express = require('express');
const router = express.Router();
const {prisma} = require("../dbConnector.js")
const {verifyUserToken, isAdmin, isStaff, isTheCorrectStaff } = require("../controllers/auth.js")
// Report
// GET - semua laporan
router.get("/",verifyUserToken, async (req, res) => {
    try {
      const reports = await prisma.report.findMany({
        where: {
          is_deleted: false
        }
      });
      res.json(reports);
    } catch (error) {
      console.error("Error saat mengambil semua report:", error);
      res.status(500).json({ error: "Error saat mengambil semua report" });
    }
});

// GET - laporan dengan id spesifik
router.get("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;

try {
    const report = await prisma.report.findUnique({
    where: {
        id: Number(id),
        is_deleted: false
    }
    });

    if (report) {
    res.json(report);
    } else {
    res.status(404).json({ error: "Laporan tidak ditemukan" });
    }
} catch (error) {
    console.error("Error saat mengambil laporan:", error);
    res.status(500).json({ error: "Error saat mengambil laporan" });
}
});

// GET - maintenance dengan id maintenance spesifik
router.get("/maintenance/:maintenance_id",verifyUserToken, async (req, res) => {
const { maintenance_id } = req.params;

try {
    const reports = await prisma.report.findMany({
    where: {
        maintenance_id: Number(maintenance_id),
        is_deleted: false
    }
    });

    res.json(reports);
} catch (error) {
    console.error("Error saat mengambil laporan:", error);
    res.status(500).json({ error: "Error saat mengambil laporan" });
}
});

// POST - membuat laporan
router.post("/",verifyUserToken, async (req, res) => {
const { maintenance_id, description, further_action } = req.body;
// Authorize
const id_user = req.user.id
try {
    // Cek apakah maintenance memiliki id valid dan memiliki status "in_progress"
    const maintenance = await prisma.maintenance.findUnique({
    where: { id: maintenance_id }
    });

    if (!maintenance) {
    return res.status(400).json({ error: "Id maintenance tidak valid" });
    }

    if (maintenance.status !== "in_progress") {
    return res.status(400).json({ error: "Maintenance harus memiliki status 'in_progress'" });
    }

    // Cek apakah maintenance tersebut telah memiliki laporan
    const existingReport = await prisma.report.findFirst({
    where: {
        maintenance_id,
        is_deleted: false
    }
    });

    if (existingReport) {
    return res.status(400).json({ error: "Maintenance telah memiliki laporan" });
    }

    // Membuat laporan
    const report = await prisma.report.create({
    data: {
        maintenance_id,
        description,
        further_action,
        is_deleted: false
    },
    });

    res.json(report);
} catch (error) {
    console.error("Error saat membuat laporan:", error);
    res.status(500).json({ error: "Error saat membuat laporan" });
}
});





// DELETE - melakukan SOFT DELETE laporan
router.delete("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;

try {
    // Cek apakah laporan ada di basis data
    const report = await prisma.report.findUnique({
    where: { id: Number(id) }
    });

    if (!report) {
    return res.status(404).json({ error: "Laporan tidak ditemukan" });
    }

    // Soft delete the report
    const deletedReport = await prisma.report.update({
    where: { id: Number(id) },
    data: { is_deleted: true }
    });

    res.json(deletedReport);
} catch (error) {
    console.error("Error saat menghapus laporan:", error);
    res.status(500).json({ error: "Error saat menghapus laporan" });
}
});
  
  
module.exports = router;