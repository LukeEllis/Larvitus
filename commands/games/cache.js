const Discord = require('discord.js');
const errors = require("../../controllers/error");
const games = require('../../controllers/games');

module.exports = {
	name: 'cache',
	description: 'Reveals the items the dragon has hidden in their cache.',
	async execute(message) {

        try{

            let checkCache = await games.getDragonslayer();
            return message.channel.send(`The dragon cache currently contains ${checkCache.rows[0].cache_item_1_amount}x ${checkCache.rows[0].cache_item_1}, ${checkCache.rows[0].cache_item_2_amount}x ${checkCache.rows[0].cache_item_2}, and ${checkCache.rows[0].cache_item_3_amount}x ${checkCache.rows[0].cache_item_3}.`);

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
