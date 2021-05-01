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
				return message.channel.send(`User ${target.username} does not have any items yet.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		try{

			let getInventory = await inventory.getInventoryById(target);
			let inventoryPageOne = ``
			let inventoryOne = []
			let inventoryPageTwo = ``
			let inventoryTwo = []

			// const canvas = Canvas.createCanvas(560, 340);
			// const ctx = canvas.getContext('2d');
			// const background = await Canvas.loadImage('https://www.nicepng.com/png/full/207-2075856_shelf-pixel-art.png');
			// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			let itemNumberInInventory = getInventory.rows.length

			console.log(`itemNumberInInventory`, itemNumberInInventory)

			if (itemNumberInInventory <= 9){

				let emojis = [
					"1️⃣",
					"2️⃣",
					"3️⃣",
					"4️⃣",
					"5️⃣",
					"6️⃣",
					"7️⃣",
					"8️⃣",
					"9️⃣"
				]

				for (i = itemNumberInInventory; i > 0; i--){

					inventoryPageOne += `${itemNumberInInventory - (i-1)} ${getInventory.rows[i-1].item_name}\n`

					inventoryOne.push(`${getInventory.rows[i-1].item_name}`)

				}

				let inventoryPageOneEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Inventory`)
					.setDescription(`<@${target.id}>'s Backpack`)
					.addFields(  
						{
							name : `Items`, 
							value: inventoryPageOne, 
							inline: true   
						}
					)
	
				inventoryPageOneEmbed = await message.channel.send(inventoryPageOneEmbed);

				for (i = itemNumberInInventory; i > 0; i--){

					let emojiNumber = itemNumberInInventory - i;
					inventoryPageOneEmbed.react(`${emojis[emojiNumber]}`);
				
				}

				const filter = (reaction, target) => {
					return emojis.includes(reaction.emoji.name) && target.id != '821544318351179777';
				};
				
				const collector = inventoryPageOneEmbed.createReactionCollector(filter, { time: 15000 });

				collector.on('collect', async (reaction, target) => {

					try{
						
						console.log(`Collected ${reaction.emoji.name} from ${target.username}`);

						if (reaction.emoji.name == emojis[0]){

							const itemName = inventoryOne[0];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[1]){
							
							let itemName = inventoryOne[1];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[2]){
							
							let itemName = inventoryOne[2];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[3]){
							
							let itemName = inventoryOne[3];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[4]){
							
							let itemName = inventoryOne[4];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[5]){
							
							let itemName = inventoryOne[5];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[6]){
							
							let itemName = inventoryOne[6];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[7]){
							
							let itemName = inventoryOne[7];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}else if (reaction.emoji.name == emojis[8]){
							
							let itemName = inventoryOne[8];
							console.log(`itemName`, itemName)
							itemInformation = await shop.getAllItemsByItemName(itemName);

							let itemEmbed = new Discord.MessageEmbed()
							.setColor('#007FFF')
							.addFields(  
								{
									name : `${itemName}`, 
									value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
									inline: true   
								}
							)
						
							itemEmbed = await message.channel.send(itemEmbed);
						
						}
					
					}catch (err){
						console.error(err.message)
						return errors.errorMessage(message)
					}
				
				});

			}else if (10 <= itemNumberInInventory <= 18){

				let emojis = [
					"1️⃣",
					"2️⃣",
					"3️⃣",
					"4️⃣",
					"5️⃣",
					"6️⃣",
					"7️⃣",
					"8️⃣",
					"9️⃣",
					"1️⃣",
					"2️⃣",
					"3️⃣",
					"4️⃣",
					"5️⃣",
					"6️⃣",
					"7️⃣",
					"8️⃣",
					"9️⃣"
				]

				try{

					for (i = itemNumberInInventory; i > 0; i--){

						if (i <= 9){

							inventoryPageOne += `${itemNumberInInventory-i} ${getInventory.rows[i-1].item_name}\n`
							inventoryOne.push(`${getInventory.rows[i-1].item_name}`)

						}else if (i <= 18){

							inventoryPageTwo += `${itemNumberInInventory - (i-1)} ${getInventory.rows[i-1].item_name}\n`

							inventoryTwo.push(`${getInventory.rows[i-1].item_name}`)

						}

					}

					console.log(`inventoryPageOne`, inventoryPageOne)
					console.log(`inventoryPageTwo`, inventoryPageTwo)

					let inventoryPageOneEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setTitle(`Inventory`)
						.setDescription(`<@${target.id}>'s Backpack`)
						.addFields(  
							{
								name : `Items`, 
								value: inventoryPageOne, 
								inline: true   
							}
						);
			
					inventoryPageOneEmbed = await message.channel.send(inventoryPageOneEmbed);		

					for (i = itemNumberInInventory; i > 0; i--){
						
						if (i <= 9){

							let emojiNumber = itemNumberInInventory - i;
							inventoryPageOneEmbed.react(`${emojis[emojiNumber-1]}`);

						}
					
					}

					inventoryPageOneEmbed.react('➡️')

					const filter = (reaction, target) => {
						return (emojis.includes(reaction.emoji.name) || reaction.emoji.name === '➡️' ) && target.id != '821544318351179777';
					};
					
					const collectorOne = inventoryPageOneEmbed.createReactionCollector(filter, { time: 300000 });

					collectorOne.on('collect', async (reaction, target) => {

						try{
						
							console.log(`Collected ${reaction.emoji.name} from ${target.username}`);

							if (reaction.emoji.name == emojis[0]){

								const itemName = inventoryOne[0];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[1]){
								
								let itemName = inventoryOne[1];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[2]){
								
								let itemName = inventoryOne[2];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[3]){
								
								let itemName = inventoryOne[3];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[4]){
								
								let itemName = inventoryOne[4];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[5]){
								
								let itemName = inventoryOne[5];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[6]){
								
								let itemName = inventoryOne[6];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[7]){
								
								let itemName = inventoryOne[7];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == emojis[8]){
								
								let itemName = inventoryOne[8];
								console.log(`itemName`, itemName)
								itemInformation = await shop.getAllItemsByItemName(itemName);

								let itemEmbed = new Discord.MessageEmbed()
								.setColor('#007FFF')
								.addFields(  
									{
										name : `${itemName}`, 
										value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
										inline: true   
									}
								)
							
								itemEmbed = await message.channel.send(itemEmbed);
							
							}else if (reaction.emoji.name == "➡️"){

								let inventoryPageTwoEmbed = new Discord.MessageEmbed()
								.setColor('#0099ff')
								.setTitle(`Inventory`)
								.setDescription(`<@${target.id}>'s Backpack`)
								.addFields(  
									{
										name : `Items`, 
										value: inventoryPageTwo, 
										inline: true   
									}
								);

								inventoryPageTwoEmbed = await message.channel.send(inventoryPageTwoEmbed);		
	
								for (i = itemNumberInInventory; i > 0; i--){
						

									if (i > 9){
			
										let emojiNumber = itemNumberInInventory - i;
										inventoryPageTwoEmbed.react(`${emojis[emojiNumber]}`);
			
									}
								
								}

								inventoryPageTwoEmbed.react('⬅️')

								const filter = (reaction, target) => {
									return (emojis.includes(reaction.emoji.name) || reaction.emoji.name === '⬅️' ) && target.id != '821544318351179777';
								};

								const collectorTwo = inventoryPageTwoEmbed.createReactionCollector(filter, { time: 300000 });
			
								collectorTwo.on('collect', async (reaction, target) => {
			
									try{
										
										console.log(`Collected ${reaction.emoji.name} from ${target.username}`);
			
										if (reaction.emoji.name == emojis[9]){
			
											const itemName = inventoryTwo[0];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[10]){
											
											let itemName = inventoryTwo[1];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[11]){
											
											let itemName = inventoryTwo[2];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[12]){
											
											let itemName = inventoryTwo[3];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[13]){
											
											let itemName = inventoryTwo[4];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[14]){
											
											let itemName = inventoryTwo[5];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[15]){
											
											let itemName = inventoryTwo[6];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[16]){
											
											let itemName = inventoryTwo[7];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name == emojis[17]){
											
											let itemName = inventoryTwo[8];
											console.log(`itemName`, itemName)
											itemInformation = await shop.getAllItemsByItemName(itemName);
			
											let itemEmbed = new Discord.MessageEmbed()
											.setColor('#007FFF')
											.addFields(  
												{
													name : `${itemName}`, 
													value: `Item Name: ${itemInformation.rows[0].item_name}\nItem Category: ${itemInformation.rows[0].item_category}\n${itemInformation.rows[0].item_description}\nCost: ${itemInformation.rows[0].cost}\nItem Limit: ${itemInformation.rows[0].item_limit}`, 
													inline: true   
												}
											)
										
											itemEmbed = await message.channel.send(itemEmbed);
										
										}else if (reaction.emoji.name === '⬅️'){
											console.log(`we made it to left arrow`)
											// await inventoryPageTwoEmbed.edit({ embed: inventoryPageOneEmbed });
											// const newEmbed = new Discord.MessageEmbed(inventoryPageTwoEmbed).setTitle('New title');
											// message.channel.send(newEmbed);
											await message.delete();
											await message.channel.send(inventoryPageOneEmbed);
											// const newEmbed = new Discord.MessageEmbed().setTitle('New title');
											// message.edit(newEmbed);
										}
									
									}catch (err){
										console.error(err.message)
										return errors.errorMessage(message)
									}
								
								});
							
							}
						
						}catch (err){
							console.error(err.message)
							return errors.errorMessage(message)
						}
					
					});
					
				}catch (err){
					console.error(err.message)
					return errors.errorMessage(message)
				}	
			}

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
