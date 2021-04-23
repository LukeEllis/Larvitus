const Discord = require('discord.js');
const inventory = require('../../commands/inventory/inventory');

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
        // make sure limit of 10 is enforced
        let lockPickPack = await inventory.addItemToAuthor(1, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a Lock Pick!`);
    }else if (roll <= 85){
        // make sure limit of 10 is enforced
        let lockPickPack = await inventory.addItemToAuthor(2, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of 2 Lock Picks!`);
    }else if (roll <= 90){
        // make sure limit of 10 is enforced
        let lockPickPack = await inventory.addItemToAuthor(3, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of 3 Lock Picks!`);
    }else if (roll <= 95){
        // make sure limit of 10 is enforced
        let lockPickPack = await inventory.addItemToAuthor(5, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of 5 Lock Picks!`);
    }else if (roll <= 100){
        // make sure limit of 10 is enforced
        let lockPickPack = await inventory.addItemToAuthor(10, author, 'lock_picks');
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pack of 10 Lock Picks!`);
    }else if (roll <= 105){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 1 Pokédollar!`);
    }else if (roll <= 110){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 5 Pokédollars!`);
    }else if (roll <= 115){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 10 Pokédollars!`);
    }else if (roll <= 120){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 15 Pokédollars!`);
    }else if (roll <= 125){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 20 Pokédollars!`);
    }else if (roll <= 130){
        // add code stuff to make the message true
        // if target does not have enough currency, steal everything they have left and return before final message
        return message.channel.send(`${author.tag} sneaks up behind ${target.tag} and manages to steal 25 Pokédollars!`);
    }else if (roll <= 135){
        // add code stuff to make the message true
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn 10 Pokédollars each!`);
    }else if (roll <= 140){
        // add code stuff to make the message true
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn 25 Pokédollars each!`);
    }else if (roll <= 145){
        // add code stuff to make the message true
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn 50 Pokédollars each!`);
    }else if (roll <= 149){
        // add code stuff to make the message true
        return message.channel.send(`${author.tag} considered pickpocketing ${target.tag}, but ${target.tag} convinced ${author.tag} to team up instead.\nYou both go on a heist and earn 100 Pokédollars each!`);
    }else if (roll <= 150){
        // add code stuff to make the message true
        // if target already has gloves, give them 2500 currency instead
        return message.channel.send(`${author.tag} tried to pickpocket ${target.tag}, but got distracted by something on the ground.\n${author.tag} found a pair of Gloves. Woah, these are really rare!`);
    }else if (roll <= 155){
        // add code stuff to make the message true
        return message.channel.send(`After so long, ${author.tag} has completed the ultimate heist.\n${author.tag} has earned the Master Thief Badge. Congratulations!`);
    }

}
