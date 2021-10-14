const { Client, Intents } = require('discord.js');

module.exports = {
    // Create a new client instance
    client: new Client({ intents: [Intents.FLAGS.GUILDS] }),
}