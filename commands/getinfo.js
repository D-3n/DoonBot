const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
module.exports = {
    guildOnly: true,
	data: new SlashCommandBuilder()
        .setName('getinfo')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
            const member = interaction.options.getMember('target')
            const user = member.user
            const embed = new MessageEmbed()
                .setTitle(`${user.tag}`)
                .setTimestamp()
                .setThumbnail(user.displayAvatarURL())
                .setColor('FF0000')
                .addField('Displayed name:', member.displayName)
                .addField('Displayed colour:', member.displayHexColor)
                .addField('Join date:', member.joinedAt.toJSON().slice(0,10))
                .addField('Roles:', member.roles.cache.map(x => `${x}`).join(', ') || 'none')
                .addField('Account creation date:', user.createdAt.toJSON().slice(0,10))
                .addField('ID:', user.id)


        interaction.reply({embeds: [embed]})
        } else {
            const server = interaction.guild
            const embed = new MessageEmbed()
                .setTitle(`${server.name}`)
                .setTimestamp()
                .setThumbnail(server.iconURL())
                .setColor('FF0000')
                .addField('AFK Channel', server.afkChannel || 'none')
                .addField('Bans:', String(server.bans.cache.size))
                .addField('Channels:', String(server.channels.cache.size))
                .addField('Time created', server.createdAt.toJSON().slice(0,10))
                .addField('Description:', server.description || 'none set')
                .addField('Member count:', String(server.memberCount))
                .addField('ID:', server.id)

        interaction.reply({embeds: [embed]})
        }
	},
};

