exports.getMineItems = async () => {
    let mineItems = {
        woodPickaxe: {
            name: "Wood Pickaxe",
            description: "A standard pickaxe great for beginners.",
            category: "mine",
            power: 2,
            limit: 1,
            purchasable: 1,
            cost: 1000
        },
        ironPickaxe: {
            name: "Iron Pickaxe",
            description: "An improved pickaxe for mining enthusiasts.",
            category: "mine",
            power: 3,
            limit: 1,
            purchasable: 1,
            cost: 2500
        },
        silverPickaxe: {
            name: "Silver Pickaxe",
            description: "An advanced pickaxe for experts in the mining field.",
            category: "mine",
            power: 5,
            limit: 1,
            purchasable: 1,
            cost: 5000
        },
        goldPickaxe: {
            name: "Gold Pickaxe",
            description: "The golden standard for pickaxe use by leaders in the mining field.",
            category: "mine",
            power: 10,
            limit: 1,
            purchasable: 1,
            cost: 10000
        },
        diamondPickaxe: {
            name: "Diamond Pickaxe",
            description: "Owning this pickaxe makes you the best miner in the world. gg",
            category: "mine",
            power: 20,
            limit: 1,
            purchasable: 1,
            cost: 25000
        },
        dynamite: {
            name: "Dynamite",
            description: "A powerful explosive used to blow things up.",
            category: "mine",
            power: 20,
            limit: 5,
            purchasable: 1,
            cost: 4
        },
        wood: {
            name: "Wood",
            description: "A chunk of wood. It might be useful for something.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        ironOre: {
            name: "Iron Ore",
            description: "A common ore used for just about everything.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        silverOre: {
            name: "Silver Ore",
            description: "An uncommon ore used in rare recipes.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        goldOre: {
            name: "Gold Ore",
            description: "A rare ore used in expensive recipes.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        diamondOre: {
            name: "Diamond Ore",
            description: "An incredibly rare and lucrative ore used in only the best recipes.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        metaliteOre: {
            name: "Metalite Ore",
            description: "An interesting ore that holds a special power.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        opaliteOre: {
            name: "Opalite Ore",
            description: "A deep black ore said to come from dragons.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        purpleGem: {
            name: "Purple Gem",
            description: "A rare purple gem found deep in the mystic mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        greenGem: {
            name: "Green Gem",
            description: "A rare green gem found deep in the sulfur mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        yellowGem: {
            name: "Yellow Gem",
            description: "A rare yellow gem found deep in the mud mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        orangeGem: {
            name: "Orange Gem",
            description: "A rare orange gem found deep in the asphalt mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        redGem: {
            name: "Red Gem",
            description: "A rare red gem found deep in the blood mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        blueGem: {
            name: "Blue Gem",
            description: "A rare blue gem found deep in the snow mines.",
            category: "mine",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
    }
    return mineItems
}

exports.getPickpocketItems = async () => {
    let pickpocketItems = {
        gloves: {
            name: "Gloves",
            description: "Special gloves infused with the power of stealing.",
            category: "pickpocket",
            power: 5,
            limit: 1,
            purchasable: 1,
            cost: 5000
        },
        potionOfShielding: {
            name: "Potion of Shielding",
            description: "A magical potion to protect you from thieves.",
            category: "pickpocket",
            power: 0,
            limit: 5,
            purchasable: 1,
            cost: 1
        },
        lockPick: {
            name: "Lock Pick",
            description: "A device used to enter locations unauthorized. Sneaky sneaky.",
            category: "pickpocket",
            power: 5,
            limit: 10,
            purchasable: 1,
            cost: 1
        },
    }
    return pickpocketItems
}

exports.getDragonslayerItems = async () => {
    let dragonslayerItems = {
        sword: {
            name: "Sword",
            description: "Just a normal sword. You can slash stuff with it.",
            category: "dragonslayer",
            power: 2,
            limit: 1,
            purchasable: 1,
            cost: 1500
        },
        gemEncrustedSword: {
            name: "Gem Encrusted Sword",
            description: "A normal sword, but covered in gems. You can flex on your friends with it.",
            category: "dragonslayer",
            power: 2,
            limit: 1,
            purchasable: 1,
            cost: 5000
        },
        armor: {
            name: "Armor",
            description: "Standard armor. This might help protect you in battle.",
            category: "dragonslayer",
            power: 1,
            limit: 1,
            purchasable: 1,
            cost: 1500
        },
        strongestPotion: {
            name: "Strongest Potion",
            description: "You can't handle my strongest potions!!",
            category: "dragonslayer",
            power: 50,
            limit: 1,
            purchasable: 1,
            cost: 5
        },
        fairyBottle: {
            name: "Fairy in a Bottle",
            description: "Arise hero, for your fate is not yet sealed.",
            category: "dragonslayer",
            power: 0,
            limit: 10,
            purchasable: 1,
            cost: 5
        },
        dragonscale: {
            name: "Dragonscale",
            description: "They say dragonscales make the strongest of armors..",
            category: "dragonslayer",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        dragonFang: {
            name: "Dragon Fang",
            description: "Dragon fangs are highly sought after for their use in weaponry.",
            category: "dragonslayer",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        dragonBreath: {
            name: "Dragon's Breath",
            description: "A small bottle of Dragon's Breath. Usable in rare potion recipes.",
            category: "dragonslayer",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
        brokenSword: {
            name: "Broken Sword'",
            description: "A battle-worn sword. It appears to have magical properties.",
            category: "dragonslayer",
            power: 0,
            limit: 100,
            purchasable: 0,
            cost: 0
        },
    }
    return dragonslayerItems
}
