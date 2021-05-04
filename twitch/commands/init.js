const currency = require("../../controllers/currency");

exports.run = async (twitchClient, message, args, userstate, channel, self) => {
        const target = userstate;
		const discordId = args[0];
       
		try{

            if(!discordId){
                return twitchClient.say(channel, `@${target.username}, do !init <discord-id> to sync your Discord and Twitch accounts.`);
            }

            let doesUserExist = await currency.getCurrencyById(discordId);
        
            if(doesUserExist.rows.length > 0){
                return twitchClient.say(channel, `User ${target.username} already has an awesome wallet. Try using !balance.`)
            }else {
                let newUserWallet = await currency.updateWalletTwitch(target, discordId);
                return twitchClient.say(channel, `@${target.username}'s shiny wallet now works on Twitch!`);
            }

		}catch (err){
			console.error(err.message)
			return twitchClient.say(channel, `Oops, we've hit a snag! Look into this Blue, would you?`)
		}
};
