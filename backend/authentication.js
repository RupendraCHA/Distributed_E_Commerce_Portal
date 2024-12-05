const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const JWT_SECRET = "Account_Test";
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  console.log({ token });

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    // Verify token with your secret
    if (err) {
      console.log({ err });
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    console.log({ user });
    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
