const { prefix } = require('../config.json');
const { developerId, blacklistedIds } = require('../keyIds.json');
module.exports = {
	name: 'messageCreate',
	execute(message) {
	// Add commands that don't require prefix here.

	// Ignore messages without prefix, or messages sent by a bot.
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Pull arguements and the name of the command.
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const ncommandName = args.shift().toLowerCase();

	// If command isn't found check aliases.
	const ncommand = message.client.ncommands.get(ncommandName)
		|| message.client.ncommands.find(cmd => cmd.aliases && cmd.aliases.includes(ncommandName));

	// Check there is actually a command
	if (!ncommand) return;

	// Blacklisted user check
	if (blacklistedIds.includes(message.author.id)) return console.log(`${message.author.tag} (${message.author.id}) is blacklisted.`)

	// Check if the command requires permissions to speak
	if (!message.channel.type === 'dm') {
		if (ncommand.needswriteperms && !message.guild.me.hasPermission('SEND_MESSAGES')) {
			return
		}
	}

	// Force the command to be ran in a server instead of dms.
	if (ncommand.guildOnly && message.channel.type === 'dm') {
		return message.channel.send('This command can\'t be ran in DMs.');
	}

	
	// Check if the users has max permissions
	if (ncommand.maxPerms && message.author.id != developerId) {
		return message.channel.send('You do not have permission to use this command.')
	}


	// Check if there are arguments for the command, and explain proper usage if there are not.
	if (ncommand.args && !args.length) {
		let reply = 'The command was used without the required arguments.';

		if (ncommand.usage) {
			reply += `\nThe proper command usage is '${prefix}${ncommand.name} ${ncommand.usage}'`;
		}

		return message.channel.send(reply);
	}


	try {
		ncommand.execute(message, args);
		
	} catch (error) {
		console.log(error)
	}

	},
};