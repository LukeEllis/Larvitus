const errors = require("../../controllers/error");

module.exports = {
	name: 'targets',
	description: 'Shares the link to the Shiny Trainer Challenge Pokédex tracker, showing what targets are available to hunt.',
	async execute(message) {

		try{

            return message.channel.send(`Check out the targets available to hunt for the Shiny Trainer Challenge!\nhttps://bit.ly/shinytrainertargets`)

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
