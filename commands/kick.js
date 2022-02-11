const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
module.exports = {
    devCommand : true,
    guildOnly: true,
	data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks the selected user.')
    .addUserOption(option => 
        option.setName('target')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for kicking the user')),
	async execute(interaction) {
        const member = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "None given."
        if (member.kickable) {
            try {
                member.kick(reason)
                const embed = new MessageEmbed()
                    .setTitle(`${member.user.tag} was kicked!`)
                    .setAuthor({ name: 'A user was kicked!'})
                    .setDescription(`User ${member.user.tag} has been kicked. They are no longer in the server.`)
                    .setTimestamp()
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor('FF0000')    
                interaction.reply({embeds: [embed]})


            } catch (error) {
                interaction.reply({ content: 'An error occured.', ephemeral: true })
                console.log(error)
            }
        } else {
            interaction.reply({ content: 'I cannot kick that user.', ephemeral: true })
        }
	},
};