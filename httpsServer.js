const fs = require('fs');
const key = fs.readFileSync('./certificates/key.pem');
const cert = fs.readFileSync('./certificates/cert.pem');
const express = require('express');
const https = require('https');
const app = express();
const server = https.createServer({key: key, cert: cert }, app);
app.get('/', (req, res) => { res.send('this is an secure server') });
// server.listen(443, () => { console.log('listening on 443') });


const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const database = require('./database/db')
const config = require('config')
const publicUserRoute = require('./endpoints/publicUser/publicUserRoute') //greift auf ordner zu
const UserRoute = require('./endpoints/user/UserRoute') //greift auf ordner zu
const Authenticate = require('./endpoints/authenticate/AuthenticationRoute')
const forumThreads = require('./endpoints/forumThread/ForumRoute')
const forumMessage = require('./endpoints/forumMessage/ForumMessageRoute')
const makeAdmin = require('./endpoints/user/UserService')


app.use(bodyParser.json());
//route hinzufügen
app.use('/', publicUserRoute); //wo es reingehängt wird
app.use('/users', UserRoute);
app.use('/authenticate', Authenticate);
app.use('/forumThreads', forumThreads);
app.use('/forumMessages', forumMessage);


//Datenbank starten
database.initDb(function(err, db){
     if(db){
         console.log("Datenbank erfolgerich angebunden :) ")
     }
     else{
         console.log("Anbindung ist gescheitert :(")
     }
 })

// app.listen(port, () => {
//     console.log(`We are listening at http://localhost:${port}`)
// })
server.listen(443, () => { console.log('listening on 443') });

makeAdmin.createDefalutAdmin(); 


module.exports = app;