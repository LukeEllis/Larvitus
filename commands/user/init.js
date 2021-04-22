const currency = require("../../controllers/currency");
const badges = require("../../controllers/badges");
const errors = require("../../controllers/error");

module.exports = {
	name: 'init',
	description: 'Initializes a wallet and backpack for the user.',
	async execute(message) {
        const target = message.author;

        try{

            let doesUserExist = await currency.checkUserWalletExistence(target);
        
            if(doesUserExist.rows.length == 1){
                message.channel.send(`User ${target.tag} already has an awesome wallet. Try using !balance.`)
            }else {
                message.channel.send(`User ${target.tag} needs a nice new wallet. Initilizing Operation: Shiny New Wallet.`);
                let newUserWallet = await currency.createNewUserWallet(target);
                message.channel.send(`A shiny new wallet for ${target.tag} has been made. Try using !balance.`);
            }
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
        
        // try{
        //     let checkUserInventoryExistence = await inventory.checkUserInventoryExistence(target);
        
        //     if(checkUserInventoryExistence.rows.length == 1){
        //         message.channel.send(`User ${target.tag} already has a backpack to carry their things. Try using !inventory.`)
        //     }else{
        //         message.channel.send(`User ${target.tag} needs a quality pack to carry their items. Initilizing Operation: Sturdy Backpack.`);
        //         let newUserInventory = await inventory.createNewUserInventory(target);
        //         message.channel.send(`A sturdy backpack for ${target.tag} has been created. Try using !inventory.`);
        //     }
        // }catch (err){
        //     console.error(err.message)
        //     return errors.errorMessage(message)
        // }

        // return message.channel.send(`Larvitus has successfully registered ${target.tag} with a wallet and backpack. Try using !balance or !inventory.`);
        return message.channel.send(`Larvitus has successfully registered ${target.tag} with a wallet. Try using !balance.`);
	},
};
