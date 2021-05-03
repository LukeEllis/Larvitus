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

			let badgeList = ``
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

			for (i = badgesOwned.length; i > 0; i--){

				badgeList += `${badgesOwned.length - (i-1)} ${badgesOwned[i-1].badge_name}\n`

			}

			let badgeCheckShinyGymOne = badgesOwned.some(badgeName => badgeName.badge_name === 'blazing_blaziken_badge');
			let badgeCheckShinyGymTwo = badgesOwned.some(badgeName => badgeName.badge_name === 'tyrannus_badge');
			let badgeCheckShowdownGymOne = badgesOwned.some(badgeName => badgeName.badge_name === 'rockin_out_badge');
			let badgeCheckGamesOne = badgesOwned.some(badgeName => badgeName.badge_name === 'dragon_slayer_badge');
			let badgeCheckGamesTwo = badgesOwned.some(badgeName => badgeName.badge_name === 'miner_badge');
			let badgeCheckGamesThree = badgesOwned.some(badgeName => badgeName.badge_name === 'master_thief_badge');
			let badgeCheckArtOne = badgesOwned.some(badgeName => badgeName.badge_name === 'art_1_badge');
			let badgeCheckBakingOne = badgesOwned.some(badgeName => badgeName.badge_name === 'baking_1_badge');
			let badgeCheckTriviaOne = badgesOwned.some(badgeName => badgeName.badge_name === 'trivia_1_badge');

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
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/837035861685960754/Art_Badge.png');
				ctx.drawImage(avatar, 120, 110, 120, 120);
			}

			if(badgeCheckBakingOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/837321980549529610/Cake_Badge.png');
				ctx.drawImage(avatar, 208, 116, 114, 114);
			}

			if(badgeCheckTriviaOne){
				const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/837705453080543249/Trivia_Badge.png');
				ctx.drawImage(avatar, 330, 116, 114, 114);
			}

			const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `badge-case.png`);

			badgesEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Badge Case`)
				.setDescription(`<@${target.id}>'s Badges`)
				.addFields(  
                    {
                        name : `Badges`, 
                        value: badgeList, 
                        inline: true   
                    }
                )
				.attachFiles(attachment)
				.setImage(`attachment://badge-case.png`);
			
			badgesEmbed = message.channel.send(badgesEmbed)

			for (i = badgesOwned.length; i > 0; i--){
				badgesEmbed
					.then(embedMessage => {
						embedMessage.react(`${emojis[i-1]}`);
					});
			}

			badgesEmbed
				.then(embedMessage => {
					embedMessage;
				
					const filter = (reaction, target) => reaction.emoji.name === '2️⃣' && target.id != '821544318351179777';
					const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
				
					collector.on('collect', async () => {

						// const canvas = Canvas.createCanvas(140, 140);
						// const ctx = canvas.getContext('2d');
						// const badgeTwo = await Canvas.loadImage('https://cdn.discordapp.com/attachments/836571397630459904/838027698441551872/Strongest_Potion_v2.png');
						// ctx.drawImage(badgeTwo, 0, 0, canvas.width, canvas.height);

						// const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${badgesOwned[0].badge_name}`);

						// const embed = new Discord.MessageEmbed()
						// 	.setColor('#007FFF')
						// 	.addFields(  
						// 		{
						// 			name : `${badgesOwned[0].badge_name}`, 
						// 			value: `Badge Name: ${badgesOwned[0].badge_name}\nBadge Category: ${badgesOwned[0].badge_category}\n Earned on: ${badgesOwned[0].earned_date}`, 
						// 			inline: true   
						// 		}
						// 	)
						// 	.attachFiles(attachment)
						// 	.setImage(`attachment://${badgesOwned[0].badge_name}.png`);  
		
						// message.channel.send({ embed: embed })
						console.log(`hi`)
					
					});
				});




			return message.channel.send({ embed: badgesEmbed });

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
