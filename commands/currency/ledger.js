const currency = require("../../controllers/currency");
const ledger = require("../../controllers/ledger");
const errors = require("../../controllers/error");

module.exports = {
	name: 'ledger',
	description: 'Gets the ledger history for a given user.',
	async execute(message) {
		const target = message.mentions.users.first() || message.author;

		try{
			let doesUserExist = await currency.checkUserWalletExistence(target);

			if(doesUserExist.rows.length < 1){
				message.channel.send(`User not found! User must initialize themselves with the !wallet command.`)
			}else {
				message.channel.send(`Looking up ${target.tag}'s ledger.`);
				let getUserLedger = await ledger.getLedger(target);
				for (i = getUserLedger.rows.length; i > 0; i--){
					message.channel.send(`${getUserLedger.rows[i-1].transaction_owner} performed the ${getUserLedger.rows[i-1].transaction} transaction for $${getUserLedger.rows[i-1].amount} at ${getUserLedger.rows[i-1].transaction_date}`)
				}
				message.channel.send(`End of ledger history for ${target.tag}`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
