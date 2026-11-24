// src\middleware\authorize.js
exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Ambil role dari token yang sudah diverifikasi  
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};  
