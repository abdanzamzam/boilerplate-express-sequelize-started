const router = require('express').Router();

const AuthController = require('../controllers/AuthController');
const { authenticate, authorizeRoles } = require('../middlewares/api/authMiddleware');

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
// router.post('/register', AuthController.register);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/user-info', authenticate, AuthController.userInfo);

router.get('/admin-only', authenticate, authorizeRoles('admin'), (req, res) => {
    res.json({ message: "Welcome Admin!", user: req.user });
});

router.get('/teacher-section', authenticate, authorizeRoles('teacher'), (req, res) => {
    res.json({ message: "Welcome Teacher!", user: req.user });
});

router.get('/student-section', authenticate, authorizeRoles('student'), (req, res) => {
    res.json({ message: "Welcome Student!", user: req.user });
});

module.exports = router;
