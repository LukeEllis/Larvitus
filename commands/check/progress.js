const errors = require("../../controllers/error");

module.exports = {
	name: 'progress',
	description: 'Shares the link to the Shiny Trainer Challenge public progress spreadsheet.',
	async execute(message) {

		try{

            return message.channel.send(`Check out your progress on the Shiny Trainer Challenge spreadsheet!\nhttps://bit.ly/shinytrainers`)

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
