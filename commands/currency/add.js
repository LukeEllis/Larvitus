const currency = require("../../controllers/currency");
const ledger = require("../../controllers/ledger");

module.exports = {
	name: 'add',
	description: 'Adds balance to a given user.',
    args: true,
    usage: '<user> <amount>',
	async execute(message) {
		const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const amount = 1000;

		try{
			let doesUserExist = await currency.checkUserWalletExistence(target);
			//  || author.id != 207732045877739522
			if(!moderators.includes(author.id)){
				message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if(doesUserExist.rows.length < 1){
				message.channel.send(`User not found! User must initialize themselves with the !wallet command.`)
			}else {
				message.channel.send(`Adding ${amount} Pokédollars to ${target.tag}'s wallet.`);
				let addToUserWallet = await currency.addCurrency(amount, target);
				message.channel.send(`${author.tag} has successfully added ${amount} Pokédollars to ${target.tag}'s wallet.`);

				message.channel.send(`Updating ${target.tag}'s currency ledger.`);
				let updateUserCurrencyLedger = await ledger.updateLedger(target, amount, author);
				message.channel.send(`${target.tag}'s currency ledger has been successfully updated. Use !ledger to see a history of ${target.tag}'s currency.`);				
			}
		}catch (err){
			console.error(err.message)
			return message.channel.send(`Beep boop, your request got lost in the void. Let my creator know and they will look into it.`)
		}
	},
};
