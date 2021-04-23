const Discord = require('discord.js');
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'inventory',
	description: 'Shows inventory for a given user.',
    usage: '<user>',
	async execute(message) {
        const target = message.mentions.users.first() || message.author;

		try{
			let checkUserInventoryExistence = await inventory.getInventoryById(target);
			if(checkUserInventoryExistence.rows.length < 1){
				return message.channel.send(`User ${target.username} does not have any items yet.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

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
	},
};
