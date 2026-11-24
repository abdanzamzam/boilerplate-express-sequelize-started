// Middleware untuk autentikasi
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
}

// Middleware role access
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.rolesAccess === 'Admin') {
        return next();
    }
    res.redirect("/");
}

function isTeacher(req, res, next) {
    if (req.session.user && req.session.user.rolesAccess === 'Teacher') {
        return next();
    }
    res.redirect("/");
}

function isStudent(req, res, next) {
    if (req.session.user && req.session.user.rolesAccess === 'Student') {
        return next();
    }
    res.redirect("/");
}

module.exports = { isAuthenticated, isAdmin, isTeacher, isStudent };