const Forum = require("./ForumModel");

// Einen forum hinzufügen (POST)
function addForum(userID, forumData, cb) {
    console.log("forumService: Adding new forum...")
    console.log(forumData)
        //nur nutzer mit forumID dürfen hinzugefügt werden!
        if(!forumData.name){
            console.log("forum hat keinen Namen. Hinzufügen wurde abgebrochen")
            return cb('forum without ID could not be added', null)
        }
    if (forumData) {
        let forumToAdd = new Forum()
        forumToAdd.name = forumData.name
        forumToAdd.description = forumData.description
        forumToAdd.ownerID = userID

        forumToAdd.save((err, forumToAdd) => {
            if (err) {
                console.log("forumService: Creating new account failed. forum might already exist.")
                return cb(err)
            } else {
                console.log(`forumService: New forum with forumID ${ forumToAdd.name } created successfully!`);
                return cb(null, forumToAdd)
        }
        })
    }
    else {
        console.log("forumService: forum could not be added - No forum Data found!")
        return cb(err, null);
    }
}

//einen Nutzer Verändern und Updaten (PUT)
function updateForumData(forumId, forum, ownerID, cb){
    if(!forumId) {
        return cb('No user found for ID: ' + forumId)
        }
    findForumById(forumId, (err, foundForum) => {
        if(!foundForum){
            console.log("no user with id found to update")
            return cb('could not find forumId: ', forumId)
        }
        if (!err && foundForum){
        foundForum.description = forum.description; 
        foundForum.save((err) => {
            if(!err) {
                var filterForum = {"name": foundForum.name,  "description" : foundForum.description, "ownerID": foundForum.ownerID}
            return cb(null, filterForum)
            } else {
                console.log('Could not create account: ' + err);
                return cb('Could not login to account', null);
            }
        })
        }

    })
}

//forumIdToFind (GET) - (forum name)
function getAllForen(forumIdToFind, callback) {
    console.log(`ForumService: Seach ID: ${ forumIdToFind }`);
    // Wenn die forumID nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!forumIdToFind) {
        return callback(`ForumrService: forumID ${ forumIdToFind } is missing`)
    }
    else {
        let query = Forum.find(forumIdToFind)
        // Führt Datenbankanfrage durch
     query.exec(function(error, forums){
            if (error) {
                console.log(`forumService: An error occured while trying to get all forums!\n${ error }`);
                callback(error)
            } else {
                console.log("forumService| getByID: Returning all forums...")
                console.log(forums)
                callback(null, forums)
            }
        })
        }
}

//nutzer mit id finden und löschen (DELETE)
function deleteForumByID(searchforumID, cb){
    Forum.findOneAndDelete(searchforumID, (err, response) =>
    {
        console.log(searchforumID)
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
//forumIdToFind (GET) - (forum name)
function findForumByOwner(forumOwner, callback) {
    console.log(`ForumService: Seach ID: ${ forumOwner }`);
    // Wenn die forumID nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!forumOwner) {
        return callback(`ForumrService: owner ${ forumOwner } is missing`)
    }
    else {
        // findOne wird asynchron ausgeführt
        let query = Forum.find({"ownerID" : forumOwner })
        // Führt Datenbankanfrage durch
            query.exec(function(error, forum){
            if (error) {
                let errorMessage = `ForumService: No forum with forumID ${ forumOwner } found`
                console.log(errorMessage)
                return callback(errorMessage)
            }
            else {
                // 1. Fall: forum wurde gefunden
                if (forum) {
                    console.log(`ForumService: forum for forum: ${ forumOwner } was found!`)
                    return callback(null, forum) 
                }
                // 2. Fall: Es wurde kein forum mit der passenden ID gefunden
                else {
                        console.log(`ForumService: Found no forum with forumID ${ forumOwner }`)                      
                        return callback(error, null)  //bei delete kommt man bis hier
                    }
                }
            })
        }
}

//userIdToFind (GET)
function findForumById(IdToFind, callback) {
    console.log(`ForumService: Seach ID: ${ IdToFind }`);
    // Wenn die forumId nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!IdToFind) {
        return callback(`ForumService: forumId ${ IdToFind } is missing`)
    }
    else {
        // findOne wird asynchron ausgeführt
        let query = Forum.findOne({"_id" : IdToFind}) //userIDToFind
        // Führt Datenbankanfrage durch
            query.exec(function(error, forum){
            if (error) {
                let errorMessage = `UserService: No forum with forumId ${ IdToFind } found`
                console.log(errorMessage)
                return callback(errorMessage)
            }
            else {
                // 1. Fall: forum wurde gefunden
                if (forum) {
                    console.log(`UserService: forumId ${ IdToFind } was found!`)
                    // filterUser = { "forumId": forum.forumId,  "userName" : forum.userName, "isAdministrator": forum.isAdministrator}
                    return callback(null, forum) 
                }
                // 2. Fall: Es wurde kein forum mit der passenden ID gefunden
                else {
                        console.log(`UserService: Found no forum with forumId ${ IdToFind }`)                      
                        return callback(error, null)  //bei delete kommt man bis hier
                    }
                }
            })
        }
}


    module.exports ={
        getAllForen,
        addForum,
        updateForumData,
        deleteForumByID,
        findForumByOwner,
        findForumById
    }
