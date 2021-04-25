const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const inventory = require("../../controllers/inventory");
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'sell',
	description: 'Sell items to the shop.',
    args: true,
    usage: '<item name> <amount>',
	async execute(message, args) {
        const target = message.author;
		const itemName = args[0];
        const amount = args[1];

        try{

            let validSellAmount = await inventory.itemCheck(target, itemName);
            if (validSellAmount.rows.length < 1){

                return message.channel.send(`You do not have any ${itemName} to sell.`);

            }else if (amount < 0){

                return message.channel.send(`Using negative numbers is weird. Stop that.`);

            }else{

                if (validSellAmount.rows[0].amount < amount){
                    
                    return message.channel.send(`You only have ${validSellAmount.rows[0].amount}x ${itemName} to sell.`);
                
                }

            }

            let removeItemsFromInventory = await inventory.removeFromInventory(target, itemName, amount);
            let itemValue = await shop.getShopByItemName(itemName);
            const value = (itemValue.rows[0].cost*amount)/2;
            let sellItems = await currency.addCurrency(value, target);

            return message.channel.send(`You have sold ${amount}x ${itemName} to the Shop and ${value} Pokédollars have been added to your wallet.`);
        
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
	},
};
