const Discord = require('discord.js');
const errors = require("../../controllers/error");
const games = require('../../controllers/games');

module.exports = {
	name: 'hoard',
	description: 'Reveals the amount of money the dragon is hoarding.',
	async execute(message) {

        try{

            let checkHoard = await games.getDragonslayer();
            return message.channel.send(`The dragon hoard currently has $${checkHoard.rows[0].hoard} Pokédollars.`);

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
