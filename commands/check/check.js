const Discord = require('discord.js');
const errors = require("../../controllers/error");

module.exports = {
	name: 'check',
	description: 'Checks if a target is valid for the shiny trainer challenge.',
    args: true,
    usage: '<pokemon-name>',
	async execute(message, args) {
        const target = message.author;
		const pokemon = args[0].toLowerCase();
        console.log("pokemon: ", pokemon)

		try{

            let pokemonList = [
                "bulbasaur", "ivysaur", "venusaur",
                "charmander", "charmeleon", "charizard",
                "squirtle", "wartortle", "blastoise",
                "weedle", "kakuna", "beedrill",
                "pidgey","pidgeotto","pidgeot",
                "pikachu", "raichu",
                "nidoran", "nidoranm", "nidoranmale", "nidoran♂", "nidorino", "nidoking",
                "clefairy", "clefable",
                "vulpix", "ninetales",
                "growlithe", "arcanine",
                "poliwag","poliwhirl",
                "abra","kadabra","alakazam",
                "geodude", "graveler", "golem",
                "ponyta", "rapidash",
                "slowpoke", "slowbro",
                "magnemite", "magneton",
                "farfetch'd", "farfetchd",
                "gastly","haunter","gengar",
                "onix",
                "krabby", "kingler",
                "hitmonlee",
                "hitmonchan",
                "rhyhorn", "rhydon",
                "mr.mime", "mrmime",
                "scyther",
                "jynx",
                "electabuzz",
                "magmar",
                "magikarp", "gyarados",
                "porygon",
                "aerodactyl",
                "snorlax",
                "eevee", "vaporeon", "jolteon", "flareon",
                "dratini", "dragonair", "dragonite",
                "chikorita", "bayleef", "meganium",
                "cyndaquil", "quilava", "typhlosion",
                "totodile", "croconaw", "feraligatr",
                "sentret", "furret",
                "spinarak", "ariados",
                "crobat",
                "chinchou", "lanturn",
                "pichu",
                "cleffa",
                "togepi", "togetic",
                "aipom",
                "mareep", "flaaffy", "ampharos",
                "marill", "azumarill",
                "sudowoodo",
                "politoed",
                "hoppip", "skiploom", "jumpluff",
                "sunkern", "sunflora",
                "yanma",
                "wooper", "quagsire",
                "espeon",
                "umbreon",
                "murkrow",
                "unown",
                "girafarig",
                "gligar",
                "steelix",
                "snubbull", "granbull",
                "scizor",
                "heracross",
                "sneasel",
                "slugma", "magcargo",
                "swinub", "piloswine",
                "remoraid", "octillery",
                "delibird",
                "skarmory",
                "houndour", "houndoom",
                "kingdra",
                "porygon2",
                "tyrogue", "hitmontop",
                "smoochum",
                "elekid",
                "magby",
                "larvitar", "pupitar", "tyranitar",
                "raikou",
                "treecko", "grovyle", "sceptile",
                "torchic", "combusken", "blaziken",
                "mudkip", "marshtomp", "swampert",
                "poochyena", "mightyena",
                "wurmple", "silcoon", "beautifly", "cascoon", "dustox",
                "lotad", "lombre", "ludicolo",
                "taillow", "swellow",
                "wingull", "pelipper",
                "ralts", "kirlia", "gardevoir",
                "surskit", "masquerain",
                "shroomish", "breloom",
                "azurill",
                "nosepass",
                "mawile",
                "aron", "lairon", "aggron",
                "meditite", "medicham",
                "plusle",
                "roselia",
                "carvanha", "sharpedo",
                "wailmer", "wailord",
                "numel", "camerupt",
                "torkoal",
                "trapinch", "vibrava", "flygon",
                "swablu", "altaria",
                "lunatone",
                "solrock",
                "barboach", "whiscash",
                "anorith", "armaldo",
                "feebas", "milotic",
                "duskull", "dusclops",
                "absol",
                "snorunt",
                "spheal", "sealeo", "walrein",
                "clamperl", "huntail",
                "relicanth",
                "bagon", "shelgon", "salamence",
                "beldum", "metang", "metagross",
                "rayquaza",
                "turtwig", "grotle", "torterra",
                "chimchar", "monferno", "infernape",
                "piplup", "prinplup", "empoleon",
                "starly", "staravia", "staraptor",
                "shinx", "luxio", "luxray",
                "budew", "roserade",
                "cranidos", "rampardos",
                "shieldon", "bastiodon",
                "combee", "vespiquen",
                "pachirisu",
                "buizel", "floatzel",
                "cherubi", "cherrim",
                "shellos", "gastrodon",
                "ambipom",
                "drifloon", "drifblim",
                "buneary", "lopunny",
                "honchkrow",
                "bronzor", "bronzong",
                "bonsly",
                "mimejr.", "mimejr",
                "spiritomb",
                "gible", "gabite", "garchomp",
                "munchlax",
                "riolu", "lucario",
                "hippopotas", "hippowdon",
                "skorupi", "drapion",
                "croagunk", "toxicroak",
                "snover", "abomasnow",
                "weavile",
                "magnezone",
                "rhyperior",
                "electivire",
                "magmortar",
                "togekiss",
                "yanmega",
                "leafeon",
                "glaceon",
                "gliscor",
                "mamoswine",
                "porygon-z",
                "gallade",
                "probopass",
                "dusknoir",
                "froslass",
                "rotom",
                "palkia",
                "arceus",
                "snivy", "servine", "serperior",
                "tepig", "pignite", "emboar",
                "oshawott", "dewott", "samurott",
                "purrloin", "liepard",
                "pansage", "simisage",
                "pansear", "simisear",
                "panpour", "semipour",
                "munna", "musharna",
                "pidove", "tranquill", "unfezant",
                "roggenrola", "boldore", "gigalith",
                "drilbur", "excadrill",
                "audino",
                "venipede", "whirlipede", "scolipede",
                "cottonee", "whimsicott",
                "petilil", "lilligant",
                "sandile", "krokorok", "krookodile",
                "darumaka", "darmanitan",
                "scraggy", "scrafty",
                "sigilyph",
                "yamask", "cofagrigus",
                "tirtouga", "carracosta",
                "archen", "archeops",
                "zorua", "zoroark",
                "minccino", "cinccino",
                "deerling", "sawsbuck",
                "karrablast", "escavalier",
                "axew", "fraxure", "haxorus",
                "mienfoo", "mienshao",
                "golett", "golurk",
                "pawniard", "bisharp",
                "larvesta", "volcarona",
                "zekrom",
                "chespin", "quilladin", "chesnaught",
                "fennekin", "braixen", "delphox",
                "froakie", "frogadier", "greninja",
                "flabébé", "flabebe", "floette", "florges",
                "espurr", "meowstic",
                "honedge", "doublade", "aegislash",
                "spritzee", "aromatisse",
                "swirlix", "slurpuff",
                "tyrunt", "tyrantrum",
                "amaura", "aurorus",
                "sylveon",
                "goomy", "sliggoo", "goodra",
                "noibat", "noivern",
                "xerneas",
                "yveltal",
                "zygarde",
                "rowlet", "dartrix", "decidueye",
                "pikipek", "trumbeak", "toucannon",
                "grubbin", "charjabug", "vikavolt",
                "rockruff", "lycanroc",
                "salandit", "salazzle",
                "oranguru",
                "wimpod", "golisopod",
                "sandygast", "palossand",
                "mimikyu",
                "dhelmise",
                "buzzwole",
                "xurkitree",
                "kartana",
                "guzzlord",
                "poipole", "naganadel",
                "blacephalon",
                "rookidee", "corvisquire", "corviknight",
                "sizzlipede", "centiskorch",
                "hatenna", "hattrem", "hatterene",
                "impidimp", "morgrem", "grimmsnarl",
                "obstagoon",
                "perrserker",
                "sirfetch'd",
                "mr.rime", "mrrime",
                "runerigus",
                "pincurchin",
                "indeedee",
                "morpeko",
                "dreepy", "drakloak", "dragapult"
            ]

            if(pokemonList.includes(pokemon)){
                return message.channel.send(`${pokemon} is a valid target, get hunting!`)
            }
            return message.channel.send(`${pokemon} isn't a valid target, it may be one day though!`)

		}catch (err){
			console.error(err.message)
			return errors.errorMessage(message)
		}
	},
};
