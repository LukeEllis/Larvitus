const Discord = require('discord.js');
const Canvas = require('canvas');
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
				return message.channel.send(`User ${target.username} does not yet have any badges.`)
			}
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}

		try{

			let getBadges = await badges.getBadgesById(target);
			const badgesOwned = getBadges.rows;

			let badgeCheckShinyGymOne = badgesOwned.some(badgeName => badgeName.badge_name === 'blazing_blaziken_badge');
			let badgeCheckShinyGymTwo = badgesOwned.some(badgeName => badgeName.badge_name === 'tyrannus_badge');
			let badgeCheckShowdownGymOne = badgesOwned.some(badgeName => badgeName.badge_name === 'rockin_out_badge');
			let badgeCheckGamesOne = badgesOwned.some(badgeName => badgeName.badge_name === 'dragon_slayer_badge');
			let badgeCheckGamesTwo = badgesOwned.some(badgeName => badgeName.badge_name === 'miner_badge');
			let badgeCheckGamesThree = badgesOwned.some(badgeName => badgeName.badge_name === 'master_thief_badge');
			let badgeCheckArtOne = badgesOwned.some(badgeName => badgeName.badge_name === 'art_1_badge');
			let badgeCheckBakingOne = badgesOwned.some(badgeName => badgeName.badge_name === 'baking_1_badge');

			const canvas = Canvas.createCanvas(560, 340);
			const ctx = canvas.getContext('2d');
			const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/621553509606752258/836541858417999872/boxes.png');
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

			if(badgeCheckShinyGymOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
				ctx.drawImage(avatar, 8, 10, 120, 120);
			}

			if(badgeCheckShinyGymTwo){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805037389017645079/831586098819891250/Badge2transparent.png');
				ctx.drawImage(avatar, 112, 10, 120, 120);
			}

			if(badgeCheckShowdownGymOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836614563067461732/Rockin_Out_Badge.png');
				ctx.drawImage(avatar, 228, 10, 106, 106);
			}

			if(badgeCheckGamesOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836640426374594590/Dragon_Slayer_Badge.png');
				ctx.drawImage(avatar, 342, 20, 90, 90);
			}

			if(badgeCheckGamesTwo){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836662410693705808/Miner_Badge.png');
				ctx.drawImage(avatar, 442, 14, 100, 100);
			}

			if(badgeCheckGamesThree){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/836682341912805456/Master_Thief_Badge.png');
				ctx.drawImage(avatar, 18, 122, 98, 98);
			}

			if(badgeCheckArtOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805037389017645079/831586098819891250/Badge2transparent.png');
				ctx.drawImage(avatar, 112, 116, 120, 120);
			}

			if(badgeCheckBakingOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/805037389017645079/831586098819891250/Badge2transparent.png');
				ctx.drawImage(avatar, 218, 116, 120, 120);
			}

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${target.username}-badge-case.png`);

			let badgesEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Badge Case`)
				.setDescription(`<@${target.id}>'s Badges`)
				.attachFiles(attachment)
				.setImage(`attachment://${target.username}-badge-case.png`);

			return message.channel.send({ embed: badgesEmbed });

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
