const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    devCommand : true,
    guildOnly: true,
	data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verifies the target user.')
    .addUserOption(option => 
        option.setName('target')
        .setDescription('The user to verify')
        .setRequired(true)),
	async execute(interaction) {

        const member = interaction.options.getMember('target');

        let Verified = interaction.guild.roles.cache.find(r => r.name === "Verified")
        if (!Verified) return interaction.reply({ content: 'There is no role named "Verified"', ephemeral: true })
        try {
            member.roles.add(Verified)
            interaction.reply('Successfully verified user.')
        } catch (error) {
            console.log(error)
            interaction.reply({ content: 'An error occured.', ephemeral: true })
        }
	},
};