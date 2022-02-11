const { Permissions } = require('discord.js');
const { developerId } = require('../keyIds.json');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} (${interaction.guild.name}) triggered an interaction.`);
		if (!interaction.isCommand()) return;
		if (!interaction.channel.permissionsFor(interaction.client.user).has(Permissions.FLAGS.SEND_MESSAGES)) return console.log('Attempted to run a command without permission to send messages.');
	
		// Check bot has correct perms before running commands.
		const botPerms = [
			Permissions.FLAGS.MANAGE_MESSAGES,
			Permissions.FLAGS.KICK_MEMBERS,
			Permissions.FLAGS.MANAGE_ROLES,
			Permissions.FLAGS.MANAGE_CHANNELS,
		];
		
		if (!interaction.guild.me.permissions.has(botPerms)) {
			return interaction.reply(`I need the permissions ${botPerms.join(', ')} for this demonstration to work properly`);	
		}
	
	
		const command = interaction.client.commands.get(interaction.commandName);
	
		if (!command) return;
	
		if (command.devCommand && interaction.user != developerId) {
			return interaction.reply({ content: 'You don\'t have permission to use this command.', ephemeral: true})
		}
	
		if (command.guildOnly && !interaction.inGuild) {
			return interaction.reply({ content: 'This command must be ran in a guild.', ephemeral: true})
		}
	
		try {
			command.execute(interaction);
		} catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};