const JWT = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_ADMIN);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyInvManager = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_INVMANAGER);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyClient = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_CLIENT);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyStaff = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decryptedToken = JWT.verify(token, process.env.JWT_SEC_STAFF);
    req.user = decryptedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { verifyAdmin, verifyClient, verifyStaff, verifyInvManager };
