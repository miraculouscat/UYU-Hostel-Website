const express = require("express");
const ViteExpress = require("vite-express");
const { PrismaClient } = require("@prisma/client");

exports.prisma = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      },
    },
  })







