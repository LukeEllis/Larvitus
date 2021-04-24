const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const errors = require("../../controllers/error");

module.exports = {
	name: 'badge',
	description: 'Adds or removes badges for a given user.',
    args: true,
    usage: '<action> <badge name> <user>',
	async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
		const author = message.author;
		const moderators = ['118172773788024836', '207732045877739522']
		const action = args[0];
		const badgeName = args[1];

		try{

			if(!moderators.includes(author.id)){
				return message.channel.send(`Beep boop. User does not have admin permissions to perform this command.`)
			}

			let verifyBadgeName = await badges.getBadgeByBadgeName(badgeName);
			console.log ('verifyBadgeName', verifyBadgeName)
			if (verifyBadgeName.rows.length < 1){
				return message.channel.send(`That badge name does not exist. Please check your spelling and try again.`)
			}

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		if (action === 'add'){
			try{
				let addBadgeToUser = await badges.addBadges(target, badgeName);
				return message.channel.send(`${author.username} has successfully added ${badgeName} to ${target.username}'s badge case. Congratulations!`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}
		}else if (action === 'remove'){
			try{
				let removeBadgeFromUser = await badges.removeBadges(target, badgeName);
				return message.channel.send(`${author.username} has successfully removed ${badgeName} from ${target.username}'s badge case.`);
			}catch (err){
				console.error(err.message)
				return errors.errorMessage(message)
			}			
		}
	},
};
