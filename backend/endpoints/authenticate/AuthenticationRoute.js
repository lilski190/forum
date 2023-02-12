var express = require("express");
var router = express.Router();

var authenticationService = require("./AuthenticationService")

router.get("/", async function(req,res,next){
    console.log("Want to create token")
    console.log("req body = ", req.body)
    
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    authenticationService.createSessionToken({ userID: username, password }, function(err, token, user){
        if(token) {

            res.header("Authorization", "Bearer " + token);
        
        if (user) {
            const {id, userID, userName, ...partialObject} = user;
            const subset = {id, userID, userName};
            console.log(JSON.stringify(subset))
            res.status(200).send(subset)
        } else {
            console.log("User is null, even though a token has been created. Error: " + err)
            res.status(200).send("Could create token");
        }
    }
    else {
        console.log("AuthRote: Token has not been created, Error: " + err)
        res.status(401).json("Error: Not Authorized")
    }
    })
})

module.exports = router;