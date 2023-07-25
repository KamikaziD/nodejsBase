const admin = require("../config/firebase-config");
class Middleware {
  async decodeToken(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
          console.log(decodeValue);
          return next();
        }
        return res.status(401).json({ message: "Unauthorized" });
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Internal Error", error: e.message });
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
}
module.exports = new Middleware();
