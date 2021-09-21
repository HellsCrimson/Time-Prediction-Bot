const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help'),
	async execute(interaction) {
		const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
		let help = "";

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			help += `${command.data.name} -> ${command.data.description}\n`;
		}

		await interaction.reply({content: `Here is your help:\n${help}`, ephemeral: true});
	},
};