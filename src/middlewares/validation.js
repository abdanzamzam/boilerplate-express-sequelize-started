const { body } = require('express-validator');

const registerValidation = [
    body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
    body("email").notEmpty().withMessage("Email tidak boleh kosong"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password minimal 6 karakter"),
];

const loginValidation = [
    body("email").notEmpty().withMessage("Email tidak boleh kosong").isEmail().withMessage("Email tidak valid"),
    body("password").notEmpty().withMessage("Password tidak boleh kosong").isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
];

module.exports = { registerValidation, loginValidation };
