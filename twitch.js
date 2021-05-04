const tmi = require('tmi.js');
const { prefix, twitch_bot_name, twitch_oauth_token, twitch_channel_name } = require('./config.json');

const twitchClient = new tmi.Client({
	options: { debug: true, messagesLogLevel: "info" },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: twitch_bot_name,
		password: twitch_oauth_token
	},
	channels: [ twitch_channel_name ]
});

twitchClient.connect().catch(console.error);
twitchClient.on('message', async (channel, userstate, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
	}
    // else if (message.toLowerCase() === '!eggs'){
    //     let getEggs = await eggs.getAllEggs();
    //     client.say(channel, `The Manaphy Marathon crew has collected a total of ${getEggs.rows[0].amount} Manaphy Eggs so far!`);
    // }else if (message.toLowerCase() === '!eggs oliver'){
    //     let getOliverEggs = await eggs.getOliverEggs();
	// 	console.log(`getOliverEggs`, getOliverEggs)
    //     client.say(channel, `Oliver has collected ${getOliverEggs.rows[0].amount_oliver} Manaphy Eggs so far!`);
    // }else if (message.toLowerCase() === '!eggs rj'){
    //     let getRjEggs = await eggs.getRjEggs();
    //     client.say(channel, `RJ has collected ${getRjEggs.rows[0].amount_rj} Manaphy Eggs so far!`);
    // }else if (message.toLowerCase() === '!eggs hangar'){
    //     let getHangarEggs = await eggs.getHangarEggs();
    //     client.say(channel, `Hangar has collected ${getHangarEggs.rows[0].amount_hangar} Manaphy Eggs so far!`);
    // }

    const args = message.slice(prefix.length).trim().split(/ +/g);
    const twitchCommand = args.shift().toLowerCase();

    try {

        let twitchCommandFile = require(`./twitch/commands/${twitchCommand}.js`)
        twitchCommandFile.run(twitchClient, message, args, userstate, channel, self);
        
    }catch (err){

        return
    
    }

});