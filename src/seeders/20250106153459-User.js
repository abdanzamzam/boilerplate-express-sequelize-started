"use strict";

const bcryptjs = require("bcryptjs");

const { Role, TeacherDetail, StudentDetail } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roleAdmin = await Role.findOne({ where: { name: "Admin" } });
    const roleSiswa = await Role.findOne({ where: { name: "Siswa" } });

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          // Super Admin
          name: "Abdan Zam Zam Ramadhan",
          email: "admin@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleAdmin.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Students
        {
          name: "Budi Santoso",
          email: "budi.santoso@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Siti Aisyah",
          email: "siti.aisyah@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Andi Saputra",
          email: "andi.saputra@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dewi Kartika",
          email: "dewi.kartika@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rizki Pratama",
          email: "rizki.pratama@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fitri Ramadhani",
          email: "fitri.ramadhani@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Arif Hidayat",
          email: "arif.hidayat@mail.com",
          password: await bcryptjs.hash("Password123", 10),
          roleId: roleSiswa.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
