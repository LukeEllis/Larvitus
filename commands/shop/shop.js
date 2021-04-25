const Discord = require('discord.js');
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'shop',
    usage: '<category>',
	description: 'Shows the items available in the shop.',
	async execute(message, args) {
        const target = message.author;
        const category = args[0];

        if (category){
            try{

                let getShopByCategory = await shop.getShopByCategory(category);
                let shopEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Shop`)
                    .setDescription(`A place to purchase ${category} items for your journey.`);
                for (i = getShopByCategory.rows.length; i > 0; i--){
                    shopEmbed.addFields(
                            {
                                name : `${getShopByCategory.rows[i-1].display_name}`, 
                                value: 
                                `Item Category: ${getShopByCategory.rows[i-1].item_category}\n
                                ${getShopByCategory.rows[i-1].item_description}\n
                                Cost: ${getShopByCategory.rows[i-1].cost}\n
                                Item Limit: ${getShopByCategory.rows[i-1].item_limit}`, 
                                inline: true
                            }
                    )
                }
                return message.channel.send({ embed: shopEmbed });

            }catch (err){
                console.error(err.message)
                return errors.errorMessage(message)
            }
        }

		try{

			let getShop = await shop.getShop();
			let shopEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`Shop`)
				.setDescription(`A place to purchase items for your journey.`);
			for (i = getShop.rows.length; i > 0; i--){
				shopEmbed.addFields(
						{
							name : `${getShop.rows[i-1].display_name}`, 
                            value: 
                            `Item Category: ${getShop.rows[i-1].item_category}\n
                            ${getShop.rows[i-1].item_description}\n
                            Cost: ${getShop.rows[i-1].cost}\n
                            Item Limit: ${getShop.rows[i-1].item_limit}`, 
                            inline: true
						}
				)
			}
			return message.channel.send({ embed: shopEmbed });

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
