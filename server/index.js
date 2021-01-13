require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
const userCtrl = require('./controllers/users')
const projectCtrl = require('./controllers/projects')
const songCtrl = require('./controllers/songs')
const convCtrl = require('./controllers/conversations')
const awsCtrl = require('./controllers/aws')


const app = express()
app.use(express.json())


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}))

/* auth and user endpoints*/
app.post('/api/auth/register', userCtrl.register)
app.post('/api/auth/login', userCtrl.login)
app.post('/api/auth/logout', userCtrl.logout)
app.get('/api/auth/me', userCtrl.getUser)
app.get('/api/auth/users', userCtrl.getTeam)
app.put('/api/user/update', userCtrl.updateUserInfo)

/*Project end points*/
app.get('/api/projects/user', projectCtrl.getMyProjects)
app.get('/api/projects', projectCtrl.getProjects)
app.get('/api/projects/project/:project_id', projectCtrl.getSingleProject)
app.get('/api/project/team/:project_id', projectCtrl.getProjectTeam)
app.post('/api/project/create', projectCtrl.createProject)
app.post('/api/project/invite', projectCtrl.addUsersToProject)
app.put('/api/project/update/:project_id/:project_creator_id', projectCtrl.updateProjectInfo)
app.delete('/api/project/remove/:users_id/:project_id/:project_creator_id', projectCtrl.removeUserFromProject)
app.delete('/api/project/delete/:project_id/:project_creator_id', projectCtrl.deleteProject)

/*Song Endpoints and Song Version Endpoints*/
app.get('/api/project/songList/:project_id', songCtrl.getAllSongsInProject)
app.get('/api/project/song/:song_id', songCtrl.getSong)
app.post('/api/project/addSong', songCtrl.addSongToProject)
// app.put('/api/project/song/editSongInfo', songCtrl.editSongInfo)
app.delete('/api/project/song/delete/:song_id', songCtrl.deleteSongFromProject)

/*Conversations and Comments Endpoints*/
app.post('/api/project/song/newConvo/:song_id', convCtrl.createConvo)
app.get('/api/project/song/conversations/:song_id', convCtrl.getConversations)
app.get('/api/project/song/conversation/:convo_id', convCtrl.getSingleConversation)
app.post('/api/project/song/conversation/newComment/:convo_id', convCtrl.writeComment)
app.get('/api/project/song/conversation/comments/:convo_id', convCtrl.getComments)


///AWS enpoint
app.get('/api/s3', awsCtrl.getS3)



massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then((dbInstance) => {
    console.log('Db Ready')
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
})

