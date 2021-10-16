const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'shop',
	description: 'Shows the items available in the shiny trainer shop.',
	async execute(message, args) {
        const target = message.author;

        if (category){

            try{

                let getShop = await shop.getShop();

                let itemList = ``

                for (i = getShop.rows.length; i > 0; i--){

                    itemList += `${getShop.rows.length - (i-1)} Reward Name: ${getShop.rows[i-1].reward_name} \nReward Type: ${getShop.rows[i-1].reward_type} \nCost:${getShop.rows[i-1].reward_point_cost} points \nLimit:${getShop.rows[i-1].reward_limit}x\n`

                }

                let shopEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Shop`)
                .setDescription(`Redeem your points for prizes!`)
                .addFields(  
                    {
                        name : `Redeems`, 
                        value: itemList, 
                        inline: true   
                    }
                );

                let newMessage = message.channel.send({ embed: shopEmbed })

            }catch (err){
                console.error(err.message)
                return errors.errorMessage(message)
            }
        }
	},
};
