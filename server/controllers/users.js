const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, email, password, role } = req.body

        const [existingEmail] = await db.colab_user.find({ email })
        if (existingEmail) {
            return res.status(409).send('An account is already associated with this email address.')
        }

        const [existingUsername] = await db.colab_user.find({ username })
        if (existingUsername) {
            return res.status(409).send('Username already taken.')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.auth.register_user([username, email, hash, role])
        req.session.user = newUser
        res.status(200).send(req.session.user)

    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body

        const [existingUser] = await db.colab_user.find({ email })
        if (!existingUser) {
            res.status(403).send('Email not found')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if (!isAuthenticated) {
            res.status(403).send('Incorrect password')
        }

        req.session.user = existingUser
        res.status(200).send(req.session.user)

    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('User not found')
        }
    },

    getTeam: async (req, res) => {
        const db = req.app.get('db')
        const team = await db.auth.get_all_users([req.session.user.id])
        res.status(200).send(team)
    },

    updateUserInfo: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const { id } = req.session.user
        try {
            const update = await db.colab_user.save({ id, ...req.body })
            console.log(update)
            return res.status(200).send(update)
        } catch (err) {
            console.log(err)
            res.status(409).send(err)
        }
    },
    updateProfilePic: async (req, res) => {
        const db = req.app.get('db')
        const { url } = req.body
        const { id } = req.session.user
        try {
            const [updatePic] = await db.users.update_user_profile_pic([id, url])
            res.status(200).send(updatePic)
        } catch (err) {
            res.status(500).send(err)
        }
    }
}
