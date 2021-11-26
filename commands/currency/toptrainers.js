const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");
const client = new Discord.Client();

module.exports = {
	name: 'toptrainers',
	description: 'Gets the top 10 users and their currency amounts.',
	async execute(message) {

		try{

			let leaderboard = await currency.getLeaderboard()

            let leaderboardList = ``

            // Gets member username from message -> guild message is in -> members of the guild -> member with a given discord user id
            // async function getTrainerUsername(discord_user_id){
            //     console.log('discord_user_id', discord_user_id)
            //     let membered = await message.guild.members.fetch(discord_user_id)
            //     let username = await membered.user.username
            //     console.log('username', username)
            //     return username
            // }

            console.log('leaderboard', leaderboard)

            console.log('leaderboard.rows.length', leaderboard.rows.length)

            for (i = leaderboard.rows.length; i > 0; i--){

                leaderboardList += `\n**${leaderboard.rows.length - (i-1)}** <@${leaderboard.rows[leaderboard.rows.length - i].discord_user_id}> Total Points: ${leaderboard.rows[leaderboard.rows.length - i].total_points}\n`

            }

            let leaderboardEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Leaderboard`)
            .addFields(  
                {
                    name : `Top 10 Trainers`, 
                    value: leaderboardList, 
                    inline: true   
                }
            );

            let newMessage = message.channel.send({ embed: leaderboardEmbed })


		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
