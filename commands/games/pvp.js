const Discord = require('discord.js');
const errors = require("../../controllers/error");
const currency = require('../../controllers/currency');

module.exports = {
	name: 'pvp',
	description: 'Toggles PvP features for the user.',
    args: true,
    usage: '<on/off/status>',
	async execute(message, args) {
        const target = message.author;
        const pvpFlag = args[0];
        
        try{

            let doesUserExist = await currency.getCurrencyById(target);
            if(doesUserExist.rows.length < 1){

                return message.channel.send(`User not found! User must initialize themselves with the !init command.`)
            
            }

            if (pvpFlag === 'status'){
                // add function to check how much longer on cooldown
                return message.channel.send(`${target.username}'s PvP Flag is set to ${doesUserExist.rows[0].pvp}.`)
            }

            let passPvpCheck = await currency.pvpDateCheck(target);
            if(passPvpCheck.rows.length > 0){

                let updatePvp = await currency.updatePvp(target, pvpFlag);
                return message.channel.send(`Successfully updated ${target.username}'s PvP Flag to ${pvpFlag}.`)

            }else{
                // add comment that shows cooldown time remaining
                return message.channel.send(`${target.username}'s PvP Flag is still on cooldown. Please wait until 24 hours have passed.`)
            
            }

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
