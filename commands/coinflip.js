const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin'),
	async execute(interaction) {
        
        const rnum = Math.random()
        
        const coin = rnum > 0.5 ? 'heads' : 'tails'

        return interaction.reply(`You got ${coin}.`)
	},
};
