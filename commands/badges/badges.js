const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const errors = require("../../controllers/error");

module.exports = {
	name: 'badges',
	description: 'Shows [!badges show] or updates badges for a given user.',
    args: true,
    usage: '<action> <badge category> <badge name> <user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const badgeCategory = args[1];
		const badgeName = args[2];

		if (action === 'show'){
			try{
				let getBadges = await badges.getBadgesById(target);
				let badgesEmbed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`Badges`)
					.setDescription(`<@${target.id}>`);
				for (i = getBadges.rows.length; i > 0; i--){
					let formatCategory = await badges.formatBadgeCategories(getBadges);
					let formatName = await badges.formatBadgeNames(getBadges);
					badgesEmbed.addFields(
							{
								name : `${formatCategory} Badge:`, value: `${formatName}`, inline: false
							}
					)
				}
				return message.channel.send({ embed: badgesEmbed });

			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}

		try{
			let checkUserBadgesExistence = await badges.checkUserBadgesExistence(target);
			if(!moderators.includes(author.id)){
				message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}else if(checkUserBadgesExistence.rows.length < 1){
				message.channel.send(`User ${target.tag} does not yet have any badges.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				let addBadgeToUser = await badges.addBadges(target, badgeCategory, badgeName);
				message.channel.send(`${author.tag} has successfully added ${badgeName} to ${target.tag}'s badge case. Congratulations!`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'remove'){
			try{
				let removeBadgeFromUser = await badges.removeBadges(target, badgeCategory, badgeName);
				message.channel.send(`${author.tag} has successfully removed ${badgeName} from ${target.tag}'s badge case.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
