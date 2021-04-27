const Discord = require('discord.js');
const Canvas = require('canvas');
const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");

module.exports = {
	name: 'balance',
	description: 'Gets the balance for a given user.',
	async execute(message) {
        const target = message.mentions.users.first() || message.author;

		try{

			let balance = await currency.getCurrencyById(target)

			if(!balance.rows.length){
				return message.channel.send("User not found! User must initialize themselves with the !init command.")
			}

			const canvas = Canvas.createCanvas(560, 340);
			const ctx = canvas.getContext('2d');

			console.log(`balance.rows[0].currency`, balance.rows[0].currency)

			if (balance.rows[0].currency === 0){

				const background = await Canvas.loadImage('https://i.imgur.com/qZjDcq3.jpg');
				ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
				const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${target.username}-empty-balance.png`);

				let balanceEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Wallet`)
				.setDescription(`<@${target.id}>'s Balance`)
				.attachFiles(attachment)
				.setImage(`attachment://${target.username}-empty-balance.png`);

				return message.channel.send({ embed: balanceEmbed });
			
			}else if (balance.rows[0].currency > 0){

				// const background = await Canvas.loadImage('https://i.redd.it/ez6cr4cke7k51.jpg');
				// ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

				// // Select the font size and type from one of the natively available fonts
				// ctx.font = '60px sans-serif';
				// ctx.fillStyle = '#000000';
				// ctx.fillText(`$${balance.rows[0].currency}\nPokédollars`, canvas.width / 4, canvas.height / 2);

				// const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${target.username}-balance.png`);

				// let balanceEmbed = new Discord.MessageEmbed()
				// .setColor('#0099ff')
				// .setTitle(`Wallet`)
				// .setDescription(`<@${target.id}>'s Balance`)
				// .attachFiles(attachment)
				// .setImage(`attachment://${target.username}-balance.png`);

				// return message.channel.send({ embed: balanceEmbed });

				return message.channel.send(`${target.username} has ${balance.rows[0].currency} Pokédollars.`);
			
			}
			
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
