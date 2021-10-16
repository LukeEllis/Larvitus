# Larvitus
Discord bot to handle events for Bluechromed

shop - get shop to show up

TODO
- [x] create inventory 
- [x] update badges with earned_date with a timestamp
- [x] make sure currency cannot go below 0
- [x] make sure item amounts cannot go below 0
- [x] update ledger table to have a timestamp
- [x] update ledger to only return the latest 10 results
- [x] create items file (sword, gem encrusted sword, strongest potion, armor) or database table
- [x] add item limit for certain items, ie only one encrusted sword, 10 strongest potions, etc.
- [x] create shop table
- [x] smoosh functions that duplicate code
- [x] create pickpocket command and move code from services to command
- [x] add logic to make sure badges being added are valid (badgeVerify function?)
- [x] create item buy/sell commands (!buy/!sell)
- [x] shop display command (!shop)
- [x] dragonslayer game
- [] mine game
- [x] pickpocket game
- [x] add PvP flag for users with 24 hr cooldown
- [x] add item functionality into games
- [] calculate currency gain rate of games
- [] calculate chances of game outcomes
- [] make display dates WAY prettier
- [x] bug with little_t's badge case (attachment name cannot have spaces)

CANVAS TODO
- [x] update badges to show badge case using Canvas
- [] update inventory to show backpack using Canvas
- [x] update currency to show wallet using Canvas edit: decided to use canvas for empty wallets as a joke, but use text for general balance queries
- [x] update shop to return an embed/or image with Canvas
- [] add badges reaction flow that gives information the same way shop does
- [] add canvas images for pickpocket game
- [] add canvas images for dragonslayer game
- [] add canvas images for mine game

LONG TODO
- [x] integrate with Twitch
- [] implement games on Twitch
    - [x] dragonslayer
    - [] mine
    - [] pickpocket
- [] better rewards or higher chance of better rewards on Twitch
- [] add varied cooldowns for Discord/Twitch to incentivize using them on livestreams
- [] update inventory to be viewable in Twitch
- [] deploy to AWS
- [] crafting
- [] quests
