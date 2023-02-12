const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const publicUserService = require("./publicUserService")

//Test
router.get('/', (request, response, next )=>{
    response.send('Hallo :)')
})

// GET-getAllUsers 
router.get("/publicUsers", (request, response) => {
    console.log("-- GET /publicUser --")
    let users = publicUserService.getAllUsers((error, users) => {
        if (error) {
            console.log(`An error occured: ${ error }`)
            response.status(404).json({ERROR: 'no users found'})
        } else {
            if (users.length < 1) {
                console.log("no users in database")
                response.status(200).json(users)
            } else {
                response.status(200).json(users)
            }
        }
    })
})

// POST-addUser
router.post("/publicUsers", (request, response) => {
    console.log("-- POST /publicUser --")
        publicUserService.addUser(request.body, (err, user) => {  
    if(!err) {
            console.log('user created successfully: ', user)
            response.status(201).json(user)
        }   
         else {
            response.status(400).json({ ERROR: 'could not create user'})
         }
}) 
})

// PUT-UpdateUser 
router.put('/publicUsers/:userID', (request, response) => {
    console.log("::: PUT /publicUser/userID")
    const userID = request.params
    const user = request.body;
    console.log(JSON.stringify(request.body))
    const cb = (err, user) => {
        if(!err && user) {
            console.log('user updated successfully: ', user)
            response.status(201).json(user)
        }   
         else {
            response.status(400).json({ERROR: 'could not update user'})
         }
    }
    publicUserService.updateUserData(userID,user, cb)
})

//GET-findUserByID  
router.get("/publicUsers/:userID", (request, response) => {
    console.log("-- GET /publicUser/getByUserID --")
    console.log(request.params)
    const cb = (err, user) => {
        if(!err && user) { //fall das alles ok ist
            console.log("user ID gefunden für den user: ", user)
            response.status(200).json({
              userID: user.userID, 
              userName: user.userName,
              password: user.password,
              isAdministrator: user.isAdministrator,
            })
        }
        else response.status(404).json({ERROR: 'userID not found'})
    }
    publicUserService.findUserById(request.params, cb)
}) 

//DELETE-deleteUserByID
router.delete('/publicUsers/:userID', (request, reponses) => {
    console.log("::: DELTE /publicUser/userID")
    const userID = request.params
    const cb = (err, deletedUser) => {
        if(deletedUser) { 
            console.log("user deleted: ", deletedUser)
            reponses.status(204).json(deletedUser)
        } 
        else{
            reponses.status(400).json({ERROR: 'could not delete user'})
        }
    }
    publicUserService.deleteUserByID(userID, cb)  
    })

module.exports = router;