#### Doonbot
A project aimed at improving JS skills, done in spare time. Feel free to use it how you'd like.

## The following files must be created for the bot to work.

### Config file requirements:
##### This file should be a json in the main directory.
**token** - This should be a string with your bot's token in it.
**prefix** - This should be a string with the desired prefix for the bot.
**guildId** - This should be a string containing the Id of a testing guild.
**clientId** - This should be a string containing the Id of the bot.
**presenceData** - This should be an array. The first term should be [an activity type](https://discord.js.org/#/docs/discord.js/stable/typedef/ActivityType) and the second term should be the the activity name.
**botStatusData** - This should be a string containing [presence status data](https://discord.js.org/#/docs/discord.js/stable/typedef/PresenceStatusData).

### Example keyIDs file:
##### This file should be a json in the main directory.
**developerId** - This should be a string with the ID of the bot's host.

### To do:

- [] Remove clientId from config.json