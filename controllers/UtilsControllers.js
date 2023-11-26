

exports.getCookies = (req, res) => {
    res.send(req.cookies.remember);
};