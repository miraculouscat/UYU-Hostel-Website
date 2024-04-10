const express = require('express');
const router = express.Router();
const {prisma} = require("../dbConnector.js")
const {verifyUserToken, isAdmin, isStaff, isTheCorrectStaff } = require("../controllers/auth.js")

// Maintenance
// GET - semua maintenance
router.get("/", verifyUserToken, async (req, res) => {
    try {
      const maintenances = await prisma.maintenance.findMany();
      res.json(maintenances);
    } catch (error) {
      console.error("Error saat mengambil semua maintenance:", error);
      res.status(500).json({ error: "Error saat mengambil semua maintenance" });
    }
});

// GET - maintenance dengan id spesifik
router.get("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;

try {
    const maintenance = await prisma.maintenance.findUnique({
    where: {
        id: Number(id)
    }
    });

    if (maintenance) {
    res.json(maintenance);
    } else {
    res.status(404).json({ error: "Maintenance tidak ditemukan" });
    }
} catch (error) {
    console.error("Error saat mengambil maintenance:", error);
    res.status(500).json({ error: "Error saat mengambil maintenance" });
}
});

// GET - maintenance dengan id staf spesifik
router.get("/staff/:staff_id",verifyUserToken, async (req, res) => {
    const { staff_id } = req.params;
    
    try {
        const maintenances = await prisma.maintenance.findMany({
        where: {
            staff_id: Number(staff_id),
            status: { not: "finished" }
        }
        });
    
        res.json(maintenances);
    } catch (error) {
        console.error("Error saat mengambil maintenance:", error);
        res.status(500).json({ error: "Error saat mengambil maintenance" });
    }
    });

// GET - maintenance dengan id ruangan spesifik
router.get("/room/:room_id", verifyUserToken, async (req, res) => {
const { room_id } = req.params;

try {
    const maintenances = await prisma.maintenance.findMany({
    where: {
        room_id: Number(room_id)
    }
    });

    res.json(maintenances);
} catch (error) {
    console.error("Error saat mengambil maintenance:", error);
    res.status(500).json({ error: "Error saat mengambil maintenance" });
}
});





// POST - membuat maintenance
router.post("/", verifyUserToken,async (req, res) => {
const { room_id, description } = req.body;

try {
    // Mengecek apakah ruangan memiliki id yang valid dan belum di-flag
    const room = await prisma.room.findUnique({
    where: { id: room_id }
    });

    if (!room) {
    return res.status(400).json({ error: "Id ruangan tidak ditemukan" });
    }

    if (room.is_flagged) {
    return res.status(400).json({ error: "Ruangan sudah di-flag untuk maintenance" });
    }

    // Ambil semua staf kecuali admin dan akun yang telah dihapus
    const staffMembers = await prisma.staff.findMany({
    where: {
        id: {
        not: 1
        },
        is_deleted: false
    }
    });

    // Cari staf dengan jumlah tugas maintenance dengan status pending paling sedikit
    let minPendingTasks = Infinity;
    let selectedStaffId;
    for (const staff of staffMembers) {
    const pendingTasks = await prisma.maintenance.count({
        where: {
        staff_id: staff.id,
        status: "pending"
        }
    });

    if (pendingTasks < minPendingTasks) {
        minPendingTasks = pendingTasks;
        selectedStaffId = staff.id;
    }
    }

    // Apabila semua staf memiliki jumlah tugas dengan status pending yang sama, pilih secara acak
    if (minPendingTasks === Infinity) {
    const randomIndex = Math.floor(Math.random() * staffMembers.length);
    selectedStaffId = staffMembers[randomIndex].id;
    }

    // Buat maintenance
    const maintenance = await prisma.maintenance.create({
    data: {
        room_id,
        staff_id: selectedStaffId,
        description
    },
    });

    res.json(maintenance);
} catch (error) {
    console.error("Error saat membuat maintenance:", error);
    res.status(500).json({ error: "Error saat membuat maintenance" });
}
});




// PUT - memperbarui maintenance
router.put("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;
const { status } = req.body;

try {
    // Mengambil maintenance dengan id yang dicari
    const maintenance = await prisma.maintenance.findUnique({
    where: { id: Number(id) }
    });

    if (!maintenance) {
    return res.status(404).json({ error: "Maintenance tidak ditemukan" });
    }

    // Cek apakah status maintenance valid
    if (status === "in_progress") {
    if (maintenance.status !== "pending") {
        return res.status(400).json({ error: "Status hanya bisa diperbarui ke 'in_progress' dari 'pending'" });
    }

    // Cek apaah staf sudah memiliki tugas dengan status in_progress
    const inProgressMaintenance = await prisma.maintenance.findFirst({
        where: {
        staff_id: maintenance.staff_id,
        status: "in_progress"
        }
    });

    if (inProgressMaintenance) {
        return res.status(400).json({ error: "Staf hanya boleh memiliki satu maintenance aktif" });
    }
    }

    if (status === "finished") {
    if (maintenance.status !== "in_progress") {
        return res.status(400).json({ error: "Status hanya bisa diperbarui ke 'finished' dari 'in_progress'" });
    }

    // Cek apakah maintenance memiliki laporan
    const report = await prisma.report.findFirst({
        where: {
        maintenance_id: Number(id)
        }
    });

    if (!report) {
        return res.status(400).json({ error: "Maintenance harus memiliki laporan sebelum diubah statusnya ke 'finished'" });
    }}

    const updatedMaintenance = await prisma.maintenance.update({
    where: { id: Number(id) },
    data: { status }
    });

    res.json(updatedMaintenance);
} catch (error) {
    console.error("Error saat memperbarui maintenance:", error);
    res.status(500).json({ error: "Error saat memperbarui maintenance" });
}
});

  

module.exports = router;