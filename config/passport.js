const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT } = require("./authConstant");
const User = require("../model/user");
const logger = require("./logger");

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: JWT.SECRET
  };

  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ email: jwtPayload.email });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        logger.error(`Error in passport jwt strategy: ${error.message}`);
        return done(error, false);
      }
    })
  );
};
