const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const errors = require("../../controllers/error");

module.exports = {
	name: 'badges',
	description: 'Shows badges for a given user.',
    usage: '<user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;

		try{
			let checkUserBadgesExistence = await badges.getBadgesById(target);
			if(checkUserBadgesExistence.rows.length < 1){
				message.channel.send(`User ${target.username} does not yet have any badges.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		try{
			let getBadges = await badges.getBadgesById(target);
			let badgesEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Badges`)
				.setDescription(`<@${target.id}>`);
			for (i = getBadges.rows.length; i > 0; i--){
				let getBadgeInformation = await badges.getBadgeByBadgeName(getBadges.rows[0].badge_name)
				badgesEmbed.addFields(
						{
							name : `${getBadgeInformation.rows[i-1].category_display_name} Badge:`, value: `${getBadgeInformation.rows[i-1].badge_display_name}\nEarned on ${getBadges.rows[i-1].earned_date}`, inline: false
						}
				)
			}
			return message.channel.send({ embed: badgesEmbed });

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
