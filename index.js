// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents, Guild } = require('discord.js');
require('dotenv').config();
const { Scoreboard } = require('./database.js')
const { client } = require('./client_instance.js');

client.command = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.command.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	Scoreboard.sync();
	console.log("Database sync");
	client.user.setActivity("Waiting for a prediction");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.command.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `There was an error while executing this command!`, ephemeral: true });
	}
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error)
});


// Login to Discord with your client's token
client.login(process.env.token);