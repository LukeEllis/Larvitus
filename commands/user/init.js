const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");

module.exports = {
	name: 'init',
	description: 'Initializes a wallet and backpack for the user.',
	async execute(message) {
        const target = message.author;

        try{
            let doesUserExist = await currency.getCurrencyById(target);
        
            if(doesUserExist.rows.length > 0){
                return message.channel.send(`User ${target.username} already has an awesome wallet. Try using !balance.`)
            }else {
                let newUserWallet = await currency.createNewUserWallet(target);
                return message.channel.send(`A shiny new wallet for ${target.username} has been made. Try using !balance.`);
            }
        }catch (err){
            console.error(err.message)
            return errors.errorMessage(message)
        }
	},
};
