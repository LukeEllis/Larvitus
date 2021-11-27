const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");
const client = new Discord.Client();

module.exports = {
	name: 'targets2',
	description: 'Shows the available shiny trainer targets.',
	async execute(message) {

		try{


            let pokemonList = `
            Heracross x2, Hitmonchan, Houndoom\n
            Indeedee, Infernape x2, Jolteon x2\n
            Jynx, Kingler, Krookodile\n
            Lanturn x2, Larvesta, Liepard\n
            Lilligant, Lopunny, Lucario\n
            Lunatone, Luxray x2, Magcargo\n
            Magmortar x2, Magnemite, Magneton\n
            Mamoswine, Marshtomp, Medicham\n
            Meganium, Metagross, Mienshao\n
            Milotic, Minncino, Mudkip\n
            Musharna, Ninetales x2, Numel\n
            Octillery, Onix, Palossand\n
            Pelipper, Pichu, Pidgeot x2\n
            Pincurchin, Plusle, Porygon-Z\n
            Probopass, Raichu, Rampardos x2\n
            Rapidash x2
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
