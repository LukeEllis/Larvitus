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
				return message.channel.send(`${target} doesn't have any shiny trainer points yet!`)
			}

			const canvas = Canvas.createCanvas(560, 340);
			const ctx = canvas.getContext('2d');

			console.log(`balance.rows[0].total_points`, balance.rows[0].total_points)
			console.log(`balance.rows[0].current_points`, balance.rows[0].current_points)

			if (balance.rows[0].total_points === 0){

				const attachment = 'https://media0.giphy.com/media/yIxNOXEMpqkqA/giphy.gif';

				let balanceEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Wallet`)
				.setDescription(`<@${target.id}>'s Balance`)
				.setImage(attachment);

				return message.channel.send({ embed: balanceEmbed });
			
			}else if (balance.rows[0].total_points > 0){

				return message.channel.send(`${target.username} has earned ${balance.rows[0].total_points} total points and currently has ${balance.rows[0].current_points} points.`);
			
			}
			
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
