const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const currency = require("../../controllers/currency");
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
            console.log('roll', roll)

            let dragonslayerItems = await inventory.getInventoryByCategory(target, 'dragonslayer');
			for (i = dragonslayerItems.rows.length; i > 0; i--){

                    console.log(`Dragonslayer item:`, dragonslayerItems.rows[i-1].item_name)
                    console.log(`Dragonslayer item amount:`, dragonslayerItems.rows[i-1].amount)

                    if (dragonslayerItems.rows[i-1].amount > 0){
                        let itemPower = await shop.getShopByItemName(dragonslayerItems.rows[i-1].item_name)
                        console.log(`Dragonslayer item power:`, itemPower.rows[0].item_power)
                        roll = roll + (itemPower.rows[0].item_power*dragonslayerItems.rows[i-1].amount);
                        console.log(`roll + ${itemPower.rows[0].item_name}`, roll)
                    }

            }
        
            // add logic for strongest potion effects

            let StrongestPotion = await inventory.itemCheck(target, 'strongest_potion');
            if (StrongestPotion.rows.length > 0){

                if (StrongestPotion.rows[0].amount > 0){
                    let useStrongestPotions = await inventory.clearInventory(target, 'strongest_potion');
                    console.log(`Used Strongest Potion.`)
                }

            }
            
            // $addpoints("$userid","1000","1000","$userid spends 50 gems to arm themselves before bravely facing the dragon. After many close calls, $userid drives their blade right into the dragon's skull! The dragon hoard is theirs! +$value $currencyname","fail")
// $addpoints("$userid","500","500","$userid spends 50 gems to arm themselves before bravely facing the dragon. Heavy wounds stagger both $userid and the dragon. The two parley and come to an agreement. The dragon gives $userid half their hoard! +$value $currencyname","fail")
// $addpoints("$userid","250","250","$userid spends 50 gems to arm themselves before bravely facing the dragon. Noticing the dragon is asleep, $userid sneaks behind the dragon and takes part of their hoard. Nice one! +$value $currencyname","fail")
// $addpoints("$userid","250","250","$userid spends 50 gems to arm themselves before bravely facing the dragon. Lucky for $userid, the dragon doesn't feel like fighting. It flicks a bag of gold to $userid and sends them on their way! +$value $currencyname","fail")

            if (roll <= 15){

                const reward = 50;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. One poorly timed swing later, ${target.username} is burned to a crisp. Looks like this is.. Game Over! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 30){

                const reward = 25;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} takes two steps forward, and is immediately swallowed whole. That's got to hurt. ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 45){

                const reward = 10;

                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let loseCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${checkTargetCurrency.rows[0].currency} Pokédollars.`);
                }

                let loseCurrency = await currency.removeCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Halfway up to the dragon's castle ${target.username} realizes they lost their wallet. Uh oh! ${target.username} has lost $${reward} Pokédollars.`);
            
            }else if (roll <= 60){

                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. Just kidding. After taking one look at the beast ahead, ${target.username} packs up and runs off. Should have put more points in Courage!`);
            
            }else if (roll <= 75){

                const reward = 5;

                let gainCurrency = await currency.addCurrency(reward, target)
                return message.channel.send(`${target.username} arms themselves before bravely facing the dragon. ${target.username} hears a roar in the distance, and runs home with the small amount of gold they found nearby. ${target.username} gains $${reward} Pokédollars.`);
            
            }
            // else if (roll <= 80){

            //     // const reward = 1;

            //     // if (lockPick.rows.length > 0){
            //     //     let lockPickLimit = await shop.itemLimitCheck('lock_pick');
            //     //     let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
            //     //     if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
            //     //         let addCurrency = await currency.addCurrency(reward, author);
            //     //         return message.channel.send(`${target.username}, but got distracted by something on the ground.\n${author.username} found ${reward} Pokédollar!`);
            //     //     }
            //     // }

            //     // if (lockPick.rows.length < 1){
            //     //     let createItemPickEntry = await inventory.createItemEntry(author, 'lock_pick', reward);
            //     //     return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a Lock Pick!`);
            //     // }

            //     // let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
            //     // return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a Lock Pick!`);
            
            // }else if (roll <= 85){

            
            // }else if (roll <= 90){

            
            // }else if (roll <= 95){

            
            // }else if (roll <= 100){
            //     // const reward = 10;

            //     // if (lockPick.rows.length > 0){

            //     // let lockPickLimit = await shop.itemLimitCheck('lock_pick');
            //     // let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');

            //     //     if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
            //     //         const amount = lockPickLimit.rows[0].item_limit - authorLockPickCount.rows[0].amount;
            //     //         let lockPickPack = await inventory.addToInventory(author, 'lock_pick', amount);
            //     //         const currencyAmount = reward - amount;
            //     //         let addCurrency = await currency.addCurrency(currencyAmount, author);
            //     //         return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${amount} Lock Picks ${currencyAmount} Pokédollars!`);
            //     //     }
            //     // }

            //     // if (lockPick.rows.length < 1){
            //     //     let createItemPickEntry = await inventory.createItemEntry(author, 'lock_pick', reward);
            //     //     return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Pick!`);
            //     // }

            //     // let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
            //     // return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Picks!`);
            
            // }else if (roll <= 105){

            
            // }else if (roll <= 110){

            
            // }else if (roll <= 115){

            //     // const reward = 10;

            //     // let checkTargetCurrency = await currency.getCurrencyById(target)
            //     // if (checkTargetCurrency.rows[0].currency < reward){
            //     //     let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
            //     //     let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
            //     //     return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency.rows[0].currency}`);
            //     // }

            //     // let stealCurrency = await currency.removeCurrency(reward, target)
            //     // let gainCurrency = await currency.addCurrency(reward, author)
            //     // return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            
            // }else if (roll <= 120){

            
            // }else if (roll <= 125){

            
            // }else if (roll <= 130){

            
            // }else if (roll <= 135){

            
            // }else if (roll <= 140){

            
            // }else if (roll <= 145){

            
            // }else if (roll <= 149){


            
            // }else if (roll <= 150){

            //     // let authorGlovesCount = await inventory.itemCheck(author, 'gloves');
            //     // if (authorGlovesCount.rows.length > 0){
            //     //     if (authorGlovesCount.rows[0].amount > 0){
            //     //         const reward = 2500;
            //     //         let addCurrency = await currency.addCurrency(reward, author);
            //     //         return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${reward} Pokédollars! Wow!`);
            //     //     }
            //     // }

            //     // if (authorGlovesCount.rows.length < 1){
            //     //     let createItemPickEntry = await inventory.createItemEntry(author, 'gloves', 1);
            //     //     return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
            //     // }

            //     // let addGlovesToAuthor = await inventory.addToInventory(author, 'gloves', 1);
            //     // return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
            
            // }else if (roll >= 151){

            //     // let authorBadgeCount = await badges.checkBadge(author, 'master_thief_badge');
            //     // if (authorBadgeCount.rows.length > 0){
            //     //     const reward = 5000;
            //     //     let addCurrency = await currency.addCurrency(reward, author);
            //     //     return message.channel.send(`${author.username} has once again completed the ultimate heist.\n${author.username} earns ${reward} Pokédollars! Congratulations!`);
            //     // }

            //     // let addBadgeToAuthor = await badges.addBadges(author, 'games', 'master_thief_badge');
            //     // return message.channel.send(`After so long, ${author.username} has completed the ultimate heist.\n${author.username} has earned the Master Thief Badge. Congratulations!`);
            // }
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
