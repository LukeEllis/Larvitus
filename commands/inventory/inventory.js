const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
const inventory = require("../../controllers/inventory");
const shop = require("../../controllers/shop");
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
				return message.channel.send(`${target.username} has not redeemed any items yet.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		try{

			let getInventory = await inventory.getInventoryById(target);
			let inventoryEmbed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle(`Inventory`)
				.setDescription(`<@${target.id}>`);
			for (i = getInventory.rows.length; i > 0; i--){
				inventoryEmbed.addFields(
						{
							name : `${getInventory.rows[i-1].reward_name}`, value: `Reward Type: ${getInventory.rows[i-1].reward_type} \nCost: ${getInventory.rows[i-1].reward_point_cost} \nAmount: x${getInventory.rows[i-1].amount}`, inline: false
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
