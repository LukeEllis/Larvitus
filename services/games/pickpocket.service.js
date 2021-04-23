const Discord = require('discord.js');
const badges = require("../../controllers/badges");
const currency = require("../../controllers/currency");
const inventory = require("../../controllers/inventory");

exports.pickpocket = async (author, target) => {
    let potionOfShielding = await inventory.itemAmountCheckTarget(target, 'potion_of_shielding').amount
    console.log('potionOfShielding', potionOfShielding);
    if (potionOfShielding > 0){
        let usePotionOfShielding = await inventory.removeItemsFromTarget(1, target, 'potion_of_shielding');
        console.log('potionOfShielding after usePotionOfShielding', potionOfShielding);
        return message.channel.send(`${target} had a Potion of Shielding to block your attack! They now have ${potionOfShielding} Potions of Shielding left.`);
    }

    let roll = Math.floor(Math.random() * 101);
    console.log('roll', roll)

    let gloves = await inventory.itemAmountCheckAuthor(author, 'gloves').amount
    if (gloves > 0){
        let roll = roll + 5;
        console.log('roll + gloves', roll)
    }

    let lockPick = await inventory.itemAmountCheckAuthor(author, 'lock_pick').amount
    console.log('lockPick', lockPick);
    if (lockPick > 0){
        let roll = roll + (5*lockPick);
        console.log('roll + lockPick', roll)
        let useLockPicks = await inventory.removeAllOfOneItemFromAuthor(author, 'lock_pick');
        console.log('lockPick after useLockPicks', lockPick);
    }

    if (roll <= 15){
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but tripped on thin air - oof!`);
    }else if (roll <= 30){
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but tripped on a rock - oof!`);
    }else if (roll <= 45){
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but tripped on a banana peel - oof!`);
    }else if (roll <= 60){
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but tripped on their own feet - oof!`);
    }else if (roll <= 75){
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but tripped on a dragon egg - oof!`);
    }else if (roll <= 80){
        const reward = 1
        let lockPickLimit = await inventory.itemLimitCheck('lock_picks').item_limit;
        let authorLockPickCount = await inventory.itemAmountCheckAuthor(author, 'lock_picks').amount;
        if (authorLockPickCount + reward > lockPickLimit){
            let addCurrency = await currency.addCurrency(reward, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${reward} Pokédollar!`);
        }
        let lockPickPack = await inventory.addItemToAuthor(reward, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a Lock Pick!`);
    }else if (roll <= 85){
        const reward = 2;
        let lockPickLimit = await inventory.itemLimitCheck('lock_picks').item_limit;
        let authorLockPickCount = await inventory.itemAmountCheckAuthor(author, 'lock_picks').amount;
        if (authorLockPickCount + reward > lockPickLimit){
            const amount = lockPickLimit - authorLockPickCount;
            let lockPickPack = await inventory.addItemToAuthor(amount, author, 'lock_picks');
            const currencyAmount = reward - amount;
            let addCurrency = await currency.addCurrency(currencyAmount, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${amount} Lock Picks and ${currencyAmount} Pokédollars!`);
        }
        let lockPickPack = await inventory.addItemToAuthor(reward, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of ${reward} Lock Picks!`);
    }else if (roll <= 90){
        const reward = 3;
        let lockPickLimit = await inventory.itemLimitCheck('lock_picks').item_limit;
        let authorLockPickCount = await inventory.itemAmountCheckAuthor(author, 'lock_picks').amount;
        if (authorLockPickCount + reward > lockPickLimit){
            const amount = lockPickLimit - authorLockPickCount;
            let lockPickPack = await inventory.addItemToAuthor(amount, author, 'lock_picks');
            const currencyAmount = reward - amount;
            let addCurrency = await currency.addCurrency(currencyAmount, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${amount} Lock Picks and ${currencyAmount} Pokédollars!`);
        }
        let lockPickPack = await inventory.addItemToAuthor(reward, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of ${reward} Lock Picks!`);
    }else if (roll <= 95){
        const reward = 5;
        let lockPickLimit = await inventory.itemLimitCheck('lock_picks').item_limit;
        let authorLockPickCount = await inventory.itemAmountCheckAuthor(author, 'lock_picks').amount;
        if (authorLockPickCount + reward > lockPickLimit){
            const amount = lockPickLimit - authorLockPickCount;
            let lockPickPack = await inventory.addItemToAuthor(amount, author, 'lock_picks');
            const currencyAmount = reward - amount;
            let addCurrency = await currency.addCurrency(currencyAmount, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${amount} Lock Picks ${currencyAmount} Pokédollars!`);
        }
        let lockPickPack = await inventory.addItemToAuthor(reward, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of ${reward} Lock Picks!`);
    }else if (roll <= 100){
        const reward = 10;
        let lockPickLimit = await inventory.itemLimitCheck('lock_picks').item_limit;
        let authorLockPickCount = await inventory.itemAmountCheckAuthor(author, 'lock_picks').amount;
        if (authorLockPickCount + reward > lockPickLimit){
            const amount = lockPickLimit - authorLockPickCount;
            let lockPickPack = await inventory.addItemToAuthor(amount, author, 'lock_picks');
            const currencyAmount = reward - amount;
            let addCurrency = await currency.addCurrency(currencyAmount, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${amount} Lock Picks ${currencyAmount} Pokédollars!`);
        }
        let lockPickPack = await inventory.addItemToAuthor(reward, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of ${reward} Lock Picks!`);
    }else if (roll <= 105){
        const reward = 1;
        let checkTargetCurrency = await currency.getCurrencyById(target)
        if (checkTargetCurrency < reward){
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollar, but ${target.tag} didn't have any!`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollar!`);
    }else if (roll <= 110){
        const reward = 5;
        let checkTargetCurrency = await currency.getCurrencyById(target).amount
        if (checkTargetCurrency < reward){
            let stealCurrency = await currency.transferCurrency(checkTargetCurrency, target, author)
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollars, but ${target.tag} only had $${checkTargetCurrency}!`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollars!`);
    }else if (roll <= 115){
        const reward = 10;
        let checkTargetCurrency = await currency.getCurrencyById(target).amount
        if (checkTargetCurrency < reward){
            let stealCurrency = await currency.transferCurrency(checkTargetCurrency, target, author)
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollars, but ${target.tag} only had $${checkTargetCurrency}`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollars!`);
    }else if (roll <= 120){
        const reward = 15;
        let checkTargetCurrency = await currency.getCurrencyById(target).amount
        if (checkTargetCurrency < reward){
            let stealCurrency = await currency.transferCurrency(checkTargetCurrency, target, author)
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollars, but ${target.tag} only had $${checkTargetCurrency}`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollars!`);
    }else if (roll <= 125){
        const reward = 20;
        let checkTargetCurrency = await currency.getCurrencyById(target).amount
        if (checkTargetCurrency < reward){
            let stealCurrency = await currency.transferCurrency(checkTargetCurrency, target, author)
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollars, but ${target.tag} only had $${checkTargetCurrency}`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollars!`);
    }else if (roll <= 130){
        const reward = 25;
        let checkTargetCurrency = await currency.getCurrencyById(target).amount
        if (checkTargetCurrency < reward){
            let stealCurrency = await currency.transferCurrency(checkTargetCurrency, target, author)
            return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and tried to steal ${reward} Pokédollars, but ${target.tag} only had $${checkTargetCurrency}`);
        }
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal ${reward} Pokédollars!`);
    }else if (roll <= 135){
        const reward = 10;
        let addCurrencyToAuthor = await currency.addCurrency(reward, author);
        let addCurrencyToTarget = await currency.addCurrency(reward, target);
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
    }else if (roll <= 140){
        const reward = 25;
        let addCurrencyToAuthor = await currency.addCurrency(reward, author);
        let addCurrencyToTarget = await currency.addCurrency(reward, target);
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
    }else if (roll <= 145){
        const reward = 50;
        let addCurrencyToAuthor = await currency.addCurrency(reward, author);
        let addCurrencyToTarget = await currency.addCurrency(reward, target);
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
    }else if (roll <= 149){
        const reward = 100;
        let addCurrencyToAuthor = await currency.addCurrency(reward, author);
        let addCurrencyToTarget = await currency.addCurrency(reward, target);
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn ${reward} Pokédollars each!`);
    }else if (roll <= 150){
        let authorGlovesCount = await inventory.itemAmountCheckAuthor(author, 'gloves').amount;
        if (authorGlovesCount > 0){
            const reward = 2500;
            let addCurrency = await currency.addCurrency(reward, author);
            return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found ${reward} Pokédollars! Wow!`);
        }
        let addGlovesToAuthor = await inventory.addItemToAuthor(1, author, 'gloves');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pair of Gloves. Woah, these are really rare!`);
    }else if (roll <= 155){
        let authorBadgeCount = await inventory.badgeCheck(author, 'master_thief_badge').amount;
        if (authorBadgeCount > 0){
            const reward = 5000;
            let addCurrency = await currency.addCurrency(reward, author);
            return message.channel.send(`${author.tag} has once again completed the ultimate heist.\n${author.tag} earns ${reward} Pokédollars! Congratulations!`);
        }
        let addBadgeToAuthor = await badges.addBadges(author, 'games', 'master_thief_badge');
        return message.channel.send(`After so long, ${author.tag} has completed the ultimate heist.\n${author.tag} has earned the Master Thief Badge. Congratulations!`);
    }
}
