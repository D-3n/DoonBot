const { presenceData } = require('../config.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setPresence({status: "dnd", activities: [{type: presenceData[0], name: presenceData[1]}]})
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
