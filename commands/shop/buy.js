const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const inventory = require("../../controllers/inventory");
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'buy',
	description: 'Buy items from the shop.',
    args: true,
    usage: '<item name> <amount>',
	async execute(message, args) {
        const target = message.author;
		const itemName = args[0];
        const amount = args[1];

        try{

            let validItemName = await shop.getShopByItemName(itemName);
            if (validItemName.rows.length < 1){
                return message.channel.send(`No items with that name were found. Use !shop to search what items are available.`);
            }else if (!amount){
                return message.channel.send(`How many ${itemName} do you want to buy? Please try the command again with a number after ${itemName}.`);
            }else if (amount < 0){
                return message.channel.send(`Using negative numbers is weird. Stop that.`);
            }

            let amountOwned = await inventory.itemCheck(target, itemName);
            let limitCheck = await shop.getShopByItemName(itemName);
            if (amountOwned.rows.length < 1){
                if (amount > limitCheck.rows[0].item_limit){
                    return message.channel.send(`You may only carry ${limitCheck.rows[0].item_limit}x ${validItemName.rows[0].item_name} at a time.`);
                }
            }else{
                const parsedAmountOwned = parseInt(amountOwned.rows[0].amount);
                const parsedAmount = parseInt(amount);
                const parsedLimit = parseInt(limitCheck.rows[0].item_limit);
                if ((parsedAmountOwned + parsedAmount) > parsedLimit){
                    return message.channel.send(`You may only carry ${limitCheck.rows[0].item_limit}x ${validItemName.rows[0].item_name} at a time. You can carry ${limitCheck.rows[0].item_limit - amountOwned.rows[0].amount} more ${validItemName.rows[0].item_name}.`);
                }
            }

            console.log(`amount`, amount)
            let moneyOwned = await currency.getCurrencyById(target);
            console.log(`moneyOwned`, moneyOwned.rows[0].currency)
            let cost = ((amount)*(limitCheck.rows[0].cost));
            console.log(`cost`, cost)
            if (moneyOwned.rows[0].currency < cost){
                return message.channel.send(`You cannot afford ${amount}x ${validItemName.rows[0].item_name} right now.`);
            }

            let spendCurrency = await currency.removeCurrency(amount, target);

            if (amountOwned.rows.length < 1){
                let addItemToUserInventory = await inventory.createItemEntry(target, itemName, amount);
                return message.channel.send(`${amount}x ${itemName} has been added to your inventory.`);
            }

            let updateUserInventory = await inventory.addToInventory(target, itemName, amount);
            return message.channel.send(`${amount}x ${itemName} has been added to your inventory.`);
        
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
	},
};
