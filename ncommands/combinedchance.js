module.exports = {
    name: "combinedchance",
    description: "Works out the total chance of something succeeding.",
    usage: "[Chance] [Number of attempts]",
    aliases: ["cc","totalchance"],
    needswriteperms: true,
    args: true,
    execute(message, args) {
        
        let chance = args[0]
        
        // Convert to float and make % into decimal
        chance = parseFloat(chance)
        if (Number.isNaN(chance)) {return message.reply("Please enter a number for the chance.")}

        if (chance >= 1) {chance = chance / 100}
        if (chance >= 1) {return message.channel.send("Please enter a reasonable number.")}

        let attempts = args[1]
        // Convert to int
        attempts = parseFloat(attempts)
        if (Number.isNaN(chance)) {return message.reply("Please enter a number for the attempts.")}
        if (attempts % 1 != 0) {return message.reply("Please enter an integer for the attempts.")}
        attempts = parseInt(attempts)


        // Mathematizing

        const totalchance = 1 - ((1 - chance)**attempts)
        const totalchancepercent = totalchance * 100
        const rounded = totalchancepercent.toFixed(4)
        message.channel.send(`There is a ${rounded}% chance of success.`)
    }
}