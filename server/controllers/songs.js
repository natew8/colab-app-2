module.exports = {
    /*returns all the songs for a specific project*/
    getAllSongsInProject: async (req, res) => {
        const db = req.app.get('db')
        const { project_id } = req.params
        const songList = await db.songs.get_all_songs_in_project([project_id])
        res.status(200).send(songList)
    },
    getSong: async (req, res) => {
        const db = req.app.get('db')
        const { song_id } = req.params
        const [song] = await db.songs.get_song([song_id])
        res.status(200).send(song)
    },
    /* Adds a Song to a Project*/
    addSongToProject: async (req, res) => {
        const db = req.app.get('db')
        const { project_id, title, artist, key, bpm, time, status, notes, project_creator_id } = req.body
        const { id } = req.session.user
        const date = new Date
        if (id !== project_creator_id) {
            res.status(403).send('You must be the project creator to add songs to a project.')
        } else {
            const songList = await db.songs.add_song_to_project([project_id, req.session.user.id, title, artist, key, bpm, time, status, date, notes])
            res.status(200).send(songList)
        }
    },
    /*deletes a song from a project including all versions*/
    deleteSongFromProject: async (req, res) => {
        const db = req.app.get('db')
        const { song_id } = req.params
        const del = await db.songs.delete_song_from_project([song_id])
        res.status(200).send(del)
    }
}