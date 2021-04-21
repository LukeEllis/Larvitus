const Discord = require('discord.js');
const inventory = require("../../controllers/inventory");

module.exports = {
	name: 'inventory',
	description: 'Gets the inventory for a given user.',
	async execute(message) {
        const target = message.mentions.users.first() || message.author;
		try{
			let checkUserInventoryExistence = await inventory.checkUserInventoryExistence(target);

			if(checkUserInventoryExistence.rows.length < 1){
				message.channel.send(`User ${target.tag} does not yet have a backpack to carry their things. Use !wallet to obtain a backpack.`)
			}else{
				let getUserInventory = await inventory.getInventoryById(target);
				let inventoryEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Inventory`)
					.setDescription(`<@${target.id}>`);

				if(getUserInventory.rows[0].shiny_gym_badge_1_blazing_blaziken_badge === true){
					inventoryEmbed.setImage(`https://cdn.discordapp.com/attachments/815501187326672896/831928563916734485/Blaziken-Badge-transparent.png`)
				}else if(getUserInventory.rows[0].shiny_gym_badge_2_tyrannus_badge === true){
					inventoryEmbed.addFields(
						{
							name : 'Tyrannus Badge', value: `https://cdn.discordapp.com/attachments/805037389017645079/831586098819891250/Badge2transparent.png`, inline: true
						}
					)
				}else if(getUserInventory.rows[0].showdown_gym_badge_1_rockin_out === true){
					inventoryEmbed.addFields(
						{
							name : 'Rockin Out Badge', value: `https://cdn.discordapp.com/attachments/426105860729733148/834219691789910026/blueteam2.jpg`, inline: true
						}
					)					
				}else if(getUserInventory.rows[0].community_art_badge_1 === true){
					inventoryEmbed.addFields(
						{
							name : 'Community Art Badge', value: `https://cdn.discordapp.com/attachments/815501187326672896/831928563916734485/Blaziken-Badge-transparent.png`, inline: true
						}
					)					
				}else if(getUserInventory.rows[0].community_baking_badge_1 === true){
					inventoryEmbed.addFields(
						{
							name : 'Community Baking Badge', value: `https://cdn.discordapp.com/attachments/815501187326672896/831928563916734485/Blaziken-Badge-transparent.png`, inline: true
						}
					)
				}

				return message.channel.send({ embed: inventoryEmbed });
			}
		}catch (err){
			console.error(err.message)
			return message.channel.send(`Beep boop, your request got lost in the void. Let my creator know and they will look into it.`)
		}
	},
};
