function onlyUsers(req, res, next) {
    if (!req.session.userId)
        return res.redirect('/users/login')

    next()
}

function isAdmin(req, res, next) {
    if (!req.session.is_admin)
        return res.redirect('/admin')

    next()
}

function isLoggedRedirectToProfile(req, res, next) {
    if (req.session.userId)
        return res.redirect('/admin/profile')

    next()
}

module.exports = {
    onlyUsers,
    isAdmin,
    isLoggedRedirectToProfile
}