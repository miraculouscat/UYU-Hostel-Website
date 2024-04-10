const express = require('express');
const router = express.Router();
const {prisma} = require("../dbConnector.js")
const {verifyUserToken, isAdmin, isStaff, isTheCorrectStaff } = require("../controllers/auth.js")
// Room
// GET - semua ruangan
router.get("/",verifyUserToken, async (req, res) => {
    try {
      const rooms = await prisma.room.findMany({
        where: {
          id: {
            lte: 20
          }
        }
      });
      res.json(rooms);
    } catch (error) {
      console.error("Error saat mengambil semua ruangan:", error);
      res.status(500).json({ error: "Error saat mengambil semua ruangan" });
    }
});
  
// GET - ruangan dengan id spesifik
router.get("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;

try {
    if (Number(id) < 1 || Number(id) > 20) {
    return res.status(400).json({ error: "Id ruangan harus di antara 1 dan 20" });
    }

    const room = await prisma.room.findUnique({
    where: {
        id: Number(id)
    }
    });

    if (room) {
    res.json(room);
    } else {
    res.status(404).json({ error: "Ruangan tidak ditemukan" });
    }
} catch (error) {
    console.error("Error saat mengambil ruangan:", error);
    res.status(500).json({ error: "Error saat mengambil ruangan" });
}
});

// PUT - memperbarui ruangan
router.put("/:id",verifyUserToken, async (req, res) => {
const { id } = req.params;
const { is_flagged } = req.body;

try {
    if (Number(id) < 1 || Number(id) > 20) {
    return res.status(400).json({ error: "Id ruangan harus di antara 1 dan 20" });
    }

    const updatedRoom = await prisma.room.update({
    where: { id: Number(id) },
    data: { is_flagged }
    });

    res.json(updatedRoom);
} catch (error) {
    console.error("Error saat memperbarui ruangan:", error);
    res.status(500).json({ error: "Error saat memperbarui ruangan" });
}
});
  
module.exports = router;