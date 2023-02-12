const PublicUser = require("../user/UserModel");

// Funktion um alle User abzurufen (GET)
function getAllUsers(callback) {
    PublicUser.find((error, users) => {
        if (error) {
            console.log(`UserService: An error occured while trying to get all Users!\n${ error }`);
            callback(error)
        } else {
            console.log("UserService: Returning all Users...")
            console.log(users)
            callback(null, users)
        }
    })
}

// Einen User hinzufügen (POST)
function addUser(userData, cb) {
    console.log("UserService: Adding new User...")
        //nur nutzer mit userID dürfen hinzugefügt werden!
        if(!userData.userID){
            console.log("user hat keine userID. Hinzufügen wurde abgebrochen")
            return cb('user without ID could not be added', null)
        }
    if (userData) {
        let userToAdd = new PublicUser()
        userToAdd.userID = userData.userID
        userToAdd.userName = userData.userName
        userToAdd.password = userData.password

        if (userData.isAdministrator) {
            userToAdd.isAdministrator = userData.isAdministrator
        }
        userToAdd.save((err, userToAdd) => {
            if (err) {
                console.log("UserService: Creating new account failed. User might already exist.")
                return cb(err)
            } else {
                console.log(`UserService: New User with UserID ${ userToAdd.userID } created successfully!`);
                return cb(null, userToAdd)
        }
        })
    }
    else {
        console.log("UserService: User could not be added - No User Data found!")
        return cb(err, null);
    }
}

//einen Nutzer Verändern und Updaten (PUT)
function updateUserData(userID, user, cb){
    if(!userID) {
        return cb('No user found for ID: ' + userID)
        }
    findUserById(userID, (err, foundUser) => {
        if(!foundUser){
            console.log("no user with id found to update")
            return cb('could not find userID: ', userID)
        }
        if (!err && foundUser){
        foundUser.userName = user.userName; 
        foundUser.save((err) => {
            if(!err) {
            return cb(null, foundUser)
            } else {
                console.log('Could not create account: ' + err);
                return cb('Could not login to account', null);
            }
        })
        }

    })
}

//userIdToFind (GET)
function findUserById(userIdToFind, callback) {
    console.log(`publicUserService: Seach ID: ${ userIdToFind }`);
    // Wenn die UserID nicht vorhanden ist, wird die Funktion nicht ausgeführt
    if (!userIdToFind) {
        return callback(`publicUserService: UserID ${ userIdToFind } is missing`)
    }
    else {
        // findOne wird asynchron ausgeführt
        let query = PublicUser.findOne(userIdToFind)
        // Führt Datenbankanfrage durch
            query.exec(function(error, user){
            if (error) {
                let errorMessage = `publicUserService: No User with UserID ${ userIdToFind } found`
                console.log(errorMessage)
                return callback(errorMessage)
            }
            else {
                // 1. Fall: User wurde gefunden
                if (user) {
                    console.log(`publicUserService: UserID ${ userIdToFind } was found!`)
                    return callback(null, user) 
                }
                // 2. Fall: Es wurde kein User mit der passenden ID gefunden
                else {
                        console.log(`publicUserService: Found no User with UserID ${ userIdToFind }`)                      
                        return callback(error, null)  //bei delete kommt man bis hier
                    }
                }
            })
        }
}

//nutzer mit id finden und löschen (DELETE)
function deleteUserByID(searchUserID, cb){
    PublicUser.findOneAndDelete(searchUserID, (err, response) =>
    {
        console.log(searchUserID)
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

    module.exports ={
        getAllUsers,
        addUser,
        updateUserData,
        findUserById,
        deleteUserByID
    }
