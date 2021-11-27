const Discord = require('discord.js');
const currency = require("../../controllers/currency");
const errors = require("../../controllers/error");
const client = new Discord.Client();

module.exports = {
	name: 'targets',
	description: 'Shows the available shiny trainer targets.',
	async execute(message) {

		try{


            let pokemonList = `
            \nAbomasnow, Aerodactyl, Alakazam\n
            Alolan Raichu, Ambipom, Arcanine x2\n
            Archen, Armaldo, Aron\n
            Audino, Axew, Bastiodon\n
            Blastoise, Blaziken, Carvanha\n
            Centiskorch, Charizard x2, Crobat\n
            Darumaka, Deerling, Dhelmise\n
            Drifblim, Dusknoir, Electivire x2\n
            Emboar, Empoleon, Espeon\n
            Fennekin, Feraligatr, Flareon\n
            Flareon, Froslass, Furret\n
            Gallade, Garchomp, Gardevoir\n
            Gastrodon, Gengar, Geodude\n
            Gigalith, Glaceon, Gliscor\n
            Golisopod, Golurk, Goodra\n
            Gyarados, Haxorus
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
