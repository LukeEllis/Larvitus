const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const inventory = require("../../controllers/inventory");
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'buy',
	description: 'Redeem rewards from the shop.',
    args: true,
    usage: '<item name>',
	async execute(message, args) {
        const target = message.author;
		const itemName = args[0].toLowerCase();

        try{

            let validItemName = await shop.getShopByItemName(itemName);
            if (validItemName.rows.length < 1){
                return message.channel.send(`No rewards with that name were found. Use !shop to search what rewards are available.`);
            }

            let balance = await currency.getCurrencyById(target);
            let cost = validItemName.rows[0].reward_point_cost;
            let amountOwned = await inventory.itemCheck(target, itemName);
            let itemCategory = await inventory.getItemCategories(itemName);

            // If the reward is a stream interaction, and the redeem has already been done for the month, uncomment this code to block future redeems
            if (itemCategory.rows[0].reward_type === 'stream_interaction'){
                return message.channel.send(`${validItemName.rows[0].reward_name} has already been redeemed for the month of December! You'll be able to choose a hunt again in January :).`);
            }

            // If the reward is a discord role, and the user already has the role, don't buy it
            if (itemCategory.rows[0].reward_type === 'discord_role' && amountOwned.rows.length == 1){
                return message.channel.send(`You already own the ${validItemName.rows[0].reward_name} Discord Role!`);
            }

            // If the user doesn't have an item entry for that reward, send them a message if they cannot afford it or insert a row if they can 
            if (amountOwned.rows.length < 1){

                // Sends user a message if they do not have enough points
                console.log(`balance`, balance.rows[0].current_points)
                console.log(`cost`, cost)
                if (balance.rows[0].current_points < cost){
                    return message.channel.send(`You cannot afford ${validItemName.rows[0].reward_name} right now. Keep saving up points!`);
                }

                // Creates a row in the database to store an item for a user
                await inventory.createItemEntry(target, itemName);

                // Removes the amount of points a user owes from the user's current_points
                await currency.removeCurrency(cost, target);

                // Adds 1 of the chosen item to the user's inventory
                await inventory.addToInventory(target, itemName, 1);

                // If the reward is a role, grant the user that role. 
                if (itemCategory.rows[0].reward_type === 'discord_role'){

                    // Searches for the role name in the discord server and decides who to grant the role to
                    let roleName = itemCategory.rows[0].reward_grant_id;
                    let role = message.guild.roles.cache.find(r => r.name === roleName);
                    let member = message.member;

                    // Adds role to the user
                    member.roles.add(role).catch(console.error);

                    return message.channel.send(`Congratulations ${target.username}, you are now a proud owner of the ${role} role!`);

                // If the reward is a stream interaction, post that redeem in #shiny-trainer-credit
                }else if (itemCategory.rows[0].reward_type === 'stream_interaction'){

                    const attachment = 'https://c.tenor.com/BPK7UPTSm6gAAAAC/pokemon-jump.gif';

                    let streamInteractionEmbed = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(`New Stream Redeem`)
                        .setDescription(`<@${target.id}> redeemed a stream interaction, yaaaay!!`)
                        .setImage(attachment);

                    // Send an embed to the #shiny-trainer-credit channel
                    return message.guild.channels.cache.get("891261739642019851").send({ embed: streamInteractionEmbed })

                /*  
                    If the reward is neither a discord_role or stream_interaction, use a default message.
                    Consider creating a custom response for other rewards to enhance user experience.
                */
                }else{
                    return message.channel.send(`${itemName} has been added to your inventory.`);
                }
                
            }
            
            // Right now all !buy commands add exactly 1 to the amount owned, so we just check if current amount + 1 is greater than the limit
            if ((amountOwned.rows[0].amount + 1) > validItemName.rows[0].reward_limit){
                return message.channel.send(`You may only own ${validItemName.rows[0].reward_limit} ${validItemName.rows[0].reward_name} at a time.`);
            }

            // If the user has an item entry for that reward, do not create a new row in the database for them
            // Sends user a message if they do not have enough points
            console.log(`balance`, balance.rows[0].current_points)
            console.log(`cost`, cost)
            if (balance.rows[0].current_points < cost){
                return message.channel.send(`You cannot afford ${validItemName.rows[0].reward_name} right now. Keep saving up points!`);
            }
            // Removes the amount of points a user owes from the user's current_points
            await currency.removeCurrency(cost, target);
            // Adds 1 of the chosen item to the user's inventory
            await inventory.addToInventory(target, itemName, 1);

            // If the reward is a stream interaction, post that redeem in #shiny-trainer-credit
            if (itemCategory.rows[0].reward_type === 'stream_interaction'){

                const attachment = 'https://c.tenor.com/BPK7UPTSm6gAAAAC/pokemon-jump.gif';

                let streamInteractionEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`New Stream Redeem`)
                    .setDescription(`<@${target.id}> redeemed a stream interaction, yaaaay!!`)
                    .setImage(attachment);

                // Send an embed to the #shiny-trainer-credit channel
                return message.guild.channels.cache.get("891261739642019851").send({ embed: streamInteractionEmbed })

            }

            return message.channel.send(`${itemName} has been added to your inventory.`);
        
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
	},
};
