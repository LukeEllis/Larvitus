# Larvitus
Discord bot to handle events for Bluechromed

LOOK AT GAMEBOI CODE TO UNDERSTAND CANVAS GENERATION

Total time spent making bot:
- as of 4/22/2021 - 10 hours
- 4/23/2021 - 19 hours
- 4/24/2021 - 26 hours
- 4/25/2021 - 38.5 hours
- 4/26/2021 - 41 hours
- 4/27/2021 - 44 hours
- 4/28/2021 - 46 hours (5:00 pm)

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
- [] bug with little_t's badge case

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
- [] integrate with Twitch
- [] implement games on Twitch
- [] better rewards or higher chance of better rewards on Twitch
- [] add varied cooldowns for Discord/Twitch to incentivize using them on livestreams
- [] update inventory to be viewable in Twitch
- [] deploy to AWS
- [] crafting
- [] quests
