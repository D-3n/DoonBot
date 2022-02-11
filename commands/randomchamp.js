const { LoLChampions } = require("../data/leaguechampions.json")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('randomchamp')
        .setDescription('Gives a random League of Legends champion.'),
	async execute(interaction) {
        const champAmount = LoLChampions.length
        const rnum = Math.floor(Math.random() * champAmount)
        const pickedChamp = LoLChampions[rnum]
        
        interaction.reply(`You should play ${pickedChamp}.`)
	},
};


