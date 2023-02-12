var userService = require("../user/UserService")
var jwt = require("jsonwebtoken")
var config = require("config")
var logger = require("../../backend/config/winston")


function createSessionToken(props, callback) {
    console.log("AuthenticationService: create Token");

    if (!props) {
        logger.error("Error: have no json body")
        callback("JSON-Body missing", null, null)
        return
    }

    userService.findUserById(props.userID, function (error, user) {
        if (user) {
            logger.debug("Found user check the password.")

            user.comparePassword(props.password, function (err, isMatch) { //is the given password matching 
                if (err) {
                    logger.error("Password is invalid");
                    callback(err, null);
                } else {
                    if (isMatch) { //password
                        logger.debug("Password is correct. Create token."); //bis hier ist läuft alles
 
                        var issuedAt = new Date().getTime();
                        var expirationTime = config.get("session.timeout"); //Probleem hier
                        var expiresAt = issuedAt + (expirationTime * 1000);
                        var privateKey = config.get("session.tokenKey");
                        let token = jwt.sign({ "user": user.userID }, privateKey, { expiresIn: expiresAt, algorithm: "HS256" });

                        console.log("User = ", user.userID);
                        console.log("Token created: " + token);

                        callback(null, token, user);
                    } else {
                        logger.error("Password or user ID are invalid");
                        callback(err, null);
                    }
                }
            })
        } else {
            console.log("Session Services: Did not find user for used ID: " + props.userID);
            callback("Did not find user", null);
        }
    })
}

module.exports = {
    createSessionToken
}