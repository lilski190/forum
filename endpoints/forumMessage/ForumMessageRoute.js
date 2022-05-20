const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const ForumMessageService = require("./ForumMessageService")
const { isAuthenticated, isOwner } = require("../utils/AuthenticationUtils");

//Test
router.get('/test', (request, response, next )=>{
    response.send('Hallo :)')
})

// GET-getAllForen
//wenn suchparameter-> find byID
//wenn ohne suchparameter -> alles wird zurück gegeben
router.get("/", (request, response) => {
    console.log("-- GET /ForumMessage --")
        ownerID = request.query;
        console.log("Suchparameter gefunden")
        console.log(request.query)
         const cb = (err, ForumMessage) => {
         if(!err && ForumMessage) { //fall das alles ok ist
            console.log("ForumMessage ID gefunden für den ForumMessage: ", ForumMessage)
             response.status(200).json(ForumMessage)
        }
        else response.status(404).json({ERROR: 'name not found'})
     }
     ForumMessageService.getAllMessages(ownerID, cb)
     
})

// POST-addForumMessage 
router.post("/", isOwner, (request, response) => {
    console.log("-- POST /Fourm --")
    console.log(request.userID)
        ForumMessageService.addForumMessage(request.userID, request.body, (err, ForumMessage) => {  
    if(!err) {
            console.log('ForumMessage created successfully: ', ForumMessage)
            response.status(201).json(ForumMessage)
        }   
         else {
            response.status(400).json({ ERROR: 'could not create ForumMessage'})
         }
}) 
})

// PUT-Update
//bekommt zur suche die _id vom ForumMessage
router.put('/:_id', isOwner, (request, response) => { 
    console.log("::: PUT /ForumMessageThreads/name")
    console.log(request.params)
    const _id = request.params; 
    const ForumMessage = request.body;
    const ownerID = request.userID;
    console.log(ownerID)
    const cb = (err, ForumMessage) => {
        if(!err && ForumMessage) {
            console.log('ForumMessage updated successfully: ', ForumMessage)
            response.status(201).json(ForumMessage)
        }   
         else {
            response.status(400).json({ERROR: 'could not update ForumMessage'})
         }
    }
    ForumMessageService.updateForumMessageData(_id, ForumMessage , ownerID, cb)
})

//DELETE- Delete ForumMessage
//bekommt zur suche die _id vom ForumMessage
router.delete('/:_id', isOwner, (request, reponses) => {
    console.log("::: DELTE /ForumMessageThreads/_id")
    const _id = request.params
    const cb = (err, deleteForumMessage) => {
        if(deleteForumMessage) { 
            console.log("ForumMessage deleted: ", deleteForumMessage)
            reponses.status(204).json(deleteForumMessage)
        } 
        else{
            reponses.status(400).json({ERROR: 'could not delete ForumMessage'})
        }
    }
    ForumMessageService.deleteForumMessageByID(_id, cb)  
    })

//GET-By Owner  
router.get('/myForumMessageThreads', isOwner, (request, response) => {
    console.log("-- GET /ForumMessageThreads/myForumMessageThreads--")
    userID = request.userID;
    console.log("seaching foren from user: " +userID)
    const cb = (err, ForumMessage) => {
        if(!err && ForumMessage) { //fall das alles ok ist
            console.log("ForumMessage  gefunden für den Owner: ", ForumMessage)
            response.status(200).json(ForumMessage)
        }
        else response.status(404).json({ERROR: 'owner not found'})
    }
    ForumMessageService.findForumMessageByOwner(userID, cb)
}) 

//GET-findForumMessageByID  
router.get("/:_id", (request, response) => {
    console.log("-- GET /user/getForumMessageByID --")
    console.log(request.params)
    const cb = (err, ForumMessage) => {
        if(!err && ForumMessage) { //fall das alles ok ist
            console.log("user ID gefunden für den user: ", ForumMessage)
            response.status(200).json(ForumMessage)
        }
        else response.status(404).json({ERROR: 'userID not found'})
    }
    ForumMessageService.findForumMessageById(request.params._id, cb)
}) 

//GET-suche von nachrichten für ein ForumThread 
// router.get("/forumMessages", (request, response) => {
//     console.log("-- GET /user/getForumMessageByID --")
//     console.log(request.params)
//     const cb = (err, ForumMessage) => {
//         if(!err && ForumMessage) { //fall das alles ok ist
//             console.log("user ID gefunden für den user: ", ForumMessage)
//             response.status(200).json(ForumMessage)
//         }
//         else response.status(404).json({ERROR: 'userID not found'})
//     }
//     ForumMessageService.findForumMessageById(request.params._id, cb)
// }) 


module.exports = router;