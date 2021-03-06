const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");

module.exports = {
	name: 'currency',
	description: 'Add, update, or remove currency for a given user.',
    args: true,
    usage: '<action> <amount> <user>',
	async execute(message, args) {
		const target = message.mentions.users.first();
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const amount = args[1];

		try{
			let doesUserExist = await currency.getCurrencyById(target);
			if(!moderators.includes(author.id)){
				return message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if(doesUserExist.rows.length < 1){
				return message.channel.send(`User not found! User must initialize themselves with the !init command.`)
			}else if (amount < 0){
				return message.channel.send(`Using negative numbers is weird. Stop that.`);
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				let addToUserWallet = await currency.addCurrency(amount, target);
				message.channel.send(`${author.username} has successfully added ${amount} Pokédollars to ${target.username}'s wallet.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'update'){
			try{
				let updateUserCurrency = await currency.updateCurrency(amount, target);
				message.channel.send(`${author.username} has successfully updated ${target.username}'s wallet to ${amount} Pokédollars.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}else if (action === 'remove'){
			try{
                let currencyAmountCheck = await currency.getCurrencyById(target);
                if (currencyAmountCheck.rows[0].currency - amount < 0){
                    return message.channel.send(`The currency to be removed cannot reduce the total to below zero.`);
                }
				let removeFromUserWallet = await currency.removeCurrency(amount, target);
				message.channel.send(`${author.username} has successfully removed ${amount} Pokédollars from ${target.username}'s wallet.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
