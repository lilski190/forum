const ForumMessage = require("./ForumMessageModel");

// Einen ForumMessage hinzufügen (POST)
function addForumMessage(userID, ForumMessageData, cb) {
    console.log("ForumMessageMessageService: Adding new ForumMessageMessage...")
    console.log(ForumMessageData)
        //nur nutzer mit ForumMessageMessageID dürfen hinzugefügt werden!
        if(!ForumMessageData.forumThreadID){
            console.log("ForumMessageMessage hat keinen Namen. Hinzufügen wurde abgebrochen")
            return cb('ForumMessage without ID could not be added', null)
        }
    if (ForumMessageData) {
        let ForumMessageToAdd = new ForumMessage()
        ForumMessageToAdd.forumThreadID = ForumMessageData.forumThreadID
        ForumMessageToAdd.title = ForumMessageData.title
        ForumMessageToAdd.text = ForumMessageData.text
        ForumMessageToAdd.authorID = userID

        ForumMessageToAdd.save((err, ForumMessageToAdd) => {
            if (err) {
                console.log("ForumMessageService: Creating new account failed. ForumMessage might already exist.")
                return cb(err)
            } else {
                console.log(`ForumMessageService: New ForumMessage with ForumMessageID ${ ForumMessageToAdd.name } created successfully!`);
                return cb(null, ForumMessageToAdd)
        }
        })
    }
    else {
        console.log("ForumMessageService: ForumMessage could not be added - No ForumMessage Data found!")
        return cb(err, null);
    }
}

//einen Nutzer Verändern und Updaten (PUT)
function updateForumMessageData(ForumMessageId, ForumMessage, ownerID, cb){
    if(!ForumMessageId) {
        return cb('No user found for ID: ' + ForumMessageId)
        }
    findForumMessageById(ForumMessageId, (err, foundForumMessage) => {
        if(!foundForumMessage){
            console.log("no user with id found to update")
            return cb('could not find ForumMessageId: ', ForumMessageId)
        }
        if (!err && foundForumMessage){
        foundForumMessage.title = ForumMessage.title;
        foundForumMessage.text = ForumMessage.text;
        foundForumMessage.save((err) => {
            if(!err) {
                // var filterForumMessage = {"name": foundForumMessage.name,  "description" : foundForumMessage.description, "ownerID": foundForumMessage.ownerID}
            return cb(null, foundForumMessage)
            } else {
                console.log('Could not create account: ' + err);
                return cb('Could not login to account', null);
            }
        })
        }

    })
}

//ForumMessageIdToFind (GET) - (ForumMessage name)
function getAllMessages(ForumMessageIdToFind, callback) {
    console.log(`ForumMessageService: Seach ID: ${ ForumMessageIdToFind }`);
    // Wenn die ForumMessageID nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!ForumMessageIdToFind) {
        return callback(`ForumMessagerService: ForumMessageID ${ ForumMessageIdToFind } is missing`)
    }
    else {
        // let query = ForumMessage.find({forumThreadID: ForumMessageIdToFind}) ->geht für 2. route die aus forumthread starter
        let query = ForumMessage.find(ForumMessageIdToFind)
        // Führt Datenbankanfrage durch
     query.exec(function(error, ForumMessages){
            if (error) {
                console.log(`ForumMessageService: An error occured while trying to get all ForumMessages!\n${ error }`);
                callback(error)
            } else {
                console.log("ForumMessageService| getByID: Returning all ForumMessages...")
                console.log(ForumMessages)
                callback(null, ForumMessages)
            }
        })
        }
}

//nutzer mit id finden und löschen (DELETE)
function deleteForumMessageByID(searchForumMessageID, cb){
    ForumMessage.findOneAndDelete(searchForumMessageID, (err, response) =>
    {
        console.log(searchForumMessageID)
        if(err){
            console.log("error bei deleting" + err)
            return cb(err, null)
        }
        else{
            if(response){
                console.log("erfolgreich gelöscht")
                return cb(null, response)
            } else {
                console.log("could not delete, no id found")
                return cb('could not delete, no id found', null)
            }
        }
    })
}
//ForumMessageIdToFind (GET) - (ForumMessage name)
function findForumMessageByOwner(ForumMessageOwner, callback) {
    console.log(`ForumMessageService: Seach ID: ${ ForumMessageOwner }`);
    // Wenn die ForumMessageID nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!ForumMessageOwner) {
        return callback(`ForumMessagerService: owner ${ ForumMessageOwner } is missing`)
    }
    else {
        // findOne wird asynchron ausgeführt
        let query = ForumMessage.find({"ownerID" : ForumMessageOwner })
        // Führt Datenbankanfrage durch
            query.exec(function(error, ForumMessage){
            if (error) {
                let errorMessage = `ForumMessageService: No ForumMessage with ForumMessageID ${ ForumMessageOwner } found`
                console.log(errorMessage)
                return callback(errorMessage)
            }
            else {
                // 1. Fall: ForumMessage wurde gefunden
                if (ForumMessage) {
                    console.log(`ForumMessageService: ForumMessage for ForumMessage: ${ ForumMessageOwner } was found!`)
                    return callback(null, ForumMessage) 
                }
                // 2. Fall: Es wurde kein ForumMessage mit der passenden ID gefunden
                else {
                        console.log(`ForumMessageService: Found no ForumMessage with ForumMessageID ${ ForumMessageOwner }`)                      
                        return callback(error, null)  //bei delete kommt man bis hier
                    }
                }
            })
        }
}

//userIdToFind (GET)
function findForumMessageById(IdToFind, callback) {
    console.log(`ForumMessageService: Seach ID: ${ IdToFind }`);
    // Wenn die ForumMessageId nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!IdToFind) {
        return callback(`ForumMessageService: ForumMessageId ${ IdToFind } is missing`)
    }
    else {
        // findOne wird asynchron ausgeführt
        let query = ForumMessage.find({"forumThreadID" : IdToFind}) //userIDToFind
        // Führt Datenbankanfrage durch
            query.exec(function(error, ForumMessage){
            if (error) {
                let errorMessage = `UserService: No ForumMessage with ForumMessageId ${ IdToFind } found`
                console.log(errorMessage)
                return callback(errorMessage)
            }
            else {
                // 1. Fall: ForumMessage wurde gefunden
                if (ForumMessage) {
                    console.log(`UserService: ForumMessageId ${ IdToFind } was found!`)
                    // filterUser = { "ForumMessageId": ForumMessage.ForumMessageId,  "userName" : ForumMessage.userName, "isAdministrator": ForumMessage.isAdministrator}
                    return callback(null, ForumMessage) 
                }
                // 2. Fall: Es wurde kein ForumMessage mit der passenden ID gefunden
                else {
                        console.log(`UserService: Found no ForumMessage with ForumMessageId ${ IdToFind }`)                      
                        return callback(error, null)  //bei delete kommt man bis hier
                    }
                }
            })
        }
}

    module.exports ={
        getAllMessages,
        addForumMessage,
        updateForumMessageData,
        deleteForumMessageByID,
        findForumMessageByOwner,
        findForumMessageById
    }
