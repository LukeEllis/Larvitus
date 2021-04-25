const Discord = require('discord.js');
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'item',
	description: 'Adds, updates, or removes items for a given user.',
    args: true,
    usage: '<action> <item name> <amount> <user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const itemName = args[1];
        const amount = args[2];

		try{
			if(!moderators.includes(author.id)){
				return message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if (amount < 0){
				return message.channel.send(`Using negative numbers is weird. Stop that.`);
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
                let itemCheck = await inventory.itemCheck(target, itemName);
                if (itemCheck.rows.length < 1){
                    let addItemToUserInventory = await inventory.createItemEntry(target, itemName, amount);
                    return message.channel.send(`${author.username} has successfully added ${amount}x ${itemName} to ${target.username}'s inventory. Congratulations!`);
                }
                let updateUserInventory = await inventory.addToInventory(target, itemName, amount);
                return message.channel.send(`${author.username} has successfully added ${amount}x ${itemName} to ${target.username}'s inventory. Congratulations!`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'remove'){
			try{
                let itemCheck = await inventory.itemCheck(target, itemName);
                if (itemCheck.rows.length < 1){
                    return message.channel.send(`${target.username} does not have any ${itemName} to remove.`);
                }
                let itemAmountCheck = await inventory.itemCheck(target, itemName);
                if (itemAmountCheck.rows[0].amount - amount < 0){
                    return message.channel.send(`The number of items to be removed cannot reduce the total number to below zero.`);
                }
				let updateUserInventory = await inventory.removeFromInventory(target, itemName, amount);
				message.channel.send(`${author.username} has successfully removed ${amount}x ${itemName} from ${target.username}'s inventory.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
