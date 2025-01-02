import jwt from "jsonwebtoken";
// Use an environment variable for production

// Middleware for verifying JWT
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user info to the request object
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

// Middleware for role-based access
export const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ message: `Access denied. Requires ${role} role.` });
  }
  next();
};

export const authorizeRoleWithExceptions = (
  allowedRoles,
  exceptionCallback
) => {
  return (req, res, next) => {
    const userRole = req.user.role; // `req.user` comes from `authenticateToken`

    if (allowedRoles.includes(userRole)) {
      // Check if the exception applies (e.g., admin accessing admins)
      if (exceptionCallback && exceptionCallback(req)) {
        return next(); // Allow the exception
      }
      return next(); // Allow the user
    }

    return res.status(403).json({ message: "Access denied." });
  };
};
