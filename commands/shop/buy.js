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

            // If the user doesn't have an item entry for that reward, send them a message if they cannot afford it or insert a row if they can 
            if (amountOwned.rows.length < 1){
                // Sends user a message if they do not have enough points
                await currency.canUserAfford(balance, cost, validItemName)
                // Creates a row in the database to store an item for a user
                await inventory.createItemEntry(target, itemName);
                // Removes the amount of points a user owes from the user's current_points
                await currency.removeCurrency(cost, target);
                // Adds 1 of the chosen item to the user's inventory
                await inventory.addToInventory(target, itemName, 1);
                return message.channel.send(`${itemName} has been added to your inventory.`);
            }
            
            // Right now all !buy commands add exactly 1 to the amount owned, so we just check if current amount + 1 is greater than the limit
            if ((amountOwned.rows[0].amount + 1) > validItemName.rows[0].reward_limit){
                return message.channel.send(`You may only own ${validItemName.rows[0].reward_limit}x ${validItemName.rows[0].reward_name} at a time.`);
            }

            // If the user has an item entry for that reward, do not create a new row in the database for them
            // Sends user a message if they do not have enough points
            await currency.canUserAfford(balance, cost, validItemName)
            // Removes the amount of points a user owes from the user's current_points
            await currency.removeCurrency(cost, target);
            // Adds 1 of the chosen item to the user's inventory
            await inventory.addToInventory(target, itemName, 1);
            return message.channel.send(`${itemName} has been added to your inventory.`);
        
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
	},
};
