module.exports = {
    getConversations: async (req, res) => {
        const db = req.app.get('db')
        const { song_id } = req.params
        const convos = await db.conversations.get_conversations(song_id)
        res.status(200).send(convos)
    },
    createConvo: async (req, res) => {
        const db = req.app.get('db')
        const { subject, time, song_version, body } = req.body
        const { song_id } = req.params
        try {
            const convo = await db.conversations.create_conversation([req.session.user.id, subject, time, body, song_version, song_id])
            res.status(200).send(convo)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getSingleConversation: async (req, res) => {
        const db = req.app.get('db')
        const { convo_id } = req.params
        const [conversation] = await db.conversations.get_single_conversation([convo_id])
        res.status(200).send(conversation)
    },
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const { convo_id } = req.params
        const comments = await db.conversations.get_comments(convo_id)
        res.status(200).send(comments)
    },
    writeComment: async (req, res) => {
        const db = req.app.get('db')
        const { convo_id } = req.params
        const { comment } = req.body
        const newComment = await db.conversations.add_comment([convo_id, req.session.user.id, comment])
        res.status(200).send(newComment)
    }
}