const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const currency = require("../../controllers/currency");
const inventory = require("../../controllers/inventory");
const errors = require("../../controllers/error");

module.exports = {
	name: 'pickpocket',
	description: 'Steal money like a good ol thief.',
    args: true,
    usage: '<user>',
	async execute(message, args) {
        const target = message.mentions.users.first();
		const author = message.author;

        if (target.id === author.id){
            return message.channel.send(`You think you're slick, huh?`);
        }

        let doesUserExist = await currency.getCurrencyById(target);
        
        if(doesUserExist.rows.length < 1){
            return message.channel.send(`You can't steal from someone who doesn't have a wallet. Wait until ${target.username} uses the !init command.`)
        }

		try{
            let potionOfShielding = await inventory.itemCheck(target, 'potion_of_shielding')
            if (potionOfShielding.rows.length > 0){
                if (potionOfShielding.rows[0].amount > 0){
                    let usePotionOfShielding = await inventory.removeFromInventory(target, 'potion_of_shielding', 1);
                    return message.channel.send(`${target} had a Potion of Shielding to block your attack! They now have ${potionOfShielding.rows[0].amount - 1} Potions of Shielding left.`);
                }
            }
        
            let roll = Math.floor(Math.random() * 101);
            console.log('roll', roll)
        
            let gloves = await inventory.itemCheck(author, 'gloves');
            if (gloves.rows.length > 0){
                if (gloves.rows[0].amount > 0){
                    roll = roll + 5;
                    console.log('roll + gloves', roll)
                }
            }
        
            let lockPick = await inventory.itemCheck(author, 'lock_pick');
            if (lockPick.rows.length > 0){
                console.log('lockPick.rows.length', lockPick.rows.length);
                if (lockPick.rows[0].amount > 0){
                    roll = roll + (5*lockPick.rows[0].amount);
                    console.log('roll + lockPick', roll);
                    let useLockPicks = await inventory.clearInventory(author, 'lock_pick');
                }
            }
        
            if (roll <= 15){
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but tripped on thin air - oof!`);
            }else if (roll <= 30){
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but tripped on a rock - oof!`);
            }else if (roll <= 45){
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but tripped on a banana peel - oof!`);
            }else if (roll <= 60){
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but tripped on their own feet - oof!`);
            }else if (roll <= 75){
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but tripped on a dragon egg - oof!`);
            }else if (roll <= 80){
                const reward = 1;
                if (lockPick.rows.length > 0){
                    let lockPickLimit = await inventory.itemLimitCheck('lock_pick');
                    let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
                    if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
                        let addCurrency = await currency.addCurrency(reward, author);
                        return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${reward} Pokédollar!`);
                    }
                }
                if (lockPick.rows.length < 1){
                    let createItemPickEntry = await inventory.createItemEntry(author, 'lock_pick', reward);
                    return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a Lock Pick!`);
                }
                let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a Lock Pick!`);
            }else if (roll <= 85){
                const reward = 2;
                if (lockPick.rows.length > 0){
                    let lockPickLimit = await inventory.itemLimitCheck('lock_pick');
                    let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
                    if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
                        const amount = lockPickLimit.rows[0].item_limit - authorLockPickCount.rows[0].amount;
                        let lockPickPack = await inventory.addToInventory(author, 'lock_pick', amount);
                        const currencyAmount = reward - amount;
                        let addCurrency = await currency.addCurrency(currencyAmount, author);
                        return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${amount} Lock Picks and ${currencyAmount} Pokédollars!`);
                    }
                }
                let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Picks!`);
            }else if (roll <= 90){
                const reward = 3;
                let lockPickLimit = await inventory.itemLimitCheck('lock_pick');
                let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
                if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
                    const amount = lockPickLimit.rows[0].item_limit - authorLockPickCount.rows[0].amount;
                    let lockPickPack = await inventory.addToInventory(author, 'lock_pick', amount);
                    const currencyAmount = reward - amount;
                    let addCurrency = await currency.addCurrency(currencyAmount, author);
                    return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${amount} Lock Picks and ${currencyAmount} Pokédollars!`);
                }
                let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Picks!`);
            }else if (roll <= 95){
                const reward = 5;
                let lockPickLimit = await inventory.itemLimitCheck('lock_pick');
                let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
                if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
                    const amount = lockPickLimit.rows[0].item_limit - authorLockPickCount.rows[0].amount;
                    let lockPickPack = await inventory.addToInventory(author, 'lock_pick', amount);
                    const currencyAmount = reward - amount;
                    let addCurrency = await currency.addCurrency(currencyAmount, author);
                    return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${amount} Lock Picks ${currencyAmount} Pokédollars!`);
                }
                let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Picks!`);
            }else if (roll <= 100){
                const reward = 10;
                let lockPickLimit = await inventory.itemLimitCheck('lock_pick');
                let authorLockPickCount = await inventory.itemCheck(author, 'lock_pick');
                if (authorLockPickCount.rows[0].amount + reward > lockPickLimit.rows[0].item_limit){
                    const amount = lockPickLimit.rows[0].item_limit - authorLockPickCount.rows[0].amount;
                    let lockPickPack = await inventory.addToInventory(author, 'lock_pick', amount);
                    const currencyAmount = reward - amount;
                    let addCurrency = await currency.addCurrency(currencyAmount, author);
                    return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${amount} Lock Picks ${currencyAmount} Pokédollars!`);
                }
                let lockPickPack = await inventory.addToInventory(author, 'lock_pick', reward);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pack of ${reward} Lock Picks!`);
            }else if (roll <= 105){
                const reward = 1;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollar, but ${target.username} didn't have any!`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollar!`);
            }else if (roll <= 110){
                const reward = 5;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency}!`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            }else if (roll <= 115){
                const reward = 10;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency}`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            }else if (roll <= 120){
                const reward = 15;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency}`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            }else if (roll <= 125){
                const reward = 20;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency}`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            }else if (roll <= 130){
                const reward = 25;
                let checkTargetCurrency = await currency.getCurrencyById(target)
                if (checkTargetCurrency.rows[0].currency < reward){
                    let stealCurrency = await currency.removeCurrency(checkTargetCurrency.rows[0].currency, target)
                    let gainCurrency = await currency.addCurrency(checkTargetCurrency.rows[0].currency, author)
                    return message.channel.send(`${author.username} sneaks up behind ${target.username} and tried to steal ${reward} Pokédollars, but ${target.username} only had $${checkTargetCurrency}`);
                }
                let stealCurrency = await currency.removeCurrency(reward, target)
                let gainCurrency = await currency.addCurrency(reward, author)
                return message.channel.send(`${author.username} sneaks up behind ${target.username} and manages to steal ${reward} Pokédollars!`);
            }else if (roll <= 135){
                const reward = 10;
                let addCurrencyToAuthor = await currency.addCurrency(reward, author);
                let addCurrencyToTarget = await currency.addCurrency(reward, target);
                return message.channel.send(`${author.username} considered pickpocketing ${target.username}, but ${target.username} convinced ${author.username} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
            }else if (roll <= 140){
                const reward = 25;
                let addCurrencyToAuthor = await currency.addCurrency(reward, author);
                let addCurrencyToTarget = await currency.addCurrency(reward, target);
                return message.channel.send(`${author.username} considered pickpocketing ${target.username}, but ${target.username} convinced ${author.username} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
            }else if (roll <= 145){
                const reward = 50;
                let addCurrencyToAuthor = await currency.addCurrency(reward, author);
                let addCurrencyToTarget = await currency.addCurrency(reward, target);
                return message.channel.send(`${author.username} considered pickpocketing ${target.username}, but ${target.username} convinced ${author.username} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
            }else if (roll <= 149){
                const reward = 100;
                let addCurrencyToAuthor = await currency.addCurrency(reward, author);
                let addCurrencyToTarget = await currency.addCurrency(reward, target);
                return message.channel.send(`${author.username} considered pickpocketing ${target.username}, but ${target.username} convinced ${author.username} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
            }else if (roll <= 150){
                let authorGlovesCount = await inventory.itemCheck(author, 'gloves');
                if (authorGlovesCount.rows.length > 0){
                    if (authorGlovesCount.rows[0].amount > 0){
                        const reward = 2500;
                        let addCurrency = await currency.addCurrency(reward, author);
                        return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found ${reward} Pokédollars! Wow!`);
                    }
                }
                if (authorGlovesCount.rows.length < 1){
                    let createItemPickEntry = await inventory.createItemEntry(author, 'gloves', 1);
                    return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
                }
                let addGlovesToAuthor = await inventory.addToInventory(author, 'gloves', 1);
                return message.channel.send(`${author.username} tried to pickpocket ${target.username}, but got distracted by something on the ground.\n${author.username} found a pair of Gloves. Woah, these are really rare!`);
            }else if (roll >= 151){
                let authorBadgeCount = await badges.checkBadge(author, 'master_thief_badge');
                if (authorBadgeCount.rows.length > 0){
                    const reward = 5000;
                    let addCurrency = await currency.addCurrency(reward, author);
                    return message.channel.send(`${author.username} has once again completed the ultimate heist.\n${author.username} earns ${reward} Pokédollars! Congratulations!`);
                }
                let addBadgeToAuthor = await badges.addBadges(author, 'games', 'master_thief_badge');
                return message.channel.send(`After so long, ${author.username} has completed the ultimate heist.\n${author.username} has earned the Master Thief Badge. Congratulations!`);
            }
		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
