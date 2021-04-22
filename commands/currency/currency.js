const currency = require("../../controllers/currency");
const ledger = require("../../controllers/ledger");
const errors = require("../../controllers/error");

module.exports = {
	name: 'currency',
	description: 'Updates balance for a given user.',
    args: true,
    usage: '<action> <amount> <user>',
	async execute(message, args) {
		const target = message.mentions.users.first();
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const amount = args[1];

		try{
			let doesUserExist = await currency.checkUserWalletExistence(target);
			if(!moderators.includes(author.id)){
				message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if(doesUserExist.rows.length < 1){
				message.channel.send(`User not found! User must initialize themselves with the !wallet command.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				message.channel.send(`Adding ${amount} Pokédollars to ${target.tag}'s wallet.`);
				let addToUserWallet = await currency.addCurrency(amount, target);
				message.channel.send(`${author.tag} has successfully added ${amount} Pokédollars to ${target.tag}'s wallet.`);

				message.channel.send(`Updating ${target.tag}'s currency ledger.`);
				let updateUserCurrencyLedger = await ledger.updateLedger(target, action, amount, author);
				message.channel.send(`${target.tag}'s currency ledger has been successfully updated. Use !ledger to see a history of ${target.tag}'s currency.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'update'){
			try{
				let getUserCurrencyAmount = await currency.getCurrencyById(target);
				let currentUserCurrency = getUserCurrencyAmount.rows[0].currency;
				message.channel.send(`Updating ${target.tag}'s wallet from ${currentUserCurrency} to ${amount} Pokédollars`);
				let updateUserCurrency = await currency.updateCurrency(amount, target);
				message.channel.send(`${author.tag} has successfully updated ${target.tag}'s wallet to ${amount} Pokédollars.`);

				message.channel.send(`Updating ${target.tag}'s currency ledger.`);
				let updateUserCurrencyLedger = await ledger.updateLedger(target, action, amount, author);
				message.channel.send(`${target.tag}'s currency ledger has been successfully updated. Use !ledger to see a history of ${target.tag}'s currency.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}else if (action === 'remove'){
			try{
				message.channel.send(`Removing ${amount} Pokédollars from ${target.tag}'s wallet.`);
				let removeFromUserWallet = await currency.removeCurrency(amount, target);
				message.channel.send(`${author.tag} has successfully removed ${amount} Pokédollars from ${target.tag}'s wallet.`);

				message.channel.send(`Updating ${target.tag}'s currency ledger.`);
				let updateUserCurrencyLedger = await ledger.updateLedger(target, action, amount, author);
				message.channel.send(`${target.tag}'s currency ledger has been successfully updated. Use !ledger to see a history of ${target.tag}'s currency.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
