const Discord = require('discord.js');
// const client = new Discord.Client();
const Canvas = require('canvas');
const { Menu } = require('discord.js-menu')
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'inv',
	description: 'Shows inventory for a given user.',
    usage: '<user>',
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

            let getInventory = await inventory.getInventoryById(target);
            let itemNumberInInventory = getInventory.rows.length
			let inventoryPageOne = "----------------------------\n"
			let inventoryPageOneArray = []
			let inventoryPageTwo = "----------------------------\n"
			let inventoryPageTwoArray = []
            let inventoryPageThree = "----------------------------\n"
			let inventoryPageThreeArray = []
            let inventoryPageFour = "----------------------------\n"
			let inventoryPageFourArray = []

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

            console.log(`itemNumberInInventory`, itemNumberInInventory)
            
            for (i = itemNumberInInventory; i > 0; i--){

                if (i <= 9){

                    inventoryPageOne += `${itemNumberInInventory-i} ${getInventory.rows[i-1].item_name} ${getInventory.rows[i-1].amount}\n`
                    inventoryPageOneArray.push(`${getInventory.rows[i-1].item_name}`)

                    if (i <= 3){
                        const itemsOne = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxOne.drawImage(itemsOne, (6+((i-1)*100)), 8, 90, 90);
                    }else if (i <= 6){
                        const itemsOne = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxOne.drawImage(itemsOne, (6+((i-4)*100)), 108, 90, 90);
                    }else if (i <= 9){
                        const itemsOne = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxOne.drawImage(itemsOne, (6+((i-7)*100)), 208, 90, 90);
                    }

                }else if (i <= 18){

                    inventoryPageTwo += `${itemNumberInInventory - (i-1)} ${getInventory.rows[i-1].item_name} ${getInventory.rows[i-1].amount}\n`
                    inventoryPageTwoArray.push(`${getInventory.rows[i-1].item_name}`)

                    if (i <= 12){
                        const itemsTwo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxTwo.drawImage(itemsTwo, (6+((i-10)*100)), 8, 90, 90);
                    }else if (i <= 15){
                        const itemsTwo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxTwo.drawImage(itemsTwo, (6+((i-13)*100)), 108, 90, 90);
                    }else if (i <= 18){
                        const itemsTwo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxTwo.drawImage(itemsTwo, (6+((i-16)*100)), 208, 90, 90);
                    }

                }else if (i <= 27){

                    inventoryPageThree += `${itemNumberInInventory - (i-1)} ${getInventory.rows[i-1].item_name} ${getInventory.rows[i-1].amount}\n`
                    inventoryPageThreeArray.push(`${getInventory.rows[i-1].item_name}`)

                    if (i <= 21){
                        const itemsThree = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxThree.drawImage(itemsThree, (6+((i-19)*100)), 8, 90, 90);
                    }else if (i <= 24){
                        const itemsThree = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxThree.drawImage(itemsThree, (6+((i-22)*100)), 108, 90, 90);
                    }else if (i <= 27){
                        const itemsThree = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxThree.drawImage(itemsThree, (6+((i-25)*100)), 208, 90, 90);
                    }

                }else if (i <= 32){

                    inventoryPageFour += `${itemNumberInInventory - (i-1)} ${getInventory.rows[i-1].item_name} ${getInventory.rows[i-1].amount}\n`
                    inventoryPageFourArray.push(`${getInventory.rows[i-1].item_name}`)

                    if (i <= 30){
                        const itemsFour = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxFour.drawImage(itemsFour, (6+((i-28)*100)), 8, 90, 90);
                    }else if (i <= 32){
                        const itemsFour = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
                        ctxFour.drawImage(itemsFour, (6+((i-31)*100)), 108, 90, 90);
                    }

                }

            }

            const attachmentOne = new Discord.MessageAttachment(canvasOne.toBuffer(), `${target.username}-inventory.png`);
            const attachmentTwo = new Discord.MessageAttachment(canvasTwo.toBuffer(), `${target.username}-inventory.png`);
            const attachmentThree = new Discord.MessageAttachment(canvasThree.toBuffer(), `${target.username}-inventory.png`);
            const attachmentFour = new Discord.MessageAttachment(canvasFour.toBuffer(), `${target.username}-inventory.png`);

            console.log(`inventoryPageOne`, inventoryPageOne)
            console.log(`inventoryPageTwo`, inventoryPageTwo)
            console.log(`inventoryPageThree`, inventoryPageThree)
            console.log(`inventoryPageFour`, inventoryPageFour)

            let invMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'inventoryOne',
                content: new Discord.MessageEmbed()
                    .setTitle(`Inventory Page 1`)
                    .setDescription(`${target.username}'s Backpack`)
                    .setColor('#007FFF')
                    .addFields(
                        {
                            name: "Items",
                            value: inventoryPageOne,
                            inline: true
                        }
                    )
                    .attachFiles(attachmentOne, `${target.username}-inventory.png`)
                    .setImage(`attachment://${target.username}-inventory.png`),
                reactions: {
                    '➡️': 'inventoryTwo',
                }
            },
            {
                name: 'inventoryTwo',
                content: new Discord.MessageEmbed()
                    .setTitle(`Inventory Page 2`)
                    .setDescription(`${target.username}'s Backpack`)
                    .setColor('#007FFF')
                    .addFields(
                        {
                            name: "Items",
                            value: inventoryPageTwo,
                            inline: true
                        }
                    )
                    .attachFiles(attachmentTwo, `${target.username}-inventory.png`)
                    .setImage(`attachment://${target.username}-inventory.png`),
                reactions: {
                    '⬅️': 'inventoryOne',
                    '➡️': 'inventoryThree',
                }
            },
            {
                name: 'inventoryThree',
                content: new Discord.MessageEmbed()
                    .setTitle(`Inventory Page 3`)
                    .setDescription(`${target.username}'s Backpack`)
                    .setColor('#007FFF')
                    .addFields(
                        {
                            name: "Items",
                            value: inventoryPageThree,
                            inline: true
                        }
                    )
                    .attachFiles(attachmentThree, `${target.username}-inventory.png`)
                    .setImage(`attachment://${target.username}-inventory.png`) ,
                reactions: {
                    '⬅️': 'inventoryTwo',
                    '➡️': 'inventoryFour',
                }
            },
            {
                name: 'inventoryFour',
                content: new Discord.MessageEmbed()
                    .setTitle(`Inventory Page 4`)
                    .setDescription(`${target.username}'s Backpack`)
                    .setColor('#007FFF')
                    .addFields(
                        {
                            name: "Items",
                            value: inventoryPageFour,
                            inline: true
                        }
                    )
                    .attachFiles(attachmentFour, `${target.username}-inventory.png`)
                    .setImage(`attachment://${target.username}-inventory.png`),
                reactions: {
                    '⬅️': 'inventoryThree'
                }
            }
        ], 300000)

        invMenu.start()

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
