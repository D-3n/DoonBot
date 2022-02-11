const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('license')
		.setDescription('Bot liscensing information.'),
	async execute(interaction) {
		return interaction.reply({ content: 'This bot is licensed under the GNU GENERAL PUBLIC LICENSE, Version 3, 29 June 2007.', ephemeral: true });
	},
};