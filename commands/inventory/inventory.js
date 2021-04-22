const Discord = require('discord.js');
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'inventory',
	description: 'Shows inventory for a given user.',
    args: true,
    usage: '!inventory show <user> || Mod functions: <action> <item category> <item name> <amount> <user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const itemCategory = args[1];
		const itemName = args[2];
        const amount = args[3];

		if (action === 'show'){
			try{
				let getInventory = await inventory.getInventoryById(target);
				let inventoryEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Inventory`)
					.setDescription(`<@${target.id}>`);
				for (i = getInventory.rows.length; i > 0; i--){
					// let formatCategory = await inventory.formatBadgeCategories(getInventory);
					// let formatName = await inventory.formatitemNames(getInventory);
					inventoryEmbed.addFields(
							{
								name : `${getInventory.rows[i-1].item_category} Item:`, value: `${getInventory.rows[i-1].item_name} x${getInventory.rows[i-1].amount}`, inline: false
							}
					)
				}
				return message.channel.send({ embed: inventoryEmbed });

			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}

		try{
			let checkUserInventoryExistence = await inventory.checkUserInventoryExistence(target);
			if(!moderators.includes(author.id)){
				return message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if(checkUserInventoryExistence.rows.length < 1){
				message.channel.send(`User ${target.tag} does not have any items yet.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
                let itemCheck = await inventory.itemCheck(target, itemCategory, itemName);
                if (itemCheck.rows.length < 1){
                    if (amount < 0){
                        return message.channel.send(`Adding negative numbers is weird. Stop that.`);
                    }
                    let addItemToUserInventory = await inventory.createItemEntry(target, itemCategory, itemName, amount);
                    return message.channel.send(`${author.tag} has successfully added ${amount}x ${itemName} to ${target.tag}'s inventory. Congratulations!`);
                }
                if (amount < 0){
                    return message.channel.send(`Adding negative numbers is weird. Stop that.`);
                }
                let updateUserInventory = await inventory.addToInventory(target, itemCategory, itemName, amount);
                return message.channel.send(`${author.tag} has successfully added ${amount}x ${itemName} to ${target.tag}'s inventory. Congratulations!`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'remove'){
			try{
                let itemCheck = await inventory.itemCheck(target, itemCategory, itemName);
                if (itemCheck.rows.length < 1){
                    return message.channel.send(`${target.tag} does not have any ${itemName} to remove.`);
                }
                let itemAmountCheck = await inventory.itemAmountCheck(target,  itemCategory, itemName);
                if (itemAmountCheck.rows[0].amount - amount < 0){
                    return message.channel.send(`The number of items to be removed cannot reduce the total number to below zero.`);
                }
				let updateUserInventory = await inventory.removeFromInventory(target, itemCategory, itemName, amount);
				message.channel.send(`${author.tag} has successfully removed ${amount}x ${itemName} from ${target.tag}'s inventory.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
