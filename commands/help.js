const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help'),
	async execute(interaction) {
			await interaction.reply(`Here is your help coming`);
	},
};