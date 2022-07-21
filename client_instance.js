const { Client, GatewayIntentBits } = require('discord.js');

module.exports = {
    // Create a new client instance
    client: new Client({ intents: [GatewayIntentBits.Guilds] }),
}