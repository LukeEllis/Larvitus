const db = require("../services/postgres.service");
const Discord = require('discord.js');

exports.getCurrencyById = function (id) {
    try {
        const currency = db.query('SELECT user_id, currency FROM main.currency WHERE user_id = $1', [id])
        const response = currency.rows[0]
        return response
    } catch (err) {
        console.error(err.message)
        return
        // message.channel.send("Server error")
    }
}

// exports.updateUserById = async (req, res) => {
//     const id = req.params.id
//     const { email } = req.body
  
//     try {
//         const updated_user = await db.query(
//             'UPDATE main.users SET email = $1 WHERE id = $2 RETURNING *',
//              [email, id]
//         )
        
//         return res.status(200).send(`${updated_user.rows[0].username}'s information has been updated!`)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server error")
//     }
// }

// exports.updateUserPassword = async (req, res) => {
//     const id = req.params.id
//     const { password } = req.body

//     try {

//         if (password) {
//             const salt = await bcrypt.genSalt(10)
//             const bcryptPassword = await bcrypt.hash(password, salt)

//             const updated_user_password = await db.query(
//                 'UPDATE main.users SET password = $1 WHERE id = $2 RETURNING *',
//                 [bcryptPassword, id]
//             )
    
//             return res.status(200).send(`Password Updated for user: ${updated_user_password.rows[0].username}`)
//         } else {
//             return res.status(400).send(`Bad Request`)
//         }
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server error")
//     }
// }

// exports.deleteUserById = async (req, res) => {
//     const id = req.params.id

//     try {
//         const deleted_user = await db.query('DELETE FROM main.users WHERE id = $1', [id])

//         return res.status(204).send({})
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server error")
//     }
// }
