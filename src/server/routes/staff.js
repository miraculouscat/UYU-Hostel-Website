const express = require('express');
const router = express.Router();
const {prisma} = require("../dbConnector.js")
const bcrypt = require("bcrypt");
const {verifyUserToken, isAdmin, isStaff, isTheCorrectStaff } = require("../controllers/auth.js")
SECRET_KEY = process.env.SECRET_KEY

// Staff
// GET - semua staf (DENGAN ADMIN AND PASSWORD AND DELETED STAFF)
router.get("/all",verifyUserToken,isAdmin,async (req, res) => {
    try {
        const staff = await prisma.staff.findMany();
        res.json(staff);
    } catch (error) {
        console.error("Error saat mengambil staf:", error);
        res.status(500).json({ error: "Error saat mengambil staf" });
    }
});
  
// GET - semua staf dengan role user
router.get("/",verifyUserToken, async (req, res) => {
try {
    const staff = await prisma.staff.findMany({
    where: {
        role: {
        not: 'admin'
        },
        is_deleted: false
    },
    select: {
        id: true,
        username: true,
        role: true,
        nik: true,
        name: true,
        address: true,
        email: true,
        phone: true,
        maintenances: true
    }
    });
    res.json(staff);
} catch (error) {
    console.error("Error saat mengambil staf:", error);
    res.status(500).json({ error: "Error saat mengambil staf" });
}
});

// GET - staf dengan id spesifik
router.get("/:id",verifyUserToken,isTheCorrectStaff, async (req, res) => {
const { id } = req.params;

try {
    const staff = await prisma.staff.findUnique({
    where: {
        id: Number(id),
        is_deleted: false
    },
    select: {
        id: true,
        username: true,
        role: true,
        nik: true,
        name: true,
        address: true,
        email: true,
        phone: true,
        maintenances: true
    }
    });

    if (staff) {
    res.json(staff);
    } else {
    res.status(404).json({ error: "Staf tidak ditemukan" });
    }
} catch (error) {
    console.error("Error saat mengambil staf:", error);
    res.status(500).json({ error: "Error saat mengambil staf" });
}
});

// POST - registrasi staf  verifyUserToken,isAdmin,
router.post("/",verifyUserToken, async (req, res) => {
// const { username, password, role, nik, name, address, email, phone } = req.body;
let usernameinput = req.body.username
let passwordinput = bcrypt.hashSync(req.body.password, 8)
let nikInput = req.body.nik;
let nameInput = req.body.name;
let addressInput = req.body.address;
let emailInput = req.body.email;
let phoneInput = req.body.email;

try {
    console.log("Membuat akun staf...");

    const result = await prisma.staff.create({
    data: {
        username : usernameinput,
        password : passwordinput,
        nik : nikInput,
        name : nameInput,
        address : addressInput,
        email : emailInput,
        phone : phoneInput
    },
    });

    console.log("Akun staf dibuat:", result);

    res.json(result);
} catch (error) {
    console.error("Error saat membuat staf:", error);
    res.status(500).json({ error: "Error saat membuat stafr" });
}
});

// PUT - memperbarui akun staf
router.put("/:id", verifyUserToken, async (req, res) => {
const { id } = req.params;
const { username, name, address, email, phone } = req.body;

try {
    // Mengecek apakah username, email, atau nomor telepon yang dimasukkan sudah ada di basis data
    const existingStaff = await prisma.staff.findFirst({
    where: {
        OR: [
        { username },
        { email },
        { phone }
        ],
        NOT: { id: Number(id) }
    }
    });

    if (existingStaff) {
    return res.status(400).json({ error: "Username, email, atau nomor telepon sudah diambil" });
    }

    const updatedStaff = await prisma.staff.update({
    where: { id: Number(id) },
    data: { username, name, address, email, phone }
    });

    res.json(updatedStaff);
} catch (error) {
    console.error("Error saat memperbarui staf:", error);
    res.status(500).json({ error: "Error saat memperbarui staf" });
}
});

// DELETE - melakukan SOFT DELETE akun staf
router.delete("/:id",verifyUserToken,isAdmin, async (req, res) => {
const { id } = req.params;

try {
    // Admin tidak boleh dihapus
    if (Number(id) === 1) {
    return res.status(400).json({ error: "Admin tidak bisa dihapus" });
    }

    // Staf dengan status tugas "in_progress" tidak boleh dihapus
    const inProgressMaintenance = await prisma.maintenance.findFirst({
    where: {
        staff_id: Number(id),
        status: "in_progress"
    }
    });

    if (inProgressMaintenance) {
    return res.status(400).json({ error: "Staf yang memiliki tugas dengan status in_progress tidak bisa dihapus" });
    }

    // Ambil semua staf (terkecuali admin dan staf yang ingin dihapus)
    const remainingStaff = await prisma.staff.findMany({
    where: {
        id: {
        notIn: [1, Number(id)]
        }
    }
    });

    // Apabila tidak ada staf lain selain admin, staf tidak boleh dihapus
    if (remainingStaff.length === 0) {
    return res.status(400).json({ error: "Staf terakhir tidak bisa dihapus selagi memiliki tugas dengan status pending" });
    }

    // Membagi semua tugas dengan status "pending" ke staf yang tersisa
    const pendingMaintenance = await prisma.maintenance.findMany({
    where: {
        staff_id: Number(id),
        status: "pending"
    }
    });

    for (let i = 0; i < pendingMaintenance.length; i++) {
    await prisma.maintenance.update({
        where: { id: pendingMaintenance[i].id },
        data: { staff_id: remainingStaff[i % remainingStaff.length].id }
    });
    }

    // Melakukan soft delete terhadap staf
    const deletedStaff = await prisma.staff.update({
    where: { id: Number(id) },
    data: { is_deleted: true }
    });

    res.json(deletedStaff);
} catch (error) {
    console.error("Error saat menghapus staf:", error);
    res.status(500).json({ error: "Error saat menghapus staf" });
}
});

  
module.exports = router;