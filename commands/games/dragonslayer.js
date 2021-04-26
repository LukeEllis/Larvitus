const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const currency = require("../../controllers/currency");
const games = require("../../controllers/games");
const inventory = require("../../controllers/inventory");
const shop = require("../../controllers/shop");
const errors = require("../../controllers/error");

module.exports = {
	name: 'dragonslayer',
	description: 'Go on an epic journey to slay the dragon.',
  	async execute(message) {

        const target = message.author;
		
        console.log(`${target.username} is trying to slay the dragon.`)
       
		try{

            let doesUserExist = await currency.getCurrencyById(target);
            if(doesUserExist.rows.length < 1){
                return message.channel.send(`You need a wallet before you can collect epic treasures from the dragon. Get your wallet with the !init command.`)
            }
            
            // leaving potion of shielding here for idea on how to approach fairy in a bottle situation

            // let potionOfShielding = await inventory.itemCheck(target, 'potion_of_shielding')
            // if (potionOfShielding.rows.length > 0){
            //     if (potionOfShielding.rows[0].amount > 0){
            //         let usePotionOfShielding = await inventory.removeFromInventory(target, 'potion_of_shielding', 1);
            //         return message.channel.send(`${target} had a Potion of Shielding to block your attack! They now have ${potionOfShielding.rows[0].amount - 1} Potions of Shielding left.`);
            //     }
            // }
        
            let roll = Math.floor(Math.random() * 101);
            // let roll = 153;
            console.log('roll', roll)

            let dragonslayerItems = await games.getInventoryOfItemsWithPower(target, 'dragonslayer');
			for (i = dragonslayerItems.rows.length; i > 0; i--){

                console.log(`Dragonslayer inventory rows:`, dragonslayerItems.rows.length);
                console.log(`Dragonslayer item:`, dragonslayerItems.rows[i-1].item_name);
                console.log(`Dragonslayer item amount:`, dragonslayerItems.rows[i-1].amount);
                console.log(`Dragonslayer item power:`, dragonslayerItems.rows[i-1].item_power);
                roll = roll + (dragonslayerItems.rows[i-1].item_power*dragonslayerItems.rows[i-1].amount);
                console.log(`roll + ${dragonslayerItems.rows[i-1].item_name}`, roll);

            }
        
            // add logic for strongest potion effects

            let StrongestPotion = await inventory.itemCheck(target, 'strongest_potion');
            if (StrongestPotion.rows.length > 0){

                if (StrongestPotion.rows[0].amount > 0){
                    let useStrongestPotions = await inventory.clearInventory(target, 'strongest_potion');
                    console.log(`Used Strongest Potion.`)
                }

            }
            

// strongest potion side affects
// cache
// rewards up to 155
// fairy bottle

            if (roll <= 25){

                const reward = 50;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 50){

                const reward = 25;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 75){

                const reward = 10;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 90){

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Just kidding. After taking one look at the beast ahead, ${target.username} packs up and runs off. Should have put more points in Courage!`);
            
            }else if (roll <= 100){

                const reward = 5;

                let gainCurrency = await currency.addCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} hears a roar in the distance, and runs home with the small amount of gold they found nearby. ${target.username} gains $${reward} Pokédollars.`);
            
            }else if (roll <= 125){
                
                const reward = 50;

                let checkHoard = await games.getDragonslayer();
                if (checkHoard.rows[0].hoard < reward){
                    const remainingHoard = checkHoard.rows[0].hoard;
                    let removeFromHoard = await games.removeFromDragonslayerHoard(remainingHoard)
                    let gainCurrency = await currency.addCurrency(remainingHoard, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Lucky for ${target.username}, the dragon doesn't feel like fighting. It flicks a bag of gold to ${target.username} and sends them on their way! ${target.username} gains $${remainingHoard} Pokédollars.`);    
                }

                let removeFromHoard = await games.removeFromDragonslayerHoard(reward)
                let gainCurrency = await currency.addCurrency(reward, target)

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Lucky for ${target.username}, the dragon doesn't feel like fighting. It flicks a bag of gold to ${target.username} and sends them on their way! ${target.username} gains $${reward} Pokédollars.`);
                
            }else if (roll < 150){

                const reward = 100;

                let checkHoard = await games.getDragonslayer();

                if(checkHoard.rows[0].hoard === 0){

                    let reward = await games.getRandomDragonslayerItem();
                    console.log(`reward`, reward)
                    let rareItemCheck = await inventory.itemCheck(target, reward);

                    if (rareItemCheck.rows.length < 1){

                        let createDragonslayerItemEntry = await inventory.createItemEntry(target, reward, 1);
                        
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their cache. Nice one! ${target.username} adds a ${reward} to their inventory.`);
                    
                    }

                    let gainItem = await inventory.addToInventory(target, reward, 1);
                    
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their cache. Nice one! ${target.username} adds a ${reward} to their inventory.`);
                
                }else if(checkHoard.rows[0].hoard < reward){
                    const remainingHoard = checkHoard.rows[0].hoard;
                    let removeFromHoard = await games.removeFromDragonslayerHoard(remainingHoard)
                    let gainCurrency = await currency.addCurrency(remainingHoard, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their hoard. Nice one! ${target.username} gains $${remainingHoard} Pokédollars.`);
                }

                let removeFromHoard = await games.removeFromDragonslayerHoard(reward)
                let gainCurrency = await currency.addCurrency(reward, target)
                
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their hoard. Nice one! ${target.username} gains $${reward} Pokédollars.`);
            
            }else if (roll <= 150){

                let checkHoard = await games.getDragonslayer();

                //eventually add cache if hoard is empty
                if(checkHoard.rows[0].hoard === 0){

                    let reward = await games.getRandomDragonslayerItem();
                    console.log(`reward`, reward)
                    let rareItemCheck = await inventory.itemCheck(target, reward);

                    if (rareItemCheck.rows.length < 1){

                        let createDragonslayerItemEntry = await inventory.createItemEntry(target, reward, 1);
                        
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. After many close calls, ${target.username} drives their blade right into the dragon's skull! The dragon cache is theirs! ${target.username} adds a ${reward} to their inventory.`);
                    
                    }

                    let gainItem = await inventory.addToInventory(target, reward, 1);

                    const amount = 1000;
                    let makeNewHoard = await games.updateDragonslayerHoard(amount);
                    
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. After many close calls, ${target.username} drives their blade right into the dragon's skull! The dragon cache is theirs! ${target.username} adds a ${reward} to their inventory.`);
                
                }

                const reward = checkHoard.rows[0].hoard;
                let gainCurrency = await currency.addCurrency(reward, target)

                const amount = 1000;
                let makeNewHoard = await games.updateDragonslayerHoard(amount);

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. After many close calls, ${target.username} drives their blade right into the dragon's skull! The dragon hoard is theirs! ${target.username} gains $${reward} Pokédollars.`);

                /*
                    pseudo code for when someone loses money, the money goes to the hoard
                    let addToHoard = await games.addToDragonslayerHoard(amount)
                */

                //pseudo code for when somebody gets the cache

                /* 1) Check items in the cache
                    let checkCache = await games.getDragonslayer();
                    
                    const reward = checkCache.rows[0].cache; ?


                    2) Give cache to player
                     let gainInventory = await intentory.addtoinventory(reward, target) 

                    
                    3) generate new cache (random items?)

                    make function to pull in random items from database and put it into the new cache

                    let roll = Math.random();
                    


                */

                
                




                // let authorGlovesCount = await inventory.itemCheck(author, 'gloves');
                // if (authorGlovesCount.rows.length > 0){
                //     if (authorGlovesCount.rows[0].amount > 0){
                //         const reward = 2500;
                //         let addCurrency = await currency.addCurrency(reward, author);
                //         return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${reward} Pokédollars! Wow!`);
                //     }
                // }

                // if (authorGlovesCount.rows.length < 1){
                //     let createItemPickEntry = await inventory.createItemEntry(author, 'gloves', 1);
                //     return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
                // }

                // let addGlovesToAuthor = await inventory.addToInventory(author, 'gloves', 1);
                // return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
            
            }else if (roll <= 151){

                let checkHoard = await games.getDragonslayer();

                if(checkHoard.rows[0].hoard === 0){

                    let reward = await games.getRandomDragonslayerItem();
                    console.log(`reward`, reward)
                    let rareItemCheck = await inventory.itemCheck(target, reward);

                    if (rareItemCheck.rows.length < 1){

                        let createDragonslayerItemEntry = await inventory.createItemEntry(target, reward, 1);
                        
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Heavy wounds stagger both ${target.username} and the dragon. The two parley and come to an agreement. The dragon gives ${target.username} a rare item! ${target.username} adds a ${reward} to their inventory.`);
                    
                    }

                    let gainItem = await inventory.addToInventory(target, reward, 1);
                    
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Heavy wounds stagger both ${target.username} and the dragon. The two parley and come to an agreement. The dragon gives ${target.username} a rare item! ${target.username} adds a ${reward} to their inventory.`);
                
                }

                const reward = Math.ceil(checkHoard.rows[0].hoard/2);
                console.log(`reward`, reward)
                let gainCurrency = await currency.addCurrency(reward, target)
                let makeNewHoard = await games.removeFromDragonslayerHoard(reward);

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Heavy wounds stagger both ${target.username} and the dragon. The two parley and come to an agreement. The dragon gives ${target.username} half their hoard! ${target.username} gains $${reward} Pokédollars.`);
            
            }else if (roll <= 155){

                let badgeCount = await badges.checkBadge(target, 'dragon_slayer_badge');
                // console.log(`badgeCount`, badgeCount)
                console.log(`badgeCount.rows.length`, badgeCount.rows.length)
                if (badgeCount.rows.length > 0){
                    const thing = 5000;
                    console.log(`thing`, thing)
                    let addCurrency = await currency.addCurrency(thing, target);
                    // console.log(`addCurrency`, addCurrency)
                    return message.channel.send(`${target.username} has once again proven their place in history as the ultimate Dragon Slayer.\n${target.username} earns $${thing} Pokédollars! Congratulations!`);
                }

                let addBadgeToTarget = await badges.addBadges(target, 'dragon_slayer_badge');
                // console.log(`addBadgeToTarget`, addBadgeToTarget)
                return message.channel.send(`After slaying countless dragons, ${target.username} has earned their place in history.\n${target.username} has earned the Dragon Slayer Badge. Congratulations!`);

            }
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
