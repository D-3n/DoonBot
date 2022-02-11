const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('Roll an 8ball')
		.addStringOption(option => option.setName('question').setDescription('The question to be asked')),
	async execute(interaction) {
        
        const rnum = Math.floor(Math.random() * 20)
        let response

        if (rnum == 0) {
            response = 'As I see it, yes.'
        } else if (rnum == 1) {
            response = 'Ask again later.'
        } else if (rnum == 2) {
            response = 'Better not tell you now.'
        } else if (rnum == 3) {
            response = 'Cannot predict now.'
        } else if (rnum == 4) {
            response = 'Concentrate and ask again.'
        } else if (rnum == 5) {
            response = 'Don\'t count on it.'
        } else if (rnum == 6) {
            response = 'It is certain.'
        } else if (rnum == 7) {
            response = 'It is decidedly so.'
        } else if (rnum == 8) {
            response = 'Most likely.'
        } else if (rnum == 9) {
            response = 'My reply is no.'
        } else if (rnum == 10) {
            response = 'My sources say no.'
        } else if (rnum == 11) {
            response = 'Outlook not so good.'
        } else if (rnum == 12) {
            response = 'Outlook good.'
        } else if (rnum == 13) {
            response = 'Reply hazy, try again.'
        } else if (rnum == 14) {
            response = 'Signs point to yes.'
        } else if (rnum == 15) {
            response = 'Very doubtful.'
        } else if (rnum == 16) {
            response = 'Without a doubt.'
        } else if (rnum == 17) {
            response = 'Yes.'
        } else if (rnum == 18) {
            response = 'Yes - definitely.'
        } else {
            response = 'You may rely on it.'
        }

        return interaction.reply(response)
	},
};
