const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const errors = require("../../controllers/error");

module.exports = {
	name: 'badge',
	description: 'Adds or removes badges for a given user.',
    args: true,
    usage: '<action> <badge category> <badge name> <user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const badgeCategory = args[1];
		const badgeName = args[2];

		try{
			if(!moderators.includes(author.id)){
				return message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				let addBadgeToUser = await badges.addBadges(target, badgeCategory, badgeName);
				return message.channel.send(`${author.username} has successfully added ${badgeName} to ${target.username}'s badge case. Congratulations!`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'remove'){
			try{
				let removeBadgeFromUser = await badges.removeBadges(target, badgeCategory, badgeName);
				return message.channel.send(`${author.username} has successfully removed ${badgeName} from ${target.username}'s badge case.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
