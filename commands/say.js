const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    devCommand : true,
	data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a phrase.')
        .addStringOption(option => option.setName('message').setDescription('The message to be sent')),
	async execute(interaction) {
        const message = interaction.options.getString('message')
        if (!message) return interaction.reply({ content: 'You didn\'t give a message.', ephemeral: true});
        interaction.channel.send(message)
        return interaction.reply({ content: 'The message has been sent.', ephemeral: true});
	},
};




