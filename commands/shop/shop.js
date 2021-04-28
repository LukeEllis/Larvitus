const Discord = require('discord.js');
const client = new Discord.Client();
const Canvas = require('canvas');
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'shop',
    args: true,
    usage: '<category>',
	description: 'Shows the items available in the dragonslayer, mine, or pickpocket shop.',
	async execute(message, args) {
        const target = message.author;
        const category = args[0];

        if (category){

            try{

                let getShopByCategory = await shop.getShopByCategory(category);

                const canvas = Canvas.createCanvas(560, 340);
                const ctx = canvas.getContext('2d');
                const background = await Canvas.loadImage('https://www.nicepng.com/png/full/207-2075856_shelf-pixel-art.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                let itemList = ``

                for (i = getShopByCategory.rows.length; i > 0; i--){

                    itemList += `${getShopByCategory.rows.length - (i-1)} ${getShopByCategory.rows[i-1].item_name}\n`

                }

                let shopEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Shop`)
                .setDescription(`A place to purchase ${category} items for your journey.`)
                .addFields(  
                    {
                        name : `${category} items`, 
                        value: itemList, 
                        inline: true   
                    }
                );

                if (category === 'dragonslayer'){

                    const fairyBottle       = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const strongestPotion   = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const armor             = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const sword             = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const gemEncrustedSword = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    ctx.drawImage(fairyBottle, 52, 10, 110, 110);
                    ctx.drawImage(strongestPotion, 152, 10, 110, 110);
                    ctx.drawImage(armor, 52, 120, 110, 110);
                    ctx.drawImage(sword, 152, 120, 110, 110);
                    ctx.drawImage(gemEncrustedSword, 252, 120, 110, 110);

                }else if (category === 'mine'){

                    const dynamite          = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const woodPickaxe       = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const ironPickaxe       = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const silverPickaxe     = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const goldPickaxe       = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const diamondPickaxe    = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    ctx.drawImage(dynamite, 52, 10, 110, 110);
                    ctx.drawImage(woodPickaxe, 52, 120, 110, 110);
                    ctx.drawImage(ironPickaxe, 142, 120, 110, 110);
                    ctx.drawImage(silverPickaxe, 232, 120, 110, 110);
                    ctx.drawImage(goldPickaxe, 322, 120, 110, 110);
                    ctx.drawImage(diamondPickaxe, 412, 120, 110, 110);

                }else if (category === 'pickpocket'){

                    const lockPick          = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const potionOfShielding = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    const gloves            = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                    ctx.drawImage(lockPick, 58, 10, 120, 120);
                    ctx.drawImage(potionOfShielding, 158, 10, 120, 120);
                    ctx.drawImage(gloves, 58, 110, 120, 120);
                    
                }

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${category}-shop.png`);

                shopEmbed
                    .attachFiles(attachment)
                    .setImage(`attachment://${category}-shop.png`);  

                let newMessage = message.channel.send({ embed: shopEmbed })

                if (category === 'dragonslayer'){

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("1️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '1️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const fairyBottle = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(fairyBottle, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `fairy_bottle.png`);

                                let fairyBottleInformation = await shop.getShopByItemName('fairy_bottle');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Fairy Bottle`, 
                                            value: `Item Category: ${fairyBottleInformation.rows[0].item_category}\n${fairyBottleInformation.rows[0].item_description}\nCost: ${fairyBottleInformation.rows[0].cost}\nItem Limit: ${fairyBottleInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://fairy_bottle.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("2️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '2️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const strongestPotion = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(strongestPotion, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `strongest_potion.png`);

                                let strongestPotionInformation = await shop.getShopByItemName('strongest_potion');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Strongest Potion`, 
                                            value: `Item Name: ${strongestPotionInformation.rows[0].item_name}\nItem Category: ${strongestPotionInformation.rows[0].item_category}\n${strongestPotionInformation.rows[0].item_description}\nCost: ${strongestPotionInformation.rows[0].cost}\nItem Limit: ${strongestPotionInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://strongest_potion.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("3️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '3️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const armor = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(armor, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `armor.png`);

                                let armorInformation = await shop.getShopByItemName('armor');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Armor`, 
                                            value: `Item Name: ${armorInformation.rows[0].item_name}\nItem Category: ${armorInformation.rows[0].item_category}\n${armorInformation.rows[0].item_description}\nCost: ${armorInformation.rows[0].cost}\nItem Limit: ${armorInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://armor.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("4️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '4️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const sword = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(sword, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `sword.png`);

                                let swordInformation = await shop.getShopByItemName('sword');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Sword`, 
                                            value: `Item Name: ${swordInformation.rows[0].item_name}\nItem Category: ${swordInformation.rows[0].item_category}\n${swordInformation.rows[0].item_description}\nCost: ${swordInformation.rows[0].cost}\nItem Limit: ${swordInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://sword.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("5️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '5️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const gemEncrustedSword = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(gemEncrustedSword, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `gem_encrusted_sword.png`);

                                let gemEncrustedSwordInformation = await shop.getShopByItemName('gem_encrusted_sword');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Gem Encrusted Sword`, 
                                            value: `Item Name: ${gemEncrustedSwordInformation.rows[0].item_name}\nItem Category: ${gemEncrustedSwordInformation.rows[0].item_category}\n${gemEncrustedSwordInformation.rows[0].item_description}\nCost: ${gemEncrustedSwordInformation.rows[0].cost}\nItem Limit: ${gemEncrustedSwordInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://gem_encrusted_sword.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                }else if (category === 'mine'){

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("1️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '1️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const dynamite = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(dynamite, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `dynamite.png`);

                                let dynamiteInformation = await shop.getShopByItemName('dynamite');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Dynamite`, 
                                            value: `Item Name: ${dynamiteInformation.rows[0].item_name}\nItem Category: ${dynamiteInformation.rows[0].item_category}\n${dynamiteInformation.rows[0].item_description}\nCost: ${dynamiteInformation.rows[0].cost}\nItem Limit: ${dynamiteInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://dynamite.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("2️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '2️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const woodPickaxe = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(woodPickaxe, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `wood_pickaxe.png`);

                                let woodPickaxeInformation = await shop.getShopByItemName('wood_pickaxe');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Wood Pickaxe`, 
                                            value: `Item Name: ${woodPickaxeInformation.rows[0].item_name}\nItem Category: ${woodPickaxeInformation.rows[0].item_category}\n${woodPickaxeInformation.rows[0].item_description}\nCost: ${woodPickaxeInformation.rows[0].cost}\nItem Limit: ${woodPickaxeInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://wood_pickaxe.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("3️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '3️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const ironPickaxe = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(ironPickaxe, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `iron_pickaxe.png`);

                                let ironPickaxeInformation = await shop.getShopByItemName('iron_pickaxe');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Iron Pickaxe`, 
                                            value: `Item Name: ${ironPickaxeInformation.rows[0].item_name}\nItem Category: ${ironPickaxeInformation.rows[0].item_category}\n${ironPickaxeInformation.rows[0].item_description}\nCost: ${ironPickaxeInformation.rows[0].cost}\nItem Limit: ${ironPickaxeInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://iron_pickaxe.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("4️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '4️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const silverPickaxe = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(silverPickaxe, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `silver_pickaxe.png`);

                                let silverPickaxeInformation = await shop.getShopByItemName('silver_pickaxe');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Silver Pickaxe`, 
                                            value: `Item Name: ${silverPickaxeInformation.rows[0].item_name}\nItem Category: ${silverPickaxeInformation.rows[0].item_category}\n${silverPickaxeInformation.rows[0].item_description}\nCost: ${silverPickaxeInformation.rows[0].cost}\nItem Limit: ${silverPickaxeInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://silver_pickaxe.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("5️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '5️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const goldPickaxe = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(goldPickaxe, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `gold_pickaxe.png`);

                                let goldPickaxeInformation = await shop.getShopByItemName('gold_pickaxe');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Gold Pickaxe`, 
                                            value: `Item Name: ${goldPickaxeInformation.rows[0].item_name}\nItem Category: ${goldPickaxeInformation.rows[0].item_category}\n${goldPickaxeInformation.rows[0].item_description}\nCost: ${goldPickaxeInformation.rows[0].cost}\nItem Limit: ${goldPickaxeInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://gold_pickaxe.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage           
                        .then(embedMessage => {
                            embedMessage.react("6️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '6️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const diamondPickaxe = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(diamondPickaxe, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `diamond_pickaxe.png`);

                                let diamondPickaxeInformation = await shop.getShopByItemName('diamond_pickaxe');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Diamond Pickaxe`, 
                                            value: `Item Name: ${diamondPickaxeInformation.rows[0].item_name}\nItem Category: ${diamondPickaxeInformation.rows[0].item_category}\n${diamondPickaxeInformation.rows[0].item_description}\nCost: ${diamondPickaxeInformation.rows[0].cost}\nItem Limit: ${diamondPickaxeInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://diamond_pickaxe.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                }else if (category === 'pickpocket'){

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("1️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '1️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const lockPick = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(lockPick, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `lock_pick.png`);

                                let lockPickInformation = await shop.getShopByItemName('lock_pick');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Lock Pick`, 
                                            value: `Item Name: ${lockPickInformation.rows[0].item_name}\nItem Category: ${lockPickInformation.rows[0].item_category}\n${lockPickInformation.rows[0].item_description}\nCost: ${lockPickInformation.rows[0].cost}\nItem Limit: ${lockPickInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://lock_pick.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("2️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '2️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const potionOfShielding = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(potionOfShielding, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `potion_of_shielding.png`);

                                let potionOfShieldingInformation = await shop.getShopByItemName('potion_of_shielding');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Potion of Shielding`, 
                                            value: `Item Name: ${potionOfShieldingInformation.rows[0].item_name}\nItem Category: ${potionOfShieldingInformation.rows[0].item_category}\n${potionOfShieldingInformation.rows[0].item_description}\nCost: ${potionOfShieldingInformation.rows[0].cost}\nItem Limit: ${potionOfShieldingInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://potion_of_shielding.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage.react("3️⃣");
                        });

                    newMessage
                        .then(embedMessage => {
                            embedMessage;
                        
                            const filter = (reaction, target) => reaction.emoji.name === '3️⃣' && target.id != '821544318351179777';
                            const collector = embedMessage.createReactionCollector(filter, { max: 1, time: 5 * 60 * 1000 }); // 5 min
                        
                            collector.on('collect', async () => {

                                const canvas = Canvas.createCanvas(140, 140);
                                const ctx = canvas.getContext('2d');
                                const gloves = await Canvas.loadImage('https://cdn.discordapp.com/attachments/834823235588718592/836544162978725898/Blaziken-Badge-transparent.png');
                                ctx.drawImage(gloves, 0, 0, canvas.width, canvas.height);

                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `gloves.png`);

                                let glovesInformation = await shop.getShopByItemName('gloves');

                                const embed = new Discord.MessageEmbed()
                                    .setColor('#007FFF')
                                    .addFields(  
                                        {
                                            name : `Gloves`, 
                                            value: `Item Name: ${glovesInformation.rows[0].item_name}\nItem Category: ${glovesInformation.rows[0].item_category}\n${glovesInformation.rows[0].item_description}\nCost: ${glovesInformation.rows[0].cost}\nItem Limit: ${glovesInformation.rows[0].item_limit}`, 
                                            inline: true   
                                        }
                                    )
                                    .attachFiles(attachment)
                                    .setImage(`attachment://gloves.png`);  
                
                                message.channel.send({ embed: embed })
                            
                            });
                        });
                }

            }catch (err){
                console.error(err.message)
                return errors.errorMessage(message)
            }
        }
	},
};
