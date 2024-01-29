const passport = require("passport");

function authentication(req, res, next) {
  return passport.authenticate(
    "jwt",
    {
      session: false
    },
    (err, user, info) => {
      if (err) {
        logger.error("Error during authentication", err);
        return next(err);
      }
      if (!user) {
        logger.warn("Unauthenticated request");
        return res.status(401).send({
          STATUS: "FAILURE",
          MESSAGE: "Unauthenticated",
          CODE: 401
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
}

module.exports = {
  authentication: authentication
};
