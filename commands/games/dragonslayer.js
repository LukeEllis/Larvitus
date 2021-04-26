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

        // cache

        const target = message.author;
		
        console.log(`${target.username} is trying to slay the dragon.`)
       
		try{

            let doesUserExist = await currency.getCurrencyById(target);
            if(doesUserExist.rows.length < 1){
                return message.channel.send(`You need a wallet before you can collect epic treasures from the dragon. Get your wallet with the !init command.`)
            }

            let fairyBottle = await inventory.itemCheck(target, 'fairy_bottle')
        
            // let roll = Math.floor(Math.random() * 101);
            let roll = 149;
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

            let StrongestPotion = await inventory.itemCheck(target, 'strongest_potion');
            if (StrongestPotion.rows.length > 0){

                if (StrongestPotion.rows[0].amount > 0){
                    let useStrongestPotions = await inventory.clearInventory(target, 'strongest_potion');
                    console.log(`Used Strongest Potion.`)

                    let strongestPotionRoll = Math.floor(Math.random() * 101);
                    console.log(`strongestPotionRoll`, strongestPotionRoll)
                    if (strongestPotionRoll <= 25){

                        if (fairyBottle.rows.length > 0){
                            if (fairyBottle.rows[0].amount > 0){
                                let usefairyBottle = await inventory.removeFromInventory(target, 'fairy_bottle', 1);
                                return message.channel.send(`${target.username} sips a Strongest Potion before heading to face the dragon. After a few moments, ${target.username} starts to shrink smaller and smaller until they disappear.. but wait! A fairy escapes their bottle and protects ${target.username} from an untimely end to the Strongest Potion. They now have ${fairyBottle.rows[0].amount - 1} Fairy in a Bottle left.`);
                            }
                        }

                        return message.channel.send(`${target.username} sips a Strongest Potion before heading to face the dragon. After a few moments, ${target.username} starts to shrink smaller and smaller until they disappear. Well, I guess they did always have an interest in _microbiology_!`);

                    }else if (strongestPotionRoll <= 50){

                        if (fairyBottle.rows.length > 0){
                            if (fairyBottle.rows[0].amount > 0){
                                let usefairyBottle = await inventory.removeFromInventory(target, 'fairy_bottle', 1);
                                return message.channel.send(`${target.username} sips a Strongest Potion before heading to face the dragon. One quick swig later, ${target.username} explodes into a million little pieces.. but wait! A fairy escapes their bottle and protects ${target.username} from an untimely end to the Strongest Potion. They now have ${fairyBottle.rows[0].amount - 1} Fairy in a Bottle left.`);
                            }
                        }

                        return message.channel.send(`${target.username} sips a Strongest Potion before heading to face the dragon. One quick swig later, ${target.username} explodes into a million little pieces.`);

                    }
                }

            }

            if (roll <= 25){

                if (fairyBottle.rows.length > 0){
                    if (fairyBottle.rows[0].amount > 0){
                        let usefairyBottle = await inventory.removeFromInventory(target, 'fairy_bottle', 1);
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp.. but wait! A fairy escapes their bottle and protects ${target.username} from an untimely end to the dragon. They now have ${fairyBottle.rows[0].amount - 1} Fairy in a Bottle left.`);
                    }
                }

                const reward = 50;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    console.log(`reward -`, checkTargetCurrency.rows[0].currency)
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                console.log(`reward -`, reward)
                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 50){

                if (fairyBottle.rows.length > 0){
                    if (fairyBottle.rows[0].amount > 0){
                        let usefairyBottle = await inventory.removeFromInventory(target, 'fairy_bottle', 1);
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt.. but wait! A fairy escapes their bottle and protects ${target.username} from an untimely end to the dragon. They now have ${fairyBottle.rows[0].amount - 1} Fairy in a Bottle left.`);
                    }
                }

                const reward = 25;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    console.log(`reward -`, checkTargetCurrency.rows[0].currency)
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                console.log(`reward -`, reward)
                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 75){

                const reward = 10;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    console.log(`reward -`, checkTargetCurrency.rows[0].currency)
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let addToHoard = await games.addToDragonslayerHoard(reward)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                console.log(`reward -`, reward)
                let loseCurrency = await currency.removeCurrency(reward, target)
                let addToHoard = await games.addToDragonslayerHoard(reward)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 90){

                console.log(`reward`, 0)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Just kidding. After taking one look at the beast ahead, ${target.username} packs up and runs off. Should have put more points in Courage!`);
            
            }else if (roll <= 100){

                const reward = 5;
                console.log(`reward`, reward)

                let gainCurrency = await currency.addCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} hears a roar in the distance, and runs home with the small amount of gold they found nearby. ${target.username} gains $${reward} Pokédollars.`);
            
            }else if (roll <= 125){
                
                const reward = 50;

                let checkHoard = await games.getDragonslayer();
                if (checkHoard.rows[0].hoard < reward){
                    const remainingHoard = checkHoard.rows[0].hoard;
                    console.log(`reward`, remainingHoard)
                    let removeFromHoard = await games.removeFromDragonslayerHoard(remainingHoard)
                    let gainCurrency = await currency.addCurrency(remainingHoard, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Lucky for ${target.username}, the dragon doesn't feel like fighting. It flicks a bag of gold to ${target.username} and sends them on their way! ${target.username} gains $${remainingHoard} Pokédollars.`);    
                }

                console.log(`reward`, reward)
                let removeFromHoard = await games.removeFromDragonslayerHoard(reward)
                let gainCurrency = await currency.addCurrency(reward, target)

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Lucky for ${target.username}, the dragon doesn't feel like fighting. It flicks a bag of gold to ${target.username} and sends them on their way! ${target.username} gains $${reward} Pokédollars.`);
                
            }else if (roll < 148){

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
                    console.log(`reward`, remainingHoard)
                    let removeFromHoard = await games.removeFromDragonslayerHoard(remainingHoard)
                    let gainCurrency = await currency.addCurrency(remainingHoard, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their hoard. Nice one! ${target.username} gains $${remainingHoard} Pokédollars.`);
                }

                console.log(`reward`, reward)
                let removeFromHoard = await games.removeFromDragonslayerHoard(reward)
                let gainCurrency = await currency.addCurrency(reward, target)
                
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Noticing the dragon is asleep, ${target.username} sneaks behind the dragon and takes part of their hoard. Nice one! ${target.username} gains $${reward} Pokédollars.`);
            
            }else if (roll <= 148){

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
                console.log(`reward`, reward)
                let gainCurrency = await currency.addCurrency(reward, target)

                const amount = 1000;
                let makeNewHoard = await games.updateDragonslayerHoard(amount);

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. After many close calls, ${target.username} drives their blade right into the dragon's skull! The dragon hoard is theirs! ${target.username} gains $${reward} Pokédollars.`);

            }else if (roll <= 149){

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

            }else if (roll <= 150){

                let armorCheck = await inventory.itemCheck(target, 'armor');
                if (armorCheck.rows.length > 0){
                    if (armorCheck.rows[0].amount > 0){
                        const reward = 750;
                        let addCurrency = await currency.addCurrency(reward, target);
                        return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} spots a huge bag of gold. They're rich!\n${target.username} found ${reward} Pokédollars!`);
                    }
                }

                if (armorCheck.rows.length < 1){
                    let createArmorEntry = await inventory.createItemEntry(target, 'armor', 1);
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username}, spots a shiny suit of armor on the ground. This should totally help when fighting the dragon. Score!`);
                }

                let addArmor = await inventory.addToInventory(target, 'gloves', 1);
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username}, spots a shiny suit of armor on the ground. This should totally help when fighting the dragon. Score!`);

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
            
            }else if (roll <= 152){


                // get item from cache

                // let reward = await games.getRandomDragonslayerItem();
                // console.log(`reward`, reward)
                // let rareItemCheck = await inventory.itemCheck(target, reward);

                // if (rareItemCheck.rows.length < 1){

                //     let createDragonslayerItemEntry = await inventory.createItemEntry(target, reward, 1);
                    
                //     return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Heavy wounds stagger both ${target.username} and the dragon. The two parley and come to an agreement. The dragon gives ${target.username} a rare item! ${target.username} adds a ${reward} to their inventory.`);
                
                // }

                // let gainItem = await inventory.addToInventory(target, reward, 1);
                
                // return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Heavy wounds stagger both ${target.username} and the dragon. The two parley and come to an agreement. The dragon gives ${target.username} a rare item! ${target.username} adds a ${reward} to their inventory.`);
            
            }else if (roll <= 153){

                message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Along the path up to the dragon's castle ${target.username} is approached by tall wizard in expensive robes. "Well hello there traveler! It's rare to see aventurers come up this path. You do know there is a dragon up ahead don't you? Well, either way, allow me to fill your bag with a few things that you may find useful. I've included a special potion I helped invent, but beware - you cannot handle my Strongest Potions!"`);

                let reward = [
                    'lock_pick',
                    'potion_of_shielding',
                    'fairy_bottle',
                    'strongest_potion',
                    'dynamite'
                ]

                for (i = reward.length; i > 0; i--){

                    let itemName = reward[i-1];

                    let itemCheck = await inventory.itemCheck(target, itemName);

                    if (itemCheck.rows.length > 0){

                        let itemLimitCheck = await shop.getShopByItemName(itemName);
                        let itemLimit = itemLimitCheck.rows[0].item_limit;
                        let itemCost = itemLimitCheck.rows[0].cost;
                        let amountOwned = itemCheck.rows[0].amount;

                        if ((amountOwned + itemLimit) > itemLimit){

                            let itemAmountToAdd = itemLimit - amountOwned;
                            let addItem = await inventory.addToInventory(target, itemName, itemAmountToAdd);
                            let currencyAmountToAdd = (itemLimit - itemAmountToAdd) * itemCost;
                            let addCurrency = await currency.addCurrency(currencyAmountToAdd, target);
                            
                            message.channel.send(`The wizard raises their wand and out pops ${itemAmountToAdd}x ${itemName} and $${currencyAmountToAdd} in front of ${target.username}!`);

                        }else{

                            let itemAmountToAdd = itemLimit;
                            let addItem = await inventory.addToInventory(target, itemName, itemAmountToAdd);
                            
                            message.channel.send(`The wizard raises their wand and out pops ${itemAmountToAdd}x ${itemName} in front of ${target.username}!`); 
                        
                        }
                    
                    }
                    
                    if (itemCheck.rows.length < 1){

                        let itemLimitCheck = await shop.itemLimitCheck(itemName);
                        let itemLimit = itemLimitCheck.rows[0].item_limit;
                        console.log(`Item name ${i}`, itemName)
                        console.log(`Item limit ${i}`, itemLimit)

                        let createItemEntry = await inventory.createItemEntry(target, itemName, itemLimit);

                        message.channel.send(`The wizard raises their wand and out pops ${itemAmountToAdd}x ${itemName} in front of ${target.username}!`);
                    
                    }         
                
                }

                return message.channel.send(`The wizard has filled ${target.username}'s inventory and wallet with goods and money needed to face the perils ahead. "I hope this has helped, ${target.username}." The wizard disappears as quickly as he arrived. I wonder how he knew ${target.username}'s name?`); 

            }else if (roll <= 154){

                const reward = 'dragon_tale';
                console.log(`reward`, reward)

                let dragonTaleCheck = await inventory.itemCheck(target, reward);
                if (dragonTaleCheck.rows.length < 1){
                    let createDragonTaleEntry = await inventory.createItemEntry(target, reward, 1);
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} approaches the dragon, ready to strike. But just before an epic battle could break out, the dragon puts on its glasses and pulls out a book. "Hold on adventurer, it's my reading time. Would you mind keeping me company while I read this tale of great adventure?" A while later, the dragon finally finishes reading the story. "Well, wasn't that nice? Not too long, not too short, this _Dragon Tale_ was just right." ${target.username} received a Dragon Tale from the dragon.`);
                }

                let addDragonTale = await inventory.addToInventory(target, reward, 1);
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} approaches the dragon, ready to strike. But just before an epic battle could break out, the dragon puts on its glasses and pulls out a book. "Hold on adventurer, it's my reading time. Would you mind keeping me company while I read this tale of great adventure?" A while later, the dragon finally finishes reading the story. "Well, wasn't that nice? Not too long, not too short, this _Dragon Tale_ was just right." ${target.username} received a Dragon Tale from the dragon.`);

            }else if (roll <= 155){

                const reward = 'dragon_slayer_badge';
                console.log(`reward`, reward)

                let badgeCount = await badges.checkBadge(target, reward);
                if (badgeCount.rows.length > 0){
                    const reward = 5000;
                    let addCurrency = await currency.addCurrency(reward, target);
                    return message.channel.send(`${target.username} has once again proven their place in history as the ultimate Dragon Slayer.\n${target.username} earns $${reward} Pokédollars! Congratulations!`);
                }

                let addBadgeToTarget = await badges.addBadges(target, reward);
                return message.channel.send(`After slaying countless dragons, ${target.username} has earned their place in history.\n${target.username} has earned the Dragon Slayer Badge. Congratulations!`);

            }
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
