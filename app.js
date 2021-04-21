const Discord = require('discord.js');
const db = require('./services/postgres.service');
const CurrencyController = require('./controllers/currency')

const client = new Discord.Client();
const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = '!';

// Reflect.defineProperty(currency, 'add', {
// 	/* eslint-disable-next-line func-name-matching */
// 	value: async function add(id, amount) {
// 		const user = currency.get(id);
// 		if (user) {
// 			user.balance += Number(amount);
// 			return user.save();
// 		}
// 		const newUser = await Users.create({ user_id: id, balance: amount });
// 		currency.set(id, newUser);
// 		return newUser;
// 	},
// });

// Reflect.defineProperty(currency, 'getBalance', {
// 	/* eslint-disable-next-line func-name-matching */
// 	value: function getBalance(id) {
// 		const user = currency.get(id);
// 		return user ? user.balance : 0;
// 	},
// });

// client.once('ready', async () => {
// 	const storedBalances = await Users.findAll();
// 	storedBalances.forEach(b => currency.set(b.user_id, b));
// 	console.log(`Logged in as ${client.user.tag}!`);
// });

client.on('message', async message => {
	if (message.author.bot) return;
	// currency.add(message.author.id, 1);

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		let currency = await db.query('SELECT user_id, currency FROM main.currency WHERE user_id = $1', [target.id])
		// const currency = CurrencyController.getCurrencyById(target.id);
		console.log(`currency reponse:`, currency);

		if(!currency.rows.length){
            return message.channel.send("User not found! User must initialize themselves with the !wallet command.")
        }

		return message.channel.send(`${target.tag} has ${currency.rows[0].currency} Pokédollars`);
	} else if (command == 'wallet'){
		const target = message.author;

		try{
			let checkUserWalletExistence = await db.query(
				'SELECT * FROM main.currency WHERE user_id = $1',
				[`${target.id}`]
			)
			console.log(`checkUserWalletExistence reponse:`, checkUserWalletExistence);
	
			if(checkUserWalletExistence.rows.length == 1){
				message.channel.send(`User ${target.tag} already has an awesome wallet. Try using !balance.`)
			}else {
				message.channel.send(`User ${target.tag} needs a nice new wallet. Initilizing Operation: Shiny New Wallet.`);
				let newUserWallet = await db.query(
					'INSERT INTO main.currency (user_id, currency) VALUES ($1, $2) RETURNING *',
					[`${target.id}`, 0]
				)
				console.log(`newUserWallet reponse:`, newUserWallet);
				message.channel.send(`A shiny new wallet for ${target.tag} has been made. Try using !balance.`);
			}
		}catch (err){
			console.error(err.message)
			return message.channel.send(`Beep boop, your request got lost in the void. Let my creator know and they will look into it.`)
		}

		try{
			let checkUserInventoryExistence = await db.query(
				'SELECT * FROM main.inventory WHERE user_id = $1',
				[`${target.id}`]
			)
			console.log(`checkUserInventoryExistence reponse:`, checkUserInventoryExistence);

			if(checkUserInventoryExistence.rows.length == 1){
				message.channel.send(`User ${target.tag} already has a backpack to carry their things. Try using !inventory.`)
			}else{
				message.channel.send(`User ${target.tag} needs a quality pack to carry their items. Initilizing Operation: Sturdy Backpack.`);
				let newUserInventory = await db.query(
					'INSERT INTO main.inventory (user_id, shiny_gym_badge_1_blazing_blaziken_badge, shiny_gym_badge_2_tyrannus_badge, showdown_gym_badge_1_rockin_out, community_art_badge_1, community_baking_badge_1) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
					[`${target.id}`, 0, 0, 0, 0, 0]
				)
				console.log(`newUserInventory reponse:`, newUserInventory);
				message.channel.send(`A sturdy backpack for ${target.tag} has been created. Try using !inventory.`);
			}
		}catch (err){
			console.errer(err.message)
			return message.channel.send(`Beep boop, your request got lost in the void. Let my creator know and they will look into it.`)
		}

		return message.channel.send(`Larvitus has successfully registered ${target.tag} with a wallet and backpack. Try using !balance or !inventory.`);

	} else if (command === 'inventory') {

        // !inventory
		const target = message.mentions.users.first() || message.author;
		try{
			let checkUserInventoryExistence = await db.query(
				'SELECT * FROM main.inventory WHERE user_id = $1',
				[`${target.id}`]
			)
			console.log(`checkUserInventoryExistence reponse:`, checkUserInventoryExistence);

			if(checkUserInventoryExistence.rows.length < 1){
				message.channel.send(`User ${target.tag} does not yet have a backpack to carry their things. Use !wallet to obtain a backpack.`)
			}else{
				message.channel.send(`User ${target.tag} needs a quality pack to carry their items. Initilizing Operation: Sturdy Backpack.`);
				let getUserInventory = await db.query(
					'SELECT * FROM main.inventory WHERE user_id = $1',
					[`${target.id}`]
				)
				console.log(`getUserInventory reponse:`, getUserInventory);
				message.channel.send(`A sturdy backpack for ${target.tag} has been created. Try using !inventory.`);
			}
		}catch (err){
			console.errer(err.message)
			return message.channel.send(`Beep boop, your request got lost in the void. Let my creator know and they will look into it.`)
		}

        // const inventoryEmbed = new Discord.MessageEmbed()
        //     .setColor('#0099ff')
        //     .setTitle(`Inventory`)
        //     .setDescription(`<@${target.id}>`)
        //     .setThumbnail(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`)
        //     .addFields(
        //         { name: 'Pokédollars', value: `${currency.getBalance(target.id)}`, inline: true },
		// 		{ name: 'Cakes', value: `50`, inline: true } 
        //     )
        //     .setTimestamp()
        //     .setFooter('Brought to you by Larvitus', 'https://cdn.discordapp.com/attachments/624680294905282581/821551597213581322/Ash_Larvitar.webp');

		// if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        // return message.channel.send({ embed: inventoryEmbed });
        
	} else if (command === 'transfer') {
		// const currentAmount = currency.getBalance(message.author.id);
		// const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
		// const transferTarget = message.mentions.users.first();

		// if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
		// if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
		// if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

		// currency.add(message.author.id, -transferAmount);
		// currency.add(transferTarget.id, transferAmount);

		// return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	} else if (command === 'buy') {
		// const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		// if (!item) return message.channel.send('That item doesn\'t exist.');
		// if (item.cost > currency.getBalance(message.author.id)) {
		// 	return message.channel.send(`You don't have enough currency, ${message.author}`);
		// }

		// const user = await Users.findOne({ where: { user_id: message.author.id } });
		// currency.add(message.author.id, -item.cost);
		// await user.addItem(item);

		// message.channel.send(`You've bought a ${item.name}`);
	} else if (command === 'shop') {
		// const items = await CurrencyShop.findAll();
		// return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	} else if (command === 'leaderboard') {
	// 	return message.channel.send(
	// 		currency.sort((a, b) => b.balance - a.balance)
	// 			.filter(user => client.users.cache.has(user.user_id))
	// 			.first(10)
	// 			.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
	// 			.join('\n'),
	// 		{ code: true },
	// 	);
	}
});

client.login('ODIxNTQ0MzE4MzUxMTc5Nzc3.YFFQxQ.-qHcAuyfzzO1lszS7FRJQIvokgs');
