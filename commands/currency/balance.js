const currency = require("../../controllers/currency");

module.exports = {
	name: 'balance',
	description: 'Gets the balance for a given user.',
	async execute(message) {
        const target = message.mentions.users.first() || message.author;
		let balance = await currency.getCurrencyById(target)

		if(!balance.rows.length){
            return message.channel.send("User not found! User must initialize themselves with the !init command.")
        }

		return message.channel.send(`${target.username} has ${balance.rows[0].currency} Pokédollars`);
	},
};
