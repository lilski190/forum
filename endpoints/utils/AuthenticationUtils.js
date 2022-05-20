var config = require("config");
var jwt = require("jsonwebtoken");
const { Console } = require("winston/lib/winston/transports");
var userService = require("../user/UserService");
var forumService = require("../forumThread/ForumService");

//Middleware funktionen wo verify() genutzt wird.

//folie sicherheit 47
function isAuthenticated(req, res, next) {
  //token aus den authorization header holen und jwt parsen indem man es splittet
  if (typeof req.headers.authorization !== "undefined") {
    //wenn Authorization erfolgreich ist dann
    let token = req.headers.authorization.split(" ")[1];
    //aus der config datei den privatekey zum entschlüsseln der signatur/token
    var privateKey = config.get('session.tokenKey'); //probleem hier, weil token nicht defind ist :(
    console.log(privateKey)
    //token verifizieren mit jwt object
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
        console.log("user = ", user);
        if (err) {
            res.status(401).json({ error: "Not Authorized" });
            return;
        }
        console.log("you are Authenticated :)")
        //wenn alles in ordnung 
        return next();
    });
  } else {
      res.status(401).json({ error: "Not Authorized" });
      return;
  }
}

function isOwner(req, res, next) {
  //token aus den authorization header holen und jwt parsen indem man es splittet
  //folie 24
  console.log("AuthenticationUtils: in Function isOwner")
  if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization.split(" ")[1];
      var privateKey = config.get('session.tokenKey');
      //token verifizieren
         //token verifizieren mit jwt object
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      console.log("user = ", user);
      if (err) {
          res.status(401).json({ error: "Unauthorized" });
          return;
      }
      console.log("you are Authenticated :)")
      userService.findUserById(user.user, function (error, user) {
        console.log("Found User: ", user.userID);  
        req.userID = user.userID; //neuen parameter im req hinzugefügt
        return next();
      });
  });

  } else {
      res.status(401).json({ error: "Not the Owner" });
      return;
  }
}

module.exports = {
    isAuthenticated,
    isOwner
}