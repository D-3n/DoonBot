module.exports = {
    name: 'horsetapchance',
    description: 'Works out the total chance of horse taps succeeding.',
    usage: '[Amount of taps]',
    aliases: ['horsechance','dreamtaps', 'horsetaps', 'horsetap', 'dreamchance'],
    needswriteperms: true,
    args: true,
    execute(message, args) {
        
        let attempts = args[0]
        
        // Convert to float and make % into decimal
        attempts = parseInt(attempts)
        if (Number.isNaN(attempts)) {return message.reply('Please enter a number for the chance.')}

        if (attempts < 1) {return message.channel.send('Please enter a reasonable number.')}

        const BASECHANCE = 0.01
        const CHANCEINCREASE = 0.002

        const highestChance = BASECHANCE + (CHANCEINCREASE * (attempts - 1))

        const chances = [0.01]

        for (let tempChance = highestChance; tempChance > 0.01; tempChance -= CHANCEINCREASE ) {
            chances.push(tempChance)
        }

        let totalChance = 1
        chances.forEach(e => totalChance *= (1 - e))

        totalChance = 1 - totalChance

        message.channel.send(`The total success rate is ${(totalChance * 100).toFixed(2)}%.`)
    }
}