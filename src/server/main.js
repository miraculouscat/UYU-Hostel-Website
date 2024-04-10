const express = require("express");
const ViteExpress = require("vite-express");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json()); 
app.use(cookieParser())
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    },
  },
})


app.use(express.urlencoded({
  extended: true
}));

app.get("/hello", (req, res) => {
 res.send("Hello Vite + React!");
});




const staffRoutes = require('./routes/staff.js');
const roomRoutes = require('./routes/room.js');
const maintenanceRoutes = require('./routes/maintenance.js');
const reportRoutes = require('./routes/report.js');
const loginRoutes = require('./routes/login.js')

app.use('/staff', staffRoutes);
app.use('/room', roomRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/report', reportRoutes);
app.use('/auth', loginRoutes);

module.exports = app;




 









