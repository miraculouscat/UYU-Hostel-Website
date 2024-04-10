//server.js
const express = require("express");
const ViteExpress = require("vite-express");
const app = require("./main");

ViteExpress.listen(app, 80, () =>
 console.log("Server is listening on port 80...")
);
