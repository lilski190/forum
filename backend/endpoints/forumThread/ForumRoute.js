const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const ForumService = require("./ForumService")
const { isAuthenticated, isOwner } = require("../utils/AuthenticationUtils");
const forumMessageService = require("../forumMessage/ForumMessageService")

//Test
router.get('/test', (request, response, next )=>{
    response.send('Hallo :)')
})

// GET-getAllForen
//wenn suchparameter-> find byID
//wenn ohne suchparameter -> alles wird zurück gegeben
router.get("/", (request, response) => {
    console.log("-- GET /forum --")
        ownerID = request.query;
        console.log("Suchparameter gefunden")
        console.log(request.query)
         const cb = (err, forum) => {
         if(!err && forum) { //fall das alles ok ist
            console.log("forum ID gefunden für den forum: ", forum)
             response.status(200).json(forum)
        }
        else response.status(404).json({ERROR: 'name not found'})
     }
     ForumService.getAllForen(ownerID, cb)
    
})

// POST-addForum 
router.post("/", isOwner, (request, response) => {
    console.log("-- POST /Fourm --")
    console.log(request.userID)
        ForumService.addForum(request.userID, request.body, (err, forum) => {  
    if(!err) {
            console.log('forum created successfully: ', forum)
            response.status(201).json(forum)
        }   
         else {
            response.status(400).json({ ERROR: 'could not create forum'})
         }
}) 
})

// PUT-Update
//bekommt zur suche die _id vom Forum
router.put('/:_id', isOwner, (request, response) => { 
    console.log("::: PUT /forumThreads/name")
    console.log(request.params)
    const _id = request.params; 
    const forum = request.body;
    const ownerID = request.userID;
    console.log(ownerID)
    const cb = (err, forum) => {
        if(!err && forum) {
            console.log('forum updated successfully: ', forum)
            response.status(201).json(forum)
        }   
         else {
            response.status(400).json({ERROR: 'could not update forum'})
         }
    }
    ForumService.updateForumData(_id, forum , ownerID, cb)
})

//DELETE- Delete Forum
//bekommt zur suche die _id vom Forum
router.delete('/:_id', isOwner, (request, reponses) => {
    console.log("::: DELTE /forumThreads/_id")
    const _id = request.params
    const cb = (err, deleteForum) => {
        if(deleteForum) { 
            console.log("forum deleted: ", deleteForum)
            reponses.status(204).json(deleteForum)
        } 
        else{
            reponses.status(400).json({ERROR: 'could not delete forum'})
        }
    }
    ForumService.deleteForumByID(_id, cb)  
    })

//GET-By Owner  
router.get('/myForumThreads', isOwner, (request, response) => {
    console.log("-- GET /forumThreads/myForumThreads--")
    userID = request.userID;
    console.log("seaching foren from user: " +userID)
    const cb = (err, forum) => {
        if(!err && forum) { //fall das alles ok ist
            console.log("forum  gefunden für den Owner: ", forum)
            response.status(200).json(forum)
        }
        else response.status(404).json({ERROR: 'owner not found'})
    }
    ForumService.findForumByOwner(userID, cb)
}) 

//GET-findForumByID  
router.get("/:_id", (request, response) => {
    console.log("-- GET /user/getForumByID --")
    console.log(request.params)
    const cb = (err, forum) => {
        if(!err && forum) { //fall das alles ok ist
            console.log("user ID gefunden für den user: ", forum)
            response.status(200).json(forum)
        }
        else response.status(404).json({ERROR: 'userID not found'})
    }
    ForumService.findForumById(request.params._id, cb)
}) 

//GET- getForumMessages
router.get("/:_id/forumMessages", (request, response) => {
    console.log("-- GET /ForumMessages --")
    console.log(request.params)
    console.log(request.params._id)
    const cb = (err, forum) => {
        if(!err && forum) { //fall das alles ok ist
            console.log("user ID gefunden für den user: ", forum)
            response.status(200).json(forum)
        }
        else response.status(404).json({ERROR: 'userID not found'})
    }
    forumMessageService.findForumMessageById(request.params._id, cb)
})

module.exports = router;