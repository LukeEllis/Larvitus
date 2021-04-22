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
				return message.channel.send(`User not found! User must initialize themselves with the !init command.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				if (amount < 0){
					return message.channel.send(`Adding negative numbers is weird. Stop that.`);
				}
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
				if (amount < 0){
					return message.channel.send(`Updating to a negative number is weird. Stop that.`);
				}
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
                let currencyAmountCheck = await currency.checkUserWalletExistence(target);
                if (currencyAmountCheck.rows[0].currency - amount < 0){
                    return message.channel.send(`The currency to be removed cannot reduce the total to below zero.`);
                }
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
