const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin'),
	async execute(interaction) {
        
        return interaction.reply(`You got ${Math.random() < 0.5 ? 'heads' : 'tails'}.`)
	},
};
