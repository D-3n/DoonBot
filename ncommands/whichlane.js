const findCommonValues = require("../functions/CommonValues.js")

module.exports = {
    name: "whichlane",
    description: "Picks a random role to play in LoL",
    usage: "[Roles to exclude, seperated by space.]",
    aliases: ["pickrole","randomrole","leaguerole","picklane","randomlane","wl"],
    needswriteperms: true,
    execute(message, args) {
        let roles = ["top", "jungle", "middle", "bottom", "support"]



        const lowerArgs = args.map(arg => arg.toLowerCase())

        const topNames = ["top"]
        const jungleNames = ["jungle", "jgl", "jun"]
        const middleNames = ["mid","middle"]
        const bottomNames = ["bottom","adc","bot"]
        const supportNames = ["support","sup","supp"]

        if (findCommonValues(topNames,lowerArgs)) {
            let index = roles.indexOf("top")
            if (index > -1) {
                roles.splice(index,1)
            }
        }

        if (findCommonValues(jungleNames,lowerArgs)) {
            let index = roles.indexOf("jungle")
            if (index > -1) {
                roles.splice(index,1)
            }
        }

        if (findCommonValues(middleNames,lowerArgs)) {
            let index = roles.indexOf("middle")
            if (index > -1) {
                roles.splice(index,1)
            }
        }

        if (findCommonValues(bottomNames,lowerArgs)) {
            let index = roles.indexOf("bottom")
            if (index > -1) {
                roles.splice(index,1)
            }
        }

        if (findCommonValues(supportNames,lowerArgs)) {
            let index = roles.indexOf("support")
            if (index > -1) {
                roles.splice(index,1)
            }
        }

        const role = Math.floor(Math.random() * roles.length);
        if (!roles.length) {roles[0] = "something that isn't league"}
        try {
            message.channel.send(`You should play ${roles[role]}.`)
        } catch(error) {
            console.log(error)
        }
    }
}