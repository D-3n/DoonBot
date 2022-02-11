const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")
module.exports = {
    devCommand : true,
    guildOnly: true,
	data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans the selected user.')
    .addUserOption(option => 
        option.setName('target')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for kicking the user')),
	async execute(interaction) {

        const member = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "None given"
        
        if (member.bannable) {
        
            try {

                member.ban({reason: reason})
                const embed = new MessageEmbed()
                    .setTitle(`${member.user.tag} was banned!`)
                    .setAuthor({name : "A user was banned!"})
                    .setDescription(`User ${member.user.tag} has been banned for the reason: ${reason}. They are no longer in the server, and cannot rejoin.`)
                    .setTimestamp()
                    .setThumbnail(member.user.displayAvatarURL())
                    .setColor("FF0000")    
                interaction.reply({embeds: [embed]})
            
            } catch (error) {
                interaction.reply({ content: 'An error occured.', ephemeral: true })
                console.log(error)
            }
        
        } else {
            interaction.reply({ content: 'I cannot ban that user.', ephemeral: true })
        }
	},
};