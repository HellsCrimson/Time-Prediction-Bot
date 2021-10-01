const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a prediction')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the teacher')
				.setRequired(true)),
	async execute(interaction) {
		const name = interaction.options.getString('name');
		if (process_prediction.predictionGoing)
		{
			await interaction.reply('A prediction is already going, you need to stop it first');
		}
		else
		{
			process_prediction.predictionGoing = true;
			process_prediction.name = name;
			await interaction.reply(`Prediction about ${name} registred`);
		}
	},
};