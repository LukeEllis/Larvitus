const Discord = require('discord.js');
// const client = new Discord.Client();
const Canvas = require('canvas');
const { Menu } = require('discord.js-menu')
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'menu2',
	description: 'Shows inventory for a given user.',
	async execute(message) {
        const target = message.author;

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

            const canvasOne = Canvas.createCanvas(300, 300);
			const ctxOne = canvasOne.getContext('2d');
			const backgroundOne = await Canvas.loadImage('https://cdn.discordapp.com/attachments/821548132918886440/837847655136231444/Layer_1.png');
			ctxOne.drawImage(backgroundOne, 0, 0, canvasOne.width, canvasOne.height);

            const canvasTwo = Canvas.createCanvas(300, 300);
			const ctxTwo = canvasTwo.getContext('2d');
			const backgroundTwo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/821548132918886440/837847655136231444/Layer_1.png');
			ctxTwo.drawImage(backgroundTwo, 0, 0, canvasTwo.width, canvasTwo.height);

            const canvasThree = Canvas.createCanvas(300, 300);
			const ctxThree = canvasThree.getContext('2d');
			const backgroundThree = await Canvas.loadImage('https://cdn.discordapp.com/attachments/821548132918886440/837847655136231444/Layer_1.png');
			ctxThree.drawImage(backgroundThree, 0, 0, canvasThree.width, canvasThree.height);

            const canvasFour = Canvas.createCanvas(300, 300);
			const ctxFour = canvasFour.getContext('2d');
			const backgroundFour = await Canvas.loadImage('https://cdn.discordapp.com/attachments/821548132918886440/837847655136231444/Layer_1.png');
			ctxFour.drawImage(backgroundFour, 0, 0, canvasFour.width, canvasFour.height);

            const attachmentOne = new Discord.MessageAttachment(canvasOne.toBuffer(), `inventory.png`);
            const attachmentTwo = new Discord.MessageAttachment(canvasTwo.toBuffer(), `inventory.png`);
            const attachmentThree = new Discord.MessageAttachment(canvasThree.toBuffer(), `inventory.png`);
            const attachmentFour = new Discord.MessageAttachment(canvasFour.toBuffer(), `inventory.png`);

            let inventoryOneEmbed = new Discord.MessageEmbed()
            .setTitle(`Inventory Page 1`)
            .setDescription(`${target.username}'s Backpack`)
            .setColor('#007FFF')
            .addFields(
                {
                    name: "Items",
                    value: "item",
                    inline: true
                }
            )
            .attachFiles(attachmentOne, `inventory.png`)
            .setImage(`attachment://inventory.png`);
            // '➡️': 'inventoryTwo'

            let inventoryTwoEmbed = new Discord.MessageEmbed()
            .setTitle(`Inventory Page 2`)
            .setDescription(`${target.username}'s Backpack`)
            .setColor('#007FFF')
            .addFields(
                {
                    name: "Items",
                    value: "items",
                    inline: true
                }
            )
            .attachFiles(attachmentTwo, `inventory.png`)
            .setImage(`attachment://inventory.png`);
            // '⬅️': 'inventoryOne',
            // '➡️': 'inventoryThree',

            let inventoryThreeEmbed = new Discord.MessageEmbed()
            .setTitle(`Inventory Page 3`)
            .setDescription(`${target.username}'s Backpack`)
            .setColor('#007FFF')
            .addFields(
                {
                    name: "Items",
                    value: "items",
                    inline: true
                }
            )
            .attachFiles(attachmentThree, `inventory.png`)
            .setImage(`attachment://inventory.png`);
            // '⬅️': 'inventoryTwo',
            // '➡️': 'inventoryFour',

            let inventoryFourEmbed = new Discord.MessageEmbed()
                .setTitle(`Inventory Page 4`)
                .setDescription(`${target.username}'s Backpack`)
                .setColor('#007FFF')
                .addFields(
                    {
                        name: "Items",
                        value: "items",
                        inline: true
                    }
                )
                .attachFiles(attachmentFour, `inventory.png`)
                .setImage(`attachment://inventory.png`);
                // '⬅️': 'inventoryThree'
            
            inventoryOneEmbed = await message.channel.send(inventoryOneEmbed);
            inventoryOneEmbed.react('➡️');

            const filterOne = (reaction, user) => {return reaction.emoji.name === '➡️' && user.id === message.author.id;};
            const filterTwo = (reaction, user) => {return reaction.emoji.name === '➡️' && user.id === message.author.id;};
            const filterThree = (reaction, user) => {return reaction.emoji.name === '➡️' && user.id === message.author.id;};
            const filterFour = (reaction, user) => {return reaction.emoji.name === '⬅️' && user.id === message.author.id;};
            
            const collectorOne = inventoryOneEmbed.createReactionCollector(filterOne, { time: 300000 });    
            
            collectorOne.on('collect', async (reaction, user) => {
                
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                
                inventoryOneEmbed.delete();

                inventoryTwoEmbed = await message.channel.send(inventoryTwoEmbed);
                inventoryTwoEmbed.react('⬅️');
                inventoryTwoEmbed.react('➡️');
                
                collectorTwo = inventoryTwoEmbed.createReactionCollector(filterTwo, { time: 300000 });
            
            });

            collectorTwo.on('collect', async (reaction, user) => {
                
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                
                if (reaction.emoji.name === '➡️'){
                    
                    inventoryTwoEmbed.delete();

                    inventoryThreeEmbed = await message.channel.send(inventoryThreeEmbed);
                    inventoryThreeEmbed.react('⬅️');
                    inventoryThreeEmbed.react('➡️');

                    return collectorThree = inventoryThreeEmbed.createReactionCollector(filterThree, { time: 300000 });
                
                }
            
            });
            
            collectorThree.on('collect', async (reaction, user) => {
                
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                
                if (reaction.emoji.name === '➡️'){
                    
                    inventoryThreeEmbed.delete();

                    inventoryFourEmbed = await message.channel.send(inventoryFourEmbed);
                    inventoryFourEmbed.react('⬅️');
                    
                    return collectorFour = inventoryFourEmbed.createReactionCollector(filterFour, { time: 300000 });
                
                }
            
            });

            collectorFour.on('collect', async (reaction, user) => {
                
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                
                if (reaction.emoji.name === '⬅️'){

                    inventoryFourEmbed.delete();

                    inventoryThreeEmbed = await message.channel.send(inventoryThreeEmbed);
                    inventoryThreeEmbed.react('⬅️');
                    inventoryThreeEmbed.react('➡️');

                    return collectorThree = inventoryThreeEmbed.createReactionCollector(filterThree, { time: 300000 });
                    
                }
            
            });

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
