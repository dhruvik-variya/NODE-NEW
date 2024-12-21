const isAdmin = (req, res, next) => {
    const role = req.cookies.role;

    if (role !=="admin") {
        return res.send("You are not allowed"); 
    }
    next();
};

module.exports = isAdmin;