function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(typeof bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    console.log(bearer);
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: "Invalid token" });
  }
}

export default verifyToken;
