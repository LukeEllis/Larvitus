const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");
const client = new Discord.Client();

module.exports = {
	name: 'targets3',
	description: 'Shows the available shiny trainer targets.',
	async execute(message) {

		try{


            let pokemonList = `
            Relicanth, Rhydon, Roserade x3\n
            Rotom, Samurott, Sceptile\n
            Semipour, Semisage, Semisear\n
            Serperior, Shinx, Shroomish\n
            Sneasel, Snorlax, Snubbull\n
            Spheal, Spiritomb, Staraptor\n
            Steelix, Sunflora, Swellow\n
            Tirtouga, Togekiss x2, Torterra\n
            Typhlosion x2, Tyranitar, Unfeazant\n
            Unown, Vaporeon, Venipede\n
            Venusaur, Wailmer,  Weavile\n
            Yanma, Zekrom, Zorua x2
            `

            let pokemonListEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Shiny Trainer Targets`)
            .addFields(  
                {
                    name : `Available Hunts`, 
                    value: pokemonList, 
                    inline: true   
                }
            );

            let newMessage = message.channel.send({ embed: pokemonListEmbed })


		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
