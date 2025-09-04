const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt; // ✅ get token from cookie

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded; // attach user info to req
    next();
  });
}

module.exports = authMiddleware;
