const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		const avatarHolder = user ? user : interaction.user;

		const embed = new MessageEmbed()
			.setTitle(`${avatarHolder.tag}'s avatar:`)
			.setImage(avatarHolder.displayAvatarURL({ dynamic: true, size:256 }))

		return interaction.reply({ embeds: [embed]});
	},
};