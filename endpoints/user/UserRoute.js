const express = require("express");
const { json } = require("express/lib/response");
const res = require("express/lib/response");
const { isAuthenticated } = require("../utils/AuthenticationUtils");
const router = express.Router();
const UserService = require("./UserService")


//Test
router.get('/test', (request, response, next )=>{
    response.send('Hallo :)')
})

// GET-getAllUsers 
router.get("/", isAuthenticated, (request, response) => {
    console.log("-- GET /user --")
    UserService.getAllUsers((error, users) => {
        if (error) {
            console.log(`An error occured: ${ error }`)
            response.status(404).json({ERROR: 'no users found'})
        } else {
            if (users.length < 1) {
                console.log("no users in database")
                response.status(200).json(users)
            } else {
               var filter =  users.map(function(user){ 
                         var user = {"userID" : user.userID, 
                                     "userName": user.userName,
                                     "isAdministrator": user.isAdministrator}
                            return user;
                        });
                               
                console.log("hier die gefilterten: " + filter)
                response.status(200).json(filter)
            }
        }
    })
})

// POST-addUser
router.post("/", isAuthenticated, (request, response) => {
    console.log("-- POST /user --")
        UserService.addUser(request.body, (err, user) => {  
    if(!err) {
            console.log('user created successfully: ', user)
            response.status(201).json({
                userID: user.userID, 
                userName: user.userName,
                isAdministrator: user.isAdministrator,
              })
        }   
         else {
            response.status(400).json({ ERROR: 'could not create user'})
         }
}) 
})

// PUT-UpdateUser 
router.put('/:userID', isAuthenticated, (request, response) => {
    console.log("::: PUT /user/userID")
    const userID = request.params.userID
    const user = request.body;
    const cb = (err, user) => {
        if(!err && user) {
            console.log('user updated successfully: ', user)
            response.status(201).json({
                userID: user.userID, 
                userName: user.userName,
                isAdministrator: user.isAdministrator,
              })
        }   
         else {
            response.status(400).json({ERROR: 'could not update user'})
         }
    }
    UserService.updateUserData(userID,user, cb)
})

//GET-findUserByID  
router.get("/:userID", isAuthenticated, (request, response) => {
    console.log("-- GET /user/getByUserID --")
    console.log(request.params.userID)
    const cb = (err, user) => {
        if(!err && user) { //fall das alles ok ist
            console.log("user ID gefunden für den user: ", user)
            response.status(200).json({
              userID: user.userID, 
              userName: user.userName,
              isAdministrator: user.isAdministrator,
            })
        }
        else response.status(404).json({ERROR: 'userID not found'})
    }
    UserService.findUserById(request.params.userID, cb)
}) 

//DELETE-deleteUserByID
router.delete('/:userID', isAuthenticated, (request, response) => {
    console.log("::: DELTE /user/userID")
    const userID = request.params
    const cb = (err, deletedUser) => {
        if(deletedUser) { 
            console.log("user deleted: ", deletedUser)
            response.status(204).json({
                userID: deletedUser.userID, 
                userName: deletedUser.userName,
                isAdministrator: deletedUser.isAdministrator,
              })
        } 
        else{
            response.status(400).json({ERROR: 'could not delete user'})
        }
    }
    UserService.deleteUserByID(userID, cb)  
    })

module.exports = router;